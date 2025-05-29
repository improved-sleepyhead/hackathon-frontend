import { Scale3d, AudioLines, Image } from 'lucide-react'

export const TOOLS = [
	{
		id: 1,
		icon: <Scale3d className="h-6 w-6 text-amber-700" />,
		title: 'Генератор военных историй',
		key: 'model',
		color: 'bg-amber-50 hover:bg-amber-100 border-amber-200'
	},
	{
		id: 2,
		icon: <AudioLines className="h-6 w-6 text-emerald-700" />,
		title: 'Военная музыка',
		key: 'music',
		color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200'
	},
	{
		id: 3,
		icon: <Image className="h-6 w-6 text-sky-700" />,
		title: 'Изображения',
		key: 'image',
		color: 'bg-sky-50 hover:bg-sky-100 border-sky-200'
	}
]

export const CHATS = [
	{ id: 1, title: 'Операция "Рассвет"', date: '2025-05-28' },
	{ id: 2, title: 'Оборона высоты 237', date: '2025-05-27' },
	{ id: 3, title: 'Танковая атака', date: '2025-05-26' }
]
