
import { Models } from '@nti/lib-interfaces';

import Note from '../Note';

export default {
	title: 'Note',
	component: {},
};

export const NoteTemplate = args => {
	const item = {
		...args,
		creator: 'quiz_tester',
		getLastModified: () => {
			return new Date(0);
		},
	};
	return <Note item={item} />;
};

NoteTemplate.args = {
	MimeType: Models.annotations.Note.MimeType,
	title: '',
	inReplyTo: '',
};

export const InReplyToStory = NoteTemplate.bind({});
InReplyToStory.args = {
	inReplyTo: 'Test User',
	MimeType: Models.annotations.Note.MimeType,
};

export const SharedNoteWithNameStory = NoteTemplate.bind({});
SharedNoteWithNameStory.args = {
	title: 'Test Note',
	MimeType: Models.annotations.Note.MimeType,
};

export const SharedNoteWithoutNameStory = NoteTemplate.bind({});
SharedNoteWithoutNameStory.args = {
	title: null,
	MimeType: Models.annotations.Note.MimeType,
};
