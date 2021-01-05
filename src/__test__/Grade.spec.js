/* eslint-env jest */
import React from 'react';
import {render} from '@testing-library/react';
import {Hooks, Presentation} from '@nti/web-commons';

import Grade from '../types/Grade';

describe('Test Grade Notification Type', () => {
	test('Creator is system', () => {
		const item = {
			Item: {
				creator: 'system',
				AssignmentName: 'Assignment Name',
				CourseName: 'Course Name',
				MimeType: 'grade',
				CatalogEntry: 'test',
			},
			getLastModified: () => Date.now(),
		};

		jest.spyOn(Hooks, 'useChanges').mockImplementation(() => {});

		jest.spyOn(Presentation, 'Asset').mockImplementation(() => (<div data-testid="grade-creator-icon">Icon</div>));

		const element = render(<Grade item={item}></Grade>);

		expect(element.queryByTestId('grade-creator-icon')).toBeTruthy();

		expect(element.queryByTestId('grade-course-name')).toBeTruthy();
	});
});
