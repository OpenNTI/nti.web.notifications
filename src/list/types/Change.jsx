import React from 'react';
import PropTypes from 'prop-types';

import Registry from './Registry';
import Grade from './Grade';
import Contact from './Contact';
import Unknown from './Unknown';

const TYPES_TO_CMP = {
	'application/vnd.nextthought.grade': Grade,
	'application/vnd.nextthought.user': Contact
};

function getCmpFor (item) {
	const {Item: subItem} = item;

	return TYPES_TO_CMP[subItem.MimeType];
}

export default
@Registry.register(['application/vnd.nextthought.change'])
class Change extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	state = {}

	render () {
		const {item} = this.props;

		const Cmp = getCmpFor(item);

		if(Cmp) {
			return <Cmp item={item}/>;
		}

		else {
			return <Unknown item={item}/>;
		}
	}
}
