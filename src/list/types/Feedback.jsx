import React from 'react';
import PropTypes from 'prop-types';
import {DateTime, Avatar, DisplayName} from '@nti/web-commons';

import Registry from './Registry';
import Base from './Base';

export default
@Registry.register(['application/vnd.nextthought.assessment.userscourseassignmenthistoryitemfeedback'])
class Feedback extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	renderContents = (username, url, eventTime) => {
		const {props: {item}} = this;
		const assignmentName = item.AssignmentName || 'an assignment';

		return (
			<div>
				<Avatar entity={username} width="32" height="32"/>
				<div className="wrap">
					<DisplayName entity={username}/>
					{' posted feedback on ' + assignmentName}
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
