import { Header } from '@/widgets/marketing/header'

export default function ToolsLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<section className="bg-orange-main flex min-h-screen w-full flex-col items-center">
			<Header />
			<div className="w-full px-10">{children}</div>
		</section>
	)
}
