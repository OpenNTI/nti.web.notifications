import { Models } from '@nti/lib-interfaces';
import React from 'react';

import { Change, getComponent } from '../';

export default {
	title: 'Change',
	component: Change,
};


export const ChangeBadgeTemplate = (args) => {
	const item = {
		...args,
		creator: 'quiz_tester',
		getLastModified: () => { return new Date(0); },
		getItem: () => {
			return {
				MimeType: Models.profile.Badge.MimeTypes[1],
				name: 'Test Badge',
				creator: 'quiz_tester',
				getLastModified: () => { return new Date(0); },
			};
		}
	};
	return React.createElement(getComponent(item), { item });
};

ChangeBadgeTemplate.args = {
	MimeType: Models.Change.MimeType,
	name: 'Test Badge',
};
