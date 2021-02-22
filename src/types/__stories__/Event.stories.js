import { Models } from '@nti/lib-interfaces';
import React from 'react';

import Event from '../Event';

export default {
	title: 'Event',
	component: {},
};

export const EventTemplate = args => {
	const item = {
		...args,
		creator: 'quiz_tester',
		getLastModified: () => {
			return new Date(0);
		},
	};
	return <Event item={item} />;
};

EventTemplate.args = {
	name: 'Test title',
	MimeType: Models.calendar.CourseCalendarEvent.MimeType,
};
