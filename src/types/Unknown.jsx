import { Text } from '@nti/web-commons';
import { scoped } from '@nti/lib-locale';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../frame';

// String localization
const translation = scoped('nti-notifications.notifications.types.Unknown', {
	unknownString: 'Unknown %(t)s',
});

const Translate = Text.Translator(translation);

Unknown.propTypes = {
	item: PropTypes.object.isRequired,
};

export default function Unknown ({ item }) {
	const type = item.MimeType && item.MimeType.match(/[a-zA-Z]*$/gm);
	return (
		<NotificationItemFrame item={item} username={'no-username'}>
			{/* Building string to show to the user */}
			<Translate
				localeKey="unknownString"
				with={{
					t: type,
				}}
			/>
		</NotificationItemFrame>
	);
}
