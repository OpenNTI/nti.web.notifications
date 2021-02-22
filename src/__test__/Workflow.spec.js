/* eslint-env jest */

import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, waitFor } from '@testing-library/react';
import { FakeStore } from '@nti/lib-store';

import Store from '../Store';
import EmailVerificationWorkflow from '../types/EmailVerify/Workflow';

import useMockServer from './utils/use-mock-server';

describe('Test the workflow of email verification', () => {
	test('Notice is rendered when correct conditions are met', () => {
		const store = new Store();

		store.set({
			needsVerification: true,
		});

		jest.useFakeTimers();

		const component = render(
			<FakeStore mock={store}>
				<EmailVerificationWorkflow />
			</FakeStore>
		);

		act(() => jest.advanceTimersByTime(1000));

		expect(
			component.queryByTestId('email-verification-notice')
		).toBeTruthy();

		store.set({ needsVerification: false });

		component.rerender(
			<FakeStore mock={store}>
				<EmailVerificationWorkflow />
			</FakeStore>
		);

		expect(component.queryByTestId('email-verification-notice')).toBeNull();
	});

	test('Email verify dialog is rendered when correct conditions are met', async () => {
		const getAppUser = jest.fn().mockImplementation(() => {
			return {
				email: 'test@test.com',
			};
		});

		useMockServer({ getAppUser });

		const store = new Store();

		store.set({
			needsVerification: true,
			emailVerificationRequested: true,
			verifiedDate: null,
		});

		let component;

		await waitFor(() => {
			component = render(
				<FakeStore mock={store}>
					<EmailVerificationWorkflow />
				</FakeStore>
			);
		});

		expect(component.queryByTestId('email-verify-dialog')).toBeTruthy();

		store.set({
			emailVerificationRequested: true,
			needsVerification: false,
		});

		component.rerender(
			<FakeStore mock={store}>
				<EmailVerificationWorkflow />
			</FakeStore>
		);

		expect(component.queryByTestId('email-verify-dialog')).toBeNull();

		store.set({
			emailVerificationRequested: false,
			needsVerification: true,
		});

		component.rerender(
			<FakeStore mock={store}>
				<EmailVerificationWorkflow />
			</FakeStore>
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
			<FakeStore mock={store}>
				<EmailVerificationWorkflow />
			</FakeStore>
		);

		expect(component.queryByTestId('congrats-prompt')).toBeTruthy();

		store.set({
			completedDate: Date.now(),
		});

		component.rerender(
			<FakeStore mock={store}>
				<EmailVerificationWorkflow />
			</FakeStore>
		);

		expect(component.queryByTestId('congrats-prompt')).toBeNull();

		store.set({
			completedDate: null,
			verifiedDate: null,
		});

		component.rerender(
			<FakeStore mock={store}>
				<EmailVerificationWorkflow />
			</FakeStore>
		);

		expect(component.queryByTestId('congrats-prompt')).toBeNull();
	});
});
