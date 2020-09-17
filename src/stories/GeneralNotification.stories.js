import React from 'react';

import { TypesList } from '../types';

export default {
	title: 'General',
	component: {},
	argTypes: {
		type: { 
			control: {
				type: 'select',
				options: TypesList.map(type => {
					return type.name;
				}),
			},
		},
	},
};

// Ensure AppConfig variable is defined.
window.$AppConfig = window.$AppConfig || { server: '/dataserver2/' };

const GeneralTemplate = ({ type, ...args}) => {
	const item = {
		getLastModified: () => { return new Date(0); },
		...args
	};
	return React.createElement(TypesList.find(_type => type === _type.name), {item});
};


export const GeneralStory = GeneralTemplate.bind({});

GeneralStory.args = {
	type: 'Badge',
	creator: 'Test user',
	title: 'Test Title',
};
