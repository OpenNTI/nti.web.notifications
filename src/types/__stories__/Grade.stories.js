import { Models } from '@nti/lib-interfaces';
import React from 'react';

import Grade from '../Grade';

export default {
	title: 'Grade',
	component: {},
};

export const GradeTemplate = args => {
	const item = {
		...args,
		getLastModified: () => {
			return new Date(0);
		},
	};
	return <Grade item={item} />;
};

GradeTemplate.args = {
	Creator: 'system',
	AssignmentId: 'test_assignment_id',
	title: 'Test Assignment',
	MimeType: Models.courses.Grade.MimeType,
};
