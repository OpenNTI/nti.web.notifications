import React from 'react';

import Bell from './Bell';

export default {
	title: 'Bell',
	component: Bell
};

const Template = (args) => <Bell {...args} />;

export const DefaultStory = Template.bind({});

DefaultStory.args = {
	badge: 2,
};