import { Hooks, Timer, Text } from '@nti/web-commons';
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
const TimeoutPeriod = 10000;
const { usePersistentState } = Hooks;

EmailVerifyToastContent.propTypes = {
	className: PropTypes.string.isRequired,
	startEmailVerification: PropTypes.func.isRequired,
};

export default function EmailVerifyToastContent ({ className, startEmailVerification }) {
	const [dismissed, setDismissed] = usePersistentState('email-verify-dismissed', { expireIn: 3.6 * Math.pow(10, 6), initial: false });

	const dismiss = () => {
		setDismissed(true);
	};

	const clickCallback = () => {
		startEmailVerification();
		dismiss();
	};

	const handleDismissButton = (e) => {
		dismiss();
		e.stopPropagation();
	};

	!dismissed && Timer.useWait(dismiss, TimeoutPeriod);

	return (
		<>
			{!dismissed && (
				<>
					<NotificationItemFrame emailVerify={true} onClick={clickCallback} className={className}>
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
