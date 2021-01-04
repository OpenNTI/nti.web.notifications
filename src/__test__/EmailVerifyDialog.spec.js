/* eslint-env jest */
import React from 'react';
import {render, waitFor} from '@testing-library/react';
import {FakeStore} from '@nti/lib-store';

import Store from '../Store';
import EmailVerify from '../types/EmailVerify/EmailVerifyDialog';

import useMockServer from './utils/use-mock-server';

describe('Test email verify component', () => {
	test('Dialog is not rendered when needsVerification is false', () => {
		const store = new Store();

		store.set({
			needsVerification: false,
			verifiedDate: null,
		});

		const element = render(
			<FakeStore mock={store}>
				<EmailVerify onDismiss={() => {}} user={{}} />
			</FakeStore>
		);

		expect(element.queryByTestId('prompt')).toBeNull();
	});
	test('Dialog is not rendered when verifiedDate is set and not null', () => {
		const store = new Store();

		store.set({
			needsVerification: true,
			verifiedDate: Date.now(),
		});

		const element = render(
			<FakeStore mock={store}>
				<EmailVerify onDismiss={() => {}} user={{}} />
			</FakeStore>
		);

		expect(element.queryByTestId('prompt')).toBeNull();
	});

	test('Dialog is rendered when needsVerification is true and verifiedDate is null', async () => {
		const getAppUser = jest.fn().mockImplementation(() => {
			return {
				email: 'test@test.com'
			};
		});

		useMockServer({getAppUser});

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
