import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemRegistry from './NotificationItemRegistry';
import Store from './Store';

export default Store.connect(Panel);

Panel.propTypes = {
	store: PropTypes.object.isRequired,
};

function Panel ( { store } ) {
	// Notification item components array that will be displayed
	const items = [];

	// Iterate over notification items in the store
	for (const item in store) {
		if (Object.prototype.hasOwnProperty.call(store, item)) {
			const ItemDelegate = NotificationItemRegistry.getComponent(item);
			items.push(<ItemDelegate item={item} />);
		}
	}
    
	return (
		<div>
			{items}
		</div>
	);
} 