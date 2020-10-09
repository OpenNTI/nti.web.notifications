import { Badge } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Bell.css';

Bell.propTypes = {
	count: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default function Bell ( { count, onClick } ) {
	return (
		<div>
			<Badge badge={count}>
				<div className={styles.bell} onClick={onClick}/>
			</Badge>
		</div>
	);
}