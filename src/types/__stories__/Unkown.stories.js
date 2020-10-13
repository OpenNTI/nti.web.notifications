import React from 'react';

import Unknown from '../Unknown';

export default {
	title: 'Unknown',
	component: {},
};


const UnknownTemplate = (args) => {
	const item = {
		...args,
		creator: 'quiz_tester',
		getLastModified: () => { return new Date(0); },
	};
	return <Unknown item={item} />;
};

export const UnkownTypeStory = UnknownTemplate.bind({});
UnkownTypeStory.args = {
	MimeType: 'Something.Something.UnknownType',
};
