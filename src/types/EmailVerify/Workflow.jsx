import React, { useState } from 'react';

import EmailVerifyToast from '../../Toast';
import Store from '../../Store';

import EmailVerify from './EmailVerify';

export default function EmailVerificationWorkflow () {
	const {
		emailVerificationSent,
	} = Store.useValue();

	const [showToast, setShowToast] = useState(true);

	return (
		<>
			{ showToast && <EmailVerifyToast onDismiss={() => setShowToast(false)} /> }
			{ emailVerificationSent && <EmailVerify /> }
		</>
	);
}
