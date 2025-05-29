'use client'

import { Button } from '@/shared/ui/kit/button'

export function InputPanel() {
	return (
		<div className="border-t bg-gray-50/80 px-8 py-6 backdrop-blur-sm">
			<div className="flex gap-4">
				<input
					type="text"
					placeholder="Введите боевой приказ..."
					className="w-full rounded-lg border border-gray-200 bg-white px-6 py-3 shadow-sm ring-1 ring-transparent transition-all focus:ring-2 focus:ring-blue-500"
				/>
				<Button className="rounded-lg bg-gray-800 px-6 hover:bg-gray-900">
					Отправить
				</Button>
			</div>
		</div>
	)
}
