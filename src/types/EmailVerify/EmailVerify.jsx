import { scoped } from '@nti/lib-locale';
import { getAppUser } from '@nti/web-client';
import { Button, Prompt, Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import NotificationItemFrame from '../NotificationItemFrame';

import { COMMON_PREFIX } from './Registry';
import { sendEmailVerification, verifyEmailToken } from './utils';
import EmailVerifyWindow from './VerifyWindow';

// String localization
const translation = scoped('nti-notifications.notifications.types.EmailVerify', {
	message: 'Please take a moment to verify your email address.',
});

const Translate = Text.Translator(translation);

EmailVerify.propTypes = {
	item: PropTypes.object.isRequired,
};

EmailVerify.MimeTypes = [
	COMMON_PREFIX + 'emailverify',
];

	
// TODO: create a MoreInfoWindow component and put it under ./EmailVerify/MoreInfo 
export default function EmailVerify ( { item } ) {
	const [verifyPrompt, setVerifyPrompt] = useState(false);
	const openVerifyPrompt = () => {
		// Send email verification
		// Get current user
		let user = getAppUser();
		// Send the email with the token
		sendEmailVerification(user).then(() => {
			setVerifyPrompt(true);
		}, (error) => {
			throw new Error(error.toString());
		});
	};
	const [infoPrompt, setInfoPrompt] = useState(false);
	const [verificationComplete, setVerificationComplete] = useState(false);

	const completeVerification = () => {
		setVerifyPrompt(false);
		setVerificationComplete(true);
	};
	const onTokenSubmission = (token) => {
		if (token && token !== '') {
			return verifyEmailToken(token)
				.then((response) => {
					// TODO: show congrats
					completeVerification();
				});
		}
	};

	return (!verificationComplete && (
		<NotificationItemFrame item={item} emailVerify={true}>
			{/* Building string to show to the user */}
			<Translate localeKey="message"/>
			<div>
				<Button onClick={openVerifyPrompt}>Verify Now</Button> |
				<Button onClick={setInfoPrompt(true)}>More Info</Button>
			</div>
			{(verifyPrompt || infoPrompt) && (
				<Prompt.Dialog onBeforeDismiss={verifyPrompt ? setVerifyPrompt(false) : setInfoPrompt(false)}>
					{verifyPrompt && (
						// TODO: implement onTokenSubmission
						<EmailVerifyWindow onTokenSubmission={onTokenSubmission} />
					)}
					{infoPrompt && (
						// TODO: add more info prompt markup
						<div>Info</div>
					)}
				</Prompt.Dialog>
			)}
		</NotificationItemFrame>
	)
	);  
}