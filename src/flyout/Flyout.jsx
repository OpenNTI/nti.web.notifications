import { Flyout } from '@nti/web-commons';
import React, { useState } from 'react';
import cx from 'classnames';

import Bell from '../bell/Bell';
import Panel from '../panel/Panel';
import Store from '../Store';
import { getComponent } from '../types';

import styles from './Style.css';

function NotificationFlyout () {
	const {
		[Store.UnreadCount]: unreadCount,
		[Store.Load]: load,
		[Store.UpdateLastViewed]: updateLastViewed,
		[Store.UpdateNewItems]: updateNewItems,
		[Store.CheckNewItemsExist]: checkNewItemsExist,
		[Store.Toasts]: toasts,
	} = Store.useValue();

	const [dismissedToasts, setDismissedToasts] = useState([
		null,
	]);
	const hasToasts = toasts && toasts.length > 0;


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

	const dismissClickCallBack = (Toast) => {
		setDismissedToasts([...dismissedToasts, Toast]);
	};

	React.useEffect(() => {
		load();
	}, [load]);

	return (
		<>
			{hasToasts && toasts.map((toast, key) => {
				const ToastDelegate = getComponent(toast);
				if (!dismissedToasts.includes(ToastDelegate)) {
					return (
						<div key={key}>
							<ToastDelegate onDismiss={() => dismissClickCallBack(ToastDelegate)} onPromptToggle={(toggle) => onPromptToggle(toggle, true)}/>
						</div>
					);
				}
			})}

			<Flyout.Triggered {...flyoutProps} trigger={(<div className={cx(styles.triggerContainer)}><Bell count={unreadCount} onClick={updateLastViewed} /></div>)}>
				<Panel newItemsExist={checkNewItemsExist}
					loadNewItems={updateNewItems}
					onPromptToggle={(toggle) => onPromptToggle(toggle)} />
			</Flyout.Triggered>
		</>
	);
}

export default Store.WrapCmp(NotificationFlyout);
