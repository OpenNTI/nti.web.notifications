/* eslint-env jest */

import React from 'react';
import { render, waitFor } from '@testing-library/react';

import Feedback from '../types/Feedback';

describe('Feedback Notification Type', () => {
	test('Feedback item with null assignment', async () => {
		const item = {
			Item: {
				MimeType: 'assessment.userscourseassignmenthistoryitemfeedback',
				title: 'This is the assignment title',
			},
			getLastModified: () => Date.now(),
		};

		const { getByText } = render(<Feedback item={item}></Feedback>);

		expect(
			await waitFor(() =>
				getByText('posted feedback on This is the assignment title')
			)
		).toBeTruthy();
	});
});
