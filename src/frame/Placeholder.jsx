import React from 'react';

import Bar from './PlaceholderBar';
import Icon from './PlaceholderIcon';
import Content from './Content';
import Item from './Item';
import Time from './Time';

export default function ItemPlaceholder () {
	return (
		<Item className="empty">
			<Icon />
			<Content>
				<Bar width={200} />
				<Bar width={75} />
				<Time>
					<Bar width={75} height={15}/>
				</Time>
			</Content>
		</Item>
	);
}
