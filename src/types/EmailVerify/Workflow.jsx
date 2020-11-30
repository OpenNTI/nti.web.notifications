import React from 'react';

import Store from '../../Store';

import EmailVerifyToast from './EmailVerificationNotice';
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
		verificationSnoozed,
	} = Store.useValue();

	return (
		<>
			{ needsVerification && !verificationSnoozed && <EmailVerifyToast /> }
			{ emailVerificationRequested && <EmailVerify onDismiss={stopEmailVerification} /> }
			{ !completedDate && verifiedDate && verifiedDate <= Date.now() && <CongratsPrompt onDismiss={completeEmailVerification} /> }
		</>
	);
}
