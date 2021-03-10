import React from 'react';

import { Models } from '@nti/lib-interfaces';

import Change from '../Change';

export default {
	title: 'Change',
	component: Change,
};

export const ChangeBadgeTemplate = args => {
	const item = {
		...args,
		creator: 'quiz_tester',
		getLastModified: () => {
			return new Date(0);
		},
		getItem: () => {
			return {
				MimeType: Models.profile.Badge.MimeTypes[1],
				name: 'Test Badge',
				creator: 'quiz_tester',
				getLastModified: () => {
					return new Date(0);
				},
			};
		},
	};
	return <Change item={item} />;
};

ChangeBadgeTemplate.args = {
	MimeType: Models.Change.MimeType,
	name: 'Test Badge',
};
