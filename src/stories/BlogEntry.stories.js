import {Models} from '@nti/lib-interfaces';
import React from 'react';

import { getComponent } from '../types';

export default {
	title: 'Blog Entry',
	component: {},
};

// Ensure AppConfig variable is defined.
window.$AppConfig = window.$AppConfig || { server: '/dataserver2/' };

export const BlogEntryTemplate = (args) => {
	const item = {
		...args,
		creator: 'quiz_tester',
		getLastModified: () => { return new Date(0); },
		
	};
	return React.createElement(getComponent(item), { item });
};

BlogEntryTemplate.args = {
	title: 'Test title',
	MimeType: Models.forums.BlogEntry.MimeType,
};