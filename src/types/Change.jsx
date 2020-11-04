import PropTypes from 'prop-types';
import React from 'react';

import { COMMON_PREFIX, register, getComponent } from './Registry';

Change.propTypes = {
	item: PropTypes.object.isRequired,
};

Change.MimeTypes = [
	COMMON_PREFIX + 'change',
];

register(Change, 'change');

export default function Change ({ item }) {
	const ItemType = getComponent(item.Item);

	if (ItemType) {
		return <ItemType item={item.getItem() || item.Item}/>;
	}

}
