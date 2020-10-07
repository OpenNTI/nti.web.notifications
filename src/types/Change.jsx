import PropTypes from 'prop-types';
import React from 'react';

import { COMMON_PREFIX } from './Registry';

import {getComponent, Unknown} from './index';

Change.propTypes = {
	item: PropTypes.object.isRequired,
};

Change.MimeTypes = [
	COMMON_PREFIX + 'change',
];

export default function Change ({ item }) {
	const ItemType = getComponent(item.getItem());

	if (ItemType) {
		return <ItemType item={item.getItem() || item.Item}/>;
	} else {
		return <Unknown item={item} />;
	}
}
