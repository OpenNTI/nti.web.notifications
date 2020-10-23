import { Badge, Theme } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Bell.css';

Bell.propTypes = {
	count: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default function Bell ({ count, onClick } ) {
	const theme = Theme.useTheme();
	const backgroundColor = theme.scope('library').scope('navigation').backgroundColor;
	return (
		<div>
			<Badge badge={count}>
				<div className={[styles.bell, backgroundColor === 'light' ? styles.lightTheme : styles.darkTheme].join(' ')} onClick={onClick}/>
			</Badge>
		</div>
	);
}
