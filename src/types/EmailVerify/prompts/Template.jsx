import { Prompt } from '@nti/web-commons';
import React from 'react';
import cx from 'classnames';

import styles from './Style.css';

export default function PromptTemplate ( { children } ) {
	return (
		<Prompt.Dialog>
			<div className={cx(styles.promptView)}>
				<div className={cx(styles.dialogContent)}>
					{children}
				</div>
			</div>
		</Prompt.Dialog>
	);
}
