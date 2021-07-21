import PropTypes from 'prop-types';
import React, { useState } from 'react';
import cx from 'classnames';

import { wait } from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';
import {
	StandardUI,
	Button,
	Form,
	Input,
	Text,
	Errors,
} from '@nti/web-commons';

import { sendEmailVerification } from '../utils';
import Store from '../../../Store';

import styles from './Style.css';
import ChangeEmailPrompt from './ChangeEmail';

// String localization
const translation = scoped(
	'nti-notifications.notifications.types.EmailVerify.EmailVerifyPrompt',
	{
		sendingEmail: 'Sending...',
		sub: 'It may take several minutes for the email to reach your inbox. Please wait before requesting another.',
		sendAnotherEmail: 'Send another email',
		sentEmailStatus: 'Sent!',
		changeEmail: 'Change email address',
		submit: 'Submit',
		title: 'Verify Your Email',
		enterCode: 'Enter your verification code',
		body: 'We sent a verification email to <b>%(email)s</b> — please retrieve your code. Verification is necessary for account recovery, activity notifications, and awarding certificates.',
		remindMeLater: 'Remind me later',
	}
);

const Translate = Text.Translator(translation);

EmailVerifyPrompt.propTypes = {
	user: PropTypes.object,
	onTokenSubmission: PropTypes.func.isRequired,
};

const SENDING_STATE = 'SENDING';
const NULL_STATE = 'NULL';
const SENT_STATE = 'SENT';

export default function EmailVerifyPrompt({ user, onTokenSubmission }) {
	const { validToken, snoozeVerification } = Store.useValue();

	const [sentAnotherVerifyEmail, setSentAnotherVerifyEmail] = useState(false);
	const [sendingEmail, setSendingEmail] = useState(NULL_STATE);
	const [token, setToken] = useState('');
	const [displayChangeEmailPrompt, setDisplayChangeEmailPrompt] =
		useState(false);
	const [displayVerifyPrompt, setDisplayVerifyPrompt] = useState(true);
	const [error, setError] = useState(null);
	const [email, setEmail] = useState(user.email);

	const closeChangeEmail = React.useCallback(load => {
		if (load.changedEmail) {
			setSentAnotherVerifyEmail(true);
			setEmail(load.newEmail);
		}
		setDisplayChangeEmailPrompt(false);
		setDisplayVerifyPrompt(true);
	}, []);

	const openChangeEmail = () => {
		setDisplayChangeEmailPrompt(true);
		setDisplayVerifyPrompt(false);
	};

	const sendAnotherEmail = async () => {
		setSendingEmail(SENDING_STATE);
		await wait(1000);
		try {
			await sendEmailVerification(user);
			setSendingEmail(SENT_STATE);
			setSentAnotherVerifyEmail(true);
			await wait(1000);
			setSendingEmail(NULL_STATE);
		} catch (error) {
			setError(error?.message);
			setSendingEmail(NULL_STATE);
		}
	};

	const onTokenChange = e => {
		setToken(e);
	};

	const onSubmit = () => {
		onTokenSubmission(token);
	};

	return (
		<>
			{displayVerifyPrompt && (
				<>
					<StandardUI.Window.TitleBar
						onClose={snoozeVerification}
						title={<Translate localeKey="title" />}
					/>
					<div className={styles.promptBody}>
						<div className={styles.title}>
							<Translate localeKey="enterCode" />
						</div>
						<div className={styles.bodyText}>
							<Translate
								localeKey="body"
								with={{ email: email }}
							/>
						</div>
						{sentAnotherVerifyEmail === true && (
							<div className={styles.sub}>
								<Translate localeKey="sub" />
							</div>
						)}
						<div className={styles.buttons}>
							{sendingEmail === SENDING_STATE && (
								<span className={styles.sendEmail}>
									<Translate localeKey="sendingEmail" />
								</span>
							)}
							{sendingEmail === NULL_STATE && (
								<a
									className={cx(
										styles.button,
										styles.sendEmail,
										styles.sendEmailBtn
									)}
									onClick={sendAnotherEmail}
								>
									<Translate localeKey="sendAnotherEmail" />
								</a>
							)}
							{sendingEmail === SENT_STATE && (
								<span className={styles.sendEmail}>
									<Translate localeKey="sentEmailStatus" />
								</span>
							)}
							<a
								className={styles.button}
								onClick={openChangeEmail}
							>
								<Translate localeKey="changeEmail" />
							</a>
						</div>
					</div>
					<Form
						className={styles.form}
						onSubmit={onSubmit}
						noValidate={false}
					>
						<Input.Clearable
							className={cx(styles.inputBox, {
								[styles.redInputBox]: validToken === false,
							})}
						>
							<Input.Text
								value={token}
								name="token"
								className={cx(styles.inputField, {
									[styles.redInputField]:
										validToken === false,
								})}
								placeholder="Enter your verification code"
								onChange={onTokenChange}
								autoFocus
							/>
						</Input.Clearable>
						<div className={styles.errorMessage}>
							{validToken === false && (
								<span>This token is not valid.</span>
							)}
							{error && <Errors.Message error={error} />}
						</div>
						<div className={styles.footer}>
							<Button
								className={styles.remindLaterButton}
								onClick={snoozeVerification}
								rounded={true}
								secondary
								plain
							>
								<Translate localeKey="remindMeLater" />
							</Button>
							<Button
								className={styles.submitButton}
								onClick={onSubmit}
								disabled={token ? false : true}
							>
								<Translate localeKey="submit" />
							</Button>
						</div>
					</Form>
				</>
			)}
			{displayChangeEmailPrompt && (
				<ChangeEmailPrompt
					user={user}
					onReturn={payLoad => closeChangeEmail(payLoad)}
				/>
			)}
		</>
	);
}
