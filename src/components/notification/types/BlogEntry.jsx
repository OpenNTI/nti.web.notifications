import { Avatar, DateTime, DisplayName } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import Notification from './Notification';


BlogEntry.propTypes = {
	item: PropTypes.object.isRequired
};

function renderContentsFunc (username, isItemOfChangeType, url, title, body, time) {
	return (
		<div>
			<Avatar entity={username} width="32" height="32" />
			<div className="wrap">
				<DisplayName entity={username} />
				{' created a thought: ' + title}
				<DateTime date={time} relative />
			</div>
		</div>
	);
}

export default function BlogEntry ( {item} ) {
	return (
		<Notification item={item} renderContentsFunc={renderContentsFunc}/>
	);
}