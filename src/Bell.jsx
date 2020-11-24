import { Badge, Theme } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

const styles = css`
	.bell {
		cursor: pointer;
		height: 24px;

		&::after {
			content: "";
			overflow: hidden;
			top: 50%;
			left: 50%;
			right: auto;
			background-position: center;
			width: 21px;
			height: 24px;
			position: absolute;
			opacity: 1;
			margin-top: -12px;
			margin-left: -10px;
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
