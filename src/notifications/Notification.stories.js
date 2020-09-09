import NotificationItemRegistry from './NotificationItemRegistry';
import { ComponentMimeTypeObject } from './types/index';

export default {
	title: 'Notification',
	component: {},
};

// Ensure AppConfig variable is defined.
window.$AppConfig = window.$AppConfig || { server: '/dataserver2/' };

/**
 * Generates an item to be passed into the stories
 *
 * @param {*} type notification type
 * @return {*} a notification item
 */
function generateItem (type) {
	const item = {
		creator: 'quiz_tester',
		getLastModified: () => { return new Date(0); },
		title: 'Test title',
		MimeType: ComponentMimeTypeObject[type],
	};
	return item;
}

// Badge
const BadgeTemplate = () => {
	return NotificationItemRegistry.getComponent(generateItem('Badge'));
};
export const BadgeStory = BadgeTemplate.bind({});

// BlogComment
const BlogCommentTemplate = () => {
	return NotificationItemRegistry.getComponent(generateItem('BlogComment'));
};
export const BlogCommentStory = BlogCommentTemplate.bind({});

// BlogEntry
const BlogEntryTemplate = () => {
	return NotificationItemRegistry.getComponent(generateItem('BlogEntry'));
};
export const BlogEntryStory = BlogEntryTemplate.bind({});

// BlogEntryPost
const BlogEntryPostTemplate = () => {
	return NotificationItemRegistry.getComponent(generateItem('BlogEntryPost'));
};
export const BlogEntryPostStory = BlogEntryPostTemplate.bind({});

// Change
const ChangeTemplate = () => {
	return NotificationItemRegistry.getComponent(generateItem('Change'));
};
export const ChangeStory = ChangeTemplate.bind({});

// Chat
const ChatTemplate = () => {
	return NotificationItemRegistry.getComponent(generateItem('Chat'));
};
export const ChatStory = ChatTemplate.bind({});

// ChatGroup
const ChatGroupTemplate = () => {
	return NotificationItemRegistry.getComponent(generateItem('ChatGroup'));
};
export const ChatGroupStory = ChatGroupTemplate.bind({});

// Contact
const ContactTemplate = () => {
	return NotificationItemRegistry.getComponent(generateItem('Contact'));
};
export const ContactStory = ContactTemplate.bind({});

// Feedback
const FeedbackTemplate = () => {
	return NotificationItemRegistry.getComponent(generateItem('Feedback'));
};
export const FeedbackStory = FeedbackTemplate.bind({});

// ForumComment
const ForumCommentTemplate = () => {
	return NotificationItemRegistry.getComponent(generateItem('ForumComment'));
};
export const ForumCommentStory = ForumCommentTemplate.bind({});

// Grade
const GradeTemplate = () => {
	return NotificationItemRegistry.getComponent(generateItem('Grade'));
};
export const GradeStory = GradeTemplate.bind({});

// Note
const NoteTemplate = () => {
	return NotificationItemRegistry.getComponent(generateItem('Note'));
};
export const NoteStory = NoteTemplate.bind({});

// Unknown
const UnknownTemplate = () => {
	return NotificationItemRegistry.getComponent(generateItem('Unknown'));
};
export const UnknownStory = UnknownTemplate.bind({});
