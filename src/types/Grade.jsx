import { scoped } from '@nti/lib-locale';
import { getService } from '@nti/web-client';
import { Hooks, Presentation, Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../Frame';

import { COMMON_PREFIX, register } from './Registry';

// String localization
const translation = scoped('nti-notifications.notifications.types.Grade', {
	action: 'graded %(assignment)s',
});

const Translate = Text.Translator(translation);

const { useResolver } = Hooks;

Grade.propTypes = {
	item: PropTypes.object.isRequired,
};

Grade.MimeTypes = [
	COMMON_PREFIX + 'grade',
];

register(Grade, 'grade');

async function resolveAssignment (item) {
	const assignmentId = item.AssignmentId;
	const service = await getService();
	const assignment = await service.getObject(assignmentId);

	return assignment;
}

export default function Grade ({ item, item: {creator, Item: grade} }) {
	const assignment = useResolver(() => resolveAssignment(item), [item]);

	Hooks.useChanges(grade);

	const frameProps = {
		item,
		attribution: creator === 'system' ? <span>grade.CourseName</span> : creator,
		icon: creator === 'system' ? (
			<Presentation.Asset contentPackage={grade.CatalogEntry} type="thumb">
				<img className="icon" alt={item.title} />
			</Presentation.Asset>
		) : null,
	};
	return (
		<NotificationItemFrame {...frameProps}>
			<Translate
				localeKey="action"
				with={{
					assignment: assignment?.title ?? item.title,
				}}
			/>
		</NotificationItemFrame>
	);
}
