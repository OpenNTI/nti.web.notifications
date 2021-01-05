/* eslint-env jest */
import React from 'react';
import { act } from 'react-dom/test-utils';
import {fireEvent, render, waitFor} from '@testing-library/react';

import EmailVerifyPrompt from '../types/EmailVerify/prompts/Verify';
import * as EmailVerifyUtils from '../types/EmailVerify/utils';

describe('Test Email Verify Prompt', () => {
	test('Email sending states are correct', async () => {
		jest.spyOn(EmailVerifyUtils, 'sendEmailVerification').mockImplementation(() => true);

		let component;

		act(() => {
			component = render(
				<EmailVerifyPrompt user={{email: 'test'}} onTokenSubmission={() => {}}/>
			);
		});

		let element = component.getByText('Send another email');

		fireEvent.click(element);

		expect(component.getByText('Sending...')).toBeTruthy();

		await waitFor(() => expect(component.getByText('Sent!')).toBeTruthy());

		await waitFor(() => expect(component.getByText('Send another email')).toBeTruthy());
	});

	test('Clicking on change email renders change email dialog', async () => {
		let component;

		act(() => {
			component = render(
				<EmailVerifyPrompt user={{email: 'test'}} onTokenSubmission={() => {}}/>
			);
		});

		let element = component.getByText('Change email address');

		fireEvent.click(element);

		await waitFor(() => expect(component.getByText('Update Email Address')).toBeTruthy());
	});

	test('Clicking on "Back to Email Verification" renders verify dialog', async () => {
		let component;

		act(() => {
			component = render(
				<EmailVerifyPrompt user={{email: 'test'}} onTokenSubmission={() => {}}/>
			);
		});

		let element = component.getByText('Change email address');

		fireEvent.click(element);

		element = component.getByText('Back to Email Verification');

		fireEvent.click(element);

		await waitFor(() => expect(component.getByText('Verify Your Email')).toBeTruthy());
	});

	test('Submitting a correct email should successfully change the email, send another email, and render the verify email dialog', async () => {
		const user = {
			email: 'test',
			save: async () => {
				return true;
			}
		};

		jest.spyOn(EmailVerifyUtils, 'sendEmailVerification').mockImplementation();

		let component;

		act(() => {
			component = render(
				<EmailVerifyPrompt user={user} onTokenSubmission={() => {}}/>
			);
		});

		const form = component.container.querySelector('form');

		fireEvent.submit(form);

		await waitFor(() => expect(component.getByText('Change email address')).toBeTruthy());

		await waitFor(() => expect(EmailVerifyUtils.sendEmailVerification).toHaveBeenCalled());
	});

	test('Submitting the token should call onTokenSubmission prop', async () => {
		const onTokenSubmissionMock = jest.fn();

		let component;

		act(() => {
			component = render(
				<EmailVerifyPrompt user={{}} onTokenSubmission={onTokenSubmissionMock}/>
			);
		});

		let form = component.container.querySelector('form');

		fireEvent.submit(form);

		await waitFor(() => expect(onTokenSubmissionMock).toHaveBeenCalled());
	});
});
