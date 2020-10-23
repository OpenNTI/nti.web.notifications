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

export default function EmailVerifyToast ( { onDismiss } ) {

	return (
		// <Toast location={Toast.Locations.TopRight}>
		// 	<div>
		// 		<div className={styles.dismissButton} onClick={onDismiss}>&times;</div>
		// 		<EmailVerify className={styles.toastFrame} toast={true} />
		// 	</div>
		// </Toast>
		<Toast location={Toast.Locations.TopRight}>
			<EmailVerify className={styles.toastFrame} toast/>
		</Toast>
	);
}
