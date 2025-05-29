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
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'

export const Header = () => {
	const { isAuthenticated, isLoading } = useCurrentUser()
	const pathname = usePathname()
	const [isMounted, setIsMounted] = useState(false)
    const isDesktop = useMedia('(min-width: 1024px)', false)

    useEffect(() => {
        setIsMounted(true)
    }, []);

    if (!isMounted) {
        return null
    };
	const headerClass = cn(
		'flex h-full w-full items-center justify-between px-6 pb-6 pt-4 lg:px-20',
		{
			'bg-orange-main text-white': pathname === '/',
			'bg-transparent text-black': pathname === '/letters' || pathname === '/stories' || pathname === '/tools',
			'bg-dark-main text-white': pathname === '/music',
			'bg-red-main text-white': pathname === '/galary',
		}
	);
	const buttonClass = cn(
		'text-base',
		{
			'text-white': pathname === '/' || pathname === '/music' || pathname === '/galary',
			'text-black': pathname === '/letters' || pathname === '/stories' || pathname === '/tools',
		}
	);

	return (
		<div className={headerClass}>
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
									className={buttonClass}
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
										type="submit"
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
