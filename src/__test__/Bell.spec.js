/* eslint-env jest */
import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import Bell from '../Bell';

describe('Test Bell component', () => {
	test('On click prop works', () => {
		const clicked = jest.fn();

		const { container } = render(<Bell count={1} onClick={clicked} />);

		const bellElement = container.querySelector('.bell');

		fireEvent.click(bellElement);

		expect(clicked).toHaveBeenCalled();
	});
});
