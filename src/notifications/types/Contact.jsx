import { scoped } from '@nti/lib-locale';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../NotificationItemFrame';

// String localization
const translation = scoped('nti-notifications.notifications.types.Contact', {
	action: 'added you as a contact',
});

Contact.propTypes = {
	item: PropTypes.object.isRequired,
};

export default function Contact ({ item }) {
	return (
		<NotificationItemFrame item={item}>
			{/* Building string to show to the user */}
			<span>{translation('action')}</span>
		</NotificationItemFrame>
	);
}
