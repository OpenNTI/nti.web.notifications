import { getAppUser } from '@nti/web-client';
import { Hooks } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import Store from '../../Store';

import EmailVerifyPrompt from './prompts/Verify';
import PromptTemplate from './prompts/Template';

// This handles getting async data
const {useResolver} = Hooks;
const {isResolved} = useResolver;

EmailVerify.propTypes = {
	user: PropTypes.object,
	onDismiss: PropTypes.func.isRequired
};

export default function EmailVerify ( { user:userProp, onDismiss } ) {
	const {
		needsVerification,
		verifiedDate,
		submitToken,
	} = Store.useValue();

	const resolver = useResolver(() => userProp ?? 	getAppUser(), [userProp]);
	const user = isResolved(resolver) ? resolver : null;
	const showVerifyWindow = needsVerification && verifiedDate === null;
	const onTokenSubmission = (token) => {
		submitToken(user, token).then((result) => {
			if (result) {
				onDismiss();
			}
		});
	};

	return (
		<>
			{showVerifyWindow && user && (
				<PromptTemplate>
					<EmailVerifyPrompt user={user} onTokenSubmission={onTokenSubmission} onClose={onDismiss} />
				</PromptTemplate>
			)}
		</>

	);
}
