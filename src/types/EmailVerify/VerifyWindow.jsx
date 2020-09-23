/* eslint-disable no-mixed-spaces-and-tabs */
import { scoped } from '@nti/lib-locale';
import { Button, Text, TextInput, wait } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {sendEmailVerification} from './utils';

// String localization
const translation = scoped('nti-notifications.notifications.types.EmailVerify.EmailVerifyWindow', {
	sendingEmail: 'Sending...',
	sub: 'It may take several minutes for the email to reach your inbox. Please wait before requesting another.',
	sentEmail: 'We sent a verification email to:',
	sentAnotherEmail: 'We sent another verification email to:',
	sendAnotherEmail: 'Send another email',
	sentEmailStatus: 'Sent!',
	changeEmail: 'Change email address',
	cancel: 'Cancel',
	submit: 'Submit',
	emailChanged: 'Your email has been updated.',
	backToEmailVerificationWindow: 'Back to Email Verification',
	updateEmail: 'Update Email Address',

});
const Translate = Text.Translator(translation);

EmailVerifyWindow.propTypes = {
	user: PropTypes.object.isRequired,
	onTokenSubmission: PropTypes.func.isRequired,
	cancelCallBack: PropTypes.func.isRequired,
};

const SENDING_STATE = 'SENDING';
const NULL_STATE = 'NULL';
const SENT_STATE = 'SENT';


export default function EmailVerifyWindow ( { user, onTokenSubmission, cancelCallBack } ) {
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

	const changeEmail = async () => {
		try {
			await user.save({ email: emailState });
			return true;
		}
		catch (e) {
			return false;
		}
	};

	const onEmailChangeSubmit = (e) => {
		if (emailState === user.email) {
			return;
		}
		if (changeEmail()) {
			setEmailChanged(true);
			wait(800)
				.then(() => {
					sendEmailVerification(user);
					setDisplayChangeEmailWindow(false);
				});
		}
		e.preventDefault();
	};

	if (displayChangeEmailWindow === false) {
		return (
			<div>
				<Text.Title className="title">
					{sentAnotherVerifyEmail === true && (
						<Translate localeKey="sentAnotherEmail" />

					)}
					{sentAnotherVerifyEmail === false && (
						<Translate localeKey="sentEmail" />

					)}
				</Text.Title>
				<div className="email">{user.email}</div>
				{sentAnotherVerifyEmail === true && (
					<div className="sub">
						<Translate localeKey="sub" />
					</div>
				)}
				<div>
					{sendingEmail === SENDING_STATE && (
						<span><Translate localeKey="sendingEmail" /></span>
					)}
					{sendingEmail === NULL_STATE && (
						<a onClick={sendAnotherEmail()}><Translate localeKey="sendAnotherEmail"/></a>
					)}
					{sendingEmail === SENT_STATE && (
						<span><Translate localeKey="sentEmailStatus"/></span>
					)} | <a onClick={setDisplayChangeEmailWindow(true)}><Translate localeKey="changeEmail" /></a>
				</div>
				<div className="input-box">
					<TextInput className="token-field" placeholder="Enter your verification token" onChange={(e) => setTokenState(e.target.value)} />
				</div>
				<div>
					<Button onClick={() => cancelCallBack()}><Translate localeKey="cancel"/></Button>
					<Button onClick={() => onTokenSubmission(tokenState)}><Translate localeKey="submit"/></Button>
				</div>
			</div>
		);
	}
	else {
		return (
			<div>
				<div className="button verify-email link" onClick={setDisplayChangeEmailWindow(false)}>&lt; <Translate localeKey="backToEmailVerificationWindow"/></div>
				<Text.Title className="title"><Translate localeKey="updateEmail"/></Text.Title>
				<div className="input-box">
					<TextInput value={emailState} onChange={(e) => setEmailState(e.target.value)} />
				</div>
				{emailChanged && (<Text.Small className="message success"><Translate localeKey="emailChanged"/></Text.Small>)}
				<div>
					<Button onClick={() => cancelCallBack()}><Translate localeKey="cancel"/></Button>
					<Button onClick={onEmailChangeSubmit()}><Translate localeKey="submit"/></Button>
				</div>
			</div>
		);
	}
}