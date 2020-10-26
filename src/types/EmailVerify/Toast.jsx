import { Text } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../../frame';

import styles from './Style.css';


// String localization
const translation = scoped('nti-notifications.notifications.types.EmailVerify', {
	message: 'Please take a moment to verify your email address.',
});

const Translate = Text.Translator(translation);

EmailVerifyToastContent.propTypes = {
	onDismiss: PropTypes.func.isRequired,
	onVerifyClick: PropTypes.func.isRequired,
	className: PropTypes.string
};

export default function EmailVerifyToastContent ({ onDismiss, onVerifyClick, className }) {

	// let ticks = Timer.useTicks(10000);

	// const [time, setTime] = useState(0);

	return (
		<div>
			<NotificationItemFrame emailVerify={true} onClick={onVerifyClick} dismissCallBack={() => onDismiss()} className={className}>
				<div className={styles.dismissButton} onClick={onDismiss}>&times;</div>
				<div className={styles.emailVerifyContainer}>
					<Translate localeKey="message" />
				</div>
			</NotificationItemFrame>
			{/* <div className={styles.timeoutBarContainer}>
				<div className={styles.timeoutBar} style={{ width: `${100 / 360}px` }}></div>
			</div> */}
		</div>
	);
}
