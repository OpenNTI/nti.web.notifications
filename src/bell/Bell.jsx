import { Badge } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';


import { useIconTheme } from '../util';

import styles from './Style.css';

Bell.propTypes = {
	count: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default function Bell ({ count, onClick } ) {
	const theme = useIconTheme();
	return (
		<>
			<Badge badge={count}>
				<div className={cx(styles.bell, styles[theme])} onClick={onClick}/>
			</Badge>
		</>
	);
}
