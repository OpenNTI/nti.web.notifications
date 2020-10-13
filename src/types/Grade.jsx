import { scoped } from '@nti/lib-locale';
import { getService } from '@nti/web-client';
import { Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React, { useEffect , useState } from 'react';

import NotificationItemFrame from '../frame';

import { COMMON_PREFIX } from './Registry';

// String localization
const translation = scoped('nti-notifications.notifications.types.Grade', {
	action: 'graded %(assignment)s',
});

const Translate = Text.Translator(translation);

Grade.propTypes = {
	item: PropTypes.object.isRequired,
};

Grade.MimeTypes = [
	COMMON_PREFIX + 'grade',
];

async function resolveAssignment (item, apply) {
	const assignmentId = item.AssignmentId;
	const service = await getService();
	apply(await service.getObject(assignmentId));
}

export default function Grade ({ item }) {
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
					assignment: assignment.title || item.title,
				}}
			/>
		</NotificationItemFrame>
	);
}
