import React from 'react';
import PropTypes from 'prop-types';
import {DateTime, Avatar, DisplayName} from '@nti/web-commons';

import Registry from './Registry';
import Base from './Base';

export default
@Registry.register('application/vnd.nextthought.forums.personalblogentry')
class BlogEntry extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	renderContents = (username, url, eventTime) => {
		const blogName = this.props.item.title;

		return (
			<div>
				<Avatar entity={this.state.username} width="32" height="32"/>
				<div className="wrap">
					<DisplayName entity={this.state.username}/>
					{' created a thought: ' + blogName}
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
