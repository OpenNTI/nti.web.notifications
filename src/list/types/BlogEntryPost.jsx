import React from 'react';
import PropTypes from 'prop-types';
import {DateTime, Avatar, DisplayName} from '@nti/web-commons';

import Registry from './Registry';
import Base from './Base';

export default
@Registry.register('application/vnd.nextthought.forums.personalblogentrypost')
class BlogEntryPost extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	renderContents = (username, url, eventTime) => {
		let thestring = ' commented on a discussion.';

		return (
			<div>
				<Avatar entity={this.state.username} width="32" height="32"/>
				<div className="wrap">
					<DisplayName entity={this.state.username}/>
					{thestring}
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
