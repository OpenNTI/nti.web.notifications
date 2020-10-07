import { Avatar, DateTime, DisplayName } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import styles from '../Style.css';

NonInteractiveFrame.propTypes = {
	item: PropTypes.object.isRequired,
	username: PropTypes.string.isRequired,
	parentChildren: PropTypes.object.isRequired,
};

export default function NonInteractiveFrame ( { item, username, parentChildren } ) {
	username = username ? username : item.creator || item.Creator;
	const eventTime = item.getLastModified() || item.getCreatedAt();
	return (
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
	);
}