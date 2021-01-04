import { getService } from '@nti/web-client';

export async function sendEmailVerification (user) {
	if (!user.hasLink('RequestEmailVerification')) {
		return Promise.reject(new Error('User does not have \'RequestEmailVerification\' link.'));
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
		return Promise.reject(new Error('User does not have \'VerifyEmailWithToken\' link or token is invalid.'));
	}
	let reqLink = user.getLink('VerifyEmailWithToken');
	let service;
	try {
		service = await getService();
		await service.post(reqLink, { token: token });
		await user.refresh();
		return true;
	} catch (e) {
		throw new Error(e);
	}
}
