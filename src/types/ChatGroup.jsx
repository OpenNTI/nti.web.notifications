import { Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import { COMMON_PREFIX } from './Registry';


ChatGroup.propTypes = {
	item: PropTypes.object.isRequired,
};

ChatGroup.MimeTypes = [
	COMMON_PREFIX + '_meeting', 
	COMMON_PREFIX + 'meeting',
];

export default function ChatGroup ({ item }) {}
