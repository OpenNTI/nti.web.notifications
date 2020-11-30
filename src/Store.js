import { SessionStorage } from '@nti/web-storage';
import { Stores } from '@nti/lib-store';
import { getAppUser, getService } from '@nti/web-client';

import { subscribeToIncoming } from './Socket';
import { sendEmailVerification, verifyEmailToken } from './types/EmailVerify/utils';

const MESSAGE_INBOX = 'RUGDByOthersThatIMightBeInterestedIn';
const CONTENT_ROOT = 'tag:nextthought.com,2011-10:Root';

const NOTIFICATIONS_INIT_NUM = 10;

const VerificationNoticeExpiryPeriod = 10000; //10 seconds (in milliseconds)
const VerificationNoticeSnoozeDuration = 360000; //one hour (in milliseconds)

const Pinnable = [
	async () => {
		const user = await getAppUser();
		if (user && user.email && user.hasLink('RequestEmailVerification')) {
			return { MimeType: 'application/vnd.nextthought.emailverify' };
		}
	}
];

/**
 * The NotificationStore connects to the nti server and gets
 * the notifications of the current session's user. After it
 * gets the data from the server, the NotificationStore connects
 * to the panel and updates the notification items that
 * it displays.
 *
 * @export NotificationsStore
 * @class NotificationsStore
 * @extends {Stores.BoundStore}
 */

export default class NotificationsStore extends Stores.SimpleStore {
	static Singleton = true;

	async onIncoming (notable) {
		let oldItems = this.get('items') ?? [];
		let pinnedItems = await Promise.all(Pinnable.map((n) => n()));
		pinnedItems = pinnedItems.filter(Boolean);
		oldItems = oldItems.filter((item) => {
			for (let i = 0; i < pinnedItems.length; ++i) {
				const pinnedItem = pinnedItems[i];
				if (pinnedItem.MimeType === item.MimeType) {
					return false;
				}
			}
			return true;
		});

		this.set({
			items: [...pinnedItems, notable, ...oldItems],
			unreadCount: this.get('unreadCount') + 1,
		});
	}

	async load () {
		if (this.initialLoad) { return;}
		this.initialLoad = true;
		// Subscribe to incoming notifications emitted from the legacy code, for now.
		subscribeToIncoming((item) => this.onIncoming(item));

		this.set({
			loading: true,
		});

		try {
			// Get a large batch of 20 items and figure out the unread count
			const service = await getService();
			const pageInfo = await service.getPageInfo(CONTENT_ROOT);
			const url = pageInfo.getLink(MESSAGE_INBOX);
			let batch = await service.getBatch(url, {
				batchStart: 0,
				batchSize: 20,
			});
			let {Items: items} = batch;
			const rawLastViewed = await service.get(`${url}/lastViewed`);
			const lastViewedDate = new Date(parseFloat(rawLastViewed, 10) * 1000);
			let unreadCount = 0;
			for (let i = 0; i < items.length; ++i) {
				const itemTime = items[i].getLastModified() || items[i].getCreatedAt();
				if (itemTime > lastViewedDate) {
					unreadCount++;
				} else {
					break;
				}
			}

			// Get a smaller batch to display to the user
			batch = await service.getBatch(url, {
				batchStart: 0,
				batchSize: NOTIFICATIONS_INIT_NUM,
			});

			const pinned = await Promise.all(Pinnable.map((n) => n()));
			const notifications = [...pinned.filter(Boolean), ...(batch.Items.map((item) => { return item.Item ? item.Item : item; }))];

			this.set({
				batch,
				loading: false,
				items: notifications,
				unreadCount: unreadCount,
				moreItems: notifications.length < batch.TotalItemCount,
			});

			// Email Verify load
			const user = await getAppUser();
			const needsVerification = user?.email && user.hasLink('RequestEmailVerification');
			this.set({
				needsVerification,
				verifiedDate: null,
			});

			if (!needsVerification) {
				return;
			}

			const verificationSnoozed = new Date(parseInt(SessionStorage.getItem('verificationSnoozed'), 10));
			const elapsedSnoozed = verificationSnoozed - Date.now();
			if (isNaN(verificationSnoozed.getTime()) || VerificationNoticeSnoozeDuration > elapsedSnoozed) {
				const VerificationNoticeStart = new Date();
				const VerificationNoticeExpiry = new Date(VerificationNoticeStart.getTime() + VerificationNoticeExpiryPeriod);
				this.set({
					verificationSnoozed: null,
					VerificationNoticeStart,
					VerificationNoticeExpiry,
				});
				this.autoSnoozeTimer = setTimeout(() => this.set('verificationSnoozed', new Date()), VerificationNoticeExpiryPeriod);
			}

		} catch (e) {
			this.set({
				loading: false,
				error: e,
			});
		}
	}

	async updateLastViewed () {
		const batch = this.get('batch');
		if (batch && batch.hasLink('lastViewed')) {
			batch.putToLink('lastViewed', Date.now() / 1000);
			this.set({
				unreadCount: 0,
			});
		}
	}

	async checkNewItemsExist () {
		const batch = this.get('batch');
		const currentlyShown =
				this.get('currentlyShown') || batch.ItemCount;
		const totalItemCount = batch.TotalItemCount;
		if (currentlyShown === totalItemCount) {
			return false;
		}
		return true;

	}

	async updateNewItems () {
		try {
			// Check that we have more items to show
			const batch = this.get('batch');
			const currentlyShown =
				this.get('currentlyShown') || batch.ItemCount;
			const totalItemCount = batch.TotalItemCount;
			if (currentlyShown === totalItemCount) {
				return false;
			}
			// We have new items, get at most 5 of them
			const service = await getService();
			const pageInfo = await service.getPageInfo(CONTENT_ROOT);
			const url = pageInfo.getLink(MESSAGE_INBOX);
			const newBatch = await service.getBatch(url, {
				batchStart: currentlyShown,
				batchSize: 5,
			});
			const alreadyPresentItems = this.get('items');
			const itemsToAppend = newBatch.Items;

			this.set({
				currentlyShown: currentlyShown + itemsToAppend.length,
			});
			const items = [...alreadyPresentItems, ...itemsToAppend];

			this.set({
				items: items,
				moreItems: items.length < batch.TotalItemCount,
			});

			return true;
		} catch (e) {
			this.set({
				loading: false,
				error: e,
			});
		}
	}

	async startEmailVerification () {
		clearTimeout(this.autoSnoozeTimer);
		this.set({ emailVerificationRequested: new Date() });
		const user = await getAppUser();
		try {
			if (!this.get('emailVerificationSent')) {
				await sendEmailVerification(user);
				this.set({ emailVerificationSent: new Date() });
			}
		} catch (error) {
			this.set({ error });
		}
	}

	stopEmailVerification () {
		this.set({ emailVerificationRequested: null });
	}

	async submitToken (user, token) {
		if (token && token !== '') {
			try {
				const returnValue = await verifyEmailToken(user, token);
				if (returnValue) {
					this.set({
						verifiedDate: new Date(),
						validToken: true,
						needsVerification: false,
					});
				} else {
					this.set({ validToken: false });
				}
				return returnValue;
			} catch (e) {
				this.set({ validToken: false });
				return false;
			}
		}
		else {
			this.set({ validToken: false });
			return false;
		}
	}

	completeEmailVerification () {
		this.set({ completedDate: new Date() });
	}

	snoozeVerification () {
		const verificationSnoozed = new Date();
		clearTimeout(this.autoSnoozeTimer);
		this.set({ verificationSnoozed });
		SessionStorage.setItem('verificationSnoozed', verificationSnoozed.getTime());
	}
}
