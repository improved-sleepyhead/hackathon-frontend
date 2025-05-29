import { create } from 'zustand'

type ChatContentType = 'audio' | 'image' | 'text'
type ChatId = Exclude<string | null, null>
type MessageRole = 'user' | 'ai'

interface ContentTypeState {
	audio?: boolean
	text?: boolean
	image?: boolean
}

interface MessageToAI extends ContentTypeState {
	body: string
}

export interface MessageState {
	id: number
	chat_id: string
	body: string
	type: ChatContentType
	role: MessageRole
	is_liked: boolean
	created_at: string
}

interface ChatResponse {
	chatId: ChatId
	aiAnswer: string
	type: ChatContentType
	userMessageId: number
	aiMessageId: number
}

interface ChatStoreState {
	requestParams: MessageToAI
	activeChatId: ChatId | null
	messages: ChatResponse[]
	chatContentType: ContentTypeState
	socket: WebSocket | null

	setChatContentType: (type: ContentTypeState) => void
	sendMessage: () => Promise<void>
	setActiveChat: (chatId: ChatId) => void
	connectSocket: (token: string) => void
}

export const useChatStore = create<ChatStoreState>((set, get) => ({
	chatContentType: { audio: false, text: false, image: false },
	requestParams: { body: '' },
	activeChatId: null,
	messages: [],
	socket: null,

	setChatContentType: type => {
		set({
			chatContentType: type,
			requestParams: { ...get().requestParams, ...type }
		})
	},

	setActiveChat: chatId => {
		set({ activeChatId: chatId })
	},

	connectSocket: token => {
		const { activeChatId } = get()

		const socket = new WebSocket(
			`wss://yamata-no-orochi.nktkln.com/chats/ws/${token}`
		)

		socket.onopen = () => {
			console.log('WebSocket открыт')
		}

		socket.onmessage = event => {
			const data = JSON.parse(event.data)
			console.log('WS сообщение:', data)

			const response: ChatResponse = {
				chatId: data.chat_id,
				aiAnswer: data.ai_answer,
				type: data.type,
				userMessageId: data.user_message_id,
				aiMessageId: data.ai_message_id
			}

			// Сохраняем activeChatId, если пришёл новый
			if (!get().activeChatId) {
				set({ activeChatId: data.chat_id })
			}

			set(state => ({
				messages: [...state.messages, response]
			}))
		}

		socket.onerror = e => {
			console.error('Ошибка WebSocket', e)
		}

		socket.onclose = event => {
			console.warn('WebSocket закрыт')
			console.warn('Код:', event.code)
			console.warn('Причина:', event.reason)
		}

		set({ socket })
	},

	sendMessage: async () => {
		const { socket, requestParams, activeChatId } = get()

		if (!socket || socket.readyState !== WebSocket.OPEN) {
			console.warn('Сокет не готов')
			return
		}

		const payload = {
			...requestParams,
			...(activeChatId ? {} : get().chatContentType) // только для нового чата
		}

		socket.send(JSON.stringify(payload))

		set({ requestParams: { body: '' } }) // очищаем поле
	}
}))
