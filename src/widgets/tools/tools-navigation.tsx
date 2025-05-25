'use client'

import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger
} from '@/shared/ui/kit/hover-card'
import { AudioLines, Scale3d, Image } from 'lucide-react'

const TOOLS = [
	{ id: 1, icon: <Scale3d />, tooltip: 'Модель книги с Вашими историями' },
	{ id: 2, icon: <AudioLines />, tooltip: 'Музыка на основе Ваших запросов' },
	{ id: 3, icon: <Image />, tooltip: 'Картинка на основе Ваших предпочтений' }
]

export const ToolsNavigation = () => {
	return (
		<nav className="flex fixed left-0 top-1/2 -translate-y-1/2 flex-col">
			{TOOLS.map(tool => (
				<DelayedTooltip {...tool} />
			))}
		</nav>
	)
}

export const DelayedTooltip = ({
	icon,
	tooltip
}: {
	icon: React.ReactNode
	tooltip: React.ReactNode
}) => {
	return (
		<HoverCard openDelay={100}>
			<HoverCardTrigger className="p-3 flex items-center justify-center text-primary hover:translate-x-2 transition-all">
				{icon}
			</HoverCardTrigger>
			<HoverCardContent side="right">{tooltip}</HoverCardContent>
		</HoverCard>
	)
}
