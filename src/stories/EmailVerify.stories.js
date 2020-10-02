import { action } from '@storybook/addon-actions';
import React from 'react';

import useMockServer from '../../test_utils/use-mock-server';
import { EmailVerify } from '../types';

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
	return <EmailVerify user={user} dismissCallBack={action('dismiss-notification')} />;
};