import React from 'react';

import EmailVerifyToast from '../../Toast';
import Store from '../../Store';

import EmailVerify from './EmailVerify';
import CongratsPrompt from './prompts/Congrats';

export default function EmailVerificationWorkflow () {
	const {
		stopEmailVerification,
		completeEmailVerification,
		emailVerificationRequested,
		needsVerification,
		verifiedDate,
		completedDate,
	} = Store.useValue();

	return (
		<>
			{ needsVerification && <EmailVerifyToast /> }
			{ emailVerificationRequested && <EmailVerify onDismiss={stopEmailVerification} /> }
			{ !completedDate && verifiedDate && verifiedDate <= Date.now() && <CongratsPrompt onDismiss={completeEmailVerification} /> }
		</>
	);
}
