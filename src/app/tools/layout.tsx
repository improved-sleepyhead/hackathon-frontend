export default function ToolsLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<section className="flex min-h-screen w-full items-center px-10">
			{children}
		</section>
	)
}
