import { Stores } from '@nti/lib-store';
import { getAppUser, getService } from '@nti/web-client';

const MESSAGE_INBOX = 'RUGDByOthersThatIMightBeInterestedIn';
const CONTENT_ROOT = 'tag:nextthought.com,2011-10:Root';

const Loading = 'loadingProp';
const Items = 'itemsProp';
const Error = 'errorProp';

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

export default class NotificationsStore extends Stores.BoundStore {
	static Loading = Loading;
	static Items = Items;
	static Error = Error;

	async load () {
		this.set({
			[Loading]: true,
		});

		try {
			const service = await getService();
			const pageInfo = await service.getPageInfo(CONTENT_ROOT);
			const url = pageInfo.getLink(MESSAGE_INBOX);
			const items = await service.getBatch(url, {
				batchStart: 0,
				batchSize: 20,
			});

			const pinned = await Promise.all(Pinnable.map((n) => n()));
			// Note: pinned.filter(Boolean) is short-hand for pinned.filter((x) => return Boolean(x))
			// and Boolean(x) returns the boolean representation of x.
			const notifications = [...pinned.filter(Boolean), items];

			this.set({
				[Loading]: false,
				[Items]: notifications,
			});
		} catch (e) {
			this.set({
				[Loading]: false,
				[Error]: e,
			});
		}
	}
}
