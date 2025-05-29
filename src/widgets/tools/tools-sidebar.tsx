import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/shared/ui/kit/tooltip'
import { Button } from '@/shared/ui/kit/button'
import { TOOLS } from './config'

interface ToolsSidebarProps {
	selectedTools: number[]
}

export function ToolsSidebar({ selectedTools }: ToolsSidebarProps) {
	return (
		<aside className="w-96 border-l bg-white/95 backdrop-blur-sm">
			<header className="border-b bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-5">
				<h2 className="pb-6 text-lg font-semibold text-gray-800">
					Опции
				</h2>
			</header>
			<div className="flex flex-col items-center gap-5 px-5 pt-5">
				<TooltipProvider delayDuration={150}>
					{TOOLS.map(tool => (
						<Tooltip key={tool.id}>
							<TooltipTrigger asChild>
								<Button
									variant={
										selectedTools.includes(tool.id)
											? 'default'
											: 'ghost'
									}
									size="lg"
									className={`h-16 w-full justify-start space-x-4 transition-all ${tool.color} ${
										selectedTools.includes(tool.id)
											? 'scale-[99%] border-2 shadow-md'
											: 'hover:scale-[98%] hover:border'
									}`}
								>
									{tool.icon}
									<span className="text-base font-medium text-gray-700">
										{tool.title}
									</span>
								</Button>
							</TooltipTrigger>
							<TooltipContent
								side="left"
								className="border bg-white text-xl font-medium text-gray-600"
							>
								{tool.title}
							</TooltipContent>
						</Tooltip>
					))}
				</TooltipProvider>
			</div>
		</aside>
	)
}
