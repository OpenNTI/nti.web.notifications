import React from 'react';

import Store from '../../Store';

import EmailVerifyToast from './EmailVerificationNotice';
import EmailVerifyDialog from './EmailVerifyDialog';
import CongratsPrompt from './prompts/Congrats';

export default function EmailVerificationWorkflow () {
	const {
		snoozeVerification,
		cancelEmailVerification,
		completeEmailVerification,
		emailVerificationRequested,
		needsVerification,
		verifiedDate,
		completedDate,
	} = Store.useValue();

	return (
		<>
			{ needsVerification && <EmailVerifyToast /> }
			{ emailVerificationRequested && needsVerification && <EmailVerifyDialog onDismiss={cancelEmailVerification} onSnooze={snoozeVerification} /> }
			{ !completedDate && verifiedDate && verifiedDate <= Date.now() && <CongratsPrompt onDismiss={completeEmailVerification} /> }
		</>
	);
}
