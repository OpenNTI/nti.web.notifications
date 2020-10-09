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
		[Store.UpdateShownItem]: UpdateShownItem,
	} = Store.useMonitor([
		Store.UnreadCount,
		Store.Load,
		Store.UpdateLastViewed,
		Store.UpdateShownItem,
	]);

	// Load notifications from store
	load();

	return (
		<Flyout.Triggered trigger={(<div style={{display: 'inline-block'}}><Bell count={unreadCount} onClick={updateLastViewed}/></div>)}>
			<Panel onScroll={UpdateShownItem}/>	
		</Flyout.Triggered>
	);
}

export default Store.WrapCmp(NotificationFlyout);