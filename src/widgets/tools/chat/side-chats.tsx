import { ScrollArea } from '@/shared/ui/kit/scroll-area'
import { ChatItem } from './chat-item'

interface SidebarChatsProps {
	chats: Array<{ id: number; title: string; date: string }>
	selectedChat: number
	onSelect: (id: number) => void
}

export function SidebarChats({
	chats,
	selectedChat,
	onSelect
}: SidebarChatsProps) {
	return (
		<aside className="flex w-64 flex-col border-r bg-gray-50/95 backdrop-blur-sm">
			<header className="border-b bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-5">
				<h2 className="pb-6 text-lg font-semibold text-gray-800">
					Оперативные чаты
				</h2>
			</header>
			<ScrollArea className="px-5 pt-8">
				<div className="space-y-5">
					{chats.map(chat => (
						<ChatItem
							key={chat.id}
							{...chat}
							isSelected={selectedChat === chat.id}
							onSelect={onSelect}
						/>
					))}
				</div>
			</ScrollArea>
		</aside>
	)
}
