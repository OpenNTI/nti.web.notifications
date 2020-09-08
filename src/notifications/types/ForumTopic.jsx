import { scoped } from '@nti/lib-locale';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../NotificationItemFrame';

// String localization
const translation = scoped('nti-notifications.notifications.types.ForumTopic', {
	action: 'created a discussion ',
});

ForumTopic.propTypes = {
	item: PropTypes.object.isRequired,
};

export default function ForumTopic ({ item }) {
	return (
		<NotificationItemFrame item={item}>
			{/* Building string to show to the user */}
			<span>{translation('action') + item.title}</span>
		</NotificationItemFrame>
	);
}
