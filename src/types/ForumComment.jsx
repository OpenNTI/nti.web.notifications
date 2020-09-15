import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../NotificationItemFrame';

import Registry from './Registry';

// String localization
const translation = scoped('nti-notifications.notifications.types.ForumComment', {
	action: 'commented on a discussion',
});

ForumComment.propTypes = {
	item: PropTypes.object.isRequired,
};

const Translate = Text.Translator(translation);


Registry.register('application/vnd.nextthought.forums.generalforumcomment')(ForumComment);
Registry.register('application/vnd.nextthought.forums.contentforumcomment')(ForumComment);
export default function ForumComment ({ item }) {
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
