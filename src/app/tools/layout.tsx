import { ToolsNavigation } from '@/widgets/tools/tools-navigation'

export default function ToolsLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<section className="min-h-screen">
			<ToolsNavigation />
			{children}
		</section>
	)
}
