import { scoped } from '@nti/lib-locale';
import { getAppUser, getService } from '@nti/web-client';
import { Button, Prompt, Text, TextInput, wait } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import NotificationItemFrame from '../NotificationItemFrame';

import { COMMON_PREFIX } from './Registry';

// String localization
const translation = scoped('nti-notifications.notifications.types.EmailVerify', {
	message: 'Please take a moment to verify your email address.',
});

const Translate = Text.Translator(translation);

const sendEmailVerification = async (user) => {
	if (!user.hasLink('RequestEmailVerification')) {
		return Promise.reject();
	}

	const reqLink = user.getLink('RequestEmailVerification');
	return await getService().post(reqLink)
		.then(() => {
			return Promise.resolve();
		});
};

EmailVerify.propTypes = {
	item: PropTypes.object.isRequired,
};

EmailVerify.MimeTypes = [
	COMMON_PREFIX + 'emailverify',
];

EmailVerifyWindow.propTypes = {
	user: PropTypes.object.isRequired,
	onTokenSubmission: PropTypes.func.isRequired,
};

const SENDING_STATE = 'SENDING';
const NULL_STATE = 'NULL';
const SENT_STATE = 'SENT';

// TODO: put this in seperate file under ./EmailVerify/Window
function EmailVerifyWindow ( { user, onTokenSubmission } ) {
	const [sentAnotherVerifyEmail, setSentAnotherVerifyEmail] = useState(false);
	const [sendingEmail, setSendingEmail] = useState(NULL_STATE);
	const [displayChangeEmailWindow, setDisplayChangeEmailWindow] = useState(false);
	const [emailState, setEmailState] = useState(user.email);
	const [emailChanged, setEmailChanged] = useState(false);
	const [tokenState, setTokenState] = useState('');

	const sendAnotherEmail = () => {
		setSendingEmail(SENDING_STATE);
		wait(1000)
			.then(sendEmailVerification(user))
			.then(() => {
				setSendingEmail(SENT_STATE);
				setSentAnotherVerifyEmail(true);

				wait(1000)
					.then(() => {
						setSendingEmail(NULL_STATE);
					});
			});
	};

	const changeEmail = () => {
		const oldEmail = user.email;
		user.email = emailState;
		return new Promise((fullfil, reject) => {
			user.save({
				success: (response) => {
					let text = response.responseText;
					// TODO: find parsing util function for React
					let newUser = ParseUtils.parseItems(text)[0];
					user.Links = newUser.Links;
					fullfil(true);
				},
				failure: (response) => {
					user.email = oldEmail;
					reject(false);
				},
			});
		});
	};

	const onEmailChangeSubmit = (e) => {
		if (emailState === user.email) {
			return;
		}
		changeEmail()
			.then(() => {
				setEmailChanged(true);
				wait(800)
					.then(() => {
						sendEmailVerification(user);
						setDisplayChangeEmailWindow(false);
					});
			});
		e.preventDefault();
	};

	if (displayChangeEmailWindow === false) {
		return (
			<div>
				<Text.Title className="title">We sent a{sentAnotherVerifyEmail === true && 'nother'} verification email to:</Text.Title>
				<div className="email"> {user.email}</div>
				{sentAnotherVerifyEmail === true &&
					(
						<div className="sub">
							It may take several minutes for the email to reach your inbox. Please wait before requesting another.
						</div>
					)
				}
				<div>
					{sendingEmail === SENDING_STATE &&
						(
							<span>Sending...</span>
						)}
					{sendingEmail === NULL_STATE &&
						(
							<a onClick={sendAnotherEmail()}>Send another email</a>
						)}
					{sendingEmail === SENT_STATE &&
						(
							<span>Sent!</span>
						)} | <a onClick={setDisplayChangeEmailWindow(true)}>Change email address</a>
				</div>
				<div className="input-box">
					<TextInput className="token-field" placeholder="Enter your verification token" onChange={(e) => setTokenState(e.target.value)} />
				</div>
				<div>
					{/* TODO: implement cancel */}
					<Button>Cancel</Button>
					<Button onClick={() => onTokenSubmission(tokenState)}>Submit</Button>
				</div>
			</div>
		);
	}
	else {
		return (
			<div>
				<div className="button verify-email link" onClick={setDisplayChangeEmailWindow(false)}>&lt; Back to Email Verification</div>
				<Text.Title className="title">Update Email Address</Text.Title>
				<div className="input-box">
					<TextInput value={emailState} onChange={(e) => setEmailState(e.target.value)} />
				</div>
				{emailChanged && (<Text.Small className="message success">Your email has been updated.</Text.Small>)}
				<div>
					{/* TODO: implement cancel */}
					<Button>Cancel</Button>
					<Button onClick={onEmailChangeSubmit()}>Submit</Button>
				</div>
			</div>
		);
	}
}
	
// TODO: put this in seperate file under ./EmailVerify/Index
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
	const verifyEmailToken = async (user, token) => {
		if (!user.hasLink('VerifyEmailWithToken') || !token) {
			return Promise.reject();
		}
		let link = user.getLink('VerifyEmailWithToken');
		return await getService().post(link, { token: token })
			.then(function (response) {
				let userLinks = user.Links;
				const indexToRemove = userLinks.indexOf('RequestEmailVerification');
				if (indexToRemove > -1) {
					userLinks.splice(indexToRemove, 1);
					user.Links = userLinks;
				}
				return Promise.resolve(response);
			});
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