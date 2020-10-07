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

export default function Grade ({ item }) {
	const [assignment, setAssignment] = useState('');
	const assignmentId = item.AssignmentId;
	// Get assignment's title
	const getAssignment = async () => {
		const service = await getService();
		const assignmentTitle = service.getObject(assignmentId).title;
		setAssignment(assignmentTitle);
	};
	
	useEffect(() => {
		if (!assignment && assignmentId) {
			getAssignment();
		}
	}, []);

	return (
		<NotificationItemFrame item={item}>
			{/* Building string to show to the user */}
			<Translate
				localeKey="action"
				with={{
					assignment: item.title || assignment,
				}}
			/>
		</NotificationItemFrame>
	);
}
