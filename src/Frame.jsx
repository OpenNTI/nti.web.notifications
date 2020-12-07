import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import styles from './Frame.css';
import LinkedFrame from './frames/Linked';
import EmailVerifyFrame from './frames/EmailVerify';

NotificationItemFrame.propTypes = {
	item: PropTypes.object,
	emailVerify: PropTypes.bool,
	className: PropTypes.string,
	onClick: PropTypes.func,
	gradeCreatedBySystem: PropTypes.bool,
	attribution: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	icon: PropTypes.node,
};


export default function NotificationItemFrame ( { children, item, attribution, icon, emailVerify, className, onClick } ) {
	let Frame;
	if (emailVerify) {
		return <EmailVerifyFrame className={cx(className)} children={children} onClick={onClick} />;
	}

	Frame = <LinkedFrame item={item} icon={icon} attribution={attribution} children={children} />;

	return (
		<div className={cx(styles.notificationItemContainer, styles.linkedNotification)}>
			{Frame}
		</div>
	);
}
