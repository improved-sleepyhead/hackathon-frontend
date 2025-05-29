import { FeedbackModal } from "@/features/feedback/components/feedback-modal"

interface MarketingLayoutProps {
	children: React.ReactNode
}

const MarketingLayout = ({ children }: MarketingLayoutProps) => {
	return (
		<main className="relative min-h-screen w-full">
			<div className="items-cente flex w-full flex-col">{children}</div>
		</main>
	)
}

export default MarketingLayout
