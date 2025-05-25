import Cookies from 'js-cookie'

export enum EnumTokens {
	'access_token' = 'accessToken',
	'refresh_token' = 'refreshToken'
};

export const getAccessToken = () => {
	const accessToken = Cookies.get(EnumTokens.access_token)
	return accessToken || null
};

export const saveTokenStorage = (accessToken: string) => {
	Cookies.set(EnumTokens.access_token, accessToken, {
		domain: 'localhost',
		sameSite: 'strict',
		expires: 1
	})
};

export const removeFromStorage = () => {
	Cookies.remove(EnumTokens.access_token)
};