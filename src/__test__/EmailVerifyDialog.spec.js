/* eslint-env jest */
import React from 'react';
import { render, waitFor } from '@testing-library/react';

import { FakeStore } from '@nti/lib-store';
import { setupTestClient } from '@nti/web-client/test-utils';

import Store from '../Store';
import EmailVerify from '../types/EmailVerify/EmailVerifyDialog';

describe('Test email verify component', () => {
	test('Dialog is not rendered when needsVerification is false', async () => {
		const store = new Store();

		store.set({
			needsVerification: false,
			verifiedDate: null,
		});

		let element;

		await waitFor(() => {
			element = render(
				<FakeStore mock={store}>
					<EmailVerify onDismiss={() => {}} user={{}} />
				</FakeStore>
			);
		});

		expect(element.queryByTestId('prompt')).toBeNull();
	});
	test('Dialog is not rendered when verifiedDate is set and not null', async () => {
		const store = new Store();

		store.set({
			needsVerification: true,
			verifiedDate: Date.now(),
		});

		let element;

		await waitFor(() => {
			element = render(
				<FakeStore mock={store}>
					<EmailVerify onDismiss={() => {}} user={{}} />
				</FakeStore>
			);
		});

		expect(element.queryByTestId('prompt')).toBeNull();
	});

	test('Dialog is rendered when needsVerification is true and verifiedDate is null', async () => {
		const getAppUser = jest.fn().mockImplementation(() => {
			return {
				email: 'test@test.com',
			};
		});

		setupTestClient({ getAppUser });

		const store = new Store();

		store.set({
			needsVerification: true,
			verifiedDate: null,
		});

		let component;

		await waitFor(() => {
			component = render(
				<FakeStore mock={store}>
					<EmailVerify onDismiss={() => {}} />
				</FakeStore>
			);
		});

		expect(await waitFor(() => component.getByText('Submit'))).toBeTruthy();
	});
});
