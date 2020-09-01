import { encodeForURI, isNTIID } from '@nti/lib-ntiids';
import Logger from '@nti/util-logger';
import { LinkTo } from '@nti/web-routing';
import PropTypes from  'prop-types';
import React, { useEffect, useState } from 'react';

const logger = Logger.get('notifications:kinds:ForumTopic');


Base.propTypes = {
	item: PropTypes.object.isRequired,
	renderContentsFunc: PropTypes.func.isRequired,
};

export default function Base (props) {

	// Declare component's states
	const [username, setUsername] = useState('');
	// TODO: What is the different between item and change.Item?
	const [change, setChange] = useState(props.item);
	// The raw notification item object from the server
	const [item, setItem] = useState(props.item);
	const [url, setUrl] = useState('');

	useEffect(() => {
		updatePreview(props.item);
	}, [props.item]);

	useEffect(() => {        
		setChange(props.item);
		setItem(change.Item || change);
		setUsername(item.creator || item.Creator);
        
		try {
			let id = item.getID();
			id = isNTIID(id) ? encodeForURI(id) : encodeURIComponent(id);
			setUrl(`${this.getBasePath()}object/${id}/`);
		} catch (e) {
			logger.warn('Notable has no url: ', item);
		}
	});

}

/**
 * Truncate a string for a given length from the start
 * and adds ellipsis at the end of the substring. Therefore,
 * the resulting substring actually has length of 
 * @param {string} text Text to be truncated
 * @param {number} len Length of the resulting substring
 * @return {string} Substring form start of text to
 * index len - 3 + ellipsis if length of text > len. 
 * Otherwise returns text.
 */
function trunc (text, len) {
	return text.length <= len ? text : text.substr(0, Math.max(0, len - 3)) + '...';
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
		//Return the Last Modified, unless its not set
		return object && !lm ? object.getCreatedTime() : lm;
	} catch (e) {
		logger.warn('No Date for object:', object);
		return new Date(0);
	}
}

function getEventTime (other) {
	let { item, change } = this.state;
	//Get the time from the item, if not found, use the change.
	return getTime(other) || getTime(item) || getTime(change);
}

function updatePreview (item) {
	let change = item;
	// ?
	let note = change.Item || change;
	let title = note.title;
	let body = note.body || [];
	let node;

	if (title) {
		this.setState({ preview: title, note });
		return;
	}

	try {
		node = document.createElement('div');
		body = body.map(p => typeof p === 'object' ? '[attachment]' : p).join(' ');

		node.innerHTML = body;

		const preview = trunc(node.textContent, 140);

		this.setState({ preview, note });
	} catch (e) {
		logger.error(e.stack);
	}
}