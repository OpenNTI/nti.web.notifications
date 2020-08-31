import React from 'react';
import Bell from './components/Bell';

import './View.css';

export default class NotificationsView extends React.Component {
	render () {
		return (
			<React.Fragment>
				<div>Notifications</div>
				<Bell />
			</React.Fragment>
		);
	}
}
