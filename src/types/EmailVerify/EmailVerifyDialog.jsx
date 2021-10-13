import PropTypes from 'prop-types';
import { useCallback } from 'react';

import { getAppUser } from '@nti/web-client';
import { Hooks } from '@nti/web-commons';

import Store from '../../Store';

import EmailVerifyPrompt from './prompts/Verify';
import PromptTemplate from './prompts/Template';

// This handles getting async data
const { useResolver } = Hooks;
const { isResolved } = useResolver;

EmailVerify.propTypes = {
	user: PropTypes.object,
	onDismiss: PropTypes.func.isRequired,
};

export default function EmailVerify({ user: userProp, onDismiss }) {
	const { needsVerification, verifiedDate, submitToken } = Store.useValue();

	const resolver = useResolver(() => userProp ?? getAppUser(), [userProp]);
	const user = isResolved(resolver) ? resolver : null;
	const showVerifyWindow = needsVerification && verifiedDate === null;
	const onTokenSubmission = useCallback(
		async token => {
			if (await submitToken(user, token)) {
				onDismiss();
			}
		},
		[user, submitToken, onDismiss]
	);

	return (
		<>
			{showVerifyWindow && user && (
				<PromptTemplate data-testid="email-verify-dialog">
					<EmailVerifyPrompt
						user={user}
						onTokenSubmission={onTokenSubmission}
					/>
				</PromptTemplate>
			)}
		</>
	);
}
