import { wait } from '@nti/lib-commons';
import { LinkTo } from '@nti/web-routing';
import { scoped } from '@nti/lib-locale';
import { Errors, Loading, Text } from '@nti/web-commons';
import React, { useState , useEffect } from 'react';
import PropTypes from 'prop-types';

import Store from './Store';
import { getComponent } from './types';
import ItemPlaceholder from './frame/Placeholder';
import styles from './Panel.css';
import EmailVerifyNotification from './types/EmailVerify/Notification';

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

Panel.propTypes = {
	newItemsExist: PropTypes.func.isRequired,
	loadNewItems: PropTypes.func.isRequired,
	onDismiss: PropTypes.func,
};

export default function Panel ( { newItemsExist, loadNewItems, onDismiss: close } ) {
	const {
		items,
		loading,
		moreItems,
		error,
		needsVerification,
	} = Store.useValue();

	const hasItems = items && items.length > 0;

	const [loadingScroll, setLoadingScroll] = useState(false);

	useEffect(() => {
		const handleLoadingScroll =  async () => {
			await wait(500);
			loadNewItems();
		};
		if (loadingScroll) {
			handleLoadingScroll();
			setLoadingScroll(false);
		}
	}, [loadingScroll]);

	function handleScroll (e) {
		e.stopPropagation();
		const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
		if (bottom) {
			// User scrolled down to the bottom
			// Check if new items exist
			if (newItemsExist()) {
				setLoadingScroll(true);
			}
		}
	}


	return (
		<Loading.Placeholder loading={loading} fallback={(<Loading.Spinner />)}>
			{error ? (
				<Errors.Message error={error} />
			) : (
				<div className={styles.panelContainer} onScroll={handleScroll} onClick={close}>
					<div className={styles.notificationsContainer}>
						{needsVerification && (
							<div>
								<EmailVerifyNotification />
							</div>
						)}
						{hasItems ? (
							items.map((item, key) => {
								const ItemDelegate = getComponent(item);
								return (
									<div key={key}>
										<ItemDelegate item={item} />
									</div>
								);
							})
						) : (
							<div className={styles.noNotifications}><Text.Base><Translate localeKey="noNotifications" /></Text.Base></div>
						)}
						{moreItems && (
							<div className={styles.emptyItem}>
								<ItemPlaceholder />
							</div>
						)}
					</div>
					<div className={styles.showAllContainer}>
						<LinkTo.Path to="notifications">
							<Translate localeKey="showAll" />
						</LinkTo.Path>
					</div>
				</div>
			)}
		</Loading.Placeholder>
	);
}
