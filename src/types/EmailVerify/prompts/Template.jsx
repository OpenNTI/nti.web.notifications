import PropTypes from 'prop-types';
import { Prompt } from '@nti/web-commons';
import React from 'react';
import cx from 'classnames';

const styles = css`
	.view {
		width: 450px;
		perspective: 800;
	}

	.content {
		width: 100%;
		height: 100%;
		background-color: var(--panel-background);
		border: 1px solid var(--quad-grey);
		box-shadow: rgba(0, 0, 0, 0.137255) 0 2px 4px 1px, rgba(255, 255, 255, 0.498039) 0 2px inset;
		backface-visibility: hidden;
		border-radius: 4px;
	}
`;

PromptTemplate.propTypes = {
	height: PropTypes.number,
	testId: PropTypes.string,
};

export default function PromptTemplate ( { height, children, testId } ) {
	const style = height ? {height: `${height}px`} : {};
	return (
		<Prompt.Dialog>
			<div style={style} className={cx(styles.view)} data-testid={testId}>
				<div className={cx(styles.content)}>
					{children}
				</div>
			</div>
		</Prompt.Dialog>
	);
}
