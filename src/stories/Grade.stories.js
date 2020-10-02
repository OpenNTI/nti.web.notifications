import {Models} from '@nti/lib-interfaces';
import React from 'react';

import { getComponent } from '../types';

export default {
	title: 'Grade',
	component: {},
};


export const GradeTemplate = (args) => {
	const item = {
		...args,
		getLastModified: () => { return new Date(0); },
	};
	return React.createElement(getComponent(item), { item });
};

GradeTemplate.args = {
	Creator: 'system',
	AssignmentId: 'test_assignment_id',
	title: 'Test Assignment',
	MimeType: Models.courses.Grade.MimeType,
};
