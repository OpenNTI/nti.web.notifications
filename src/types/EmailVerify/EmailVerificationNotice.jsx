import React from 'react';
import { Text, Toast } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';
import cx from 'classnames';


import Store from '../../Store';
import { register } from '../Registry';
import NotificationItemFrame from '../../Frame';

import TimeoutProgress from './TimeoutProgress';


const Translate = Text.Translator(
	scoped('nti-notifications.notifications.types.EmailVerify', {
		message: 'Please take a moment to verify your email address.',
	})
);

const styles = css`
	.frame {
		background-color: white;
		position: relative;
		border-radius: 4px;
		box-shadow: 0 3px 10px 0 rgba(0,0,0,0.2);
	}

	.dismiss {
		position: absolute;
		font-size: initial;
		opacity: 0.5;
		top: 10px;
		right: 10px;
	}

	.container {
		line-height: 19px;
	}

	.text {
		color: #000;
		font-size: 14px;
		font-weight: 600;
		letter-spacing: 0.03px;
		line-height: 19px;
	}
`;

register(EmailVerificationNotice, 'application/vnd.nextthought.toasts.emailverify');

export default function EmailVerificationNotice () {
	const {
		startEmailVerification,
		verificationSnoozed,
		snoozeVerification,
		VerificationNoticeStart,
		VerificationNoticeExpiry,
	} = Store.useValue();

	const handleDismiss = (e) => {
		e.stopPropagation();
		snoozeVerification();
	};

	const progress = () => {
		const duration = VerificationNoticeExpiry - Date.parse(VerificationNoticeStart);
		return (Date.now() - VerificationNoticeStart) / duration;
	};

	return ( verificationSnoozed ? null : (
		<Toast location={Toast.Locations.TopRight}>
			<NotificationItemFrame emailVerify={true} onClick={startEmailVerification} className={styles.frame}>
				<a onClick={handleDismiss} href="#" className={styles.dismiss}><i className="icon-light-x" /></a>
				<div className={cx(styles.container, styles.text)}>
					<Translate localeKey="message" />
				</div>
				<TimeoutProgress progress={progress} />
			</NotificationItemFrame>
		</Toast>
	));
}
