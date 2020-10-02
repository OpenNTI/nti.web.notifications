import React from 'react';
import ReactDOM from 'react-dom';

import {List} from '../../src';

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
