import React from 'react';
import PropTypes from 'prop-types';

export default class Note extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	render () {
		let type = this.props.item.MimeType.replace('application/vnd.nextthought.', '');
		return (
			<li className="notification-item">Unknown {type}</li>
		);
	}
}
