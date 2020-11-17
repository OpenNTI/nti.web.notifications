import React from 'react';

import EmailVerifyToast from '../../Toast';
import Store from '../../Store';

import EmailVerify from './EmailVerify';


export default function EmailVerificationWorkflow () {
	const {
		emailVerificationRequested,
		stopEmailVerification,
		needsVerification,
	} = Store.useValue();

	return (
		<>
			{ needsVerification && <EmailVerifyToast /> }
			{ emailVerificationRequested && <EmailVerify onDismiss={stopEmailVerification} /> }
		</>
	);
}
