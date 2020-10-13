import {Models} from '@nti/lib-interfaces';
import React from 'react';

import ForumTopic from '../ForumTopic';



export default {
	title: 'Forum Topic',
	component: {},
};


export const ForumTopicTemplate = (args) => {
	const item = {
		...args,
		creator: 'quiz_tester',
		getLastModified: () => { return new Date(0); },
	};
	return <ForumTopic item={item} />;
};

ForumTopicTemplate.args = {
	title: 'Test title',
	MimeType: Models.forums.Topic.MimeTypes[1],
};
