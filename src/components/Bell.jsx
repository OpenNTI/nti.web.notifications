import { Badge } from '@nti/web-commons';
import './Bell.scss';
import PropTypes from 'prop-types';
import React from 'react';

Bell.propTypes = {
	badge: PropTypes.any,
};

export default function Bell ( { badge } ) {
	return (
		<Badge badge={badge}>
			
			<div className="bell" />
			
		</Badge>
	);
}