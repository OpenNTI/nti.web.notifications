import { Models } from '@nti/lib-interfaces';
import React from 'react';

import Panel from '../Panel';

export default {
	title: 'Panel',
	component: Panel,
};

// Ensure AppConfig variable is defined.
window.$AppConfig = window.$AppConfig || { server: '/dataserver2/' };

// TODO
export const PanelTemplate = () => {
	return (
		<Panel store={null}/>
	);
};