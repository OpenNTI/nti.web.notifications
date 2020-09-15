import React from 'react';

import Bell from '../bell/Bell';

export default {
	title: 'Bell',
	component: Bell
};

const Template = (args) => <Bell {...args} />;

export const DefaultStory = Template.bind({});

DefaultStory.args = {
	count: 2,
};