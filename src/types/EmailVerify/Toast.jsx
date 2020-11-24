import { Text } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import NotificationItemFrame from '../../Frame';

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
};

export default function EmailVerifyToastContent ({ className, startEmailVerification, verificationSnoozed, snoozeVerification }) {
	const handleToastClick = () => {
		startEmailVerification();
		snoozeVerification();
	};

	const handleDismissButton = (e) => {
		snoozeVerification();
		e.stopPropagation();
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
					<div className={styles.timeoutBarContainer}>
						<div className={styles.timeoutBar} ></div>
					</div>
				</>
			)}
		</>
	);
}
