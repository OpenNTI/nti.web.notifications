import React from 'react';

import Bell from '../Bell';

export default {
	title: 'Bell',
	component: Bell,
};


export const BellTemplate = () => {
	return (
		<Bell count={3} isThemeDark={false} />
	);
};
