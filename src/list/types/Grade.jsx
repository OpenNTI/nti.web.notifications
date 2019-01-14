import React from 'react';
import PropTypes from 'prop-types';
import {getService} from '@nti/web-client';
import {DateTime, Presentation, Avatar, DisplayName} from '@nti/web-commons';

import Base from './Base';

let CATALOG_CACHE = {};

async function resolveCatalogEntry (id) {
	const service = await getService();

	const request = CATALOG_CACHE[id] || service.getObject(id);

	if(!CATALOG_CACHE[id]) {
		CATALOG_CACHE[id] = request;

		setTimeout(() => {
			delete CATALOG_CACHE[id];
		}, 10000);
	}

	return request;
}

export default class Grade extends React.Component {
	static propTypes = {
		item: PropTypes.object.isRequired
	}

	state = {}

	async componentDidMount () {
		const {item: {Item: {creator, CatalogEntryNTIID }}} = this.props;

		if(creator === 'system') {
			const catalogEntry = await resolveCatalogEntry(CatalogEntryNTIID);

			this.setState({
				catalogEntry
			});
		}
		else {
			this.setState({
				creator
			});
		}
	}

	renderContents = (username, url, eventTime) => {
		const {state: {catalogEntry, creator}, props: {item: {Item: {CourseName, AssignmentName = 'an assignment'}}}} = this;

		return (
			<div>
				{creator && <Avatar entity={creator} width="32" height="32" suppressProfileLink/>}
				{catalogEntry && <Presentation.AssetBackground className="avatar" contentPackage={catalogEntry} type="thumb"/>}
				<div className="wrap">
					{creator && <DisplayName entity={creator} suppressProfileLink/>}
					{catalogEntry && <span>{catalogEntry.Title}</span>}
					<span> graded {AssignmentName}{CourseName ? ` in ${CourseName}` : ''}</span>
					<DateTime date={eventTime} relative />
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
