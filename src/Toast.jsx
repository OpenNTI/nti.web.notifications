import React from 'react';
import { Toast } from '@nti/web-commons';
import cx from 'classnames';

import Store from './Store';
import EmailVerifyToastContent from './types/EmailVerify/Toast';
import { register } from './types/Registry';

const styles = css`
.toast-frame {
	background-color: white;
	width: 360px;
	height: 80px;
	position: absolute;
	right: 95px;
	border-radius: 4px;
}

@media only screen and (max-width: 1195px) {
	.toast-frame {
		width: 360px;
		right: 15px;
	}
}

@media only screen and (max-width: 350px) {
	.toast-frame {
		width: 90vw;
		right: 15px;
	}
}
`;

register(EmailVerifyToast, 'application/vnd.nextthought.toasts.emailverify');

export default function EmailVerifyToast () {
	const {
		startEmailVerification,
		verificationSnoozed,
		snoozeVerification,
		timerStart,
	} = Store.useValue();

	return (
		<Toast location={Toast.Locations.TopRight}>
			<EmailVerifyToastContent
				className={cx(styles.toastFrame)}
				startEmailVerification={startEmailVerification}
				verificationSnoozed={verificationSnoozed}
				snoozeVerification={snoozeVerification}
				timerStart={timerStart}
			/>
		</Toast>
	);
}
