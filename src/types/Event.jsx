import { Text } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../frame';

import { COMMON_PREFIX } from './Registry';

// String localization
const translation = scoped('nti-notifications.notifications.types.Event', {
	createdAction: 'created an event %(t)s',
	updatedAction: 'updated an event %(t)s',
});

const Translate = Text.Translator(translation);

Event.propTypes = {
	item: PropTypes.object.isRequired,
};

Event.MimeTypes = [
	COMMON_PREFIX + 'courseware.coursecalendarevent',
];

export default function Event ({ item }) {
	let finalAction = item.ChangeType === 'Created' ? 'createdAction' : 'updatedAction';

	return (
		<NotificationItemFrame item={item}>
			{/* Building string to show to the user */}
			<Translate
				localeKey={finalAction}
				with={{
					t: item.name,
				}}
			/>
		</NotificationItemFrame>
	);
}
