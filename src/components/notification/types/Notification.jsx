import { encodeForURI, isNTIID } from '@nti/lib-ntiids';
import Logger from '@nti/util-logger';
import { LinkTo } from '@nti/web-routing';
import PropTypes from  'prop-types';
import React, { useEffect, useState } from 'react';

const logger = Logger.get('notifications:kinds:ForumTopic');


Notification.propTypes = {
	item: PropTypes.object.isRequired,
	renderContentsFunc: PropTypes.func.isRequired,
};

export default function Notification (props) {

	// Declare component's states
	const [username, setUsername] = useState('');
	// If the item prop is a change model/type, it will have an Item property.
	const [isItemOfChangeType, setIsItemOfChangeType] = useState(false);
	// The raw notification item object from the server
	const [item, setItem] = useState(props.item);
	// URL
	const [url, setUrl] = useState('');
	// Title
	const [title, setTitle] = useState('');
	// Notification body
	const [body, setBody] = useState([]);
	// Notification time
	const [time, setTime] = useState(new Date(0));

	useEffect(() => {
		let updatedItem = props.item;
		// Set username
		setUsername(updatedItem.creator || updatedItem.Creator);
		// Set isItemOfChangeType
		setIsItemOfChangeType(updatedItem.Item !== undefined);
		// Set item
		setItem(updatedItem);
		// Set url
		try {
			let id = updatedItem.getID();
			id = isNTIID(id) ? encodeForURI(id) : encodeURIComponent(id);
			setUrl(`${this.getBasePath()}object/${id}/`);
		} catch (e) {
			logger.warn('Updated item has no url: ', updatedItem);
		}
		// Set title
		setTitle(updatedItem.title || '');
		// Set notification's body
		setBody(updatedItem.body || []);
		// Set notification time
		setTime(getTime(updatedItem));
	}, [props.item]);

	return (
		<div className="notification-item list-item">
			<LinkTo.Object object={item}>
				{ props.renderContentsFunc(username, isItemOfChangeType, url, title, body, time) }
			</LinkTo.Object>
		</div>
	);


}

/**
 * Get the time at which the given object was last modified.
 * @param {any} object Object whose date we want to get.
 * @return {Date} if object's last modified date
 * is set, return the object's last modified date. Otherwise,
 * return the object's creation date.
 */
export function getTime (object) {
	try {
		let lm = object && object.getLastModified();
		return object && !lm ? object.getCreatedTime() : lm;
	} catch (e) {
		logger.warn('No Date for object:', object);
		return new Date(0);
	}
}
