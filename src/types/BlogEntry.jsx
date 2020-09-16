import { Text } from '@nti/web-commons';
import { scoped } from "@nti/lib-locale";
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../NotificationItemFrame';

import Registry from './Registry';

// String localization
const translation = scoped('nti-notifications.notifications.types.BlogEntry', {
	action: 'created a thought %(t)s',
});
const Translate = Text.Translator(translation);

BlogEntry.propTypes = {
	item: PropTypes.object.isRequired,
};

Registry.register('application/vnd.nextthought.forums.personalblogentry', BlogEntry);
export default function BlogEntry ({ item }) {
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
