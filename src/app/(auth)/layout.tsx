'use client'

import { LoginModal } from '@/features/auth/components/login-modal'
import { AuthHeader } from '@/widgets/auth/auth-header'

interface AuthLayoutProps {
	children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
	return (
		<main className="min-h-screen bg-neutral-100 dark:bg-[#1F1F1F]">
			<LoginModal />
			<div className="mx-auto max-w-screen-2xl p-4">
				<AuthHeader />
				<div className="flex flex-col items-center justify-center pt-4 md:pt-10">
					{children}
				</div>
			</div>
		</main>
	)
}

export default AuthLayout
