import React from 'react';

import BlogEntryPost from './types/BlogEntryPost';

export default {
	title: 'Notification',
	component: {},
};

// Ensure AppConfig variable is defined.
window.$AppConfig = window.$AppConfig || { server: '/dataserver2/' };

const BlogEntryPostTemplate = (args) => <BlogEntryPost {...args} />;

export const BlogEntryPostStory = BlogEntryPostTemplate.bind({});

BlogEntryPostStory.args = {
	item: {
		creator: 'quiz_tester',
		getLastModified: () => { return new Date(0); },
		title: 'Test title',
	},
};
