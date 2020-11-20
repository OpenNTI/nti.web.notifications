import PropTypes from 'prop-types';
import { Prompt } from '@nti/web-commons';
import React from 'react';
import cx from 'classnames';

import styles from './Style.css';

PromptTemplate.propTypes = {
	height: PropTypes.number,
};

export default function PromptTemplate ( { height, children } ) {
	const style = height ? {height: `${height}px`} : {};
	return (
		<Prompt.Dialog>
			<div style={style} className={cx(styles.promptView)}>
				<div className={cx(styles.dialogContent)}>
					{children}
				</div>
			</div>
		</Prompt.Dialog>
	);
}
