'use client'

import Link from 'next/link'
import { AudioLines, Scale3d, Image } from 'lucide-react'
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger
} from '@/shared/ui/kit/hover-card'

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
		<div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2 rounded-lg border bg-background/80 p-1.5 shadow-lg backdrop-blur-sm">
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
					className="flex items-center justify-center p-3 text-primary transition-all hover:-translate-y-1"
				>
					{icon}
				</Link>
			</HoverCardTrigger>
			<HoverCardContent side="top">{tooltip}</HoverCardContent>
		</HoverCard>
	)
}
