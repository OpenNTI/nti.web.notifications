/* eslint-env jest */
import { SessionStorage } from '@nti/web-storage';
import { setupTestClient } from '@nti/web-client/test-utils';

import Store from '../Store';
import * as EmailVerifyUtils from '../types/EmailVerify/utils';
import * as Socket from '../Socket';

const localStorageMock = (() => {
	let store = {};

	return {
		getItem(key) {
			return store[key] || null;
		},
		setItem(key, value) {
			store[key] = value.toString();
		},
		removeItem(key) {
			delete store[key];
		},
		clear() {
			store = {};
		},
	};
})();

Object.defineProperty(window, 'sessionStorage', {
	value: localStorageMock,
});

describe('Notification Store', () => {
	beforeEach(() => {
		localStorageMock.clear();
		jest.restoreAllMocks();
	});

	test('onIncoming adds a change to store', async () => {
		const getObject = jest
			.fn()
			.mockImplementation(async rawObject => rawObject);

		setupTestClient({
			getObject,
		});

		const change = {
			name: 'This is my change',
			Item: {},
		};

		const testStore = new Store();
		jest.spyOn(testStore, 'updateUnread').mockImplementation(() => {});

		await testStore.onIncoming(change);

		expect(testStore.get('items')).toEqual([change]);

		expect(getObject).toHaveBeenCalledWith(change);
		expect(testStore.updateUnread).toHaveBeenCalled();
	});

	test('resolveInbox sets the correct lastViewed value', async () => {
		const date = Date.parse('December 20, 2020');
		const getPageInfo = jest.fn().mockImplementation(async () => {
			return {
				getLink: () => {
					return 'url';
				},
			};
		});
		const get = jest.fn().mockImplementation(async () => date / 1000);
		setupTestClient({ getPageInfo, get });

		const testStore = new Store();
		await testStore.resolveInbox();

		expect(testStore.get('lastViewed').getTime()).toEqual(date);
	});

	test('updateUnread sets correct unreadCount (0 items)', () => {
		const store = new Store();
		store.set({ items: [] });
		store.updateUnread();
		expect(store.get('unreadCount')).toBe(0);
	});

	test('updateUnread sets correct unreadCount (1 seen item)', () => {
		const store = new Store();
		store.set({
			items: [{ getLastModified: () => Date.parse('December 20, 2020') }],
			lastViewed: Date.parse('December 21, 2020'),
		});
		store.updateUnread();
		expect(store.get('unreadCount')).toBe(0);
	});

	test('updateUnread sets correct unreadCount (1 unseen item)', () => {
		const store = new Store();
		store.set({
			items: [{ getLastModified: () => Date.parse('December 20, 2020') }],
			lastViewed: Date.parse('December 19, 2020'),
		});
		store.updateUnread();
		expect(store.get('unreadCount')).toBe(1);
	});

	test('updateUnread sets correct unreadCount (1 unseen item, 1 seen item)', () => {
		const store = new Store();
		store.set({
			items: [
				{ getLastModified: () => Date.parse('December 20, 2020') },
				{ getLastModified: () => Date.parse('December 15, 1999') },
			],
			lastViewed: Date.parse('December 19, 2020'),
		});
		store.updateUnread();
		expect(store.get('unreadCount')).toBe(1);
	});

	test('updateLastViewed updates last viewed correctly (now) and sets unread count to 0', () => {
		let date = null;
		const store = new Store();
		jest.spyOn(store, 'updateUnread').mockImplementation(() => {});
		store.batch = {
			hasLink: () => {
				return true;
			},
			putToLink: (link, value) => (date = value),
		};
		store.updateLastViewed();
		expect(store.get('lastViewed').getTime()).toEqual(date * 1000);
		expect(store.get('unreadCount')).toBe(0);
	});

	test('hasMore is correct for 0 more items', () => {
		const store = new Store();
		store.set({ items: [] });
		store.batch = { TotalItemCount: 0 };
		expect(store.hasMore()).toBe(false);
	});

	test('hasMore is correct for 1 more item (0 items in items array but TotalItemCount in batch object is 1)', () => {
		const store = new Store();
		store.set({ items: [] });
		store.batch = { TotalItemCount: 1 };
		expect(store.hasMore()).toBe(true);
	});

	test('loadNextBatch returns false when hasMore returns false and items are not changed', async () => {
		const store = new Store();
		jest.spyOn(store, 'hasMore').mockImplementation(() => {
			return false;
		});
		const beforeItems = store.get('items');
		expect(await store.loadNextBatch()).toBe(false);
		expect(store.get('items')).toEqual(beforeItems);
	});

	test('loadNextBatch returns true when hasMore returns true and new items are loaded', async () => {
		const store = new Store();
		jest.spyOn(store, 'hasMore').mockImplementation(() => {
			return true;
		});
		const getBatch = jest.fn().mockImplementation((url, config) => {
			return {
				Items: [
					{ Item: { name: 'new item 1' } },
					{ Item: { name: 'new item 2' } },
				],
				TotalItemCount: 3,
			};
		});
		setupTestClient({ getBatch });

		expect(await store.loadNextBatch()).toBe(true);

		expect(store.get('items')).toEqual([
			{ Item: { name: 'new item 1' } },
			{ Item: { name: 'new item 2' } },
		]);
		expect(store.get('moreItems')).toBe(true);
	});

	test('startEmailVerification sets emailVerificationRequested, invokes sendEmailVerification', async () => {
		const getAppUser = jest.fn().mockImplementation(() => {});
		jest.spyOn(
			EmailVerifyUtils,
			'sendEmailVerification'
		).mockImplementation(() => true);

		setupTestClient({ getAppUser });

		const store = new Store();
		const now = Date.now();
		await store.startEmailVerification();

		expect(
			store.get('emailVerificationRequested').getTime()
		).toBeGreaterThanOrEqual(now);
		expect(
			store.get('emailVerificationSent').getTime()
		).toBeGreaterThanOrEqual(now);
	});

	test('startEmailVerification fails and sets an error', async () => {
		const getAppUser = jest.fn().mockImplementation(() => {
			return { hasLink: () => true, getLink: () => 'link' };
		});
		jest.spyOn(
			EmailVerifyUtils,
			'sendEmailVerification'
		).mockImplementation(() => {
			throw new Error();
		});

		setupTestClient({ getAppUser });

		const store = new Store();
		const now = Date.now();

		expect(store.get('emailVerificationSent')).toBeUndefined();

		await store.startEmailVerification();

		expect(
			store.get('emailVerificationRequested').getTime()
		).toBeGreaterThanOrEqual(now);
		expect(store.get('emailVerificationSent')).toBeUndefined();
		expect(store.get('error')).not.toBeUndefined();
	});

	test('submitToken with empty token', async () => {
		const store = new Store();

		expect(await store.submitToken(null, null)).toBeFalsy();
		expect(store.get('validToken')).toBeFalsy();

		expect(await store.submitToken(null, '')).toBeFalsy();
		expect(store.get('validToken')).toBeFalsy();
	});

	test('submitToken with null user', async () => {
		const store = new Store();

		expect(await store.submitToken(null, '123u3232')).toBeFalsy();
		expect(store.get('validToken')).toBeFalsy();
	});

	test('submitToken with valid inputs', async () => {
		jest.spyOn(EmailVerifyUtils, 'verifyEmailToken').mockImplementation(
			() => true
		);

		const store = new Store();

		expect(
			await store.submitToken({ name: 'test user' }, '123u3232')
		).toBeTruthy();

		expect(store.get('verifiedDate')).toBeTruthy();

		expect(store.get('validToken')).toBeTruthy();
		expect(store.get('needsVerification')).toBeFalsy();
	});

	test('cancelEmailVerification', () => {
		const store = new Store();
		store.cancelEmailVerification();
		expect(store.get('emailVerificationRequested')).toBeNull();
	});

	test('completeEmailVerification', () => {
		const baseline = Date.now();
		const store = new Store();
		store.completeEmailVerification();
		expect(store.get('completedDate').getTime()).toBeGreaterThanOrEqual(
			baseline
		);
	});

	test('snoozeVerification', () => {
		jest.spyOn(SessionStorage, 'setItem').mockImplementation((key, value) =>
			localStorageMock.setItem(key, value)
		);
		jest.spyOn(SessionStorage, 'getItem').mockImplementation(key =>
			localStorageMock.getItem(key)
		);

		const baseline = Date.now();
		const store = new Store();
		store.snoozeVerification();

		expect(
			store.get('verificationSnoozed').getTime()
		).toBeGreaterThanOrEqual(baseline);
		expect(store.get('emailVerificationRequested')).toBeNull();
		expect(
			parseFloat(SessionStorage.getItem('verificationSnoozed'))
		).toBeGreaterThanOrEqual(baseline);
	});

	test('load subscribes to incoming notifications', async () => {
		const subscribeToIncomingSpy = jest.spyOn(
			Socket,
			'subscribeToIncoming'
		);
		subscribeToIncomingSpy.mockImplementation(() => {});

		const store = new Store();
		await store.load();

		expect(subscribeToIncomingSpy).toHaveBeenCalled();
	});

	test('load calls resolveInbox, loadNextBatch, and updateUnread', async () => {
		const store = new Store();

		const resolveInboxSpy = jest.spyOn(store, 'resolveInbox');
		resolveInboxSpy.mockImplementation(() => {});

		const loadNextBatchSpy = jest.spyOn(store, 'loadNextBatch');
		loadNextBatchSpy.mockImplementation(() => {});

		const updateUnreadSpy = jest.spyOn(store, 'updateUnread');
		updateUnreadSpy.mockImplementation(() => {});

		await store.load();

		expect(resolveInboxSpy).toHaveBeenCalled();
		expect(loadNextBatchSpy).toHaveBeenCalled();
		expect(updateUnreadSpy).toHaveBeenCalled();
	});

	test('load sets needsVerification correctly (1)', async () => {
		let getAppUser = jest.fn().mockImplementation(() => {
			return { email: 'email', hasLink: () => true };
		});
		setupTestClient({ getAppUser });

		const store = new Store();
		jest.spyOn(store, 'resolveInbox').mockImplementation(() => {});
		jest.spyOn(store, 'loadNextBatch').mockImplementation(() => {});
		jest.spyOn(store, 'updateUnread').mockImplementation(() => {});

		await store.load();

		expect(store.get('needsVerification')).toBeTruthy();
		expect(store.get('verifiedDate')).toBeNull();
	});

	test('load sets needsVerification correctly (2)', async () => {
		let getAppUser = jest.fn().mockImplementation(() => {
			return { email: 'email', hasLink: () => false };
		});
		setupTestClient({ getAppUser });

		const store = new Store();
		jest.spyOn(store, 'resolveInbox').mockImplementation(() => {});
		jest.spyOn(store, 'loadNextBatch').mockImplementation(() => {});
		jest.spyOn(store, 'updateUnread').mockImplementation(() => {});

		await store.load();

		expect(store.get('needsVerification')).toBeFalsy();
		expect(store.get('verifiedDate')).toBeNull();
	});

	test('load hides email verification notice correctly (1)', async () => {
		let getAppUser = jest.fn().mockImplementation(() => {
			return { email: 'email', hasLink: () => true };
		});
		setupTestClient({ getAppUser });

		let store = new Store();
		jest.spyOn(store, 'resolveInbox').mockImplementation(() => {});
		jest.spyOn(store, 'loadNextBatch').mockImplementation(() => {});
		jest.spyOn(store, 'updateUnread').mockImplementation(() => {});

		jest.spyOn(SessionStorage, 'setItem').mockImplementation((key, value) =>
			localStorageMock.setItem(key, value)
		);
		jest.spyOn(SessionStorage, 'getItem').mockImplementation(key =>
			localStorageMock.getItem(key)
		);
		jest.spyOn(SessionStorage, 'clear').mockImplementation(() =>
			localStorageMock.clear()
		);

		SessionStorage.setItem('verificationSnoozed', Date.now());

		await store.load();

		expect(store.autoSnoozeTimer).toBeUndefined();
		expect(store.get('verificationSnoozed').getTime()).toBe(
			parseFloat(SessionStorage.getItem('verificationSnoozed'))
		);
	});

	test('load hides email verification notice correctly (2)', async () => {
		const getAppUser = jest.fn().mockImplementation(() => {
			return { email: 'email', hasLink: () => true };
		});
		setupTestClient({ getAppUser });

		const baseline = Date.now();
		const store = new Store();
		jest.spyOn(store, 'resolveInbox').mockImplementation(() => {});
		jest.spyOn(store, 'loadNextBatch').mockImplementation(() => {});
		jest.spyOn(store, 'updateUnread').mockImplementation(() => {});

		jest.spyOn(SessionStorage, 'setItem').mockImplementation((key, value) =>
			localStorageMock.setItem(key, value)
		);
		jest.spyOn(SessionStorage, 'getItem').mockImplementation(key =>
			localStorageMock.getItem(key)
		);
		jest.spyOn(SessionStorage, 'clear').mockImplementation(() =>
			localStorageMock.clear()
		);

		SessionStorage.clear();
		SessionStorage.setItem('verificationSnoozed', baseline - 360050);

		await store.load();

		expect(store.get('verificationSnoozed')).toBeNull();
		expect(
			baseline - store.get('VerificationNoticeStart').getTime()
		).toBeLessThanOrEqual(Date.now() - baseline);
		expect(
			baseline - store.get('VerificationNoticeExpiry').getTime()
		).toBeLessThanOrEqual(370000);
	});
});
