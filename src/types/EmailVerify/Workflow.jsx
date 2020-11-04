import React, { useState } from 'react';

import EmailVerifyToast from '../../Toast';
import Store from '../../Store';

import EmailVerify from './EmailVerify';

function EmailVerificationWorkflow () {
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

export default Store.WrapCmp(EmailVerificationWorkflow);
