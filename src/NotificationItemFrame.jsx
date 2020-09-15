import { Avatar, DateTime, DisplayName } from '@nti/web-commons';
import { LinkTo } from '@nti/web-routing';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './NotificationItemFrame.css';

NotificationItemFrame.propTypes = {
	item: PropTypes.object.isRequired,
};

/**
 * A React component that represents the outer frame of
 * a notification item. It takes in the notification item
 * in question as well as its type's specific children to
 * display them. This is because each notification item 
 * is different from the rest and needs to display different
 * action strings and possibly children.
 * @export NotificationItemFrame
 * @param {Object} {children, item}
 * @return {React.Component} React Component
 */
export default function NotificationItemFrame ( {children, item} ) {
	const username = item.creator || item.Creator;
	const eventTime = item.getLastModified() || item.getCreatedAt();

	// In case the item is of type change, get the subitem ID
	const subItemId = item.Item && item.Item.getID();
	
	return (
		<div className={styles.notificationItemContainer}>
			{/* Link to object: if subitemId exists, get the change type's subitem.
			Otherwise, get item */}
			<LinkTo.Object object={subItemId ? item.Item : item}>
				<div className={styles.notificationItem}>
					{username && <Avatar className={styles.avatar} entity={username} width="56" height="56" />}
					<div className={styles.wrap}>
						{username && <DisplayName className={styles.displayName} entity={username} />}
						{children}
						<br></br>
						<div className={styles.notificationItemTime}>
							<DateTime date={eventTime} relative />
						</div>
					</div>
				</div>
			</LinkTo.Object>
		</div>
	);
}
