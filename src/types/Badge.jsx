import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../NotificationItemFrame';

import Registry from './Registry';

// String localization
const translation = scoped('nti-notifications.notifications.types.Badge', {
	action: 'awarded you %(badge)s',
});

const Translate = Text.Translator(translation);

Badge.propTypes = {
	item: PropTypes.object.isRequired,
};

Registry.register('application/vnd.nextthought.openbadges.badge')(Badge);
export default function Badge ( { item } ) {
	return (
		<NotificationItemFrame item={item}>
			{/* Building string to show to the user */}
			<Translate
				localeKey="action" 
				with={{
					badge: item.title,
				}}
			/>
		</NotificationItemFrame>
	);   
}