import { scoped } from '@nti/lib-locale';
import { Errors, Loading, Text } from '@nti/web-commons';
import React, { useState , useEffect } from 'react';

import Store from './Store';
import { getComponent } from './types/index';
import styles from './Panel.css';

// String localization
const translation = scoped('nti-notifications.notifications.Panel', {
	noNotifications: 'You don\'t have any notifications.',
	showAll: 'Show All',
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
		[Store.Error]: error,
	} = Store.useMonitor([
		Store.Items,
		Store.Loading,
		Store.Error,
	]);

	const hasItems = items && items.length > 0;
	const [dismissedNotifications, setDismissedNotifications] = useState([null]);
    
	return (
		<Loading.Placeholder loading={loading} fallback={(<Loading.Spinner />)}>
			{error ? (
				<Errors.Message error={error} />
			) : (
				<div className={styles.panelContainer}>
					<div className={styles.notificationsContainer}>
						{hasItems ? (
							items.map((item, key) => {
								const ItemDelegate = getComponent(item);
								if (!dismissedNotifications.includes(ItemDelegate)) {
									return (
										<div key={key}>
											<ItemDelegate item={item} onDismiss={() => setDismissedNotifications([...dismissedNotifications, ItemDelegate])} />
										</div>
									);
								}
							})
						) : (
							<div><Text.Base><Translate localeKey="noNotifications" /></Text.Base></div>
						)}
					</div>
					<div className={styles.showAll}><Translate localeKey="showAll" /></div>
				</div>
			)}
		</Loading.Placeholder>
	);
}

export default Store.WrapCmp(Panel);