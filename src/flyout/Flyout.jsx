import PropTypes from 'prop-types';
import { Flyout } from '@nti/web-commons';
import React, { useState, useRef, useLayoutEffect } from 'react';
import cx from 'classnames';

import Bell from '../bell/Bell';
import Panel from '../panel/Panel';
import Store from '../Store';
import { getComponent } from '../types';

import styles from './Flyout.css';


NotificationFlyout.propTypes = {
	isDark: PropTypes.bool,
};

function NotificationFlyout ( { isDark } ) {
	const {
		[Store.UnreadCount]: unreadCount,
		[Store.Load]: load,
		[Store.UpdateLastViewed]: updateLastViewed,
		[Store.UpdateNewItems]: updateNewItems,
		[Store.CheckNewItemsExist]: checkNewItemsExist,
		[Store.Toasts]: toasts,
	} = Store.useMonitor([
		Store.UnreadCount,
		Store.Load,
		Store.UpdateLastViewed,
		Store.UpdateNewItems,
		Store.CheckNewItemsExist,
		Store.Toasts,
	]);

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

	const firstUpdate = useRef(false);

	useLayoutEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		}
		load();
	});

	React.useEffect(async () => {
		await load();
	}, []);

	return (
		<div>
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

			<Flyout.Triggered {...flyoutProps} trigger={(<div className={cx(styles.triggerContainer)}><Bell count={unreadCount} onClick={updateLastViewed} isDark={isDark}/></div>)}>
				<Panel newItemsExist={checkNewItemsExist}
					loadNewItems={updateNewItems}
					onPromptToggle={(toggle) => onPromptToggle(toggle)} />
			</Flyout.Triggered>
		</div>
	);
}

export default Store.WrapCmp(NotificationFlyout);
