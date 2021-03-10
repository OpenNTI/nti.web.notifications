import PropTypes from 'prop-types';
import React from 'react';

import { String as StringUtils } from '@nti/lib-commons';
import { Text } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';

import NotificationItemFrame from '../frame';

import { COMMON_PREFIX, register } from './Registry';

const { escapeHTML } = StringUtils;

// String localization
const translation = scoped('nti-notifications.notifications.types.ForumTopic', {
	action: 'created a discussion %(t)s',
});

const Translate = Text.Translator(translation);

ForumTopic.propTypes = {
	item: PropTypes.object.isRequired,
};
/* NOTE:
 * The icon for this type of notification uses the creator's avatar URL.
 * When the creator is not a user, it will be an ntiid of the course/community.
 * If the creator is ever set to "system", the avatar will be blank.
 */
ForumTopic.MimeTypes = [
	COMMON_PREFIX + 'forums.communityheadlinetopic',
	COMMON_PREFIX + 'forums.contentheadlinetopic',
	COMMON_PREFIX + 'forums.dflheadlinetopic',
];

register(ForumTopic, 'forumTopic');

export default function ForumTopic({ item }) {
	return (
		<NotificationItemFrame item={item}>
			{/* Building string to show to the user */}
			<Translate
				localeKey="action"
				with={{
					t: escapeHTML(item.Item.title),
				}}
			/>
		</NotificationItemFrame>
	);
}
