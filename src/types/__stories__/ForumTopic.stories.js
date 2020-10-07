import {Models} from '@nti/lib-interfaces';
import React from 'react';

import { getComponent } from '../';

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
	return React.createElement(getComponent(item), { item });
};

ForumTopicTemplate.args = {
	title: 'Test title',
	MimeType: Models.forums.Topic.MimeTypes[1],
};
