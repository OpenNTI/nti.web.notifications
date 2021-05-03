/* eslint-env jest */

import { setupTestClient } from '@nti/web-client/test-utils';

import {
	sendEmailVerification,
	verifyEmailToken,
} from '../types/EmailVerify/utils';

describe('Test email verify utility methods', () => {
	test('sendEmailVerification calls user.hasLink and user.getLink', async () => {
		const post = () => Promise.resolve();

		setupTestClient({ post });

		const user = {
			hasLink: jest.fn().mockImplementation(() => true),
			getLink: jest.fn().mockImplementation(() => 'link'),
		};

		expect(await sendEmailVerification(user)).resolves;

		expect(user.hasLink).toHaveBeenCalled();

		expect(user.getLink).toHaveBeenCalled();
	});

	test('sendEmailVerification returns a rejected promise if user.hasLink returns false', async () => {
		const user = {
			hasLink: () => false,
		};

		await expect(() => sendEmailVerification(user)).rejects.toThrow();
	});

	test('verifyEmailToken calls user.hasLink, user.getLink, user.refresh and makes sure token is truthy', async () => {
		const post = async () => Promise.resolve();

		setupTestClient({ post });

		const user = {
			hasLink: jest.fn().mockImplementation(() => true),
			getLink: jest.fn().mockImplementation(() => 'link'),
			refresh: jest.fn().mockImplementation(() => {}),
		};

		expect(await verifyEmailToken(user, 'token')).toBeTruthy();

		expect(user.hasLink).toHaveBeenCalled();

		expect(user.getLink).toHaveBeenCalled();

		expect(user.refresh).toHaveBeenCalled();
	});

	test('verifyEmailToken returns a rejected promise if token is falsy or user.getLink returns false', async () => {
		let user = {
			hasLink: () => false,
		};

		await expect(verifyEmailToken(user, 'token')).rejects.toThrow();

		user.hasLink = () => true;

		await expect(() => verifyEmailToken(user, '')).rejects.toThrow();
	});
});
