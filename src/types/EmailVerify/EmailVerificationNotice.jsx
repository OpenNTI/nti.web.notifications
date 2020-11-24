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
		width: 360px;
		height: 80px;
		position: absolute;
		right: 95px;
		border-radius: 4px;
	}

	.dismiss {
		color: #979797;
		font-size: 1.5rem;
		float: right;
		position: absolute;
		top: 4px;
		right: 14px;
	}

	.container {
		line-height: 19px;
	}

	.text {
		height: 40px;
		width: 272px;
		color: #000;
		font-size: 14px;
		font-weight: 600;
		letter-spacing: 0.03px;
		line-height: 19px;
	}

	@media only screen and (max-width: 1195px) {
		.frame {
			width: 360px;
			right: 15px;
		}
	}

	@media only screen and (max-width: 350px) {
		.frame {
			width: 90vw;
			right: 15px;
		}
	}
`;

register(EmailVerificationNotice, 'application/vnd.nextthought.toasts.emailverify');

export default function EmailVerificationNotice () {
	const {
		startEmailVerification,
		verificationSnoozed,
		snoozeVerification,
		timerStart,
	} = Store.useValue();

	const handleToastClick = () => {
		startEmailVerification();
		snoozeVerification();
	};

	const handleDismissButton = (e) => {
		snoozeVerification();
		e.stopPropagation();
	};

	const progress = () => {
		return (Date.now() - Date.parse(timerStart)) / 10000;
	};

	return (
		verificationSnoozed ? null : (
			<Toast location={Toast.Locations.TopRight}>
				<>
					<NotificationItemFrame emailVerify={true} onClick={handleToastClick} className={styles.frame}>
						<div className={styles.dismiss} onClick={handleDismissButton}>&times;</div>
						<div className={cx(styles.container, styles.text)}>
							<Translate localeKey="message" />
						</div>
					</NotificationItemFrame>
					<TimeoutProgress progress={progress} />
				</>
			</Toast>
		)
	);
}
