import { Avatar, DateTime, DisplayName } from '@nti/web-commons';
import { LinkTo } from '@nti/web-routing';
import PropTypes from 'prop-types';
import React from 'react';

NotificationItemFrame.propTypes = {
	item: PropTypes.object.isRequired,
};

/**
 * A React component that represents the outer frame of
 * a notification item. It takes in the notification item
 * in question as well as its type's specific children to
 * display them. This is because each notification item 
 * is different from the rest and needs to display different
 * action strings and possibly children.
 * @export NotificationItemFrame
 * @param {*} {children, item}
 * @return {*} React Component
 */
export default function NotificationItemFrame ( {children, item} ) {
	const username = item.creator || item.Creator;
	const eventTime = item.getLastModified() || item.getCreatedAt();
    
	let avatarComp, displayNameComp = <></>;
	if (username) {
		avatarComp = <Avatar entity={username} width="32" height="32" />;
		displayNameComp = <DisplayName entity={username} />;
	}

	// In case the item is of type change, get the subitem ID
	const subItemId = item.Item && item.Item.getID();
	
	return (
		<div className="notification-item">
			{/* Link to object: if subitemId exists, get the change type's subitem.
			Otherwise, get item */}
			<LinkTo.Object object={subItemId ? item.Item : item}>
				{avatarComp}
				<div className="wrap">
					{displayNameComp}
					{children}
					<DateTime date={eventTime} relative />
				</div>
			</LinkTo.Object>
		</div>
	);
}
