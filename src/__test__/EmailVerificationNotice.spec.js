/* eslint-env jest */
import React from 'react';
import { act } from 'react-dom/test-utils';
import {fireEvent, render} from '@testing-library/react';
import {StoreContextWrapper} from '@nti/lib-store';

import Store from '../Store';
import EmailVerificationNotice from '../types/EmailVerify/EmailVerificationNotice';
import Frame from '../frame/Pinned';


describe('Test Email Verification Notice', () => {
	test('Clicking the notice\'s frame fires up startEmailVerification in store', () => {
		const store = new Store();

		const component = render(
			<StoreContextWrapper store={store}>
				<Frame>
					<div>Test</div>
				</Frame>
			</StoreContextWrapper>
		);

		const frame = component.queryByTestId('pinned-frame');

		fireEvent.click(frame);

		expect(store.get('emailVerificationRequested')).not.toBeNull();
	});

	test('Clicking dismiss anchor should fire up snoozeVerification in store', () => {
		const store = new Store();

		const anchorClicked = jest.fn();

		jest.spyOn(store, 'snoozeVerification').mockImplementation(anchorClicked);

		store.set({
			emailVerificationRequested: false,
			needsVerification: true,
			verificationSnoozed: false,
		});

		jest.useFakeTimers();

		render(
			<StoreContextWrapper store={store}>
				<EmailVerificationNotice />
			</StoreContextWrapper>
		);

		act(() => jest.advanceTimersByTime(1000));

		const dismissAnchor = document.querySelector('.dismiss');
		fireEvent.click(dismissAnchor);

		expect(anchorClicked).toHaveBeenCalled();
	});
});