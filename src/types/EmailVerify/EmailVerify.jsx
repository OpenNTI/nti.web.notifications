import { getAppUser } from '@nti/web-client';
import { Hooks, Prompt } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Store from '../../Store';

import styles from './Style.css';
import { verifyEmailToken } from './utils';
import CongratsPrompt from './prompts/Congrats';
import EmailVerifyPrompt from './prompts/Verify';

// This handles getting async data
const {useResolver} = Hooks;
const {isResolved} = useResolver;

EmailVerify.propTypes = {
	user: PropTypes.object,
};

export default function EmailVerify ( { user:userProp } ) {
	const {
		hideEmailVerify,
	} = Store.useValue();

	const resolver = useResolver(() => userProp ?? 	getAppUser(), [userProp]);
	const user = isResolved(resolver) ? resolver : null;

	const [tokenInvalid, setTokenInvalid] = useState(null);
	const [verifyPrompt, setVerifyPrompt] = useState(true);
	const [congratsPrompt, setCongratsPrompt] = useState(false);

	const cancelCallback = () => {
		verifyPrompt && setVerifyPrompt(false);
		congratsPrompt && setCongratsPrompt(false);
		hideEmailVerify();
	};

	const completeVerification = () => {
		setVerifyPrompt(false);
		setCongratsPrompt(true);
	};

	const onTokenSubmission = (token) => {
		if (token && token !== '') {
			try {
				return verifyEmailToken(user, token)
					.then(() => {
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

	return (
		<>
			<Prompt.Dialog onBeforeDismiss={cancelCallback} >
				<div className={styles.promptView}>
					<div className={styles.dialogContent}>
						{(verifyPrompt && user) && (
							<EmailVerifyPrompt user={user} onTokenSubmission={onTokenSubmission} onClose={cancelCallback} tokenInvalid={tokenInvalid} />
						)}
						{congratsPrompt && (
							<CongratsPrompt onDismiss={cancelCallback} />
						)}
					</div>
				</div>
			</Prompt.Dialog>
		</>

	);
}
