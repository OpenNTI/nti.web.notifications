import React from 'react';

import { getComponent } from '../types';

export default {
	title: 'Unknown',
	component: {},
};

// Ensure AppConfig variable is defined.
window.$AppConfig = window.$AppConfig || { server: '/dataserver2/' };

const UnknownTemplate = (args) => {
	const item = {
		...args,
		creator: 'quiz_tester',
		getLastModified: () => { return new Date(0); },
	};
	return React.createElement(getComponent(item), { item });
};

export const UnkownTypeStory = UnknownTemplate.bind({});
UnkownTypeStory.args = {
	MimeType: 'Something.Something.UnknownType',
};