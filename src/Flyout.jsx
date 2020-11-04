import { Flyout } from '@nti/web-commons';
import React, { useState, useEffect } from 'react';
import { getAppUser } from '@nti/web-client';
import cx from 'classnames';

import Bell from './Bell';
import Panel from './Panel';
import Store from './Store';
import EmailVerificationWorkflow from './types/EmailVerify/Workflow';
import styles from './Flyout.css';

const NotificationFlyout = React.forwardRef(function NotificationFlyout (props, ref) {
	const {
		[Store.UnreadCount]: unreadCount,
		[Store.Load]: load,
		[Store.UpdateLastViewed]: updateLastViewed,
		[Store.UpdateNewItems]: updateNewItems,
		[Store.CheckNewItemsExist]: checkNewItemsExist,
	} = Store.useValue();

	const [user, setUser] = useState(null);
	const [isPromptOpen, setIsPromptOpen] = useState(false);

	const onPromptToggle = (toggle, fromToast) => {
		if (!fromToast) {
			setIsPromptOpen(toggle);
		}
	};

	let flyoutProps = {};

	if (isPromptOpen) {
		flyoutProps.open = true;
	}

	useEffect(() => {
		async function setUserAsync () {
			try {
				const _user = await getAppUser();
				setUser(_user);
			} catch (e) {
				throw new Error(e);
			}
		}
		setUserAsync();

		load();
	}, [load]);

	return (
		<>
			{user && user.email && user.hasLink('RequestEmailVerification') && <EmailVerificationWorkflow /> }

			<Flyout.Triggered {...flyoutProps} horizontalAlign={Flyout.ALIGNMENTS.RIGHT} trigger={(<div className={cx(styles.triggerContainer)}><Bell count={unreadCount} onClick={updateLastViewed} /></div>)}>
				<Panel newItemsExist={checkNewItemsExist}
					loadNewItems={updateNewItems}
					onPromptToggle={(toggle) => onPromptToggle(toggle)} />
			</Flyout.Triggered>
		</>
	);
});

export default Store.WrapCmp(NotificationFlyout);
