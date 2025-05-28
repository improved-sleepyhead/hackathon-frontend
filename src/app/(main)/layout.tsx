import { Header } from '@/widgets/marketing/header'

interface MainLayoutProps {
	children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
	return (
		<main className="flex flex-col items-center">
			<Header />
			{children}
		</main>
	)
}

export default MainLayout
