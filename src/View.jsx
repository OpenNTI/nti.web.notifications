import { Flyout } from '@nti/web-commons';
import React, { useState, useEffect } from 'react';
import { getAppUser } from '@nti/web-client';
import cx from 'classnames';

import Bell from './Bell';
import Panel from './Panel';
import Store from './Store';
import EmailVerificationWorkflow from './types/EmailVerify/Workflow';
import styles from './View.css';

const NotificationFlyout = React.forwardRef(function NotificationFlyout (props, ref) {
	const {
		[Store.UnreadCount]: unreadCount,
		[Store.Load]: load,
		[Store.UpdateLastViewed]: updateLastViewed,
		[Store.UpdateNewItems]: updateNewItems,
		[Store.CheckNewItemsExist]: checkNewItemsExist,
	} = Store.useValue();

	const [user, setUser] = useState(null);

	useEffect(() => {
		let mounted = true;

		(async function setup () {

			load();

			const _user = await getAppUser();
			if (mounted) {
				setUser(_user);
			}

		}());

		return () => {
			mounted = false;
		};
	}, [load]);

	const trigger = (
		<div className={cx(styles.triggerContainer)}>
			<Bell count={unreadCount} onClick={updateLastViewed} />
		</div>
	);

	return (
		<>
			{user && user.email && user.hasLink('RequestEmailVerification') && <EmailVerificationWorkflow /> }

			<Flyout.Triggered horizontalAlign={Flyout.ALIGNMENTS.RIGHT} trigger={trigger}>
				<Panel newItemsExist={checkNewItemsExist}
					loadNewItems={updateNewItems}
				/>
			</Flyout.Triggered>
		</>
	);
});

export default Store.compose(NotificationFlyout);
