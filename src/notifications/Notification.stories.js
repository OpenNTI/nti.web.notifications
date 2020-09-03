import React from 'react';

import BlogEntryPost from './types/BlogEntryPost';

export default {
	title: 'Notification',
	component: {},
};

const BlogEntryPostTemplate = (args) => <BlogEntryPost {...args} />;

export const BlogEntryPostStory = BlogEntryPostTemplate.bind({});

BlogEntryPostStory.args = {
	item: {
		username: 'quiz_tester',
		getLastModified: () => { return new Date(0); },
	},
};