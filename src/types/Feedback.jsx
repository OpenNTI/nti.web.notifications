import { scoped } from '@nti/lib-locale';
import {getService} from  '@nti/web-client';
import { Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import NotificationItemFrame from '../frame';

import { COMMON_PREFIX, register } from './Registry';

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

async function resolveAssignment (item, apply) {
	const assignmentId = item.AssignmentId;
	const service = await getService();
	apply(await service.getObject(assignmentId));
}

register(Feedback, 'feedback');

export default function Feedback ({ item }) {
	const [assignment, setAssignment] = useState('');

	useEffect(() => {
		resolveAssignment(item, setAssignment);
	}, [assignment]);

	return (
		<NotificationItemFrame item={item}>
			{/* Building string to show to the user */}
			<Translate
				localeKey="action"
				with={{
					t: assignment.title || item.title,
				}}
			/>
		</NotificationItemFrame>
	);
}
