import { Button, Text, TextInput, wait } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import {sendEmailVerification} from './utils';

EmailVerifyWindow.propTypes = {
	user: PropTypes.object.isRequired,
	onTokenSubmission: PropTypes.func.isRequired,
};

const SENDING_STATE = 'SENDING';
const NULL_STATE = 'NULL';
const SENT_STATE = 'SENT';


export default function EmailVerifyWindow ({ user, onTokenSubmission }) {
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
							{/* TODO: string localization */}
							It may take several minutes for the email to reach your inbox. Please wait before requesting another.
                    	</div>
                    )
				}
				<div>
					{sendingEmail === SENDING_STATE &&
                        (
							// TODO: string localization
                        	<span>Sending...</span>
                        )}
					{sendingEmail === NULL_STATE &&
                        (
							// TODO: string localization
                        	<a onClick={sendAnotherEmail()}>Send another email</a>
                        )}
					{sendingEmail === SENT_STATE &&
                        (
							// TODO: string localization
                        	<span>Sent!</span>
                        )} | <a onClick={setDisplayChangeEmailWindow(true)}>Change email address</a>
				</div>
				<div className="input-box">
					<TextInput className="token-field" placeholder="Enter your verification token" onChange={(e) => setTokenState(e.target.value)} />
				</div>
				<div>
					{/* TODO: implement cancel */}
					{/* TODO: string localization */}
					<Button>Cancel</Button>
					{/* TODO: string localization */}
					<Button onClick={() => onTokenSubmission(tokenState)}>Submit</Button>
				</div>
			</div>
		);
	}
	else {
		return (
			<div>
				{/* TODO: string localization */}
				<div className="button verify-email link" onClick={setDisplayChangeEmailWindow(false)}>&lt; Back to Email Verification</div>
				<Text.Title className="title">Update Email Address</Text.Title>
				<div className="input-box">
					<TextInput value={emailState} onChange={(e) => setEmailState(e.target.value)} />
				</div>
				{/* TODO: string localization */}
				{emailChanged && (<Text.Small className="message success">Your email has been updated.</Text.Small>)}
				<div>
					{/* TODO: implement cancel */}
					{/* TODO: string localization */}
					<Button>Cancel</Button>
					{/* TODO: string localization */}
					<Button onClick={onEmailChangeSubmit()}>Submit</Button>
				</div>
			</div>
		);
	}
}