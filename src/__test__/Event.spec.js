/* eslint-env jest */

import { render } from '@testing-library/react';

import Event from '../types/Event';

describe('Event Notification Type', () => {
	test('Create event vs update event', () => {
		const createdItem = {
			Item: {
				name: 'Example',
				MimeType: 'courseware.coursecalendarevent',
			},
			getLastModified: () => Date.now(),
			ChangeType: 'Created',
		};

		const updatedItem = {
			...createdItem,
			ChangeType: 'Updated',
		};

		const { getByText } = render(<Event item={createdItem}></Event>);

		expect(getByText('created an event Example')).toBeTruthy();

		const { getByText: getByTextUpdated } = render(
			<Event item={updatedItem}></Event>
		);

		expect(getByTextUpdated('updated an event Example')).toBeTruthy();
	});
});
