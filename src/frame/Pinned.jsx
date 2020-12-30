import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Store from '../Store';

import Content from './Content';
import IconContainer from './IconContainer';
import Item from './Item';

const Icon = styled('div').attrs({children: '@'})`
	background-color: var(--secondary-orange);
	border-radius: 42px;
	width: 42px;
	height: 42px;
	font-size: 24px;
	text-align: center;
	line-height: 42px;
	color: white;
	margin-right: 15px;
	font-family: 'Open Sans', Arial, sans-serif;
	font-weight: 600;
`;

const styles = css`
	.frame {
		background-color: rgba(var(--secondary-orange-rgb), 0.1);
	}
`;

Pinned.propTypes = {
	children: PropTypes.any.isRequired,
	className: PropTypes.string,
};

function Pinned ( { children, className } ) {
	const {
		startEmailVerification,
	} = Store.useValue();

	return (
		<Item className={cx(styles.frame, className)} onClick={startEmailVerification} data-testid="pinned-frame">
			<IconContainer>
				<Icon/>
			</IconContainer>
			<Content>
				{children}
			</Content>
		</Item>
	);
}

// Toast in commons is breaking context, so connect this component to the store directly.
export default Store.compose(Pinned);
