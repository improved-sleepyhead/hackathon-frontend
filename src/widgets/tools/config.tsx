import { Scale3d, AudioLines, Image } from 'lucide-react'

export const TOOLS = [
	{
		id: 1,
		icon: <Scale3d className="h-6 w-6 text-yellow-200" />,
		title: 'Генератор военных историй',
		key: 'model',
		color: 'bg-yellow-100 hover:bg-yellow-200 border-yellow-300'
	},
	{
		id: 2,
		icon: <AudioLines className="h-6 w-6 text-green-200" />,
		title: 'Военная музыка',
		key: 'music',
		color: 'bg-green-100 hover:bg-green-200 border-green-300'
	},
	{
		id: 3,
		icon: <AudioLines className="h-6 w-6 text-orange-200" />,
		title: 'Военная песня',
		key: 'music',
		color: 'bg-orange-100 hover:bg-orange-200 border-orange-300'
	},
	{
		id: 4,
		icon: <Image className="h-6 w-6 text-blue-200" />,
		title: 'Изображения',
		key: 'image',
		color: 'bg-blue-100 hover:bg-blue-200 border-blue-300'
	}
]
