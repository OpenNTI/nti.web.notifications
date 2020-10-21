import PropTypes from 'prop-types';
import React from 'react';
import { Toast } from '@nti/web-commons';

import EmailVerify from './types/EmailVerify/EmailVerify';

EmailVerifyToast.propTypes = {
	onDismiss: PropTypes.func.isRequired,
};

export default function EmailVerifyToast ( { onDismiss } ) {

	return (
		<Toast.Container location={Toast.Locations.TopRight} >
			<Toast.Card>
				<EmailVerify onDismiss={onDismiss}/>
			</Toast.Card>
		</Toast.Container>
	);
}
