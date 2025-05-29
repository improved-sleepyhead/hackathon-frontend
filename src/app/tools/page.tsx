'use client'

import { getAccessToken } from '@/shared/api/services/auth-token.service'
import { useChatStore } from '@/shared/stores/chat-store'
import { ChatWindow } from '@/widgets/tools/chat/chat-window'
import { CHATS } from '@/widgets/tools/chat/config'
import { SidebarChats } from '@/widgets/tools/chat/side-chats'
import { ToolsSidebar } from '@/widgets/tools/chat/tools-sidebar'
import { useEffect, useState } from 'react'

export default function Page() {
	//TODO это вынести из page.tsx в виджеты и логику стора
	const [selectedTools, setSelectedTools] = useState<number[]>([])
	const [selectedChat, setSelectedChat] = useState<number>(1)

	const toggleTool = (id: number) => {
		setSelectedTools(prev =>
			prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
		)
	}

	const { connectSocket } = useChatStore()

	useEffect(() => {
		const init = async () => {
			const token = await getAccessToken()

			connectSocket(token!)
		}
		init()
	}, [])

	return (
		<div className="flex h-[90vh] w-full overflow-hidden rounded-lg border bg-gradient-to-br from-gray-50 to-gray-100 shadow-xl">
			<SidebarChats
				chats={CHATS}
				selectedChat={selectedChat}
				onSelect={setSelectedChat}
			/>
			<ChatWindow />
			<ToolsSidebar
				selectedTools={selectedTools}
				toggleTool={toggleTool}
			/>
		</div>
	)
}
