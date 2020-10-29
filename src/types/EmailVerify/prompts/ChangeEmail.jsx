import { wait } from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';
import { Button, Form, Input, Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import cx from 'classnames';

import {sendEmailVerification} from '../utils';

import styles from './Style.css';


// String localization
const translation = scoped('nti-notifications.notifications.types.EmailVerify.ChangeEmailPrompt', {
	cancel: 'Cancel',
	submit: 'Submit',
	emailChanged: 'Your email has been updated.',
	backToEmailVerificationPrompt: 'Back to Email Verification',
	updateEmail: 'Update Email Address',
	invalidEmail: 'Oops, this email is invalid.',
});

const Translate = Text.Translator(translation);


ChangeEmailPrompt.propTypes = {
	user: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
	onReturn: PropTypes.func,
};

export default function ChangeEmailPrompt ( { user, onClose, onReturn } ) {
	const [email, setEmail] = useState(user.email);
	const [emailChanged, setEmailChanged] = useState(false);
	const [emailValid, setEmailValid] = useState(true);

	const changeEmail = async () => {
		try {
			await user.save({ email: email });
			return true;
		} catch (e) {
			throw new Error(e);
		}
	};

	const handleEmailInputChange = (e) => {
		setEmail(e);
		if (e === user.email) {
			setEmailValid(false);
		} else {
			setEmailValid(true);
		}
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

	return (
		<div style={{ width: 'inherit', }}>
			<div className={styles.dialogHeader}>
				<div className={styles.buttons}>
					<div className={cx(styles.button, styles.verifyEmail, styles.link)} onClick={onReturn} >
                        &lt;
						<Translate localeKey="backToEmailVerificationPrompt" />
					</div>
				</div>
				<div className={styles.dialogTitle}><Translate localeKey="updateEmail" /></div>
			</div>

			<div className={styles.sub}></div>
			<Form className={styles.form} onSubmit={onEmailChangeSubmit} noValidate={false} onInvalid={onInvalid}>
				<Input.Clearable className={cx(styles.inputBox, {[styles.redInputBox]: !emailValid})}>
					<Input.Email className={cx(styles.inputField, {[styles.redInputField]: !emailValid})} name="email" value={email} onChange={handleEmailInputChange} autoFocus/>
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
					<Button className={styles.submitButton} type="submit" onClick={onEmailChangeSubmit} disabled={email && emailValid ? false : true}><Translate localeKey="submit"/></Button>
				</div>
			</Form>
		</div>
	);
}
