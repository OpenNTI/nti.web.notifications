import { scoped } from '@nti/lib-locale';
import {getService} from  '@nti/web-client';
import { Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../NotificationItemFrame';

import { COMMON_PREFIX } from './Registry';

// String localization
const translation = scoped('nti-notifications.notifications.types.Feedback', {
	action: 'posted feedback on %(t)s',
});

Feedback.propTypes = {
	item: PropTypes.object.isRequired,
};

const Translate = Text.Translator(translation);

Feedback.MimeTypes = [
	COMMON_PREFIX + 'assessment.userscourseassignmenthistoryitemfeedback',
];

export default function Feedback ({ item }) {
	// Get assignment's title
	const assignmentId = item.AssignmentId;
	let assignment = null;
	getService().then(service => {
		service.getObject(assignmentId).then((_assignment) => {
			assignment = _assignment.title;
		});
	});

	return (
		<NotificationItemFrame item={item}>
			{/* Building string to show to the user */}
			<Translate
				localeKey="action"
				with={{
					t: assignment || item.title,
				}}
			/>
		</NotificationItemFrame>
	);
}
