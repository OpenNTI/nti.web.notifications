import { SessionStorage } from '@nti/web-storage';
import { Stores } from '@nti/lib-store';
import { getAppUser, getService } from '@nti/web-client';
import { Models } from '@nti/lib-interfaces';

import { subscribeToIncoming } from './Socket';
import {
	sendEmailVerification,
	verifyEmailToken,
} from './types/EmailVerify/utils';

const MESSAGE_INBOX = 'RUGDByOthersThatIMightBeInterestedIn';
const CONTENT_ROOT = 'tag:nextthought.com,2011-10:Root';

const NOTIFICATIONS_BATCH_SIZE = 10;

const VerificationNoticeExpiryPeriod = 10000; //10 seconds (in milliseconds)
const VerificationNoticeSnoozeDuration = 360000; //one hour (in milliseconds)

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

	async onIncoming(change) {
		const service = await getService();
		// parse raw json object into Model
		change = normalizeItems(await service.getObject(change));

		const oldItems = this.get('items') ?? [];
		this.set({
			items: [change, ...oldItems],
		});

		this.updateUnread();
	}

	async load() {
		if (this.initialLoad) {
			return;
		}
		this.initialLoad = true;
		// Subscribe to incoming notifications emitted from the legacy code, for now.
		subscribeToIncoming(item => this.onIncoming(item));

		this.set({
			loading: true,
		});

		try {
			await this.resolveInbox();
			await this.loadNextBatch();
			this.updateUnread();

			// Email Verify load
			const user = await getAppUser();
			const needsVerification =
				user && user.email && user.hasLink('RequestEmailVerification');
			this.set({
				needsVerification,
				verifiedDate: null,
			});

			if (!needsVerification) {
				return;
			}

			const verificationSnoozed = new Date(
				parseInt(SessionStorage.getItem('verificationSnoozed'), 10)
			);
			const elapsedSnoozed = Date.now() - verificationSnoozed;
			if (
				isNaN(verificationSnoozed.getTime()) ||
				elapsedSnoozed >= VerificationNoticeSnoozeDuration
			) {
				const VerificationNoticeStart = new Date();
				const VerificationNoticeExpiry = new Date(
					VerificationNoticeStart.getTime() +
						VerificationNoticeExpiryPeriod
				);
				this.set({
					verificationSnoozed: null,
					VerificationNoticeStart,
					VerificationNoticeExpiry,
				});
				this.autoSnoozeTimer = setTimeout(
					() => this.set('verificationSnoozed', new Date()),
					VerificationNoticeExpiryPeriod
				);
			} else {
				this.set({ verificationSnoozed });
			}
		} catch (e) {
			this.set({
				loading: false,
				error: e,
			});
		}
	}

	async resolveInbox() {
		const service = await getService();
		const pageInfo = await service.getPageInfo(CONTENT_ROOT);
		this.url = pageInfo.getLink(MESSAGE_INBOX);

		this.set({
			lastViewed: new Date(
				parseFloat(await service.get(`${this.url}/lastViewed`), 10) *
					1000
			),
		});
	}

	updateUnread() {
		const items = this.get('items') || [];
		const lastViewed = this.get('lastViewed');

		const mod = x => x.getLastModified() || x.getCreatedTime();
		const inc = m => (m > lastViewed ? 1 : 0);
		this.set({
			unreadCount: items.reduce((n, item) => n + inc(mod(item)), 0),
		});
	}

	updateLastViewed() {
		if (this.batch?.hasLink('lastViewed')) {
			const now = new Date();
			this.batch.putToLink('lastViewed', now.getTime() / 1000);
			this.set({
				lastViewed: now,
				unreadCount: 0,
			});
			this.updateUnread();
		}
	}

	hasMore() {
		const items = this.get('items');
		if (items && items.length === this.batch?.TotalItemCount) {
			return false;
		}
		return true;
	}

	async loadNextBatch() {
		try {
			if (!this.hasMore()) {
				return false;
			}

			let items = this.get('items') || [];

			this.set({ batchLoading: true });

			// We have new items, get at most 5 of them
			const service = await getService();

			this.batch = await service.getBatch(this.url, {
				batchStart: items.length,
				batchSize: NOTIFICATIONS_BATCH_SIZE,
			});

			const { Items: newItems, TotalItemCount } = this.batch;

			items = [...items, ...newItems.map(normalizeItems)];

			this.set({
				items,
				moreItems: items.length < TotalItemCount,
			});

			return true;
		} catch (error) {
			this.set({ error });
		} finally {
			this.set({
				batchLoading: false,
				loading: false,
			});
		}
	}

	async startEmailVerification() {
		clearTimeout(this.autoSnoozeTimer);
		this.set({ emailVerificationRequested: new Date() });
		const user = await getAppUser();
		try {
			if (!this.get('emailVerificationSent')) {
				await sendEmailVerification(user);
				this.set({ emailVerificationSent: new Date() });
			}
		} catch (error) {
			if (error.statusCode !== 422) {
				this.set({ error });
			}
		}
	}

	async submitToken(user, token) {
		if (user && token) {
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
		} else {
			this.set({ validToken: false });
			return false;
		}
	}

	cancelEmailVerification() {
		this.set({ emailVerificationRequested: null });
	}

	completeEmailVerification() {
		this.set({ completedDate: new Date() });
	}

	snoozeVerification() {
		const verificationSnoozed = new Date();
		clearTimeout(this.autoSnoozeTimer);
		this.set({
			verificationSnoozed,
			emailVerificationRequested: null,
		});
		SessionStorage.setItem(
			'verificationSnoozed',
			verificationSnoozed.getTime()
		);
	}
}

function normalizeItems(notice) {
	return notice.Item
		? notice
		: Object.assign(Models.Change.wrap(notice), { Item: notice });
}
