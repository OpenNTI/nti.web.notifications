import PropTypes from 'prop-types';
import React from 'react';
import { Toast } from '@nti/web-commons';

import EmailVerify from './types/EmailVerify/EmailVerify';
import { register } from './types/Registry';
import styles from './Toast.css';


EmailVerifyToast.propTypes = {
	onDismiss: PropTypes.func.isRequired,
};

register(EmailVerifyToast, 'application/vnd.nextthought.toasts.emailverify');

export default function EmailVerifyToast ( { onDismiss, onPromptToggle } ) {

	return (
		<Toast location={Toast.Locations.TopRight}>
			<EmailVerify className={styles.toastFrame} onDismiss={onDismiss} togglePrompt={onPromptToggle} toast/>
		</Toast>
	);
}
