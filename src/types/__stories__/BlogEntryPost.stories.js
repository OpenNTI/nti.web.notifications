
import { Models } from '@nti/lib-interfaces';

import BlogEntryPost from '../BlogEntryPost';

export default {
	title: 'Blog Entry Post',
	component: {},
};

export const BlogEntryPostTemplate = args => {
	const item = {
		...args,
		creator: 'quiz_tester',
		getLastModified: () => {
			return new Date(0);
		},
	};
	return <BlogEntryPost item={item} />;
};

BlogEntryPostTemplate.args = {
	title: 'Test title',
	MimeType: Models.forums.Post.MimeTypes[5],
};
