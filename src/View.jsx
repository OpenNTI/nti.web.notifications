import { Flyout } from '@nti/web-commons';
import React, { useEffect } from 'react';

import Bell from './Bell';
import Panel from './Panel';
import Store from './Store';
import EmailVerificationWorkflow from './types/EmailVerify/Workflow';

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
		<Bell count={unreadCount} onClick={updateLastViewed} />
	);

	return (
		<>
			<EmailVerificationWorkflow />

			<Flyout.Triggered horizontalAlign={Flyout.ALIGNMENTS.RIGHT} trigger={trigger} arrow >
				<Panel newItemsExist={checkNewItemsExist}
					loadNewItems={updateNewItems}
				/>
			</Flyout.Triggered>
		</>
	);
});

export default Store.compose(NotificationFlyout);
