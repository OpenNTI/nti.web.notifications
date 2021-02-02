import { action } from '@storybook/addon-actions';
import React from 'react';

import useMockServer from '../../__test__/utils/use-mock-server';
import EmailVerifyNotification from '../EmailVerify/Notification';

export default {
	title: 'Email Verify',
	component: EmailVerifyNotification,
	argTypes: {
		userSave: { action: 'user-save' },
	}
};

export const EmailVerifyTemplate = () => {
	useMockServer({
		post: () => {
			return Promise.reject();
		},
	});
	let user = {
		hasLink: () => {return true;},
		getLink: () => {return 'string';},
		email: 'test@test.com',
		Links: ['RequestEmailVerification'],
		save: (obj) => {
			user = {...user, ...obj};
			action('user-save', ...user);
		},
	};
	return <EmailVerifyNotification onDismiss={action('dismiss-notification')} />;
};
