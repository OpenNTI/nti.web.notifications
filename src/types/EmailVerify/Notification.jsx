import { scoped } from '@nti/lib-locale';
import { Icons, Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../../frame';

import styles from './Style.css';


// String localization
const translation = scoped('nti-notifications.notifications.types.EmailVerify', {
	message: 'Please take a moment to verify your email address.',
	verifyNow: 'Verify Now',
	moreInfo: 'More Info',
});

const Translate = Text.Translator(translation);

EmailVerifyNotification.propTypes = {
	onDismiss: PropTypes.func.isRequired,
	onVerifyClick: PropTypes.func.isRequired,
	onInfoClick: PropTypes.func.isRequired,
};

export default function EmailVerifyNotification ( { onDismiss, onVerifyClick, onInfoClick } ) {

	return (
		<NotificationItemFrame emailVerify={true} dismissCallBack={() => onDismiss()}>
			<div className={styles.emailVerifyContainer}>
				<div className={styles.alert}>
					<Icons.Alert/>
				</div>
				<Translate localeKey="message" />
				<br />
				<div className={styles.actionLinksContainer}>
					<a className={styles.actionLink} onClick={onVerifyClick}><Translate localeKey="verifyNow"/></a>
					<span className={styles.linksSeperator}>|</span>
					<a className={styles.actionLink} onClick={onInfoClick}><Translate localeKey="moreInfo" /></a>
				</div>
			</div>
		</NotificationItemFrame>
	);
}
