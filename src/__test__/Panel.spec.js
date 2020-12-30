/* eslint-env jest */
import React from 'react';
import {render} from '@testing-library/react';
import {StoreContextWrapper} from '@nti/lib-store';

import Store from '../Store';
import Panel from '../Panel';

const emptyBadgeItem = {
	Item: {
		MimeType: 'application/vnd.nextthought.openbadges.badge',
	},
	getLastModified: () => Date.now(),
};

describe('Panel Component', () => {

	beforeEach(() => {
		global.IntersectionObserver = class IntersectionObserver {
			constructor () {}

			disconnect () {
				return null;
			}

			observe () {
				return null;
			}

			takeRecords () {
				return null;
			}

			unobserve () {
				return null;
			}
		};

	});

	test('No items tells user that they have no notifications', () => {
		const store = new Store();

		store.set({items: []});

		expect(store).toBeDefined();

		const { getByText } = render(
			<StoreContextWrapper store={store}>
				<Panel onDismiss={() => {}}></Panel>
			</StoreContextWrapper>
		);

		expect(getByText('You don\'t have any notifications.')).toBeTruthy();
	});

	test('Email verify notification exists if user needs verification', () => {
		const store = new Store();
		store.set({needsVerification: true});

		const { getByText } = render(
			<StoreContextWrapper store={store}>
				<Panel onDismiss={() => {}}></Panel>
			</StoreContextWrapper>
		);

		expect(getByText('Verify Now')).toBeTruthy();
	});

	test('The correct number of notifications is shown', () => {
		const store = new Store();
		store.set({items: [emptyBadgeItem, emptyBadgeItem]});

		const {container} = render(
			<StoreContextWrapper store={store}>
				<Panel onDismiss={() => {}}></Panel>
			</StoreContextWrapper>
		);

		expect(container.querySelectorAll('time').length).toBe(2);

		store.set({items: [...(store.get('items')), emptyBadgeItem]});

		const {container: container2} = render(
			<StoreContextWrapper store={store}>
				<Panel onDismiss={() => {}}></Panel>
			</StoreContextWrapper>
		);

		expect(container2.querySelectorAll('time').length).toBe(3);
	});

	test('Show All link directs to correct location', () => {
		const store = new Store();

		const {container} = render(
			<StoreContextWrapper store={store}>
				<Panel onDismiss={()=>{}}></Panel>
			</StoreContextWrapper>
		);

		expect(container.querySelector('div[to="notifications"]')).toBeTruthy();
	});

	test('Item placeholder appears if store says there are more items to show', () => {
		const store = new Store();
		store.set({ moreItems: true, items: [emptyBadgeItem, emptyBadgeItem] });

		const { container } = render(
			<StoreContextWrapper store={store}>
				<Panel onDismiss={() => {}}></Panel>
			</StoreContextWrapper>
		);
		expect(container.querySelector('.empty')).toBeTruthy();
	});
});
