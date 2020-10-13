import { getAppUser } from '@nti/web-client';
import { Hooks, Prompt } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { COMMON_PREFIX } from '../Registry';

import EmailVerifyNotification from './Notification';
import styles from './Style.css';
import { sendEmailVerification, verifyEmailToken } from './utils';
import CongratsPropmt from './prompts/Congrats';
import InfoWindow from './prompts/Info';
import EmailVerifyWindow from './prompts/Verify';


// This handles getting async data
const {useResolver} = Hooks;
const {isPending, isResolved} = useResolver;

EmailVerify.propTypes = {
	user: PropTypes.object,
	onDismiss: PropTypes.func.isRequired
};

EmailVerify.MimeTypes = [
	COMMON_PREFIX + 'emailverify',
];

export default function EmailVerify ( { user:userProp, onDismiss } ) {
	const resolver = useResolver(() => userProp ?? 	getAppUser(), [userProp]);
	const loading = isPending(resolver);
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
			}, (error) => {
				throw new Error(error.toString());
			});
	}
	return (
		<div>
			<EmailVerifyNotification onDismiss={onDismiss} onVerifyClick={verifyClickCallback} onInfoClick={openInfoPrompt} />
			{(verifyPrompt || infoPrompt || congratsPrompt) && (
				<Prompt.Dialog onBeforeDismiss={closePrompt} >
					<div className={styles.promptView}>
						<div className={styles.dialogContent}>
							{verifyPrompt && (
								<EmailVerifyWindow user={user} onTokenSubmission={onTokenSubmission} onClose={cancelDismissCallback} tokenInvalid={tokenInvalid} />
							)}
							{infoPrompt && (
								<InfoWindow onClose={cancelDismissCallback} />
							)}
							{congratsPrompt && (
								<CongratsPropmt onDismiss={cancelDismissCallback} />
							)}
						</div>
					</div>
				</Prompt.Dialog>
			)}
		</div>

	);
}
