import React from 'react';
import PropTypes from 'prop-types';
import Logger from '@nti/util-logger';
import {isNTIID, encodeForURI} from '@nti/lib-ntiids';
import {LinkTo} from '@nti/web-routing';

const logger = Logger.get('notifications:kinds:ForumTopic');

function trunc (txt, len) {
	if (txt.length <= len) {
		return txt;
	}

	return txt.substr(0, Math.max(0, len - 3)) + '...';
}

export function getTime (o) {
	try {
		let lm = o && o.getLastModified();
		//Return the Last Modified, unless its not set
		return o && !lm ? o.getCreatedTime() : lm;
	} catch	(e) {
		logger.warn('No Date for object:', o);
		return new Date(0);
	}
}

export default class Base extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired,
		renderContents: PropTypes.func.isRequired
	}

	state = {}

	componentDidMount  () {
		this.updatePreview(this.props);

		let change = this.props.item;
		let item = change.Item || change;
		let username = item.creator || item.Creator;
		let url;

		try {
			let id = item.getID();

			id = isNTIID(id) ? encodeForURI(id) : encodeURIComponent(id);

			url = `${this.getBasePath()}object/${id}/`;
		} catch(e) {
			logger.warn('Notable has no url: ', item);
		}

		this.setState({ username, change, item, url });
	}


	componentDidUpdate (prevProps) {
		if (this.props.item !== prevProps.item) {
			this.updatePreview(this.props);
		}
	}

	getEventTime (other) {
		let {item, change} = this.state;
		//Get the time from the item, if not found, use the change.
		return getTime(other) || getTime(item) || getTime(change);
	}

	updatePreview  (props) {
		let change = props.item;
		let note = change.Item || change;
		let title = note.title;
		let body = note.body || [];
		let node;

		if (title) {
			this.setState({preview: title, note});
			return;
		}

		try {
			node = document.createElement('div');
			body = body.map(p => typeof p === 'object' ? '[attachment]' : p).join(' ');

			node.innerHTML = body;

			const preview = trunc(node.textContent, 140);

			this.setState({preview, note});
		} catch (e) {
			logger.error(e.stack);
		}
	}

	render () {
		const {username, url, preview, note, change} = this.state;
		const {renderContents, item} = this.props;

		const id = item.getID();
		const subItemId = item.Item && item.Item.getID();

		if(id || subItemId) {
			return (
				<li className="notification-item">
					<LinkTo.Object object={subItemId ? item.Item : item}>
						{renderContents(username, url, this.getEventTime(), preview, note, change)}
					</LinkTo.Object>
				</li>
			);
		}

		// TODO: LinkTo.Object/Path instead of an anchor?
		return (
			<li className="notification-item">
				<a href={url}>
					{renderContents(username, url, this.getEventTime(), preview, note, change)}
				</a>
			</li>
		);
	}
}
