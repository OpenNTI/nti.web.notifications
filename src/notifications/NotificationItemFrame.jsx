import { Avatar, DateTime, DisplayName } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

NotificationItemFrame.propTypes = {
	item: PropTypes.object.isRequired,
};

export default function NotificationItemFrame ( {children, item} ) {
	const username = item.creator || item.Creator;
	const eventTime = item.getLastModified() || item.getCreatedAt();
    
	const itemHasUsername = true;
	let avatarComp, displayNameComp = <></>;
	if (itemHasUsername) {
		avatarComp = <Avatar entity={username} width="32" height="32" />;
		displayNameComp = <DisplayName entity={username} />;
	}
    
	return (
		<div className="notification-item">
			{avatarComp}
			<div className="wrap">
				{displayNameComp}
				{children}
				<DateTime date={eventTime} relative/>
			</div>
		</div>
	);
}
