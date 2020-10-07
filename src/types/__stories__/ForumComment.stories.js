import {Models} from '@nti/lib-interfaces';
import React from 'react';

import { getComponent } from '../';

export default {
	title: 'Forum Comment',
	component: {},
};


export const ForumCommentTemplate = (args) => {
	const item = {
		...args,
		creator: 'quiz_tester',
		getLastModified: () => { return new Date(0); },
	};
	return React.createElement(getComponent(item), { item });
};

ForumCommentTemplate.args = {
	MimeType: Models.forums.Comment.MimeTypes[1],
};
