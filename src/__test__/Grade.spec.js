/* eslint-env jest */
import { render } from '@testing-library/react';

import Grade from '../types/Grade';

describe('Test Grade Notification Type', () => {
	test('Creator is system', () => {
		const item = {
			Item: {
				creator: 'system',
				AssignmentName: 'Assignment Name',
				CourseName: 'Course Name',
				MimeType: 'grade',
				CatalogEntry: {},
			},
			getLastModified: () => new Date(),
		};

		const element = render(<Grade item={item}></Grade>);

		expect(element.container.querySelector('.icon')).toBeTruthy();

		expect(element.queryByTestId('grade-course-name')).toBeTruthy();
	});
});
