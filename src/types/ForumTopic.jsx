import { Text } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../frame';

import { COMMON_PREFIX, register } from './Registry';

// String localization
const translation = scoped('nti-notifications.notifications.types.ForumTopic', {
	action: 'created a discussion %(t)s',
});

const Translate = Text.Translator(translation);

ForumTopic.propTypes = {
	item: PropTypes.object.isRequired,
};

ForumTopic.MimeTypes = [
	COMMON_PREFIX + 'forums.communityheadlinetopic',
	COMMON_PREFIX + 'forums.contentheadlinetopic',
	COMMON_PREFIX + 'forums.dflheadlinetopic',
];

register(ForumTopic, 'forumTopic');

export default function ForumTopic ({ item }) {
	return (
		<NotificationItemFrame item={item}>
			{/* Building string to show to the user */}
			<Translate
				localeKey="action"
				with={{
					t: item.title,
				}}
			/>
		</NotificationItemFrame>
	);
}
