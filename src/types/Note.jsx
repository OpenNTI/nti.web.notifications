import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../NotificationItemFrame';

import { COMMON_PREFIX } from './Registry';

// String localization
const translation = scoped('nti-notifications.notifications.types.Note', {
	action1: 'shared a note',
	action2: 'commented on a note',
	action3: 'shared a note: %(t)s',
});

const Translate = Text.Translator(translation);

Note.propTypes = {
	item: PropTypes.object.isRequired,
};

Note.MimeTypes = [
	COMMON_PREFIX + 'note',
];

export default function Note ({ item }) {
	let finalAction = '';
	if (item.inReplyTo || (item.references || []).length > 0) {
		finalAction = 'action2';
	} else if (item.title) {
		finalAction = 'action3';
	} else {
		finalAction = 'action1';
	}

	return (
		<NotificationItemFrame item={item}>
			<Translate
				localeKey={finalAction}
				with={finalAction === 'action3' && {
					t: item.title,
				}}
			/>
		</NotificationItemFrame>
	);
}
