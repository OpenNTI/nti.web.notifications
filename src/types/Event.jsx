import { Text } from '@nti/web-commons';
import { scoped } from "@nti/lib-locale";
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../NotificationItemFrame';

import Registry from './Registry';

// String localization
const translation = scoped('nti-notifications.notifications.types.Event', {
	createdAction: 'created an event %(t)s',
	updatedAction: 'updated an event %(t)s',
});

Event.propTypes = {
	item: PropTypes.object.isRequired,
};

const Translate = Text.Translator(translation);

Registry.register('application/vnd.nextthought.courseware.coursecalendarevent')(Event);
export default function Event ({ item }) {
	let finalAction = item.ChangeType === 'Created' ? translation('createdAction') : translation('updatedAction');

	return (
		<NotificationItemFrame item={item}>
			{/* Building string to show to the user */}
			<Translate
				localeKey={finalAction}
				with={{
					t: item.title,
				}}
			/>
		</NotificationItemFrame>
	);
}
