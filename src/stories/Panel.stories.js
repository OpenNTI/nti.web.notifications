import { Models } from '@nti/lib-interfaces';
import React from 'react';

import useMockServer from '../../test_utils/use-mock-server';
import Panel from '../Panel';

export default {
	title: 'Panel',
	component: Panel,
};


export const PanelTemplate = () => {
	useMockServer({
		getPageInfo: () => {
			return {
				getLink: () => {
					return 'notification-store-link';
				},
			};
		},
		getBatch: () => {
			return [{
				creator: 'quiz_tester',
				getLastModified: () => { return new Date(0); },
				MimeType: Models.profile.Badge.MimeTypes[1],
				name: 'Test Badge',
			}];
		},
		getAppUser: () => {
			return {
				email: 'test@test.com',
				isEmailVerified: () => {
					return false;
				}
			};
		},
	});
	return (
		<Panel />
	);
};
