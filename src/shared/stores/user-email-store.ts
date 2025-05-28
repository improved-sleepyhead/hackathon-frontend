import { create } from 'zustand'

interface UserEmailState {
	email: string | null
	setEmail: (email: string) => void
	clearEmail: () => void
}

export const useUserEmailStore = create<UserEmailState>(set => ({
	email: null,
	setEmail: email => set({ email }),
	clearEmail: () => set({ email: null })
}))
