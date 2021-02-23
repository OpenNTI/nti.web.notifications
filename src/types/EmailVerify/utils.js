import { getService } from '@nti/web-client';

export async function sendEmailVerification(user) {
	if (!user.hasLink('RequestEmailVerification')) {
		throw new Error("User does not have 'RequestEmailVerification' link.");
	}

	const reqLink = user.getLink('RequestEmailVerification');
	let service;
	service = await getService();
	await service.post(reqLink);
}

export async function verifyEmailToken(user, token) {
	if (!user.hasLink('VerifyEmailWithToken') || !token) {
		throw new Error(
			"User does not have 'VerifyEmailWithToken' link or token is invalid."
		);
	}
	const reqLink = user.getLink('VerifyEmailWithToken');
	const service = await getService();
	await service.post(reqLink, { token: token });
	await user.refresh();
	return true;
}
