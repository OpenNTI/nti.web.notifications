import React from 'react';
import cx from 'classnames';

const styles = css`
	.item {
		cursor: pointer;
		line-height: 1;
		display: flex;
		width: auto;
		padding: 18px;

		&:hover {
			background-color: var(--panel-background-alt);
		}
	}
`;

export default function Item ({className, ...props}) {
	return (
		<div className={cx(styles.item, className)} {...props}/>
	);
}
