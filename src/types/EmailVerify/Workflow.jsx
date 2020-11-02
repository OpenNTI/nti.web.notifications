import React, { useState } from 'react';

import EmailVerifyToast from '../../toast/Toast';
import Store from '../../Store';

import EmailVerify from './EmailVerify';

function EmailVerificationWorkflow () {
	const [showToast, setShowToast] = useState(true);
	return (
		<>
			{ showToast && <EmailVerifyToast onDismiss={() => setShowToast(false)}/> }
			<EmailVerify />
		</>
	);
}

export default Store.Compose(EmailVerificationWorkflow);
