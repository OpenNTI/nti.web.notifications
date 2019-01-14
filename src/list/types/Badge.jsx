import React from 'react';
import PropTypes from 'prop-types';
import {DateTime} from '@nti/web-commons';

import Registry from './Registry';
import Base from './Base';

export default
@Registry.register(['application/vnd.nextthought.openbadges.badge'])
class Note extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	renderContents = (username, url, eventTime, preview, note) => {
		const {item} = this.props;

		return (
			<div>
				<div className="badge" style={{backgroundImage: `url(${item.image})`}}/>
				<div className="wrap">
					<b>{item.name}</b> badge earned.
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
