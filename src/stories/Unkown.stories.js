import React from 'react';

import { getComponent } from '../types';

export default {
	title: 'Unknown',
	component: {},
};

// Ensure AppConfig variable is defined.
window.$AppConfig = window.$AppConfig || { server: '/dataserver2/' };

export const UnknownTemplate = () => {
	const item = {
		creator: 'quiz_tester',
		getLastModified: () => { return new Date(0); },
		title: 'Test title',
		MimeType: '.Type',
	};
	return React.createElement(getComponent(item), { item });
};