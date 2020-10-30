import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../Frame';

import { COMMON_PREFIX, register } from './Registry';

// String localization
const translation = scoped('nti-notifications.notifications.types.BlogEntryPost', {
	action: 'shared a thought %(t)s',
});
const Translate = Text.Translator(translation);

BlogEntryPost.propTypes = {
	item: PropTypes.object.isRequired,
};

BlogEntryPost.MimeTypes = [
	COMMON_PREFIX + 'forums.post',
	COMMON_PREFIX + 'forums.communityheadlinepost',
	COMMON_PREFIX + 'forums.contentheadlinepost',
	COMMON_PREFIX + 'forums.dflheadlinepost',
	COMMON_PREFIX + 'forums.headlinepost',
	COMMON_PREFIX + 'forums.personalblogentrypost',
];

register(BlogEntryPost, 'blogEntryPost');

export default function BlogEntryPost ( { item } ) {
	return (
		<NotificationItemFrame item={item}>
			{/* Building string to show to the user */}
			<Translate
				localeKey="action"
				with={{
					t: item.title,
				}}
			/>
		</NotificationItemFrame>
	);
}
