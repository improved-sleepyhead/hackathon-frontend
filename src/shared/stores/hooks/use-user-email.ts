import { useUserEmailStore } from '@/shared/stores/user-email-store'

export const useUserEmail = () => {
	const { email, setEmail, clearEmail } = useUserEmailStore()
	return { email, setEmail, clearEmail }
}
