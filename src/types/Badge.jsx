import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../frame';

import { COMMON_PREFIX, register } from './Registry';

// String localization
const translation = scoped('nti-notifications.notifications.types.Badge', {
	action: 'awarded you %(badge)s',
});

const Translate = Text.Translator(translation);

Badge.propTypes = {
	item: PropTypes.object.isRequired,
};

Badge.MimeTypes = [
	COMMON_PREFIX + 'badge',
	COMMON_PREFIX + 'openbadges.badge',
];

register(Badge, 'badge');

export default function Badge ( { item } ) {
	return (
		<NotificationItemFrame item={item} attribution={item.creator}>
			{/* Building string to show to the user */}
			<Translate
				localeKey="action"
				with={{
					badge: item.name,
				}}
			/>
		</NotificationItemFrame>
	);
}
