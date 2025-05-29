import { ScrollArea } from '@/shared/ui/kit/scroll-area'
import { InputPanel } from './input-panel'
import { MessageAI } from './message-ai'
import { MessageUser } from './message-user'

export function ChatWindow() {
	return (
		<main className="flex flex-1 flex-col bg-white/95 backdrop-blur-sm">
			<Header />
			<ScrollArea className="flex-1 p-8">
				<div className="space-y-6">
					<MessageAI />
					<MessageUser />
				</div>
			</ScrollArea>
			<InputPanel />
		</main>
	)
}

function Header() {
	return (
		<header className="border-b bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-5">
			<h1 className="text-xl font-bold text-gray-800">СЕЛЬПО ИИ</h1>
			<p className="mt-1 text-sm text-gray-600">
				Стратегический генератор контента
			</p>
		</header>
	)
}
