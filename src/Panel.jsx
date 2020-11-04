import { wait } from '@nti/lib-commons';
import { LinkTo } from '@nti/web-routing';
import { scoped } from '@nti/lib-locale';
import { Errors, Loading, Text } from '@nti/web-commons';
import React, { useState , useEffect } from 'react';
import PropTypes from 'prop-types';

import Store from './Store';
import { getComponent } from './types';
import ItemPlaceholder from './frames/Placeholder';
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

Panel.propTypes = {
	newItemsExist: PropTypes.func.isRequired,
	loadNewItems: PropTypes.func.isRequired,
	onPromptToggle: PropTypes.func.isRequired,
};

export default function Panel ( { newItemsExist, loadNewItems, onPromptToggle } ) {
	const {
		[Store.Items]: items,
		[Store.Loading]: loading,
		[Store.MoreItems]: moreItems,
		[Store.Error]: error,
	} = Store.useValue();

	const hasItems = items && items.length > 0;

	const [dismissedNotifications, setDismissedNotifications] = useState([
		null,
	]);
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
		const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
		if (bottom) {
			if (newItemsExist()) {
				setLoadingScroll(true);
			}
		}
	}

	const dismissClickCallBack = (ItemDelegate) => {
		setDismissedNotifications([...dismissedNotifications, ItemDelegate]);
	};

	const defaultHeight = 6 * 78;
	let notificationsContainerHeight = defaultHeight;
	if (window.innerHeight <= defaultHeight) {
		notificationsContainerHeight = window.innerHeight - 137;
	}

	return (
		<Loading.Placeholder loading={loading} fallback={(<Loading.Spinner />)}>
			{error ? (
				<Errors.Message error={error} />
			) : (
				<div className={styles.panelContainer} onScroll={handleScroll}>
					<div style={{ maxHeight: notificationsContainerHeight}} className={styles.notificationsContainer}>
						{hasItems ? (
							items.map((item, key) => {
								const ItemDelegate = getComponent(item);
								if (!dismissedNotifications.includes(ItemDelegate)) {
									return (
										<div key={key}>
											<ItemDelegate item={item} onDismiss={(Item) => dismissClickCallBack(Item)} togglePrompt={(toggle) => onPromptToggle(toggle)} />
										</div>
									);
								}
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

