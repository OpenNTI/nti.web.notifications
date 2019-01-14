import React from 'react';
import PropTypes from 'prop-types';
import {DateTime, Avatar, DisplayName} from '@nti/web-commons';

import Registry from './Registry';
import Base, {getTime} from './Base';

export default
@Registry.register([
	'application/vnd.nextthought.forums.headlinetopic',
	'application/vnd.nextthought.forums.communityheadlinetopic',
	'application/vnd.nextthought.forums.contentheadlinetopic',
	'application/vnd.nextthought.forums.dflheadlinetopic'
])
class ForumTopic extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	renderContents = (username, url, eventTime) => {
		const {item} = this.props;
		let date = getTime(item.headline);

		return (
			<div>
				<Avatar entity={username + '1'} width="32" height="32"/>
				<div className="wrap">
					<DisplayName entity={username + '1'}/>
					{` created a discussion: ${item.title}`}
					<DateTime date={date} relative/>
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
