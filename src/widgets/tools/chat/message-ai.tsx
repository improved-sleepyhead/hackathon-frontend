import { Button } from '@/shared/ui/kit/button'
import { Computer, Upload } from 'lucide-react'

export function MessageAI() {
	return (
		<div className="group relative">
			<div className="flex items-center gap-4">
				<div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 p-1.5 text-blue-800">
					<Computer />
				</div>
				<div className="max-w-2xl rounded-xl bg-blue-50 p-4 shadow-sm">
					<p className="text-gray-800">
						Готов к работе! Выберите тип контента и начните
						стратегическую операцию по генерации.
					</p>
					<div className="mt-3 flex justify-end">
						<Button
							variant="ghost"
							size="sm"
							className="gap-1.5 rounded-full bg-white/80 px-4 py-1.5 text-xs font-medium backdrop-blur-sm transition-all hover:bg-white hover:shadow-sm"
						>
							<Upload className="h-3.5 w-3.5" />
							Опубликовать контент
						</Button>
					</div>
				</div>
			</div>
			<div className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-blue-200/40 blur-sm transition-opacity group-hover:opacity-0" />
		</div>
	)
}
