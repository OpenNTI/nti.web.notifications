import React from 'react';

import {CheckMimeType} from './types/index';

export default class NotificationItemRegistry {
	/**
	 * Returns the appropriate component based on the type of 
	 * the notification item given. Uses the item's MimeType property
	 * to determine equivalence.
	 * 
	 * @static
	 * @param {*} item notification item given
	 * @return {*} A React component that represents the type
	 * of the supplied item.
	 * @memberof NotificationItemRegistry
	 */
	static getComponent (item) {	
		// Return appropriate item type
		return React.createElement(CheckMimeType(item.MimeType), { item });
	}
}