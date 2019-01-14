import React from 'react';
import PropTypes from 'prop-types';
import {DateTime, Avatar, DisplayName} from '@nti/web-commons';

import Registry from './Registry';
import Base, {getTime} from './Base';

export default
@Registry.register('application/vnd.nextthought.user')
class Contact extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	renderContents = (username, url, eventTime, preview, note, change) => {
		let time = getTime(change);

		// TODO: add profile link
		return (
			<div>
				<Avatar entity={username} width="32" height="32"/>
				<div className="wrap">
					<DisplayName entity={username}/>
					{' added you as a contact.'}
					<DateTime date={time} relative/>
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
