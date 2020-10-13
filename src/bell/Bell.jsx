import { Badge } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Bell.css';

Bell.propTypes = {
	count: PropTypes.number.isRequired,
	isThemeDark: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default function Bell ( { count, isThemeDark, onClick } ) {
	return (
		<div>
			<Badge badge={count}>
				<div className={[styles.bell, isThemeDark ? styles.darkTheme : styles.lightTheme].join(' ')} onClick={onClick}/>
			</Badge>
		</div>
	);
}
