import { Badge } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Bell.css';

Bell.propTypes = {
	count: PropTypes.any,
};

export default function Bell ( { count } ) {
	return (
		<Badge badge={count}>
			<div className={styles.bell} />
		</Badge>
	);
}