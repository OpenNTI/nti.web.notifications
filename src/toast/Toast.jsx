import PropTypes from 'prop-types';
import React from 'react';
import { Toast } from '@nti/web-commons';
import cx from 'classnames';

import EmailVerify from '../types/EmailVerify/EmailVerify';
import { register } from '../types/Registry';

import styles from './Style.css';


EmailVerifyToast.propTypes = {
	onDismiss: PropTypes.func.isRequired,
	onPromptToggle: PropTypes.func
};

register(EmailVerifyToast, 'application/vnd.nextthought.toasts.emailverify');

export default function EmailVerifyToast ( { onDismiss, onPromptToggle } ) {

	return (
		<Toast location={Toast.Locations.TopRight}>
			<EmailVerify className={cx(styles.toastFrame)} onDismiss={onDismiss} togglePrompt={onPromptToggle} toast/>
		</Toast>
	);
}
