import { String as StringUtils } from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../frame';

import { register } from './Registry';

const { escapeHTML } = StringUtils;

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

register(Note, 'note');

export default function Note ({ item }) {
	const {Item: note} = item;
	let finalAction = '';
	if (note.inReplyTo || (note.references || []).length > 0) {
		finalAction = 'action2';
	} else if (note.title) {
		finalAction = 'action3';
	} else {
		finalAction = 'action1';
	}

	return (
		<NotificationItemFrame item={item}>
			<Translate
				localeKey={finalAction}
				with={finalAction === 'action3' && {
					t: escapeHTML(note.title),
				}}
			/>
		</NotificationItemFrame>
	);
}
