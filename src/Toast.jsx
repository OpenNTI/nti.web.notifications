import PropTypes from 'prop-types';
import React from 'react';
import { Toast } from '@nti/web-commons';
import cx from 'classnames';

import { register } from '../types/Registry';
import EmailVerifyToastContent from '../types/EmailVerify/Toast';

import styles from './Style.css';


EmailVerifyToast.propTypes = {
	onDismiss: PropTypes.func.isRequired,
	onPromptToggle: PropTypes.func
};

register(EmailVerifyToast, 'application/vnd.nextthought.toasts.emailverify');

export default function EmailVerifyToast ( { onDismiss } ) {

	return (
		<Toast location={Toast.Locations.TopRight}>
			<EmailVerifyToastContent className={cx(styles.toastFrame)} onDismiss={onDismiss} />
		</Toast>
	);
}
