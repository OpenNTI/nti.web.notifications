import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import styles from '../Frame.css';

EmailVerifyFrame.propTypes = {
	children: PropTypes.any.isRequired,
	className: PropTypes.string,
	onClick: PropTypes.func,
};

export default function EmailVerifyFrame ( { children, className, onClick } ) {
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
