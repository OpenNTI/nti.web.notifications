import React from 'react';
import { Toast } from '@nti/web-commons';
import cx from 'classnames';

import Store from './Store';
import EmailVerifyToastContent from './types/EmailVerify/Toast';
import { register } from './types/Registry';
import styles from './Toast.css';

register(EmailVerifyToast, 'application/vnd.nextthought.toasts.emailverify');

export default function EmailVerifyToast () {
	const { startEmailVerification } = Store.useValue();

	return (
		<Toast location={Toast.Locations.TopRight}>
			<EmailVerifyToastContent className={cx(styles.toastFrame)} startEmailVerification={startEmailVerification} />
		</Toast>
	);
}
