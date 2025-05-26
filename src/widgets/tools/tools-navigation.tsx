'use client'

import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger
} from '@/shared/ui/kit/hover-card'
import { AudioLines, Scale3d, Image } from 'lucide-react'
import Link from 'next/link'

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
		<div
			className="flex fixed left-1/2 bottom-4 -translate-x-1/2 
                   z-50 bg-background/80 backdrop-blur-sm 
                   rounded-lg border p-1.5 gap-2 shadow-lg"
		>
			{TOOLS.map((tool, id) => (
				<DelayedTooltip {...tool} key={id} />
			))}
		</div>
	)
}

export const DelayedTooltip = ({
	icon,
	tooltip,
	link
}: {
	icon: React.ReactNode
	tooltip: React.ReactNode
	link: string
}) => {
	return (
		<HoverCard openDelay={350}>
			<HoverCardTrigger asChild>
				<Link
					href={link}
					className="p-3 flex items-center justify-center text-primary hover:-translate-y-1 transition-all"
				>
					{icon}
				</Link>
			</HoverCardTrigger>
			<HoverCardContent side="bottom">{tooltip}</HoverCardContent>
		</HoverCard>
	)
}
