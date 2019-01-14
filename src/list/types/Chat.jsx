import React from 'react';
import PropTypes from 'prop-types';

import Registry from './Registry';
// import Base from './Base';

export default
@Registry.register('application/vnd.nextthought.messageinfo')
class Chat extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	render () {
		return (
			<li className="notification-item"/>
		);
	}
}
