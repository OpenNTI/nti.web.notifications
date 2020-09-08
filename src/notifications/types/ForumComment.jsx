import { scoped } from '@nti/lib-locale';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../NotificationItemFrame';

// String localization
const translation = scoped('nti-notifications.notifications.types.ForumComment', {
	action: 'commented on a discussion',
});

ForumComment.propTypes = {
	item: PropTypes.object.isRequired,
};

export default function ForumComment ({ item }) {
	return (
		<NotificationItemFrame item={item}>
			{/* Building string to show to the user */}
			<span>{translation('action')}</span>
		</NotificationItemFrame>
	);
}
