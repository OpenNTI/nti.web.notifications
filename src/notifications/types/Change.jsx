import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemRegistry from '../NotificationItemRegistry';

Change.propTypes = {
	item: PropTypes.object.isRequired,
};

export default function Change ({ item }) {
	/* Get component for the changed item: 
	I am not sure if this is the right way to implement this type
	because item.Item might not have title property 
	(such as the Grade item inside a Change type), which is 
	problematic since most of the other types use the item.title
	property to display the notification's title. I would appreciate
	any tips.
	*/ 
	return NotificationItemRegistry.getComponent(item.Item);
}
