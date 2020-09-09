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
import Unknown from './Unknown';


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
	Event,
};

// Component-MimeType Object 
// Allows ease of access to MimeTypes by providing Component
let ComponentMimeTypeObject = {
	Feedback: 'application/vnd.nextthought.assessment.userscourseassignmenthistoryitemfeedback', 
	Badge: 'application/vnd.nextthought.openbadges.badge', 
	Event: 'application/vnd.nextthought.courseware.coursecalendarevent', 
	BlogEntry: 'application/vnd.nextthought.forums.personalblogentry', 
	BlogEntryPost: 'application/vnd.nextthought.forums.personalblogentrypost', 
	Grade: 'application/vnd.nextthought.grade', 
	Contact: 'application/vnd.nextthought.user', 
	Note: 'application/vnd.nextthought.note', 
	BlogComment: 'application/vnd.nextthought.forums.personalblogcomment', 
	ForumComment: 'application/vnd.nextthought.forums.generalforumcomment', 
	ForumTopic: 'application/vnd.nextthought.forums.communityheadlinetopic',
};



// Construct Mimetype, Component map
// Allows easy and efficient access of Components using MimeType
let MimeTypeComponentMap = new Map([
	['application/vnd.nextthought.assessment.userscourseassignmenthistoryitemfeedback', Feedback],
	['application/vnd.nextthought.openbadges.badge', Badge],
	['application/vnd.nextthought.courseware.coursecalendarevent', Event],
	['application/vnd.nextthought.forums.personalblogentry', BlogEntry],
	['application/vnd.nextthought.forums.personalblogentrypost', BlogEntryPost],
	['application/vnd.nextthought.grade', Grade],
	['application/vnd.nextthought.user', Contact],
	['application/vnd.nextthought.note', Note],
	['application/vnd.nextthought.forums.personalblogcomment', BlogComment],
	['application/vnd.nextthought.forums.generalforumcomment', ForumComment],
	['application/vnd.nextthought.forums.contentforumcomment', ForumComment],
	['application/vnd.nextthought.forums.communityheadlinetopic', ForumTopic],
	['application/vnd.nextthought.forums.contentheadlinetopic', ForumTopic],
	['application/vnd.nextthought.forums.dflheadlinetopic', ForumTopic],
]);


/**
 * Checks a notification item's MimeType against
 * a map where MimeType is the key to get the corresponding
 * Component. Uses maps to allow efficient search. If MimeType
 * is not present, returns Unkown
 * @param {*} mimeType MimeType
 * @return {*} Returns Component that corresponds to MimeType.
 * If MimeType is not recognizable, return Unknown component.
 */
function CheckMimeType (mimeType) {
	if (MimeTypeComponentMap.get(mimeType)) {
		return MimeTypeComponentMap.get(mimeType);
	}
	return Unknown;
}

export { CheckMimeType, MimeTypeComponentMap, ComponentMimeTypeObject };