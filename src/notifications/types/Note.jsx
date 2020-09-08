import { scoped } from '@nti/lib-locale';
import PropTypes from 'prop-types';
import React from 'react';
import NotificationItemFrame from '../NotificationItemFrame';

// String localization
const translation = scoped('nti-notifications.notifications.types.Note', {
	action1: 'shared a note',
	action2: 'commented on a note',
	action3: 'shared a note: ',
});

Note.propTypes = {
	item: PropTypes.object.isRequired,
};

export default function Note ({ item }) {
	let finalAction = '';
	if (item.inReplyTo || (item.references || []).length > 0) {
		finalAction = translation('action2');
	} else if (item.title) {
		finalAction = translation('action3') + item.title;
	} else {
		finalAction = translation('action1');
	}

	return (
		<NotificationItemFrame item={item}>
			<span>{finalAction}</span>
		</NotificationItemFrame>
	);
}
