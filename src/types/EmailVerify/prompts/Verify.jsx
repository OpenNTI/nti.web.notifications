import { wait } from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';
import { DialogButtons, Form, Input, Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import styles from '../Style.css';
import {sendEmailVerification} from '../utils';

import ChangeEmailWindow from './ChangeEmail';



// String localization
const translation = scoped('nti-notifications.notifications.types.EmailVerify.EmailVerifyWindow', {
	sendingEmail: 						'Sending...',
	sub: 								'It may take several minutes for the email to reach your inbox. Please wait before requesting another.',
	sentEmail: 							'We sent a verification email to:',
	sentAnotherEmail: 					'We sent another verification email to:',
	sendAnotherEmail: 					'Send another email',
	sentEmailStatus: 					'Sent!',
	changeEmail: 						'Change email address',
	cancel: 							'Cancel',
	submit: 							'Submit',
	emailChanged: 						'Your email has been updated.',
	backToEmailVerificationWindow: 		'Back to Email Verification',
	updateEmail: 						'Update Email Address',
});

const Translate = Text.Translator(translation);

EmailVerifyWindow.propTypes = {
	user: PropTypes.object.isRequired,
	onTokenSubmission: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	tokenInvalid: PropTypes.bool.isRequired,
};

const SENDING_STATE = 'SENDING';
const NULL_STATE = 'NULL';
const SENT_STATE = 'SENT';


export default function EmailVerifyWindow ( { user, onTokenSubmission, onCancel, tokenInvalid } ) {
	const [sentAnotherVerifyEmail, setSentAnotherVerifyEmail] = useState(false);
	const [sendingEmail, setSendingEmail] = useState(NULL_STATE);
	const [token, setToken] = useState('');
	const [displayChangeEmailWindow, setDisplayChangeEmailWindow] = useState(false);
	const [displayVerifyWindow, setDisplayVerifylWindow] = useState(true);
	const [error, setError] = useState(null);
	const [email, setEmail] = useState(user.email);

	function closeChangeEmail (load) {
		if (load.changedEmail) {
			setSentAnotherVerifyEmail(true);
			setEmail(load.newEmail);
		}
		setDisplayChangeEmailWindow(false);
		setDisplayVerifylWindow(true);
	}

	function openChangeEmail () {
		setDisplayChangeEmailWindow(true);
		setDisplayVerifylWindow(false);
	}

	const sendAnotherEmail = async () => {
		setSendingEmail(SENDING_STATE);
		await wait(1000);
		sendEmailVerification(user)
			.then(() => {
				setSendingEmail(SENT_STATE);
				setSentAnotherVerifyEmail(true);

				wait(1000)
					.then(() => {
						setSendingEmail(NULL_STATE);
					});
			}, (e) => {
				setError(e);
			});
	};

	const onTokenChange = (e) => {
		setToken(e);
	};

	const onSubmit = () => {
		onTokenSubmission(token);
	};

	const buttons = [
		{ label: <Translate localeKey="cancel" />, type: 'button', onClick: onCancel, },
		{label: <Translate localeKey="submit" />, type: 'submit', disabled: token ? false : true, as: Form.SubmitButton},
	];

	return (
		<div>
			{displayVerifyWindow && (
				<div style={{ width: 'inherit', }}>
					<div className={styles.dialogHeader}>
						<div className={styles.dialogTitle}>
							{sentAnotherVerifyEmail === true && (
								<Translate localeKey="sentAnotherEmail" />
							)}
							{sentAnotherVerifyEmail === false && (
								<Translate localeKey="sentEmail" />
							)}
						</div>
						<div className={styles.email}>
							{email}
						</div>
						{sentAnotherVerifyEmail === true && (
							<div className={styles.sub}>
								<Translate localeKey="sub" />
							</div>
						)}
						<div className={styles.buttons}>
							{sendingEmail === SENDING_STATE && (
								<span className={styles.sendEmail}><Translate localeKey="sendingEmail" /></span>
							)}
							{sendingEmail === NULL_STATE && (
								<a className={[styles.button, styles.sendEmail, styles.sendEmailBtn].join(' ')} onClick={sendAnotherEmail}><Translate localeKey="sendAnotherEmail" /></a>
							)}
							{sendingEmail === SENT_STATE && (
								<span className={styles.sendEmail}><Translate localeKey="sentEmailStatus" /></span>
							)}
							<a className={styles.button} onClick={openChangeEmail}><Translate localeKey="changeEmail" /></a>
						</div>
					</div>
					<Form onSubmit={onSubmit} noValidate={false}>
						<div>
							<Input.Clearable className={styles.inputBox}>
								<Input.Text value={token} name="token" className={[styles.inputField, tokenInvalid ? styles.redInputField : []].join(' ')} 
									placeholder="Enter your verification token" onChange={onTokenChange} autoFocus/>
							</Input.Clearable>
						</div>
						<div className={styles.errorMessage}>
							{tokenInvalid && (
								<span>This token is not valid.</span>
							)}
							{error && (
								<span>{error}</span>
							)}
						</div>
						<div className={styles.footer}>
							<DialogButtons buttons={buttons} />
						</div>
					</Form>
				</div>
			)}
			{displayChangeEmailWindow && (
				<ChangeEmailWindow user={{ user, email }} onCancel={onCancel} onBackClick={(load) => closeChangeEmail(load)}/>
			)}
		</div>
		
	);
}