
import { Models } from '@nti/lib-interfaces';

import Feedback from '../Feedback';

export default {
	title: 'Feedback',
	component: {},
};

export const FeedbackTemplate = args => {
	const item = {
		...args,
		creator: 'quiz_tester',
		getLastModified: () => {
			return new Date(0);
		},
	};
	return <Feedback item={item} />;
};

FeedbackTemplate.args = {
	assignmentId: 'test_assignment_id',
	title: 'Test Assignment',
	MimeType: Models.assessment.assignment.AssignmentFeedback.MimeType,
};
