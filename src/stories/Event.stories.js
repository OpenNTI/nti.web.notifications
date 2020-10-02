import {Models} from '@nti/lib-interfaces';
import React from 'react';

import { getComponent } from '../types';

export default {
	title: 'Event',
	component: {},
};


export const EventTemplate = (args) => {
	const item = {
		...args,
		creator: 'quiz_tester',
		getLastModified: () => { return new Date(0); },
	};
	return React.createElement(getComponent(item), { item });
};

EventTemplate.args = {
	name: 'Test title',
	MimeType: Models.calendar.CourseCalendarEvent.MimeType,
};
