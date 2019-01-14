import React from 'react';
import ReactDOM from 'react-dom';

window.$AppConfig = window.$AppConfig || {server: '/dataserver2/'};

class Test extends React.Component {
	state = {}

	render () {
		return <div>Test harness for web-notifications</div>;
	}
}

ReactDOM.render(
	<Test />,
	document.getElementById('content')
);
