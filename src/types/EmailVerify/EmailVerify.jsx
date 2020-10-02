import { scoped } from '@nti/lib-locale';
import { getAppUser } from '@nti/web-client';
import { Hooks, Icons, Prompt ,Text} from '@nti/web-commons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import NotificationItemFrame from '../../NotificationItemFrame';
import { COMMON_PREFIX } from '../Registry';

import CongratsPropmt from './CongratsPrompt';
import InfoWindow from './InfoWindow';
import styles from './Style.css';
import { sendEmailVerification, verifyEmailToken } from './utils';
import EmailVerifyWindow from './VerifyWindow';


// This handles getting async data
const {useResolver} = Hooks;
const {isPending, isResolved} = useResolver;

// String localization
const translation = scoped('nti-notifications.notifications.types.EmailVerify', {
	message: 'Please take a moment to verify your email address.',
	verifyNow: 'Verify Now',
	moreInfo: 'More Info',
});

const Translate = Text.Translator(translation);

EmailVerify.propTypes = {
	user: PropTypes.object,
	dismissCallBack: PropTypes.func.isRequired
};

EmailVerify.MimeTypes = [
	COMMON_PREFIX + 'emailverify',
];

export default function EmailVerify ( { user:userProp, dismissCallBack } ) {
	const resolver = useResolver(() => userProp ?? 	getAppUser(), [userProp]);
	const loading = isPending(resolver);
	const user = isResolved(resolver) ? resolver : null;
	
	const [tokenInvalid, setTokenInvalid] = useState(null);
	// Verify Dialog State
	const [verifyPrompt, setVerifyPrompt] = useState(false);
	const openVerifyPrompt = () => {
		// Send email verification
		// Send the email with the token
		setTokenInvalid(false);
		sendEmailVerification(user)
			.then(() => {
				setVerifyPrompt(true);
			}, (error) => {
				throw new Error(error.toString());
			});
	};
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
	return (
		<div>
			<NotificationItemFrame emailVerify={true} dismissCallBack={dismissCallBack}>
				<div className={styles.emailVerifyContainer}>
					<div className={styles.alert}>
						<Icons.Alert/>
					</div>
					<Translate localeKey="message" />
					<br />
					<div className={styles.actionLinksContainer}>
						<a className={styles.actionLink} onClick={openVerifyPrompt}><Translate localeKey="verifyNow"/></a>
						<span className={styles.linksSeperator}>|</span>
						<a className={styles.actionLink} onClick={openInfoPrompt}><Translate localeKey="moreInfo" /></a>
					</div>
				</div>
				
			</NotificationItemFrame>
			{(verifyPrompt || infoPrompt || congratsPrompt) && (
				<Prompt.Dialog onBeforeDismiss={closePrompt} >
					<div className={styles.windowView}>
						<div className={styles.dialogContent}>
							{verifyPrompt && (
								<EmailVerifyWindow user={user} onTokenSubmission={onTokenSubmission} cancelCallBack={closePrompt} tokenInvalid={tokenInvalid} />
							)}
							{infoPrompt && (
								<InfoWindow cancelCallBack={closePrompt} />
							)}
							{congratsPrompt && (
								<CongratsPropmt dismissCallBack={closePrompt} />
							)}
						</div>
					</div>
					
				</Prompt.Dialog>
			)}
		</div>
		
	);
}