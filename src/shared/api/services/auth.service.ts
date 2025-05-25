import { axiosClassic, axiosWithAuth } from '@/shared/api/interceptors/interceptors';
import { AuthForm, IAuthResponse, IMailResponse, MailForm } from '@/shared/api/types/auth.types';

import { removeFromStorage, saveTokenStorage } from './auth-token.service'

export const authService = {
	async login(data: AuthForm) {
		const response = await axiosClassic.post<IAuthResponse>(
			'/verify_code',
			data
		)

		if (response.data.access_token) saveTokenStorage(response.data.access_token)
        console.log('Ответ от сервера:', response);
        console.log('Access token:', response.data.access_token);

		return response
	},

    async guestLogin() {
		const response = await axiosClassic.get<IAuthResponse>(
			'/verify_guest',
		)

		if (response.data.access_token) saveTokenStorage(response.data.access_token)

		return response
	},

    async main(data: MailForm) {
		const response = await axiosClassic.post<IMailResponse>(
			'/auth',
			data
		)

		return response
	},
    
	async getNewTokens() {
		const response = await axiosClassic.get<IAuthResponse>(
			'/refresh-token'
		)

		if (response.data.access_token) saveTokenStorage(response.data.access_token)

		return response
	},

	async logout() {
		const response = await axiosWithAuth.get<boolean>('/logout')

		if (response.data) removeFromStorage()

		return response
	}
};
