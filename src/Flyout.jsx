import { Flyout } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import Bell from './bell/Bell';
import Panel from './Panel';
import Store from './Store';

NotificationFlyout.propTypes = {
	isThemeDark: PropTypes.bool.isRequired,
};

function NotificationFlyout ( { isThemeDark } ) {
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

	useEffect(() => load(), []);

	return (
		<Flyout.Triggered trigger={(<div style={{display: 'inline-block'}}><Bell count={unreadCount} onClick={updateLastViewed} isThemeDark={isThemeDark} /></div>)}>
			<Panel newItemsExist={checkNewItemsExist} loadNewItems={updateNewItems}/>
		</Flyout.Triggered>
	);
}

export default Store.WrapCmp(NotificationFlyout);
