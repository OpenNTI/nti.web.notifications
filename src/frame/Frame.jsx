import PropTypes from 'prop-types';
import React from 'react';

import styles from './Style.css';
import LinkedFrame from './frames/Linked';
import NonInteractiveFrame from './frames/NonInteractive';
import EmailVerifyFrame from './frames/EmailVerify';

NotificationItemFrame.propTypes = {
	item: PropTypes.object,
	username: PropTypes.string,
	emailVerify: PropTypes.bool,
	dismissCallBack: PropTypes.func,
};

/**
 * A React component that represents the outer frame of
 * a notification item. It takes in the notification item
 * in question as well as its type's specific children to
 * display them. This is because each notification item
 * is different from the rest and needs to display different
 * action strings and possibly children.
 * @export NotificationItemFrame
 * @param {Object} {props}
 * @return {React.Component} React Component
 */
export default function NotificationItemFrame ( { children, item, username, emailVerify, dismissCallBack, } ) {
	const isItemLinked = item && (item.Item || (item.Item && item.Item.getID()));
	let Frame;
	if (emailVerify) {
		return <EmailVerifyFrame children={children} dismissCallBack={dismissCallBack} />;
	} else {
		const FrameName = isItemLinked ? LinkedFrame : NonInteractiveFrame;
		Frame = <FrameName item={item} username={username} children={children} />;
	}
	return (
		<div className={[styles.notificationItemContainer, isItemLinked ? styles.linkedNotification : []].join(' ')}>
			{Frame}
		</div>
	);
}
