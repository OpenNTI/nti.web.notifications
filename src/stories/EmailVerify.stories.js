import React from 'react';

import { EmailVerify, getComponent } from '../types';

export default {
	title: 'Email Verify',
	component: EmailVerify,
};

// Ensure AppConfig variable is defined.
window.$AppConfig = window.$AppConfig || { server: '/dataserver2/' };

export const EmailVerifyTemplate = () => {
	const item = {
		MimeType: 'application/vnd.nextthought.emailverify',
		getLastModified: () => { return new Date(0); },
	};
	return React.createElement(getComponent(item), { item });
};