import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../../frame';
import { register, COMMON_PREFIX } from '../Registry';
import Store from '../../Store';

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
	className: PropTypes.string
};

EmailVerifyNotification.MimeTypes = [
	COMMON_PREFIX + 'emailverify',
];

register(EmailVerifyNotification, 'emailVerify');

export default function EmailVerifyNotification ( { onDismiss, className } ) {
	const {
		// emailVerificationRequested: emailVerificationRequested,
		startEmailVerification: startEmailVerification,
	} = Store.useValue();

	return (
		<NotificationItemFrame emailVerify={true} dismissCallBack={() => onDismiss()} className={className}>
			<div className={styles.emailVerifyContainer}>
				<Translate localeKey="message" />
				<br/>
				<a className={styles.actionLink} onClick={() => startEmailVerification()}><Translate localeKey="verifyNow" /></a>
			</div>
		</NotificationItemFrame>
	);
}
