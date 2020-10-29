import { scoped } from '@nti/lib-locale';
import { DialogButtons, Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Style.css';

const translation = scoped('nti-notifications.notifications.types.EmailVerify.CongratsPrompt', {
	thankyou: 'Thank you!',
	message: 'Your email has been verified',
	dismiss: 'Dismiss'
});

const Translate = Text.Translator(translation);

CongratsPrompt.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export default function CongratsPrompt ({ onClose } ) {
	const buttons = [
		{ label: <Translate localeKey="dismiss" />, type: 'submit', onClick: onClose },
	];
	return (
		<div className={styles.congratsContainer} style={{ width: 'inherit', }}>
			<div className={styles.checkMark}>&#10003;</div>
			<div className={styles.thankyouTitle}><Translate localeKey="thankyou" /></div>
			<div className={styles.congratsMsg}><Translate localeKey="message" /></div>
			<div className={styles.footer}>
				<div className={styles.controlsContainer}>
					<DialogButtons flat buttons={buttons} />
				</div>
			</div>
		</div>
	);
}
