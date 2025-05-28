import { Button } from '@/shared/ui/kit/button'
import { Logo } from '@/shared/ui/logo'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export const AuthHeader = () => {
	return (
		<nav className="flex items-center justify-between">
			<Logo />
			<div className="flex items-center justify-end gap-x-4">
				<Button
					variant="secondary"
					className="bg-white p-5 hover:bg-white"
					asChild
				>
					<Link href="/">
						<ArrowLeft /> На главную
					</Link>
				</Button>
			</div>
		</nav>
	)
}
