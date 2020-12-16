import React, { useCallback, useRef } from 'react';
import {Monitor} from '@nti/web-commons';

import Store from '../Store';

import Bar from './PlaceholderBar';
import Icon from './PlaceholderIcon';
import Content from './Content';
import Item from './Item';
import Time from './Time';

export default function ItemPlaceholder () {
	const { loadNextBatch } = Store.useValue();
	const trip = useRef(false);

	const onScreen = useCallback((visible) => {

		if (!visible || trip.current) {
			return;
		}

		// This component will only ever call this once. To make it call it again, mount a new instance. (change the key prop to a new value)
		trip.current = true;
		loadNextBatch();

	}, [loadNextBatch]);

	return (
		<Monitor.OnScreen as={Item} className="empty" onChange={onScreen}>
			<Icon />
			<Content>
				<Bar width={200} />
				<Bar width={75} />
				<Time>
					<Bar width={75} height={15}/>
				</Time>
			</Content>
		</Monitor.OnScreen>
	);
}
