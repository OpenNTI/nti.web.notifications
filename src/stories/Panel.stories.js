import { Models } from '@nti/lib-interfaces';
import React from 'react';

import useMockServer from '../../test_utils/use-mock-server';
import Bell from '../bell/Bell';

export default {
	title: 'Bell',
	component: Bell,
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
			}, {
				creator: 'quiz_tester',
				getLastModified: () => { return new Date(0); },
				MimeType: Models.forums.Post.MimeTypes[5],
				name: 'Test Badge',
			}, {
				creator: 'quiz_tester',
				getLastModified: () => { return new Date(0); },
				MimeType: Models.entities.User.MimeType,
				name: 'Test Badge',
			}, {
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
					return true;
				}
			};
		},
		post: () => {
			return Promise.reject();
		},
	});

	return (
		<Bell count={3} />
	);
};
