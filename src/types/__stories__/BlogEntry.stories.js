import React from 'react';

import { Models } from '@nti/lib-interfaces';

import BlogEntry from '../BlogEntry';

export default {
	title: 'Blog Entry',
	component: {},
};

export const BlogEntryTemplate = args => {
	const item = {
		...args,
		creator: 'quiz_tester',
		getLastModified: () => {
			return new Date(0);
		},
	};
	return <BlogEntry item={item} />;
};

BlogEntryTemplate.args = {
	title: 'Test title',
	MimeType: Models.forums.BlogEntry.MimeType,
};
