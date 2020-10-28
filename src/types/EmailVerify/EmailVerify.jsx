import { getAppUser } from '@nti/web-client';
import { Hooks, Prompt } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { COMMON_PREFIX, register } from '../Registry';

import EmailVerifyNotification from './Notification';
import styles from './Style.css';
import { sendEmailVerification, verifyEmailToken } from './utils';
import CongratsPrompt from './prompts/Congrats';
import InfoPrompt from './prompts/Info';
import EmailVerifyPrompt from './prompts/Verify';
import EmailVerifyToastContent from './Toast';


// This handles getting async data
const {useResolver} = Hooks;
const {isResolved} = useResolver;

EmailVerify.propTypes = {
	user: PropTypes.object,
	onDismiss: PropTypes.func.isRequired,
	togglePrompt: PropTypes.func.isRequired,
	toast: PropTypes.bool,
};

EmailVerify.MimeTypes = [
	COMMON_PREFIX + 'emailverify',
];

register(EmailVerify, 'emailVerify');

export default function EmailVerify ( { user:userProp, onDismiss, togglePrompt, className, toast } ) {
	const resolver = useResolver(() => userProp ?? 	getAppUser(), [userProp]);
	const user = isResolved(resolver) ? resolver : null;

	const [tokenInvalid, setTokenInvalid] = useState(null);
	// Verify Dialog State
	const [verifyPrompt, setVerifyPrompt] = useState(false);

	const closeVerifyPrompt = () => {
		setVerifyPrompt(false);
	};

	// Info Dialog State
	const [infoPrompt, setInfoPrompt] = useState(false);
	const openInfoPrompt = () => {
		setInfoPrompt(true);
		togglePrompt(true);
	};
	const closeInfoPrompt = () => {
		setInfoPrompt(false);
	};

	// Congrats Dialog State
	const[congratsPrompt, setCongratsPrompt] = useState(false);
	const openCongratsPrompt = () => {
		setCongratsPrompt(true);
		togglePrompt(true);
	};
	const closeCongratsPrompt = () => {
		setCongratsPrompt(false);
	};

	// Function that closes all open prompts
	const closePrompt = () => {
		infoPrompt && closeInfoPrompt();
		verifyPrompt && closeVerifyPrompt();
		congratsPrompt && closeCongratsPrompt();
		togglePrompt(false);
	};

	function cancelDismissCallback () {
		closePrompt();
	}

	const completeVerification = () => {
		setVerifyPrompt(false);
		openCongratsPrompt();
	};
	const onTokenSubmission = (token) => {
		if (token && token !== '') {
			try {
				return verifyEmailToken(user, token)
					.then((response) => {
						completeVerification();
					}, () => {
						setTokenInvalid(true);
					});
			} catch (e) {
				setTokenInvalid(true);
			}
		}
		else {
			setTokenInvalid(true);
		}
	};
	function verifyClickCallback () {
		setTokenInvalid(false);
		sendEmailVerification(user)
			.then(() => {
				setVerifyPrompt(true);
				togglePrompt(true);
			}, (error) => {
				throw new Error(error.toString());
			});
	}
	const delegateProps = {
		className: className,
		onDismiss,
		onVerifyClick: verifyClickCallback,
		onInfoClick: openInfoPrompt,
	};
	return (
		<div>
			{toast ? <EmailVerifyToastContent {...delegateProps} isPromptOpen={(verifyPrompt || infoPrompt || congratsPrompt)} /> : <EmailVerifyNotification {...delegateProps} />}
			{(verifyPrompt || infoPrompt || congratsPrompt) && (
				<Prompt.Dialog onBeforeDismiss={closePrompt} >
					<div className={styles.promptView}>
						<div className={styles.dialogContent}>
							{verifyPrompt && (
								<EmailVerifyPrompt user={user} onTokenSubmission={onTokenSubmission} onClose={cancelDismissCallback} tokenInvalid={tokenInvalid} />
							)}
							{infoPrompt && (
								<InfoPrompt onClose={cancelDismissCallback} />
							)}
							{congratsPrompt && (
								<CongratsPrompt onDismiss={cancelDismissCallback} />
							)}
						</div>
					</div>
				</Prompt.Dialog>
			)}
		</div>

	);
}
