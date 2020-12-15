import { String as StringUtils } from '@nti/lib-commons';
import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';
import PropTypes from 'prop-types';
import React from 'react';

import NotificationItemFrame from '../frame';

import { COMMON_PREFIX, register } from './Registry';

const { escapeHTML } = StringUtils;

// String localization
const translation = scoped('nti-notifications.notifications.types.Badge', {
	action: 'awarded you %(badge)s',
});

const Translate = Text.Translator(translation);

Badge.propTypes = {
	item: PropTypes.object.isRequired,
};

Badge.MimeTypes = [
	COMMON_PREFIX + 'badge',
	COMMON_PREFIX + 'openbadges.badge',
];

register(Badge, 'badge');

export default function Badge ( { item } ) {
	return (
		<NotificationItemFrame item={item}>
			{/* Building string to show to the user */}
			<Translate
				localeKey="action"
				with={{
					badge: escapeHTML(item.Item.name),
				}}
			/>
		</NotificationItemFrame>
	);
}


/*
{
	"Class":"Badge",
	"MimeType":"application/vnd.nextthought.openbadges.badge",
	"alignment":null,
	"criteria":"https://ensync-corp-alpha.nextthought.com/badges/Leadership_for_Team_Management/criteria.html",
	"description":"Earn a badge by completing the leadership course offered by NextThought",
	"image":"https://ensync-corp-alpha.nextthought.com/badges/Leadership_for_Team_Management/badge.png",
	"issuer":{
		"Class":"Issuer",
		"MimeType":"application/vnd.nextthought.openbadges.issuer",
		"description":"https://ensync-corp-alpha.nextthought.com",
		"email":"ensync-corp-badges@nextthought.com",
		"image":null,
		"name":"enSYNC Corporation LMS",
		"revocationList":null,
		"url":"https://ensync-corp-alpha.nextthought.com"
	},
	"name":"Leadership for Team Management",
	"tags":["leadership","management"]
}
*/
