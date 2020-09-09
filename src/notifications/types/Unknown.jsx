import { scoped } from '@nti/lib-locale';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../NotificationItemFrame';

// String localization
const translation = scoped('nti-notifications.notifications.types.Unknown', {
	unknownString: 'Unknown ',
});

Unknown.propTypes = {
	item: PropTypes.object.isRequired,
};

export default function Unknown ({ item }) {
	console.log(item);
	const type = item.MimeType.match(/[a-zA-Z]*$/gm);
	return (
		<NotificationItemFrame item={item}>
			{/* Building string to show to the user */}
			<span>{translation('unknownString') + type}</span>
		</NotificationItemFrame>
	);
}
