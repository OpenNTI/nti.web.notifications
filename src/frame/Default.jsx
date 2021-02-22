import { Avatar, DateTime, DisplayName } from '@nti/web-commons';
import { LinkTo } from '@nti/web-routing';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

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
	link: PropTypes.bool,
};

export default function DefaultFrame({
	icon,
	item,
	attribution,
	children,
	link = true,
}) {
	const target = item.Item;
	const attributionInput = attribution || target.creator;
	const attributionContent =
		typeof attributionInput !== 'string' ? (
			attribution
		) : (
			<DisplayName entity={attributionInput} />
		);

	const selectedIcon =
		icon ||
		(typeof attributionInput !== 'string' ? null : (
			<Avatar entity={attributionInput} />
		));

	const eventTime = item?.getLastModified() || item?.getCreatedTime();

	const Link = useCallback(
		props => <LinkTo.Object object={target} {...props} />,
		[target]
	);

	const Wrapper = !link ? React.Fragment : Link;

	return (
		<Wrapper>
			<Item>
				<Icon>{selectedIcon}</Icon>
				<Content>
					{attributionContent && (
						<Attribution>{attributionContent}</Attribution>
					)}
					{children}
					<Time>
						<DateTime date={eventTime} relative />
					</Time>
				</Content>
			</Item>
		</Wrapper>
	);
}
