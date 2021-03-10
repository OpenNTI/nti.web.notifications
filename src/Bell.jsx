import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import { Badge, Theme } from '@nti/web-commons';

const styles = stylesheet`
	.container {
		padding: 23px;
	}

	.bell {

		&::after {
			content: "";
			display: block;
			background-position: center;
			width: 21px;
			height: 24px;
			opacity: 1;
			background-image: url("./assets/icon-dark.svg");
		}

		&:focus {
			outline: 0;
		}
	}

	.light::after {
		background-image: url("./assets/icon-white.svg");
	}
`;

const Bell = React.forwardRef(function Bell({ count, onClick }, ref) {
	const theme = Theme.useThemeProperty('icon');
	return (
		<div className={styles.container} ref={ref}>
			<Badge badge={count}>
				<div
					className={cx(styles.bell, styles[theme])}
					onClick={onClick}
				/>
			</Badge>
		</div>
	);
});

Bell.propTypes = {
	count: PropTypes.number,
	onClick: PropTypes.func.isRequired,
};

export default Bell;
