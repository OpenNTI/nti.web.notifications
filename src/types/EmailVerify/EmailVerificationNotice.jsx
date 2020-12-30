import React from 'react';
import { Text, Toast } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';


import Store from '../../Store';
import Frame from '../../frame/Pinned';

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
		color: currentColor;
		text-decoration: none;
		position: absolute;
		font-size: initial;
		opacity: 0.5;
		top: 10px;
		right: 10px;
	}

	.text {
		color: #000;
		font-size: 14px;
		font-weight: 600;
		letter-spacing: 0.03px;
		line-height: 19px;
	}
`;

export default function EmailVerificationNotice () {
	const {
		emailVerificationRequested,
		needsVerification,
		snoozeVerification,
		VerificationNoticeExpiry,
		VerificationNoticeStart,
		verificationSnoozed,
	} = Store.useValue();

	const handleDismiss = (e) => {
		e.stopPropagation();
		snoozeVerification();
	};

	const progress = () => {
		const duration = VerificationNoticeExpiry - VerificationNoticeStart;
		return (Date.now() - VerificationNoticeStart) / duration;
	};

	if (!needsVerification || emailVerificationRequested || verificationSnoozed) {
		return null;
	}

	return (
		<div data-testid="email-verification-notice">
			<Toast location={Toast.Locations.TopRight}>
				<Frame className={styles.frame}>
					<a onClick={handleDismiss} href="#" className={styles.dismiss}><i className="icon-light-x" /></a>
					<div className={styles.text}>
						<Translate localeKey="message" />
					</div>
					<TimeoutProgress progress={progress} />
				</Frame>
			</Toast>
		</div>
	);
}
