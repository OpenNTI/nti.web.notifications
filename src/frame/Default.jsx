import { Avatar, DateTime, DisplayName } from '@nti/web-commons';
import { LinkTo } from '@nti/web-routing';
import PropTypes from 'prop-types';
import React from 'react';

import Attribution from './Attribution';
import Content from './Content';
import Icon from './IconContainer';
import Item from './Item';
import Time from './Time';

DefaultFrame.propTypes = {
	item: PropTypes.object.isRequired,
	children: PropTypes.object.isRequired,
	attribution: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	icon: PropTypes.node,
};


export default function DefaultFrame ( { icon, item, attribution, children } ) {
	const attributionInput = attribution || item.creator || item.Creator;
	const attributionContent = typeof attributionInput !== 'string' ? attribution : (
		<DisplayName entity={attributionInput} />
	);

	const selectedIcon = icon || typeof attributionInput !== 'string' ? null : (
		<Avatar entity={attributionInput} />
	);

	const eventTime = item?.getLastModified() || item?.getCreatedTime();

	return (
		<LinkTo.Object object={item}>
			<Item>
				<Icon>{selectedIcon}</Icon>
				<Content>
					<Attribution>{attributionContent}</Attribution>
					{children}
					<Time>
						<DateTime date={eventTime} relative />
					</Time>
				</Content>
			</Item>
		</LinkTo.Object>
	);
}
