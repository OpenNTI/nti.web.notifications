import { Flyout } from '@nti/web-commons';
import React from 'react';

import Bell from './bell/Bell';
import Panel from './Panel';
import Store from './Store';

function NotificationFlyout () {
	const {
		[Store.UnreadCount]: unreadCount,
		[Store.Load]: load,
		[Store.UpdateLastViewed]: updateLastViewed,
		[Store.UpdateNewItems]: updateNewItems,
		[Store.CheckNewItemsExist]: checkNewItemsExist,
	} = Store.useMonitor([
		Store.UnreadCount,
		Store.Load,
		Store.UpdateLastViewed,
		Store.UpdateNewItems,
		Store.CheckNewItemsExist
	]);

	// Load notifications from store
	load();

	return (
		<Flyout.Triggered trigger={(<div style={{display: 'inline-block'}}><Bell count={unreadCount} onClick={updateLastViewed}/></div>)}>
			<Panel newItemsExist={checkNewItemsExist} loadNewItems={updateNewItems}/>	
		</Flyout.Triggered>
	);
}

export default Store.WrapCmp(NotificationFlyout);