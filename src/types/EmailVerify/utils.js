import { getService } from '@nti/web-client';

export async function sendEmailVerification (user) {
	if (!user.hasLink('RequestEmailVerification')) {
		return Promise.reject();
	}

	const reqLink = user.getLink('RequestEmailVerification');
	let service;
	try {
		service = await getService();
		service.post(reqLink).then(() => {
			return Promise.resolve();
		}, (error) => {
			return Promise.reject(error);
		});
	} catch (e) {
		throw new Error(e);
	}
}

export async function verifyEmailToken (user, token) {
	if (!user.hasLink('VerifyEmailWithToken') || !token) {
		return Promise.reject();
	}
	let reqLink = user.getLink('VerifyEmailWithToken');
	let service;
	try {
		service = await getService();
		const result = await service.post(reqLink, { token: token });
		if (result.success) {
			let userLinks = user.Links;
			const indexToRemove = userLinks.indexOf('RequestEmailVerification');
			if (indexToRemove > -1) {
				userLinks.splice(indexToRemove, 1);
				user.Links = userLinks;
			}
			return true;
		} else {
			return false;
		}
	} catch (e) {
		throw new Error(e);
	}
}
