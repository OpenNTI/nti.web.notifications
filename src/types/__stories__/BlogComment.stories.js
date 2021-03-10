import React from 'react';

import { Models } from '@nti/lib-interfaces';

import BlogComment from '../BlogComment';

export default {
	title: 'Blog Comment',
	component: {},
};

export const BlogCommentTemplate = args => {
	const item = {
		...args,
		creator: 'quiz_tester',
		getLastModified: () => {
			return new Date(0);
		},
	};
	return <BlogComment item={item} />;
};

BlogCommentTemplate.args = {
	title: 'Test title',
	MimeType: Models.forums.Comment.MimeTypes[3],
};
