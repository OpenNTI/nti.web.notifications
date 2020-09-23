import { scoped } from '@nti/lib-locale';
import { Button, Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

const translation = scoped('nti-notifications.notifications.types.EmailVerify.InfoWindow', {
	thankyou: 'Thank you!',
	message: 'Your email has been verified',
	dismiss: 'Dismiss'
});

const Translate = Text.Translator(translation);

CongratsPropmt.propTypes = {
	dismissCallBack: PropTypes.func.isRequired,
};

export default function CongratsPropmt ( { dismissCallBack } ) {
	return (
		<div>
			<Text.Title className="thank-you-title"><Translate localeKey="thankyou" /></Text.Title>
			<div className="congrats-message"><Translate localeKey="message" /></div>
			<Button onClick={() => dismissCallBack()}><Translate localeKey="dismiss" /></Button>
		</div>
	);
}