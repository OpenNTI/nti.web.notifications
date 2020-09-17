import { Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import { COMMON_PREFIX } from './Registry';

Chat.propTypes = {
	item: PropTypes.object.isRequired,
};

Chat.MimeTypes = [
	COMMON_PREFIX + 'messageinfo',
];

export default function Chat ({ item }) {}
