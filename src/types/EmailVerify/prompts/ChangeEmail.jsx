import { wait } from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';
import { DialogButtons, Form, Input, Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import styles from '../Style.css';
import {sendEmailVerification} from '../utils';


// String localization
const translation = scoped('nti-notifications.notifications.types.EmailVerify.ChangeEmailWindow', {
	cancel: 'Cancel',
	submit: 'Submit',
	emailChanged: 'Your email has been updated.',
	backToEmailVerificationWindow: 'Back to Email Verification',
	updateEmail: 'Update Email Address',
	invalidEmail: 'Oops, this email is invalid.',
});
const Translate = Text.Translator(translation);


ChangeEmailWindow.propTypes = {
	user: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
	onReturn: PropTypes.func,
};

export default function ChangeEmailWindow ( { user, onClose, onReturn } ) {
	const [email, setEmail] = useState(user.email);
	const [emailChanged, setEmailChanged] = useState(false);
	const [emailValid, setEmailValid] = useState(true);

	const changeEmail = async () => {
		try {
			await user.save({ email: email });
			return true;
		} catch (e) {
			return false;
		}
	};

	const handleEmailInputChange = (e) => {
		setEmail(e);
	};

	const onEmailChangeSubmit = async (e) => {
		setEmailValid(true);
		if (email === user.email) {
			setEmailValid(false);
			return;
		}
		if (changeEmail()) {
			setEmailChanged(true);
			await wait(800);
			sendEmailVerification(user);
			onReturn({ changedEmail: true, newEmail: email });
		} else {
			setEmailValid(false);
		}
	};

	const onInvalid = () => {
		setEmailValid(false);
	};

	const buttons = [
		{ label: <Translate localeKey="cancel" />, type: 'button', onClick: onClose },
		{label: <Translate localeKey="submit" />, type: 'submit', disabled: email ? false : true, as: Form.SubmitButton},
	];

	return (
		<div style={{ width: 'inherit', }}>
			<div className={styles.dialogHeader}>
				<div className={styles.buttons}>
					<div className={[styles.button, styles.verifyEmail, styles.link].join(' ')} onClick={onReturn} >
                        &lt;
						<Translate localeKey="backToEmailVerificationWindow" />
					</div>
				</div>
				<div className={styles.dialogTitle}><Translate localeKey="updateEmail" /></div>
			</div>

			<div className={styles.sub}></div>
			<Form onSubmit={onEmailChangeSubmit} noValidate={false} onInvalid={onInvalid}>
				<Input.Clearable className={styles.inputBox}>
					<Input.Email className={[styles.inputField, !emailValid ? styles.redInputField : []].join(' ')} name="email" value={email} onChange={handleEmailInputChange} autoFocus/>
				</Input.Clearable>

				<div className={styles.errorMessage}>
					{emailChanged && (
						<div className={styles.success}>
							<Translate localeKey="emailChanged" />
						</div>
					)}
					{!emailValid && (
						<span>
							<Translate localeKey="invalidEmail" />
						</span>
					)}
				</div>
				<div className={styles.footer}>
					<DialogButtons buttons={buttons} />
				</div>
			</Form>
		</div>
	);
}
