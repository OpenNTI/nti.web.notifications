import React from 'react';

import useMockServer from '../../test_utils/use-mock-server';
import Panel from '../Panel';
import { Badge } from '../types';
export default {
	title: 'Panel',
	component: Panel,
};

// Ensure AppConfig variable is defined.
window.$AppConfig = window.$AppConfig || { server: '/dataserver2/' };

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
			return [<Badge key={1}>HI!</Badge>, ];
		}
	});
	return (
		<Panel />
	);
};