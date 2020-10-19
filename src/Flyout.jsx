import { Flyout } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

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

	const [isPromptOpen, setIsPromptOpen] = useState(false);

	const onPromptToggle = (toggle) => {
		setIsPromptOpen(toggle);
	};

	let flyoutProps = {};

	if (isPromptOpen) {
		flyoutProps.open = true;
	}

	load();

	return (
		<Flyout.Triggered {...flyoutProps} trigger={(<div style={{display: 'inline-block'}}><Bell count={unreadCount} onClick={updateLastViewed} isThemeDark={isThemeDark} /></div>)}>
			<Panel newItemsExist={checkNewItemsExist} loadNewItems={updateNewItems} onPromptToggle={(toggle) => onPromptToggle(toggle) } />
		</Flyout.Triggered>
	);
}

export default Store.WrapCmp(NotificationFlyout);
