import { Timer, Text } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../../Frame';

import styles from './Style.css';

const translation = scoped('nti-notifications.notifications.types.EmailVerify', {
	message: 'Please take a moment to verify your email address.',
});
const Translate = Text.Translator(translation);
const TimeoutPeriod = 10000;

EmailVerifyToastContent.propTypes = {
	onDismiss: PropTypes.func.isRequired,
	className: PropTypes.string.isRequired,
	startEmailVerification: PropTypes.func.isRequired,
};

export default function EmailVerifyToastContent ({ onDismiss, className, startEmailVerification }) {
	Timer.useWait(onDismiss, TimeoutPeriod);

	const clickCallback = () => {
		startEmailVerification();
		onDismiss();
	};

	return (
		<>
			<NotificationItemFrame emailVerify={true} onClick={clickCallback} dismissCallBack={() => onDismiss()} className={className}>
				<div className={styles.dismissButton} onClick={onDismiss}>&times;</div>
				<div className={styles.emailVerifyContainer}>
					<Translate localeKey="message" />
				</div>
			</NotificationItemFrame>
			<div className={styles.timeoutBarContainer}>
				<div className={styles.timeoutBar} ></div>
			</div>
		</>
	);
}
