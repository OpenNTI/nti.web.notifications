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
	getComponent (item) {
		// Get item's type
		let ItemType = Unknown;
		for (let Type in TYPES) {
			// See if the item's class is a substring of the type's name 
			if (Type.name.includes(item.Class)) {
				ItemType = Type;
				break;
			}
		}
		// Return appropriate item type
		return React.createElement(ItemType, { item });
	}
}