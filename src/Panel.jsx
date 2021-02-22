import { LinkTo } from '@nti/web-routing';
import { scoped } from '@nti/lib-locale';
import { Errors, Loading, Text } from '@nti/web-commons';
import React from 'react';
import PropTypes from 'prop-types';

import Store from './Store';
import { getComponent } from './types';
import ItemPlaceholder from './frame/Placeholder';
import styles from './Panel.css';
import EmailVerifyNotification from './types/EmailVerify/Notification';

// String localization
const translation = scoped('nti-notifications.notifications.Panel', {
	noNotifications: "You don't have any notifications.",
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
	onDismiss: PropTypes.func,
};

export default function Panel({ onDismiss: close }) {
	const {
		items,
		loading,
		moreItems,
		error,
		needsVerification,
	} = Store.useValue();

	const hasItems = items?.length > 0;
	const lastIndex = items?.length - 1;

	return (
		<div className={styles.panelContainer} onClick={close}>
			<div className={styles.notificationsContainer}>
				<Loading.Placeholder
					loading={loading}
					fallback={<Loading.Spinner className={styles.loading} />}
				>
					{error ? (
						<Errors.Message error={error} />
					) : (
						<>
							{needsVerification && <EmailVerifyNotification />}

							{!hasItems && (
								<Text.Base
									as="div"
									className={styles.noNotifications}
								>
									<Translate localeKey="noNotifications" />
								</Text.Base>
							)}

							{items?.map((item, index) => {
								const ItemDelegate = getComponent(item);
								return (
									<React.Fragment key={index}>
										<ItemDelegate item={item} />

										{index === lastIndex && moreItems && (
											<ItemPlaceholder key={index} />
										)}
									</React.Fragment>
								);
							})}
						</>
					)}
				</Loading.Placeholder>
			</div>
			<div className={styles.showAllContainer}>
				<LinkTo.Path to="notifications">
					<Translate localeKey="showAll" />
				</LinkTo.Path>
			</div>
		</div>
	);
}
