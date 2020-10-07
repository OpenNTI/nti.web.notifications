import { Avatar, DateTime, DisplayName } from '@nti/web-commons';
import { LinkTo } from '@nti/web-routing';
import PropTypes from 'prop-types';
import React from 'react';

import styles from '../Style.css';

LinkedFrame.propTypes = {
	item: PropTypes.object.isRequired,
	username: PropTypes.string.isRequired,
	parentChildren: PropTypes.object.isRequired,
};

export default function LinkedFrame ( { item, username, parentChildren } ) {
	username = username ? username : item.creator || item.Creator;
	const eventTime = item.getLastModified() || item.getCreatedAt();
	// In case the item is of type change, get the subitem ID
	const subItemId = item.Item && item.Item.getID();
    
	return (
		<LinkTo.Object object={subItemId ? item.Item : item}>
			<div className={styles.notificationItem}>
				{username && <Avatar className={styles.avatar} entity={username} width="56" height="56" />}
				<div className={styles.wrap}>
					{username && <DisplayName className={styles.displayName} entity={username} />}
					{parentChildren}
					<br></br>
					<div className={styles.notificationItemTime}>
						<DateTime date={eventTime} relative />
					</div>
				</div>
			</div>
		</LinkTo.Object>
	);
}