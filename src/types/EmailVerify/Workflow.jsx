import React from 'react';

import EmailVerifyToast from '../../Toast';
import Store from '../../Store';

import EmailVerify from './EmailVerify';
import CongratsPrompt from './prompts/Congrats';

export default function EmailVerificationWorkflow () {
	const {
		emailVerificationRequested,
		stopEmailVerification,
		needsVerification,
		completedDate,
	} = Store.useValue();

	return (
		<>
			{ needsVerification && <EmailVerifyToast /> }
			{ emailVerificationRequested && <EmailVerify onDismiss={stopEmailVerification} /> }
			{ completedDate && completedDate <= Date.now() && <CongratsPrompt onDismiss={stopEmailVerification} /> }
		</>
	);
}
