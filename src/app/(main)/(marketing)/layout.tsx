interface MarketingLayoutProps {
	children: React.ReactNode
}

const MarketingLayout = ({ children }: MarketingLayoutProps) => {
	return (
		<main className="bg-orange-main relative min-h-screen w-full">
			<div className="items-cente flex w-full flex-col">{children}</div>
		</main>
	)
}

export default MarketingLayout
