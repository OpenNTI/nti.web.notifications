import { Text } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import NotificationItemFrame from '../../Frame';

import TimeoutProgress from './TimeoutProgress';
import styles from './Style.css';


const translation = scoped('nti-notifications.notifications.types.EmailVerify', {
	message: 'Please take a moment to verify your email address.',
});
const Translate = Text.Translator(translation);

EmailVerifyToastContent.propTypes = {
	className: PropTypes.string.isRequired,
	startEmailVerification: PropTypes.func.isRequired,
	verificationSnoozed: PropTypes.any,
	snoozeVerification: PropTypes.func,
	timerStart: PropTypes.any,
};

export default function EmailVerifyToastContent ({ className, startEmailVerification, verificationSnoozed, snoozeVerification, timerStart }) {
	const handleToastClick = () => {
		startEmailVerification();
		snoozeVerification();
	};

	const handleDismissButton = (e) => {
		snoozeVerification();
		e.stopPropagation();
	};

	const progress = () => {
		return (Date.now() - Date.parse(timerStart)) / 10000;
	};

	return (
		<>
			{!verificationSnoozed && (
				<>
					<NotificationItemFrame emailVerify={true} onClick={handleToastClick} className={className}>
						<div className={styles.dismissButton} onClick={handleDismissButton}>&times;</div>
						<div className={cx(styles.emailVerifyContainer, styles.emailVerifyToastText)}>
							<Translate localeKey="message" />
						</div>
					</NotificationItemFrame>
					<TimeoutProgress progress={progress} />
				</>
			)}
		</>
	);
}
