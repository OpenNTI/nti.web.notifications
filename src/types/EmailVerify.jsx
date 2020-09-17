import { scoped } from '@nti/lib-locale';
import { Button, Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../NotificationItemFrame';

import { COMMON_PREFIX } from './Registry';

// String localization
const translation = scoped('nti-notifications.notifications.types.EmailVerify', {
	action: 'Please take a moment to verify your email address.',
});

const Translate = Text.Translator(translation);

EmailVerify.propTypes = {
	item: PropTypes.object.isRequired,
};

EmailVerify.MimeTypes = [
	COMMON_PREFIX + 'emailverify',
];

// TODO:
export default function EmailVerify ( { item } ) {
	return (
		<NotificationItemFrame item={item} username={item.creator}>
			{/* Building string to show to the user */}
			<Translate
				localeKey="action" 
				with={{
					badge: item.name,
				}}
			/>
			<Button>
                Verify
			</Button>
		</NotificationItemFrame>
	);   
}