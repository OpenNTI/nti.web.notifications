import { getService } from '@nti/web-client';

export async function sendEmailVerification (user) {
	if (!user.hasLink('RequestEmailVerification')) {
		return Promise.reject();
	}

	const reqLink = user.getLink('RequestEmailVerification');
	return await getService().post(reqLink)
		.then(() => {
			return Promise.resolve();
		});
}

export async function verifyEmailToken (user, token) {
	if (!user.hasLink('VerifyEmailWithToken') || !token) {
		return Promise.reject();
	}
	let link = user.getLink('VerifyEmailWithToken');
	return await getService().post(link, { token: token })
		.then(function (response) {
			let userLinks = user.Links;
			const indexToRemove = userLinks.indexOf('RequestEmailVerification');
			if (indexToRemove > -1) {
				userLinks.splice(indexToRemove, 1);
				user.Links = userLinks;
			}
			return Promise.resolve(response);
		});
}