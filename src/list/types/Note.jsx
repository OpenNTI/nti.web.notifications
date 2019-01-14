import React from 'react';
import PropTypes from 'prop-types';
import {DateTime, Avatar, DisplayName} from '@nti/web-commons';

import Registry from './Registry';
import Base from './Base';

export default
@Registry.register(['application/vnd.nextthought.note'])
class Note extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	renderContents = (username, url, eventTime, preview, note) => {
		return (
			<div>
				<Avatar entity={username} width="32" height="32"/>
				<div className="wrap">
					<DisplayName entity={username}/>
					{ note && note.isReply() ? ' commented on a note' : ' shared a note: ' + preview}
					<DateTime date={eventTime} relative/>
				</div>
			</div>
		);
	}

	render () {
		return (
			<Base item={this.props.item} renderContents={this.renderContents}/>
		);
	}
}
