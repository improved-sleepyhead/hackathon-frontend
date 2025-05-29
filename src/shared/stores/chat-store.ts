import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'

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
	messages: Map<ChatId, MessageState[]>
	chatContentType: ContentTypeState

	setChatContentType: (type: ContentTypeState) => void
	sendMessage: () => Promise<ChatResponse>
	handleResponse: (response: ChatResponse) => void
	setActiveChat: (chatId: ChatId) => void
}

export const useChatStore = create<ChatStoreState>((set, get) => ({
	chatContentType: { audio: false, text: false, image: false },
	requestParams: {
		body: ''
	},

	activeChatId: null,
	messages: new Map(),

	setChatContentType(type) {},

	sendMessage: async () => {
		const { requestParams, activeChatId, chatContentType } = get()
		const chatId = activeChatId
		const tempUserMessageId = Date.now()

		const newMessage: MessageToAI = {
			body: requestParams.body,
			audio: chatContentType.audio,
			image: chatContentType.image,
			text: chatContentType.text
        }
        

		set(state => ({
			requestParams: { ...requestParams, body: '' },
			activeChatId: chatId,
			messages: new Map(state.messages).set(chatId, [
				...(state.messages.get(chatId) || []),
				newMessage
			])
		}))

		return {
			chatId,
			aiAnswer: 'Generated content',
			type: 'text',
			userMessageId: tempUserMessageId,
			aiMessageId: Date.now()
		}
	},

	handleResponse: response => {
		set(state => {
			const chatMessages = state.messages.get(response.chatId) || []

			const aiMessage: MessageState = {
				id: response.aiMessageId,
				chat_id: response.chatId,
				body: response.aiAnswer,
				type: response.type,
				role: 'ai',
				is_liked: false,
				created_at: new Date().toISOString()
			}

			return {
				messages: new Map(state.messages).set(
					response.chatId,
					chatMessages
						.map(msg =>
							msg.id === response.userMessageId
								? { ...msg, id: response.userMessageId }
								: msg
						)
						.concat(aiMessage)
				)
			}
		})
	},

	setActiveChat: chatId => {
		set({ activeChatId: chatId })
	}
}))
