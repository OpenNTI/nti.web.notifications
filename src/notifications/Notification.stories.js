import NotificationItemRegistry from './NotificationItemRegistry';

export default {
	title: 'Notification',
	component: {},
};

// Ensure AppConfig variable is defined.
window.$AppConfig = window.$AppConfig || { server: '/dataserver2/' };

function generateItem (className) {
	const item = {
		creator: 'quiz_tester',
		getLastModified: () => { return new Date(0); },
		title: 'Test title',
		Class: className,
	};
	return item;
}


// BlogEntryPost
const BlogEntryPostTemplate = () => {
	return NotificationItemRegistry.getComponent(generateItem('BlogEntryPost'));
};
export const BlogEntryPostStory = BlogEntryPostTemplate.bind({});

// BlogEntryPost
const BlogEntryTemplate = () => {
	return NotificationItemRegistry.getComponent(generateItem('BlogEntry'));
};
export const BlogEntryStory = BlogEntryTemplate.bind({});

// BlogComment
const BlogCommentTemplate = () => {
	return NotificationItemRegistry.getComponent(generateItem('BlogComment'));
};
export const BlogCommentStory = BlogCommentTemplate.bind({});


/* 
Tried to use for loop to export stories but did not work :( 

// const notificationTypes = ['BlogEntryPost', 'BlogEntry'];
// let storyExports = {};

// // eslint-disable-next-line guard-for-in
// for (let notificationType in notificationTypes) {
// 	const notificationStoryTemplate = () => {
// 		return NotificationItemRegistry.getComponent(generateItem(notificationType));
// 	}; 
// 	const notificationStory = notificationStoryTemplate.bind({});
// 	storyExports.push(notificationStory);

// }

// export {storyExports};

*/