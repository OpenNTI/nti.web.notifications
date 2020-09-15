import { Models } from '@nti/lib-interfaces';
import React from 'react';

import { Badge, getComponent } from '../types';

export default {
	title: 'Badge',
	component: Badge,
};

// Ensure AppConfig variable is defined.
window.$AppConfig = window.$AppConfig || { server: '/dataserver2/' };

export const BadgeTemplate = () => {
	const item = {
		creator: 'quiz_tester',
		getLastModified: () => { return new Date(0); },
		title: 'Test title',
		MimeType: Models.profile.Badge.MimeTypes[1],
	};
	let component = React.createElement(getComponent(item), { item: item });
	return component;
};