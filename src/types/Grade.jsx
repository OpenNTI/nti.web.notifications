import { String as StringUtils } from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';
import { Hooks, Presentation, Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../frame';

import { COMMON_PREFIX, register } from './Registry';

const {escapeHTML} = StringUtils;

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

register(Grade, 'grade');

export default function Grade ({ item: {Item: grade}, item }) {

	Hooks.useChanges(grade);
	const {creator} = grade;

	// AssignmentName, CourseName and CatalogEntry are resolved by properties on the grade model...
	// See NTI-9992 for missing values.
	const frameProps = {
		item,
		attribution: creator === 'system' ? <span data-testid="grade-course-name">{grade.CourseName}</span> : creator,
		icon: creator === 'system' ? (
			<Presentation.Asset contentPackage={grade.CatalogEntry} type="thumb">
				<img className="icon" alt={grade.title} />
			</Presentation.Asset>
		) : null,
	};
	return (
		<NotificationItemFrame {...frameProps}>
			<Translate
				localeKey="action"
				with={{
					assignment: escapeHTML(grade.AssignmentName),
				}}
			/>
		</NotificationItemFrame>
	);
}
