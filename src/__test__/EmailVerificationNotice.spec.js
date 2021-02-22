/* eslint-env jest */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, render } from '@testing-library/react';
import { FakeStore } from '@nti/lib-store';

import Store from '../Store';
import EmailVerificationNotice from '../types/EmailVerify/EmailVerificationNotice';

import useMockServer from './utils/use-mock-server';

describe('Test Email Verification Notice', () => {
	useMockServer({
		getAppUser: () => Promise.resolve({ email: '...' }),
	});

	test("Clicking the notice's frame fires up startEmailVerification in store", () => {
		jest.useFakeTimers();
		const store = new Store();

		store.set({
			emailVerificationRequested: false,
			needsVerification: true,
			verificationSnoozed: false,
		});

		const component = render(
			<FakeStore mock={store}>
				<EmailVerificationNotice />
			</FakeStore>
		);

		act(() => jest.advanceTimersByTime(1000));

		const frame = component.queryByTestId('email-verification-notice');

		fireEvent.click(frame);

		expect(store.get('emailVerificationRequested')).not.toBeNull();
	});

	test('Clicking dismiss anchor should fire up snoozeVerification in store', () => {
		jest.useFakeTimers();
		const store = new Store();

		const anchorClicked = jest.fn();

		jest.spyOn(store, 'snoozeVerification').mockImplementation(
			anchorClicked
		);

		store.set({
			emailVerificationRequested: false,
			needsVerification: true,
			verificationSnoozed: false,
		});

		render(
			<FakeStore mock={store}>
				<EmailVerificationNotice />
			</FakeStore>
		);

		act(() => jest.advanceTimersByTime(1000));

		const dismissAnchor = document.querySelector('.dismiss');
		fireEvent.click(dismissAnchor);

		expect(anchorClicked).toHaveBeenCalled();
	});
});
