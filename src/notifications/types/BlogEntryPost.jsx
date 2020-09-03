import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../NotificationItemFrame';

BlogEntryPost.propTypes = {
	item: PropTypes.object.isRequired,
};

export default function BlogEntryPost ( { item } ) {
	let actionString    =   ' created a thought ';
        
	return (
		<NotificationItemFrame item={item}>
			{ actionString }
		</NotificationItemFrame>
	);
}