import { getAccessToken } from '@/shared/api/services/auth-token.service'

const token = getAccessToken()

const socket = new WebSocket(
	`wss://yamata-no-orochi.nktkln.com/chats/ws/${token}`
)

socket.onopen = () => {
	console.log('Соединение открыто')
	// Можешь отправить сообщение сразу при открытии
	socket.send(
		JSON.stringify({
			type: 'text',
			content: 'Привет, сервер!'
		})
	)
}

socket.onmessage = event => {
	const data = JSON.parse(event.data)
	console.log('Получено сообщение:', data)
}

socket.onerror = error => {
	console.error('Ошибка WebSocket:', error)
}

socket.onclose = event => {
	console.warn('Соединение закрыто:', event.reason)
}
