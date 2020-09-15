import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../NotificationItemFrame';

import Registry from './Registry';


// String localization
const translation = scoped('nti-notifications.notifications.types.Contact', {
	action: 'added you as a contact',
});

const Translate = Text.Translator(translation);

Contact.propTypes = {
	item: PropTypes.object.isRequired,
};

Registry.register('application/vnd.nextthought.user')(Contact);
export default function Contact ({ item }) {
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
