import PropTypes from 'prop-types';
import React from 'react';

import styles from '../Style.css';

EmailVerifyFrame.propTypes = {
	onDismiss: PropTypes.func.isRequired,
	children: PropTypes.object.isRequired,
	className: PropTypes.string,
	onClick: PropTypes.func,
};

export default function EmailVerifyFrame ( { onDismiss: dismiss, children, className, onClick } ) {
	return (
		<div className={[styles.emailVerifyFrame, className].join(' ')} onClick={onClick}>
			<div className={styles.notificationItem}>
				<div className={styles.emailVerifyCircle}>@</div>
				<div className={styles.wrap}>
					{children}
				</div>
			</div>
		</div>
	);
}
