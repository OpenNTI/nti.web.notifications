import PropTypes from 'prop-types';
import React from 'react';

import NotificationsStore from './Store';
import { getComponent } from './types/index';

export default NotificationsStore.connect(Panel);

Panel.propTypes = {
	store: PropTypes.object.isRequired,
};

/**
 * This panel connects to the Store class to get
 * the notification items. After that, the panel
 * iterates over these items and uses getComponent()
 * of the NotificationItemRegistry class to get the
 * appropriate React component for the given notification
 * item
 *
 * @param {NotificationsStore} { store } the notification store to which the panel
 * will connect and from which it will get the notification items
 * @return {React.Component} a list of notification items encapsulated in their
 * appropriate React components.
 */
function Panel ( { store } ) {
	// Notification item components array that will be displayed
	const items = [];

	// Iterate over notification items in the store
	for (const item of store) {
		const ItemDelegate = getComponent(item);
		items.push(<ItemDelegate item={item} />);
	}
    
	return (
		<div>
			{items}
		</div>
	);
} 