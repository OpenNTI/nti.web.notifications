import {Models} from '@nti/lib-interfaces';
import React from 'react';

import { getComponent } from '../types';

export default {
	title: 'Blog Entry Post',
	component: {},
};

// Ensure AppConfig variable is defined.
window.$AppConfig = window.$AppConfig || { server: '/dataserver2/' };

export const BlogEntryPostTemplate = (args) => {
	const item = {
		...args,
		creator: 'quiz_tester',
		getLastModified: () => { return new Date(0); },
	};
	return React.createElement(getComponent(item), { item });
};

BlogEntryPostTemplate.args = {
	title: 'Test title',
	MimeType: Models.forums.Post.MimeTypes[5],
};