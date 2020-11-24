import { Flyout } from '@nti/web-commons';
import React, { useEffect } from 'react';
import cx from 'classnames';

import Bell from './Bell';
import Panel from './Panel';
import Store from './Store';
import EmailVerificationWorkflow from './types/EmailVerify/Workflow';

const styles = css`
.trigger-container {
	cursor: pointer;
	width: 21px;
	text-align: center;
	z-index: 900;
	margin: 23px;

	&:focus {
		box-shadow: none;
	}
}
`;

const NotificationFlyout = React.forwardRef(function NotificationFlyout (props, ref) {
	const {
		unreadCount,
		load,
		updateLastViewed,
		updateNewItems,
		checkNewItemsExist,
	} = Store.useValue();

	useEffect(() => {
		load();
	}, [load]);

	const trigger = (
		<div className={cx(styles.triggerContainer)}>
			<Bell count={unreadCount} onClick={updateLastViewed} />
		</div>
	);

	return (
		<>
			<EmailVerificationWorkflow />

			<Flyout.Triggered horizontalAlign={Flyout.ALIGNMENTS.RIGHT} trigger={trigger}>
				<Panel newItemsExist={checkNewItemsExist}
					loadNewItems={updateNewItems}
				/>
			</Flyout.Triggered>
		</>
	);
});

export default Store.compose(NotificationFlyout);
