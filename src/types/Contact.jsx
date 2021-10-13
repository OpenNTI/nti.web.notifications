import PropTypes from 'prop-types';

import { scoped } from '@nti/lib-locale';
import { Text } from '@nti/web-commons';

import NotificationItemFrame from '../frame';

import { COMMON_PREFIX, register } from './Registry';

// String localization
const translation = scoped('nti-notifications.notifications.types.Contact', {
	action: 'added you as a contact',
});

const Translate = Text.Translator(translation);

Contact.propTypes = {
	item: PropTypes.object.isRequired,
};

Contact.MimeTypes = [COMMON_PREFIX + 'user'];

register(Contact, 'contact');

export default function Contact({ item }) {
	return (
		<NotificationItemFrame item={item}>
			<Translate localeKey="action" />
		</NotificationItemFrame>
	);
}
