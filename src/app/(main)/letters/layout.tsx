interface LettersLayoutProps {
	children: React.ReactNode
}

const LettersLayout = ({ children }: LettersLayoutProps) => {
	return (
		<main className="relative min-h-screen w-full">
			<div className="items-center flex w-full flex-col">{children}</div>
		</main>
	)
}

export default LettersLayout
