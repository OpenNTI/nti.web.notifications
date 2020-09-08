import React from 'react';

import Badge from './types/Badge';
import BlogComment from './types/BlogComment';
import BlogEntry from './types/BlogEntry';
import BlogEntryPost from './types/BlogEntryPost';
import Change from './types/Change';
import Chat from './types/Chat';
import ChatGroup from './types/ChatGroup';
import Contact from './types/Contact';
import Feedback from './types/Feedback';
import ForumComment from './types/ForumComment';
import Grade from './types/Grade';
import Note from './types/Note';
import Unknown from './types/Unknown';

const TYPES = [
	Badge,
	BlogComment,
	BlogEntry,
	BlogEntryPost,
	Change,
	Chat,
	ChatGroup,
	Contact,
	Feedback,
	ForumComment,
	Grade,
	Note,
	Unknown,
];

export default class NotificationItemRegistry {
	/**
	 * Returns the appropriate component based on the type of 
	 * the notification item given. Uses the item's Class property
	 * to determine equivalence, but should have a better way to do
	 * that. 
	 * @static
	 * @param {*} item notification item given
	 * @return {*} A React component that represents the type
	 * of the supplied item.
	 * @memberof NotificationItemRegistry
	 */
	static getComponent (item) {
		// Get item's type
		let ItemType = Unknown;
		// eslint-disable-next-line guard-for-in
		for (let type of TYPES) {
			// See if the item's class is a substring of the type's name 
			if (type.name.includes(item.Class)) {
				ItemType = type;
				break;
			}
		}
		// Return appropriate item type
		return React.createElement(ItemType, { item });
	}
}