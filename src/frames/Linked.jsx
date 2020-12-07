import { Avatar, DateTime, DisplayName } from '@nti/web-commons';
import { LinkTo } from '@nti/web-routing';
import PropTypes from 'prop-types';
import React from 'react';

import styles from '../Frame.css';

LinkedFrame.propTypes = {
	item: PropTypes.object.isRequired,
	children: PropTypes.object.isRequired,
	attribution: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	icon: PropTypes.node,
};


export default function LinkedFrame ( { icon, item, attribution, children } ) {
	const attributionInput = attribution || item.creator || item.Creator;
	const attributionContent = typeof attributionInput !== 'string' ? attribution : (
		<DisplayName className={styles.displayName} entity={attributionInput} />
	);

	const selectedIcon = icon || typeof attributionInput !== 'string' ? null : (
		<Avatar className={styles.avatar} entity={attributionInput} width="42" height="42" />
	);

	const eventTime = item.getLastModified() || item.getCreatedAt();
	// In case the item is of type change, get the subitem ID
	const subItemId = item.Item && item.Item.getID();

	return (
		<LinkTo.Object object={subItemId ? item.Item : item}>
			<div className={styles.notificationItem}>
				<div>{selectedIcon}</div>
				<div className={styles.wrap}>
					{attributionContent}
					{children}
					<div className={styles.notificationItemTime}>
						<DateTime date={eventTime} relative />
					</div>
				</div>
			</div>
		</LinkTo.Object>
	);
}
