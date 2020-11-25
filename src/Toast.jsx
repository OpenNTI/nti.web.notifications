import React from 'react';
import { scoped } from '@nti/lib-locale';
import { Toast } from '@nti/web-commons';
import cx from 'classnames';

import NotificationItemFrame from './Frame';
import Store from './Store';
import styles from './Toast.css';

const translation = scoped('nti-notifications.notifications.types.EmailVerify.toast', {
	message: 'Please take a moment to verify your email address.',
});
const Translate = Text.Translator(translation);

export default function EmailVerifyToast () {
	const {
		startEmailVerification,
		verificationSnoozed,
		snoozeVerification,
	} = Store.useValue();

	const handleToastClick = () => {
		startEmailVerification();
		snoozeVerification();
	};

	const handleDismiss = (e) => {
		snoozeVerification();
		e.stopPropagation();
	};

	return (
		<Toast location={Toast.Locations.TopRight}>
			<>
				{!verificationSnoozed && (
					<>
						<NotificationItemFrame emailVerify={true} onClick={handleToastClick} className={cx(styles.toastFrame)}>
							<div className={styles.dismissButton} onClick={handleDismiss}>&times;</div>
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
		</Toast>
	);
}
