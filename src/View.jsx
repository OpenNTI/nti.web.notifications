import React, { useEffect } from 'react';

import { Flyout } from '@nti/web-commons';

import Bell from './Bell';
import Panel from './Panel';
import Store from './Store';
import EmailVerificationWorkflow from './types/EmailVerify/Workflow';

const styles = stylesheet`
	.flyout {
		&:global(.aligned-flyout.right .flyout-arrow) {
			right: 26px;
		}
	}
`;

const NotificationFlyout = React.forwardRef(function NotificationFlyout(
	props,
	ref
) {
	const { unreadCount, load, updateLastViewed } = Store.useValue();

	useEffect(() => {
		load();
	}, [load]);

	const trigger = <Bell count={unreadCount} onClick={updateLastViewed} />;

	return (
		<>
			<EmailVerificationWorkflow />

			<Flyout.Triggered
				className={styles.flyout}
				horizontalAlign={Flyout.ALIGNMENTS.RIGHT}
				trigger={trigger}
				arrow
			>
				<Panel />
			</Flyout.Triggered>
		</>
	);
});

export default Store.compose(NotificationFlyout);
