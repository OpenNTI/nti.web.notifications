import { Stores } from '@nti/lib-store';
import { getAppUser, getService } from '@nti/web-client';

import { subscribeToIncoming } from './Socket';

const MESSAGE_INBOX = 'RUGDByOthersThatIMightBeInterestedIn';
const CONTENT_ROOT = 'tag:nextthought.com,2011-10:Root';

const Loading = 'loadingProp';
const Items = 'itemsProp';
const Error = 'errorProp';
const UnreadCount = 'unreadCount';

const UpdateLastViewed = 'updateLastViewed';
const UpdateShownItemCount = 'updateShownItemCount';
const Load = 'load';

const Pinnable = [
	async () => {
		const user = await getAppUser();
		if (user && user.email && !user.isEmailVerified()) {
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
	static Loading = Loading;
	static Items = Items;
	static Error = Error;
	static UnreadCount = UnreadCount;

	static UpdateLastViewed = UpdateLastViewed;
	static UpdateShownItemCount = UpdateShownItemCount;
	static Load = Load;

	onIncoming (notable) {
		this.set({
			[Items]: [notable, ...(this.get(Items)) ?? []],
			[UnreadCount]: this.get(UnreadCount) + 1,
		});
	}

	async [Load] () {
		if (this.initialLoad) { return;}
		this.initialLoad = true;
		// Subscribe to incoming notifications emitted from the legacy code, for now.
		subscribeToIncoming((item) => this.onIncoming(item));
		
		this.set({
			[Loading]: true,
		});

		try {
			const service = await getService();
			const pageInfo = await service.getPageInfo(CONTENT_ROOT);
			const url = pageInfo.getLink(MESSAGE_INBOX);
			const batch = await service.getBatch(url, {
				batchStart: 0,
				batchSize: 5,
			});

			const {Items: items} = batch;

			const pinned = await Promise.all(Pinnable.map((n) => n()));
			// Note: pinned.filter(Boolean) is short-hand for pinned.filter((x) => return Boolean(x))
			// and Boolean(x) returns the boolean representation of x.
			const notifications = [...pinned.filter(Boolean), ...items];

			const rawLastViewed = await service.get(`${url}/lastViewed`);
			const lastViewedDate = new Date(parseFloat(rawLastViewed, 10) / 1000);
			let unreadCount = 0;
			for (let i = 0; i < items.length; ++i) {
				const itemTime = items[i].getLastModified() || items[i].getCreatedAt();
				if (itemTime < lastViewedDate) {
					unreadCount++;
				} else {
					break;
				}
			}

			this.set({
				batch,
				[Loading]: false,
				[Items]: notifications,
				[UnreadCount]: unreadCount,
			});
		} catch (e) {
			this.set({
				[Loading]: false,
				[Error]: e,
			});
		}
	}

	async [UpdateLastViewed] () {
		const service = await getService();
		const pageInfo = await service.getPageInfo(CONTENT_ROOT);
		const url = pageInfo.getLink(MESSAGE_INBOX);
		const batch = await service.getBatch(url, {
			batchStart: 0,
			batchSize: 5,
		});
		if (batch && batch.hasLink('lastViewed')) {
			batch.putToLink('lastViewed', Date.now() / 1000);
			this.set({
				[UnreadCount]: 0,
			});
		}
	}

	async [UpdateShownItemCount] () {
		try {
			const batch = this.get('batch');
			const currentlyShown = batch.ItemCount;
			const service = await getService();
			const pageInfo = await service.getPageInfo(CONTENT_ROOT);
			const url = pageInfo.getLink(MESSAGE_INBOX);
			const newBatch = await service.getBatch(url, {
				batchStart: currentlyShown,
				batchSize: currentlyShown + 5,
			});
			let items = this.get([Items]);
			items = [...items, ...newBatch.Items];

			this.set({
				[Items]: items,
			});
		} catch (e) {
			this.set({
				[Loading]: false,
				[Error]: e,
			});
		}
	}

}
