'use client'

import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger
} from '@/shared/ui/kit/hover-card'
import { AudioLines, Scale3d, Image } from 'lucide-react'

const TOOLS = [
	{
		id: 1,
		icon: <Scale3d />,
		tooltip: 'Модель книги с Вашими историями',
		link: 'model'
	},
	{
		id: 2,
		icon: <AudioLines />,
		tooltip: 'Музыка на основе Ваших запросов',
		link: 'music'
	},
	{
		id: 3,
		icon: <Image />,
		tooltip: 'Картинка на основе Ваших предпочтений',
		link: 'image'
	}
]

export const ToolsNavigation = () => {
	return (
		<aside className="flex fixed left-0 top-1/2 -translate-y-1/2 flex-col">
			{TOOLS.map(tool => (
				<DelayedTooltip {...tool} />
			))}
		</aside>
	)
}

// add to Link
export const DelayedTooltip = ({
	icon,
	tooltip
}: {
	icon: React.ReactNode
	tooltip: React.ReactNode
}) => {
	return (
		<HoverCard openDelay={350}>
			<HoverCardTrigger className="p-3 flex items-center justify-center text-primary hover:translate-x-2 transition-all">
				{icon}
			</HoverCardTrigger>
			<HoverCardContent side="right">{tooltip}</HoverCardContent>
		</HoverCard>
	)
}
