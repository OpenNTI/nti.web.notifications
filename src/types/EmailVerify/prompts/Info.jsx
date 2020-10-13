import { scoped } from '@nti/lib-locale';
import { DialogButtons, Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import styles from '../Style.css';

const translation = scoped('nti-notifications.notifications.types.EmailVerify.InfoWindow', {
	title: 'Why is Email Verification Needed?',
	sub: 'Verifying your email is necessary to ensure successful \ncommunication, to facilitate account recovery, and to issue course \ncompletion badges.',
	done: 'Done',
});

const Translate = Text.Translator(translation);

InfoWindow.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export default function InfoWindow ({ onClose } ) {
	const buttons = [
		{ label: <Translate localeKey="done" />, type: 'submit', onClick: onClose },
	];
	return (
		<div style={{ width: 'inherit', }}>
			<div className={styles.dialogHeader}>
				<div className={styles.dialogTitle}><Translate localeKey="title" /></div>
				<div className={styles.sub}><Translate localeKey="sub" /></div>
			</div>
			<div className={styles.footer}>
				<div className={styles.controlsContainer}>
					<DialogButtons flat buttons={buttons} />
				</div>
			</div>
		</div>
	);
}
