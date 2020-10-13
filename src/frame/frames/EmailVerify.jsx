import PropTypes from 'prop-types';
import React from 'react';

import styles from '../Style.css';

EmailVerifyFrame.propTypes = {
	onDismiss: PropTypes.func.isRequired,
	children: PropTypes.object.isRequired,
};

export default function EmailVerifyFrame ( { onDismiss: dismiss, children } ) {
	return (
		<div className={styles.notificationItemContainer} style={{backgroundColor: '#f7f2d6'}}>
			<div className={styles.notificationItem}>
				<div className={styles.wrap}>
					{children}
				</div>
				<div onClick={dismiss} className={styles.dismissButton}>&times;</div>
			</div>
		</div>
	);
}
