import { Avatar, DateTime, DisplayName } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import styles from '../Style.css';

NonInteractiveFrame.propTypes = {
	item: PropTypes.object.isRequired,
	username: PropTypes.string.isRequired,
	children: PropTypes.object.isRequired,
};

export default function NonInteractiveFrame ( { item, username, children } ) {
	username = username ? username : item.creator || item.Creator;
	const eventTime = item.getLastModified() || item.getCreatedAt();
	return (
		<div className={styles.notificationItem}>
			{username && <Avatar className={styles.avatar} entity={username} width="42" height="42" />}
			<div className={styles.wrap}>
				{username && <DisplayName className={styles.displayName} entity={username} />}
				{children}
				<br></br>
				<div className={styles.notificationItemTime}>
					<DateTime date={eventTime} relative />
				</div>
			</div>
		</div>
	);
}
