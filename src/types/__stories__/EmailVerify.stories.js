import { action } from '@storybook/addon-actions';
import React from 'react';

import { setupTestClient } from '@nti/web-client/test-utils';

import EmailVerifyNotification from '../EmailVerify/Notification';

export default {
	title: 'Email Verify',
	component: EmailVerifyNotification,
	argTypes: {
		userSave: { action: 'user-save' },
	},
};

export const EmailVerifyTemplate = () => {
	setupTestClient({
		post: () => {
			return Promise.reject();
		},
	});
	let user = {
		hasLink: () => {
			return true;
		},
		getLink: () => {
			return 'string';
		},
		email: 'test@test.com',
		Links: ['RequestEmailVerification'],
		save: obj => {
			user = { ...user, ...obj };
			action('user-save', ...user);
		},
	};
	return (
		<EmailVerifyNotification onDismiss={action('dismiss-notification')} />
	);
};
