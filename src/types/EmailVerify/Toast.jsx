import { Timer, Text } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import NotificationItemFrame from '../../Frame';

import styles from './Style.css';

const translation = scoped('nti-notifications.notifications.types.EmailVerify', {
	message: 'Please take a moment to verify your email address.',
});
const Translate = Text.Translator(translation);
const TimeoutPeriod = 10000;
let dismissed = false;

EmailVerifyToastContent.propTypes = {
	className: PropTypes.string.isRequired,
	startEmailVerification: PropTypes.func.isRequired,
};

export default function EmailVerifyToastContent ({ className, startEmailVerification }) {
	const [show, setShow] = useState(!dismissed);

	Timer.useWait(() => setShow(false), TimeoutPeriod);

	const dismiss = () => {
		setShow(false);
		dismissed = true;
	};

	const clickCallback = () => {
		startEmailVerification();
		dismiss();
	};

	const handleDismissButton = (e) => {
		dismiss();
		e.stopPropagation();
	};

	return (
		<>
			{show && (
				<>
					<NotificationItemFrame emailVerify={true} onClick={clickCallback} className={className}>
						<div className={styles.dismissButton} onClick={handleDismissButton}>&times;</div>
						<div className={styles.emailVerifyContainer}>
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
