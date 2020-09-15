import { Text } from '@nti/web-commons';
import { scoped } from "@nti/lib-locale";
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../NotificationItemFrame';

import Registry from './Registry';

// String localization
const translation = scoped('nti-notifications.notifications.types.ForumTopic', {
	action: 'created a discussion %(t)s',
});

const Translate = Text.Translator(translation);

ForumTopic.propTypes = {
	item: PropTypes.object.isRequired,
};

Registry.register('application/vnd.nextthought.forums.communityheadlinetopic')(ForumTopic);
Registry.register('application/vnd.nextthought.forums.contentheadlinetopic')(ForumTopic);
Registry.register('application/vnd.nextthought.forums.dflheadlinetopic')(ForumTopic);
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
