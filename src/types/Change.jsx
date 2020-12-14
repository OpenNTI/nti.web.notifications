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

export default function Change ({ item: {Item: target} }) {
	const ItemType = target && getComponent(target);

	return ItemType && ItemType !== Change ? <ItemType item={target}/> : null;
}
