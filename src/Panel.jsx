import { scoped } from '@nti/lib-locale';
import { Errors, Loading, Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './View.css';
import Store from './Store';
import { getComponent } from './types/index';

// String localization
const translation = scoped('nti-notifications.notifications.Panel', {
	noNotifications: 'You don\'t have any notifications.' 
});

const Translate = Text.Translator(translation);

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

function Panel () {
	const {
		[Store.Items]: items,
		[Store.Loading]: loading,
		[Store.Error]: error
	} = Store.useMonitor([
		Store.Items,
		Store.Loading,
		Store.Error
	]);

	const hasItems = items && items.length > 0;
    
	return (
		<Loading.Placeholder loading={loading} fallback={(<Loading.Spinner />)}>
			{error ? (
				<Errors.Message error={error} />
			) : (
				<div className={styles.notificationsList}>
					{hasItems ? (
						items.map((item, key) => {
							const ItemDelegate = getComponent(item);
							return (
								<div key={key}>
									<ItemDelegate item={item}/>
								</div>
							);
						})
					) : (
						<div><Text.Base><Translate localeKey="noNotifications"/></Text.Base></div>
					)}
				</div>
			)}
		</Loading.Placeholder>
	);
}

export default Store.WrapCmp(Panel);