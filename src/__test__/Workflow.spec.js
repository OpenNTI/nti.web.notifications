/* eslint-env jest */

import React from 'react';
import {render} from '@testing-library/react';
import {StoreContextWrapper} from '@nti/lib-store';

import Store from '../Store';
import EmailVerificationWorkflow from '../types/EmailVerify/Workflow';

describe('Test the workflow of email verification', () => {
	test('Notice is rendered when correct conditions are met', () => {
		const store = new Store();

		store.set({
			needsVerification: true,
		});

		jest.useFakeTimers();

		const component = render(
			<StoreContextWrapper store={store}>
				<EmailVerificationWorkflow />
			</StoreContextWrapper>
		);

		act(() => jest.advanceTimersByTime(1000));

		expect(component.queryByTestId('email-verification-notice')).toBeTruthy();

		store.set({needsVerification: false});

		component.rerender(
			<StoreContextWrapper store={store}>
				<EmailVerificationWorkflow />
			</StoreContextWrapper>
		);

		expect(component.queryByTestId('email-verification-notice')).toBeNull();
	});

	test('Email verify dialog is rendered when correct conditions are met', () => {
		const store = new Store();

		store.set({
			needsVerification: true,
			emailVerificationRequested: true,
		});

		const component = render(
			<StoreContextWrapper store={store}>
				<EmailVerificationWorkflow />
			</StoreContextWrapper>
		);

		expect(component.queryByTestId('email-verify-dialog')).toBeTruthy();

		store.set({
			emailVerificationRequested: true,
			needsVerification: false,
		});

		component.rerender(
			<StoreContextWrapper store={store}>
				<EmailVerificationWorkflow />
			</StoreContextWrapper>
		);

		expect(component.queryByTestId('email-verify-dialog')).toBeNull();

		store.set({
			emailVerificationRequested: false,
			needsVerification: true,
		});

		component.rerender(
			<StoreContextWrapper store={store}>
				<EmailVerificationWorkflow />
			</StoreContextWrapper>
		);

		expect(component.queryByTestId('email-verify-dialog')).toBeNull();
	});

	test('Congrats prompt renders under correct conditions', () => {
		const store = new Store();

		store.set({
			completedDate: null,
			verifiedDate: Date.now() - 1000,
		});

		const component = render(
			<StoreContextWrapper store={store}>
				<EmailVerificationWorkflow />
			</StoreContextWrapper>
		);

		expect(component.queryByTestId('congrats-prompt')).toBeTruthy();

		store.set({
			completedDate: Date.now(),
		});

		component.rerender(
			<StoreContextWrapper store={store}>
				<EmailVerificationWorkflow />
			</StoreContextWrapper>
		);

		expect(component.queryByTestId('congrats-prompt')).toBeNull();

		store.set({
			completedDate: null,
			verifiedDate: null,
		});

		component.rerender(
			<StoreContextWrapper store={store}>
				<EmailVerificationWorkflow />
			</StoreContextWrapper>
		);

		expect(component.queryByTestId('congrats-prompt')).toBeNull();
	});
});
