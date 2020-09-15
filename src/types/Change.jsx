import { Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import Registry from './Registry';

import {getComponent} from './index';
Change.propTypes = {
	item: PropTypes.object.isRequired,
};

export default function Change ({ item }) {
	/* Get component for the changed item: 
	TODO: I am not sure if this is the right way to implement this type
	because item.Item might not have title property 
	(such as the Grade item inside a Change type), which is 
	problematic since most of the other types use the item.title
	property to display the notification's title. I would appreciate
	any tips.
	*/ 
	return getComponent(item.Item);
}
