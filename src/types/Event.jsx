import PropTypes from 'prop-types';
import React from 'react';

import { String as StringUtils } from '@nti/lib-commons';
import { Text } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

import NotificationItemFrame from '../frame';

import { COMMON_PREFIX, register } from './Registry';

const { escapeHTML } = StringUtils;

// String localization
const translation = scoped('nti-notifications.notifications.types.Event', {
	createdAction: 'created an event %(t)s',
	updatedAction: 'updated an event %(t)s',
});

const Translate = Text.Translator(translation);

Event.propTypes = {
	item: PropTypes.object.isRequired,
};

Event.MimeTypes = [COMMON_PREFIX + 'courseware.coursecalendarevent'];

register(Event, 'event');

export default function Event({ item }) {
	let finalAction =
		item.ChangeType === 'Created' ? 'createdAction' : 'updatedAction';

	return (
		<NotificationItemFrame item={item}>
			{/* Building string to show to the user */}
			<Translate
				localeKey={finalAction}
				with={{
					t: escapeHTML(item.Item.name),
				}}
			/>
		</NotificationItemFrame>
	);
}
