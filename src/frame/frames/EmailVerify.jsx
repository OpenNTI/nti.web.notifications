import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import styles from '../Style.css';

EmailVerifyFrame.propTypes = {
	onDismiss: PropTypes.func.isRequired,
	children: PropTypes.object.isRequired,
	className: PropTypes.string,
	onClick: PropTypes.func,
};

export default function EmailVerifyFrame ( { onDismiss: dismiss, children, className, onClick } ) {
	return (
		<div className={cx(styles.emailVerifyFrame, className)} onClick={onClick}>
			<div className={cx(styles.notificationItem)}>
				<div className={cx(styles.emailVerifyCircle)}>@</div>
				<div className={cx(styles.wrap)}>
					{children}
				</div>
			</div>
		</div>
	);
}
