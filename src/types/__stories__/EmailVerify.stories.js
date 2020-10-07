// Storybook libraries are provided by cmp-scripts...
// TODO: Find a way to import them without lint warnings.
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import React from 'react';

import useMockServer from '../../__test__/utils/use-mock-server';
import { EmailVerify } from '../';

export default {
	title: 'Email Verify',
	component: EmailVerify,
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
	return <EmailVerify user={user} onDismiss={action('dismiss-notification')} />;
};
