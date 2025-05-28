import {
	axiosClassic,
	axiosWithAuth
} from '@/shared/api/interceptors/interceptors'
import {
	AuthForm,
	IAuthResponse,
	IMailResponse,
	IUser,
	MailForm
} from '@/shared/api/types/auth.types'

import { removeFromStorage, saveTokenStorage } from './auth-token.service'
import { QueryClient } from '@tanstack/react-query'

export const authService = {
	async login(data: AuthForm) {
		const response = await axiosClassic.post<IAuthResponse>(
			'/verify_code',
			data
		)

		if (response.data.access_token)
			saveTokenStorage(response.data.access_token)

		return response
	},

	async guestLogin() {
		const response = await axiosClassic.get<IAuthResponse>('/verify_guest')

		if (response.data.access_token)
			saveTokenStorage(response.data.access_token)

		return response
	},

	async main(data: MailForm) {
		const response = await axiosClassic.post<IMailResponse>('/auth', data)

		return response
	},

	async getNewTokens() {
		const response = await axiosClassic.get<IAuthResponse>('/refresh_token')

		if (response.data.access_token)
			saveTokenStorage(response.data.access_token)

		return response
	},

	async getCurrentUser(): Promise<IUser> {
		const response = await axiosWithAuth.get<IUser>('/profile')
		return response.data
	},

	async logout() {
		const response = await axiosWithAuth.get<boolean>('/logout')

		if (response.status === 200) {
			removeFromStorage()
		}

		return response
	}
}
