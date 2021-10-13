/* eslint-env jest */

import { render } from '@testing-library/react';

import Note from '../types/Note';

describe('Test Note', () => {
	test('Test note', () => {
		const itemInReplyTo = {
			Item: {
				MimeType: 'note',
				inReplyTo: 'user',
			},
			getLastModified: () => Date.now(),
		};

		const { rerender, getByText } = render(
			<Note item={itemInReplyTo}></Note>
		);

		expect(getByText('commented on a note')).toBeTruthy();

		const sharedWithTitle = {
			Item: {
				MimeType: 'note',
				title: 'Note Title',
			},
			getLastModified: () => Date.now(),
		};

		rerender(<Note item={sharedWithTitle}></Note>);

		expect(getByText('shared a note: Note Title')).toBeTruthy();

		const sharedWithoutTitle = {
			Item: {
				MimeType: 'note',
			},
			getLastModified: () => Date.now(),
		};

		rerender(<Note item={sharedWithoutTitle}></Note>);
		expect(getByText('shared a note')).toBeTruthy();
	});
});
