import {Models} from '@nti/lib-interfaces';
import React from 'react';

import { getComponent } from '../types';

export default {
	title: 'Blog Comment',
	component: {},
};

// Ensure AppConfig variable is defined.
window.$AppConfig = window.$AppConfig || { server: '/dataserver2/' };

export const BlogCommentTemplate = () => {
	const item = {
		creator: 'quiz_tester',
		getLastModified: () => { return new Date(0); },
		title: 'Test title',
		MimeType: Models.forums.Comment.MimeTypes[3],
	};
	return React.createElement(getComponent(item), { item });
};