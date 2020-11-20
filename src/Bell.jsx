import { Badge, Theme } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import styles from './Bell.css';

const Bell = React.forwardRef(function Bell ({ count, onClick }, ref ) {
	const theme = Theme.useThemeProperty('icon');
	return (
		<Badge badge={count} ref={ref}>
			<div ref={ref} className={cx(styles.bell, styles[theme])} onClick={onClick}/>
		</Badge>
	);
});

Bell.propTypes = {
	count: PropTypes.number,
	onClick: PropTypes.func.isRequired,
};

export default Bell;
