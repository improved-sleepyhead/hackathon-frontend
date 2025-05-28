'use client'
import { Logo } from '@/shared/ui/logo'
import { Button } from '@/shared/ui/kit/button'
import Link from 'next/link'
import { UserButton } from '@/shared/ui/user-button'
import { usePathname } from 'next/navigation'
import { routes } from '@/widgets/marketing/constants/routes-data'
import { useCurrentUser } from '@/shared/api/hooks/use-current-user'
import { Spinner } from '@/shared/ui/spinner'
import { useMedia } from 'react-use'
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/kit/sheet'
import { MenuIcon } from 'lucide-react'

export const Header = () => {
	const { isAuthenticated, isLoading } = useCurrentUser()
	const pathname = usePathname()
	const isDesktop = useMedia('(min-width: 1024px)', true)

	return (
		<div className="bg-orange-main flex h-full w-full items-center justify-between bg-transparent px-6 pb-6 pt-4 text-white lg:px-20">
			<div className="hidden lg:block">
				<Logo />
			</div>
			{isDesktop ? (
				<div className="flex items-center gap-2 lg:gap-10">
					<div className="flex gap-1 lg:gap-6">
						{routes.map(item => {
							const fullHref = `${item.href}`
							const isActive = pathname === fullHref

							return (
								<Button
									variant="header"
									size={isActive ? 'active' : 'default'}
									className="text-base text-white"
									key={item.href}
								>
									<Link href={fullHref}>{item.label}</Link>
								</Button>
							)
						})}
					</div>
				</div>
			) : (
				<Sheet>
					<SheetTrigger asChild>
						<MenuIcon className="h-8 w-8" />
					</SheetTrigger>
					<SheetContent side="left">
						<div className="mt-4 flex flex-col items-start justify-start gap-y-6">
							{routes.map(item => {
								const fullHref = `${item.href}`
								const isActive = pathname === fullHref

								return (
									<Button
										variant="header"
										size={isActive ? 'active' : 'default'}
										className="text-base text-black"
										key={item.href}
									>
										<Link href={fullHref}>
											{item.label}
										</Link>
									</Button>
								)
							})}
						</div>
					</SheetContent>
				</Sheet>
			)}
			<div className="md:hidden">
				<Logo />
			</div>
			<div className="flex items-center justify-end">
				<div className="flex items-center justify-end">
					{isLoading ? (
						<Spinner />
					) : isAuthenticated ? (
						<UserButton />
					) : (
						<Button variant="outline" size="lg">
							<Link href="/login">Войти</Link>
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}
