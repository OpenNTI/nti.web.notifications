import React from 'react';
import ReactDOM from 'react-dom';

import {List} from '../../src';

window.$AppConfig = window.$AppConfig || {server: '/dataserver2/'};

class Test extends React.Component {
	state = {}

	render () {
		return <List/>;
	}
}

ReactDOM.render(
	<Test />,
	document.getElementById('content')
);
