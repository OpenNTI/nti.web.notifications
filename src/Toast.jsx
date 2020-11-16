import PropTypes from 'prop-types';
import React from 'react';
import { Toast } from '@nti/web-commons';
import cx from 'classnames';

import EmailVerifyToastContent from './types/EmailVerify/Toast';
import { register } from './types/Registry';
import styles from './Toast.css';


EmailVerifyToast.propTypes = {
	onDismiss: PropTypes.func.isRequired,
	startEmailVerification: PropTypes.func.isRequired,
};

register(EmailVerifyToast, 'application/vnd.nextthought.toasts.emailverify');

export default function EmailVerifyToast ( { onDismiss, startEmailVerification } ) {

	return (
		<Toast location={Toast.Locations.TopRight}>
			<EmailVerifyToastContent className={cx(styles.toastFrame)} onDismiss={onDismiss} startEmailVerification={startEmailVerification} />
		</Toast>
	);
}
