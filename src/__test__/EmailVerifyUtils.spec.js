/* eslint-env jest */

import {sendEmailVerification, verifyEmailToken} from '../types/EmailVerify/utils';

import useMockServer from './utils/use-mock-server';

describe('Test email verify utility methods', () => {
	test('sendEmailVerification calls user.hasLink and user.getLink', async () => {
		const post = () => Promise.resolve();

		useMockServer({post});

		const user = {
			hasLink: jest.fn().mockImplementation(() => true),
			getLink: jest.fn().mockImplementation(() => 'link'),
		};

		await sendEmailVerification(user);

		expect(user.hasLink).toHaveBeenCalled();

		expect(user.getLink).toHaveBeenCalled();
	});

	test('sendEmailVerification returns a rejected promise if user.hasLink returns false', async () => {
		const user = {
			hasLink: () => false,
		};

		await sendEmailVerification(user).then(() => {
			expect(1).toBeFalsy();
		},() => {
			expect(1).toBeTruthy();
		});
	});

	test('verifyEmailToken calls user.hasLink, user.getLink, user.refresh and makes sure token is truthy', async () => {
		const post = async () => Promise.resolve();

		useMockServer({post});

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
			hasLink: () => false
		};

		await verifyEmailToken(user, 'token').then(() => {
			expect(1).toBeFalsy();
		},() => {
			expect(1).toBeTruthy();
		});

		user = {
			hasLink: () => true
		};

		await verifyEmailToken(user, '').then(() => {
			expect(1).toBeFalsy();
		},() => {
			expect(1).toBeTruthy();
		});
	});
});
