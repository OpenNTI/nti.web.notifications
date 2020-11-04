import { Timer, Text } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import NotificationItemFrame from '../../Frame';
import Store from '../../Store';

import styles from './Style.css';


// String localization
const translation = scoped('nti-notifications.notifications.types.EmailVerify', {
	message: 'Please take a moment to verify your email address.',
});

const Translate = Text.Translator(translation);

EmailVerifyToastContent.propTypes = {
	onDismiss: PropTypes.func.isRequired,
	className: PropTypes.string,
};

export default function EmailVerifyToastContent ({ onDismiss, className }) {
	const {
		emailVerificationSent: emailVerificationSent,
		startEmailVerification: startEmailVerification,
	} = Store.useValue();

	const [time, setTime] = useState(0);
	const timeout = 10;
	const ticks = Timer.useTicks(10);

	useEffect(() => {
		if (time < timeout && ticks > 0) {
			if (!emailVerificationSent) {
				setTime(time + 1);
			}
		}
		if (time === timeout && !emailVerificationSent) {
			onDismiss();
		}
	}, [ticks]);

	const clickCallback = () => {
		startEmailVerification();
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
				<div className={styles.timeoutBar} style={{ width: `${(time / timeout) * 360}px` }}></div>
			</div>
		</>
	);
}
