import { Array as arrays, Registry } from '@nti/lib-commons';

export default class NotificationItemRegistry extends Registry.Map {
	static setDefault(Component) {
		this.getInstance().register(Registry.Default, Component);
	}
}

const COMMON_PREFIX = 'application/vnd.nextthought.';

export { COMMON_PREFIX, getComponent, register };

function register(Component, mimeTypeOrSuffix) {
	// Get any existing MimeTypes
	const MimeTypes = arrays.ensure(Component.MimeTypes);
	// Normalize input mime/suffix
	const mimeTypes = arrays
		.ensure(mimeTypeOrSuffix)
		.map(suffix =>
			suffix.indexOf(COMMON_PREFIX) === 0
				? suffix
				: COMMON_PREFIX + suffix
		);
	// Merge old and new...
	Component.MimeTypes = [
		...MimeTypes,
		...mimeTypes.filter(newMime => !MimeTypes.includes(newMime)),
	];

	// Add Component to the registry for the given mimeTypes
	NotificationItemRegistry.register(Component.MimeTypes)(Component);
}

/**

 * Returns the appropriate component based on the type of
 * the notification item given. Uses the item's MimeType property
 * to determine equivalence.
 *
 * @static
 * @param {Change} notice notification item given
 * @returns {*} A React component that represents the type
 * of the supplied item.
 */
function getComponent(notice) {
	const type = notice.Item.MimeType;
	return NotificationItemRegistry.getInstance().getItem(type);
}
