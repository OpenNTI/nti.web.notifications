import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../NotificationItemFrame';

import { COMMON_PREFIX } from './Registry';


// String localization
const translation = scoped('nti-notifications.notifications.types.Contact', {
	action: 'added you as a contact',
});

const Translate = Text.Translator(translation);

Contact.propTypes = {
	item: PropTypes.object.isRequired,
};

Contact.MimeTypes = [
	COMMON_PREFIX + 'user',
];

export default function Contact ({ item }) {
	return (
		<NotificationItemFrame item={item}>
			{/* Building string to show to the user */}
			<Translate localeKey="action"/>
		</NotificationItemFrame>
	);
}
