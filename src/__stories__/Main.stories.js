import { Models } from '@nti/lib-interfaces';
import React from 'react';

import useMockServer from '../__test__/utils/use-mock-server';
import Notifications from '../View';
import {emitIncoming} from '../Socket';

export default {
	title: 'NotificationsIcon',
	component: Notifications,
};

function getRandomNotable () {
	const mimeTypes = [Models.profile.Badge.MimeTypes[1], Models.forums.Post.MimeTypes[5], Models.entities.User.MimeType, Models.forums.Topic.MimeTypes[1]];
	return {
		creator: 'test',
		getLastModified: () => { return Date.now(); },
		MimeType: mimeTypes[Math.round((mimeTypes.length - 1) * Math.random())],
		name: 'Test',
	};
}

export const DefaultTemplate = () => {
	useMockServer({
		get: (url) => {
			if (url.includes('/lastViewed')) {
				return Date.now() * 1000;
			}
		},
		getPageInfo: () => {
			return {
				getLink: () => {
					return 'notification-store-link';
				},
			};
		},
		getBatch: (url, config) => {
			const items = [{
				creator: 'quiz_tester',
				getLastModified: () => { return new Date(0); },
				MimeType: Models.profile.Badge.MimeTypes[1],
				name: 'Test',
			}, {
				creator: 'quiz_tester',
				getLastModified: () => { return new Date(0); },
				MimeType: Models.forums.Post.MimeTypes[5],
				name: 'Test',
			}, {
				creator: 'quiz_tester',
				getLastModified: () => { return new Date(0); },
				MimeType: 'bogus-item-force-unknown',
				name: 'Test',
			}, {
				creator: 'who?',
				MimeType: Models.entities.User.MimeType,
				name: 'Phony',
			}, {
				creator: 'quiz_tester',
				getLastModified: () => { return new Date(0); },
				MimeType: Models.profile.Badge.MimeTypes[1],
				name: 'Test',
			}, {
				creator: 'quiz_tester',
				getLastModified: () => { return new Date(0); },
				MimeType: Models.forums.Post.MimeTypes[5],
				name: 'Test',
			}, {
				creator: 'quiz_tester',
				getLastModified: () => { return new Date(0); },
				MimeType: Models.entities.User.MimeType,
				name: 'Test',
			}];
			const start = config.batchStart;
			let end = start + config.batchSize;
			if (end >= items.length) {
				end = items.length;
			}
			let slicedItems = items.slice(start, end);
			return {
				Items: slicedItems,
				hasLink: () => {
					return true;
				},
				putToLink: () => {
					return true;
				},
				ItemCount: slicedItems.length,
				TotalItemCount: items.length,
			};
		},
		getAppUser: () => {
			return {
				email: 'test@test.com',
				isEmailVerified: () => {
					return false;
				},
				getLink: () => {
					return 'link';
				},
				hasLink: () => {
					return true;
				}
			};
		},
		post: () => {
			return Promise.reject();
		},
	});

	return (
		<>
			<div style={{position: 'absolute', right: 10}}>
				<Notifications />
			</div>

			<button onClick={() => emitIncoming(getRandomNotable())}>Push Notification</button>
		</>
	);
};
