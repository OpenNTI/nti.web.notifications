import { scoped } from '@nti/lib-locale';
import { String as StringUtils } from '@nti/lib-commons';
import { getService } from '@nti/web-client';
import { Hooks, Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../frame';

import { COMMON_PREFIX, register } from './Registry';

const { escapeHTML } = StringUtils;

const translation = scoped('nti-notifications.notifications.types.Feedback', {
	action: 'posted feedback on %(t)s',
});

const Translate = Text.Translator(translation);

const { useResolver } = Hooks;

Feedback.propTypes = {
	item: PropTypes.object.isRequired,
};

Feedback.MimeTypes = [
	COMMON_PREFIX + 'assessment.userscourseassignmenthistoryitemfeedback',
];

register(Feedback, 'feedback');

async function resolveAssignment(item) {
	const assignmentId = item.AssignmentId;
	const service = await getService();
	const assignment = await service.getObject(assignmentId);

	return assignment;
}

export default function Feedback({ item }) {
	const assignment = useResolver(() => resolveAssignment(item?.Item), [
		item?.Item,
	]);

	return (
		<NotificationItemFrame item={item}>
			{/* Building string to show to the user */}
			<Translate
				localeKey="action"
				with={{
					t: escapeHTML(assignment?.title ?? item.Item.title),
				}}
			/>
		</NotificationItemFrame>
	);
}
