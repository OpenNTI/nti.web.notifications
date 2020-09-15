import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../NotificationItemFrame';

import Registry from './Registry';

// String localization
const translation = scoped('nti-notifications.notifications.types.BlogComment', {
	action: 'commented on a thought %(t)s',
});
const Translate = Text.Translator(translation);

BlogComment.propTypes = {
	item: PropTypes.object.isRequired,
};

Registry.register('application/vnd.nextthought.forums.personalblogcomment')(BlogComment);
export default function BlogComment ({ item }) {
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
