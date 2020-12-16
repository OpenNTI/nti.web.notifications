import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../../frame/Pinned';
import { register, COMMON_PREFIX } from '../Registry';
import Store from '../../Store';

const styles = css`

	.action {

		color: var(--primary-blue);
		cursor: pointer;
	}
`;

// String localization
const translation = scoped('nti-notifications.notifications.types.EmailVerify', {
	message: 'Please take a moment to verify your email address.',
	verifyNow: 'Verify Now',
});

const Translate = Text.Translator(translation);

EmailVerifyNotification.propTypes = {
	className: PropTypes.string
};

EmailVerifyNotification.MimeTypes = [
	COMMON_PREFIX + 'emailverify',
];

register(EmailVerifyNotification, 'emailVerify');

export default function EmailVerifyNotification ( { className } ) {
	const {
		startEmailVerification,
	} = Store.useValue();

	return (
		<NotificationItemFrame className={className}>
			<Translate localeKey="message" as="div"/>

			<a className={styles.action} onClick={startEmailVerification}>
				<Translate localeKey="verifyNow" />
			</a>
		</NotificationItemFrame>
	);
}
