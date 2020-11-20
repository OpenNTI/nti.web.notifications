import PropTypes from 'prop-types';
import { useEffect } from 'react';
import Logger from '@nti/util-logger';

import Registry from './Registry';

Unknown.propTypes = {
	item: PropTypes.object.isRequired,
};

Registry.setDefault(Unknown);

const logger = Logger.get('web:notifications:types:Unknown');

export default function Unknown ({ item }) {
	const type = item.MimeType && item.MimeType.match(/[a-zA-Z]*$/gm);

	useEffect(() => {
		logger.warn('Unknown type: ' + type);
	});

	return null;
}
