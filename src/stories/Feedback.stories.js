import {Models} from '@nti/lib-interfaces';
import React from 'react';

import { getComponent } from '../types';

export default {
	title: 'Feedback',
	component: {},
};

// Ensure AppConfig variable is defined.
window.$AppConfig = window.$AppConfig || { server: '/dataserver2/' };

export const FeedbackTemplate = (args) => {
	const item = {
		...args,
		creator: 'quiz_tester',
		getLastModified: () => { return new Date(0); },
		
	};
	return React.createElement(getComponent(item), { item });
};

FeedbackTemplate.args = {
	assignmentId: 'test_assignment_id',
	title: 'Test title',
	MimeType: Models.assessment.assignment.AssignmentFeedback.MimeType,
};