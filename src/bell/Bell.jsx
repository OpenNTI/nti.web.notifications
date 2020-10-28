import { Badge } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';


import styles from './Bell.css';

Bell.propTypes = {
	count: PropTypes.number.isRequired,
	onClick: PropTypes.func.isRequired,
	isDark: PropTypes.bool,
};

export default function Bell ({ count, onClick, isDark } ) {
	return (
		<div>
			<Badge badge={count}>
				<div className={cx(styles.bell, {[styles.lightTheme]: !isDark, [styles.darkTheme]: isDark})} onClick={onClick}/>
			</Badge>
		</div>
	);
}
