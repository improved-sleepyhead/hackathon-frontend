import { useQuery } from '@tanstack/react-query'
import { authService } from '@/shared/api/services/auth.service'
import { IUser } from '@/shared/api/types/auth.types'

export function useCurrentUser() {
	type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never
	const {
		data: currentUser,
		isLoading,
		isError
	} = useQuery<Expand<IUser> | null>({
		queryKey: ['currentUser'],
		queryFn: async () => {
			try {
				const user = await authService.getCurrentUser()
				return user
			} catch {
				return null
			}
		}
	})

	return { currentUser, isLoading, isError, isAuthenticated: !!currentUser }
}
