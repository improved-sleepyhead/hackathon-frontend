import { ToolsNavigation } from '@/widgets/tools/tools-navigation'

export default function ToolsPagesLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<ToolsNavigation />
			{children}
		</>
	)
}
