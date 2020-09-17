import Badge from './Badge';
import BlogComment from './BlogComment';
import BlogEntry from './BlogEntry';
import BlogEntryPost from './BlogEntryPost';
import Change from './Change';
import Chat from './Chat';
import ChatGroup from './ChatGroup';
import Contact from './Contact';
import Event from './Event';
import Feedback from './Feedback';
import ForumComment from './ForumComment';
import ForumTopic from './ForumTopic';
import Grade from './Grade';
import Note from './Note';
import Registry from './Registry';
import Unknown from './Unknown';

export const TypesList = [
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
	ForumTopic,
	Event,
];
export {
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
	ForumTopic,
	Event
};

/**
                    
 * Returns the appropriate component based on the type of
 * the notification item given. Uses the item's MimeType property
 * to determine equivalence.
 *
 * @static
 * @param {*} item notification item given
 * @param {*} type optional type of notification
 * @return {*} A React component that represents the type
 * of the supplied item.
 */
export function getComponent (item) {
	let ItemType = Unknown;
	for (let Type of TypesList) {
		if (Type !== Unknown && Type.MimeTypes && Type.MimeTypes.includes(item.MimeType || item.mimeType)) {
			ItemType = Type;
			break;
		}
	}
	return ItemType;
}