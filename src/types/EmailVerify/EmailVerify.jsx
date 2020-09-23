import { scoped } from '@nti/lib-locale';
import { getAppUser } from '@nti/web-client';
import { Button, Prompt, Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import NotificationItemFrame from '../../NotificationItemFrame';
import { COMMON_PREFIX } from '../Registry';

import CongratsPropmt from './CongratsPrompt';
import InfoWindow from './InfoWindow';
import { sendEmailVerification, verifyEmailToken } from './utils';
import EmailVerifyWindow from './VerifyWindow';

// String localization
const translation = scoped('nti-notifications.notifications.types.EmailVerify', {
	message: 'Please take a moment to verify your email address.',
	verifyNow: 'Verify Now',
	moreInfo: 'More Info',
});

const Translate = Text.Translator(translation);

EmailVerify.propTypes = {
	item: PropTypes.object.isRequired,
};

EmailVerify.MimeTypes = [
	COMMON_PREFIX + 'emailverify',
];

export default function EmailVerify ( { item } ) {
	// Verify Dialog State
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
	const closeVerifyPrompt = () => {
		setVerifyPrompt(false);
	};
	
	// Info Dialog State
	const [infoPrompt, setInfoPrompt] = useState(false);
	const openInfoPrompt = () => {
		setInfoPrompt(true);
	};
	const closeInfoPrompt = () => {
		setInfoPrompt(false);
	};

	// Congrats Dialog State
	const[congratsPrompt, setCongratsPrompt] = useState(false);
	const openCongratsPrompt = () => {
		setCongratsPrompt(true);
	};
	const closeCongratsPrompt = () => {
		setCongratsPrompt(false);
	};

	// Function that closes all open prompts
	const closePrompt = () => {
		infoPrompt && closeInfoPrompt();
		verifyPrompt && closeVerifyPrompt();
		congratsPrompt && closeCongratsPrompt();
	};

	const [verificationComplete, setVerificationComplete] = useState(false);
	const completeVerification = () => {
		setVerifyPrompt(false);
		setVerificationComplete(true);
	};
	const onTokenSubmission = (token) => {
		if (token && token !== '') {
			return verifyEmailToken(token)
				.then((response) => {
					completeVerification();
					openCongratsPrompt();
				});
		}
	};
	if (!verificationComplete) {
		return (
			<div>
				<NotificationItemFrame item={item} emailVerify={true}>
					{/* Building string to show to the user */}
					<Translate localeKey="message" />
					<div>
						<Button onClick={verifyPrompt ? closeVerifyPrompt : openVerifyPrompt}><Translate localeKey="verifyNow"/></Button> |
						<Button onClick={infoPrompt ? closeInfoPrompt : openInfoPrompt}><Translate localeKey="moreInfo" /></Button>
					</div>
				</NotificationItemFrame>
				{(verifyPrompt || infoPrompt) && (
					<Prompt.Dialog onBeforeDismiss={() => closePrompt()}>
						{verifyPrompt === true && (
							<EmailVerifyWindow onTokenSubmission={onTokenSubmission} cancelCallBack={closePrompt}/>
						)}
						{infoPrompt && (
							<InfoWindow cancelCallBack={closePrompt}/>
						)}
						{congratsPrompt && (
							<CongratsPropmt dismissCallBack={closePrompt}/>
						)}
					</Prompt.Dialog>
				)}
			</div>
			
		);
	}
	return; 
}