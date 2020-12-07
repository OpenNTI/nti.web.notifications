import { Avatar, DateTime, DisplayName } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import styles from '../Frame.css';

NonInteractiveFrame.propTypes = {
	item: PropTypes.object.isRequired,
	attribution: PropTypes.string.isRequired,
	children: PropTypes.object.isRequired,
};

export default function NonInteractiveFrame ( { item, attribution, children } ) {
	attribution = attribution ? attribution : item.creator || item.Creator;
	const eventTime = item.getLastModified() || item.getCreatedAt();
	return (
		<div className={styles.notificationItem}>
			{attribution && <div><Avatar className={styles.avatar} entity={attribution} width="42" height="42" /></div>}
			<div className={styles.wrap}>
				{attribution && <DisplayName className={styles.displayName} entity={attribution} />}
				{children}
				<br></br>
				<div className={styles.notificationItemTime}>
					<DateTime date={eventTime} relative />
				</div>
			</div>
		</div>
	);
}
