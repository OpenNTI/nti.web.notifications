import { scoped } from '@nti/lib-locale';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../NotificationItemFrame';

// String localization
const translation = scoped('nti-notifications.notifications.types.Event', {
	createdAction: 'created an event ',
	updatedAction: 'updated an event ',
});

Event.propTypes = {
	item: PropTypes.object.isRequired,
};

export default function Event ({ item }) {
	let finalAction = item.ChangeType === 'Created' ? translation('createdAction') : translation('updatedAction');

	return (
		<NotificationItemFrame item={item}>
			{/* Building string to show to the user */}
			<span>{finalAction + item.title}</span>
		</NotificationItemFrame>
	);
}
