import PropTypes from 'prop-types';
import React from 'react';

import { TypesList } from '../';

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
	creator: 'Test User',
	title: 'Test',
	name: 'Test Badge',
};

GeneralTemplate.propTypes = {
	type: PropTypes.any,
};