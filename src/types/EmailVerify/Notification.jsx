import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../../Frame';
import { register, COMMON_PREFIX } from '../Registry';
import Store from '../../Store';

const styles = css`
	.container {
		line-height: 19px;
	}

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
	onDismiss: PropTypes.func,
	className: PropTypes.string
};

EmailVerifyNotification.MimeTypes = [
	COMMON_PREFIX + 'emailverify',
];

register(EmailVerifyNotification, 'emailVerify');

export default function EmailVerifyNotification ( { onDismiss, className } ) {
	const {
		startEmailVerification,
	} = Store.useValue();

	return (
		<NotificationItemFrame emailVerify={true} dismissCallBack={() => onDismiss()} className={className}>
			<div className={styles.container}>
				<Translate localeKey="message" />
				<br/>
				<a className={styles.action} onClick={() => startEmailVerification()}><Translate localeKey="verifyNow" /></a>
			</div>
		</NotificationItemFrame>
	);
}
