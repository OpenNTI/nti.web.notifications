import React from 'react';
import PropTypes from 'prop-types';
import {Loading} from '@nti/web-commons';
// import {scoped} from '@nti/lib-locale';

import Store from './Store';
import Registry from './types/Registry';
import Unknown from './types/Unknown';

const registry = Registry.getInstance();

// const t = scoped('nti-web-profile.ProfileUpdate.View', {
// 	title: 'Tell us About Yourself',
// 	error: 'Unable to load profile.',
// 	save: 'Save',
// 	saving: 'Saving',
// 	unknownError: 'Unable to update profile.'
// });

export default
@Store.connect({
	loading: 'loading',
	items: 'items'
})
class NotificationsView extends React.Component {
	static propTypes = {
		loading: PropTypes.bool,
		items: PropTypes.array
	}

	renderItem = (item) => {
		let Cmp = registry.getItemFor(item.MimeType);

		if(!Cmp) {
			Cmp = Unknown;
		}

		return <Cmp className="notification-list-item" key={item.getID()} item={item}>{item.MimeType}</Cmp>;
	}

	render () {
		const {loading, items} = this.props;

		if(loading) {
			return <Loading.Ellipsis/>;
		}

		if(!loading && items) {
			// return <ul className="off-canvas-list">{items.map(this.renderItem)}</ul>;
		}

		return null;
	}
}
