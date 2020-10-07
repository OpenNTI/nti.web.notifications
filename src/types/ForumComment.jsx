import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../frame';

import { COMMON_PREFIX } from './Registry';

// String localization
const translation = scoped('nti-notifications.notifications.types.ForumComment', {
	action: 'commented on a discussion',
});

const Translate = Text.Translator(translation);

ForumComment.propTypes = {
	item: PropTypes.object.isRequired,
};

ForumComment.MimeTypes = [
	COMMON_PREFIX + 'forums.generalforumcomment',
	COMMON_PREFIX + 'forums.contentforumcomment',
];

export default function ForumComment ({ item }) {
	return (
		<NotificationItemFrame item={item}>
			{/* Building string to show to the user */}
			<Translate localeKey="action"/>
		</NotificationItemFrame>
	);
}
