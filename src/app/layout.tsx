import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

import './global.css'
import { TanstackQueryProvider } from '@/providers/query-provider'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

import localFont from 'next/font/local'

const kazimir = localFont({
	src: [
		{
			path: './fonts/kazimirtext-extralight.woff2',
			weight: '200',
			style: 'normal'
		},
		{
			path: './fonts/kazimirtext-regular.woff2',
			weight: '400',
			style: 'normal'
		},
		{
			path: './fonts/kazimirtext-bold.woff2',
			weight: '600',
			style: 'normal'
		},
		{
			path: './fonts/kazimirtext-extrabold.woff2',
			weight: '800',
			style: 'normal'
		}
	],
	variable: '--font-kazimir',
	display: 'swap'
})

export const metadata: Metadata = {
	title: 'Projetto',
	description: 'The project tracking app',
	icons: {
		icon: [
			{
				url: '/icon.svg',
				href: '/icon.svg'
			}
		]
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressContentEditableWarning>
			<body
				className={cn(
					kazimir.className,
					inter.className,
					'min-h-screen antialiased'
				)}
			>
				<TanstackQueryProvider>
					<Toaster position="bottom-center" />

					{children}
				</TanstackQueryProvider>
			</body>
		</html>
	)
}
