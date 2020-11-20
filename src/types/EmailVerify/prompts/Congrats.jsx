import { scoped } from '@nti/lib-locale';
import { Button, Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Style.css';
import PromptTemplate from './Template';

const translation = scoped('nti-notifications.notifications.types.EmailVerify.CongratsPrompt', {
	thankyou: 'Thank you!',
	message: 'Your email has been verified',
	dismiss: 'Dismiss'
});

const Translate = Text.Translator(translation);

CongratsPrompt.propTypes = {
	onDismiss: PropTypes.func.isRequired,
};

export default function CongratsPrompt ({ onDismiss } ) {
	return (
		<PromptTemplate>
			<div className={styles.congratsContainer} style={{ width: 'inherit', }}>
				<div className={styles.checkMark}>&#10003;</div>
				<div className={styles.thankyouTitle}><Translate localeKey="thankyou" /></div>
				<div className={styles.congratsMsg}><Translate localeKey="message" /></div>
				<div className={styles.footer}>
					<Button className={styles.dismissButton} onClick={onDismiss} rounded={true} plain><Translate localeKey="dismiss" /></Button>
				</div>
			</div>
		</PromptTemplate>
	);
}
