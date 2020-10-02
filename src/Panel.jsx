import { Loading } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import Store from './Store';
import { getComponent } from './types/index';

Panel.propTypes = {
	items: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
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

function Panel ( {items: itemsProp, loading: loadingProp} ) {
	const {
		[Store.Items]: items,
		[Store.Loading]: loading,
	} = Store.useMonitor([
		Store.Items,
		Store.Loading,
	]);

	const components = [];

	// Iterate over notification items in the store
	for (const item of items) {
		const ItemDelegate = getComponent(item);
		components.push(<ItemDelegate item={item} />);
	}
    
	return (
		<Loading.Placeholder loading={loading} fallback={(<Loading.Spinner />)}>
			<div>
				{components}
			</div>
		</Loading.Placeholder>
	);
}

export default Store.WrapCmp(Panel, {
	deriveBindingFromProps: (props) => ({
		items: props.items,
		loading: props.loading,
	})
});