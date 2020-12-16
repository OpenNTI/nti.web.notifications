import {Models} from '@nti/lib-interfaces';
import React from 'react';


import Contact from '../Contact';

export default {
	title: 'Contact',
	component: {},
};


export const ContactTemplate = (args) => {
	const item = {
		...args,
		creator: 'quiz_tester',
		getLastModified: () => { return new Date(0); },
	};
	return <Contact item={item} />;
};

ContactTemplate.args = {
	MimeType: Models.entities.User.MimeType,
};
