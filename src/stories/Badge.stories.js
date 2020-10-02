import { Models } from '@nti/lib-interfaces';
import React from 'react';

import { Badge, getComponent } from '../types';

export default {
	title: 'Badge',
	component: Badge,
};


export const BadgeTemplate = (args) => {
	const item = {
		...args,
		creator: 'quiz_tester',
		getLastModified: () => { return new Date(0); },
	};
	return React.createElement(getComponent(item), { item });
};

BadgeTemplate.args = {
	MimeType: Models.profile.Badge.MimeTypes[1],
	name: 'Test Badge',
};
