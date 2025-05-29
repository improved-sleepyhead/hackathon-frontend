import { FeedbackModal } from '@/features/feedback/components/feedback-modal'
import { Header } from '@/widgets/marketing/header'

interface MainLayoutProps {
	children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
	return (
		<main className="flex flex-col items-center">
			<FeedbackModal />
			<Header />
			{children}
		</main>
	)
}

export default MainLayout
