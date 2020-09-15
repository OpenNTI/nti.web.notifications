import {Models} from '@nti/lib-interfaces';
import React from 'react';

import { getComponent } from '../types';

export default {
	title: 'Contact',
	component: {},
};

// Ensure AppConfig variable is defined.
window.$AppConfig = window.$AppConfig || { server: '/dataserver2/' };

export const ContactTemplate = () => {
	const item = {
		creator: 'quiz_tester',
		getLastModified: () => { return new Date(0); },
		title: 'Test title',
		MimeType: Models.entities.User.MimeType,
	};
	return React.createElement(getComponent(item), { item });
};