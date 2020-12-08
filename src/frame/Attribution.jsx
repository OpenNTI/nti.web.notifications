import React from 'react';
import cx from 'classnames';

const styles = css`
	.attribution {
		margin-right: 5px;
		color: var(--primary-blue);
	}
`;

export default function Attribution ({children}) {
	const child = React.Children.only(children);
	return React.cloneElement(child, {
		className: cx(styles.attribution, child.props.className)
	});
}
