import { Text } from '@nti/web-commons';
import { scoped } from "@nti/lib-locale";
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../NotificationItemFrame';

import Registry from './Registry';

// String localization
const translation = scoped('nti-notifications.notifications.types.Feedback', {
	action: 'posted feedback on %(t)s',
});

Feedback.propTypes = {
	item: PropTypes.object.isRequired,
};

const Translate = Text.Translator(translation);

Registry.register('application/vnd.nextthought.assessment.userscourseassignmenthistoryitemfeedback')(Feedback);
export default function Feedback ({ item }) {
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
