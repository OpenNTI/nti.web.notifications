import { scoped } from '@nti/lib-locale';
import { Button, Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

const translation = scoped('nti-notifications.notifications.types.EmailVerify.InfoWindow', {
	title: 'Why is Email Verification Needed?',
	sub: 'Verifying your email is necessary to ensure successful communication, to facilitate account recovery, and to issue course completion badges.',
	done: 'Done',
});

const Translate = Text.Translator(translation);

InfoWindow.propTypes = {
	cancelCallBack: PropTypes.func.isRequired,
};

export default function InfoWindow ({ cancelCallBack } ) {
	return (
		<div>
			<Text.Title><Translate localeKey="title" /></Text.Title>
			<div className="sub"><Translate localeKey="sub" /></div>
			<Button onClick={() => cancelCallBack()}><Translate localeKey="done" /></Button>
		</div>
	);
}