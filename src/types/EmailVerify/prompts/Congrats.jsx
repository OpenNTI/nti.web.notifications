import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';
import React from 'react';

import styles from './Style.css';
import PromptTemplate from './Template';

const translation = scoped('nti-notifications.notifications.types.EmailVerify.CongratsPrompt', {
	emailVerified: 'Email verified!',
	message: 'Thank you! Your email has been verified.',
});

const Translate = Text.Translator(translation);

export default function CongratsPrompt () {
	return (
		<PromptTemplate height={118}>
			<div className={styles.congratsContainer} style={{ width: 'inherit', }}>
				<div className={styles.checkMarkContainer}>
					<div className={styles.checkMark}></div>
					<div className={styles.emailVerified}><Translate localeKey="emailVerified" /></div>
				</div>
				<div className={styles.textContainer}>
					<div className={styles.congratsMsg}><Translate localeKey="message" /></div>
				</div>
			</div>
		</PromptTemplate>
	);
}
