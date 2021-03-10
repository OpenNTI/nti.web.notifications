import React from 'react';

import { Models } from '@nti/lib-interfaces';

import ForumComment from '../ForumComment';

export default {
	title: 'Forum Comment',
	component: {},
};

export const ForumCommentTemplate = args => {
	const item = {
		...args,
		creator: 'quiz_tester',
		getLastModified: () => {
			return new Date(0);
		},
	};
	return <ForumComment item={item} />;
};

ForumCommentTemplate.args = {
	MimeType: Models.forums.Comment.MimeTypes[1],
};
