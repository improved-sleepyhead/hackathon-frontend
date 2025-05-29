'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ToolsNavigation } from '@/widgets/tools/tools-navigation'

export default function ToolsPagesLayout({
	children
}: {
	children: React.ReactNode
}) {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(true) // Начинаем с true

	useEffect(() => {
		const raw = localStorage.getItem('ai-results-storage')
		if (!raw) {
			toast.error(
				'Результаты генерации отсутствуют. Сначала создайте историю.'
			)
			router.push('/tools')
			setIsLoading(false) // Устанавливаем загрузку в false, чтобы скрыть индикатор (хотя мы уже перенаправляем)
			return
		}

		try {
			const parsed = JSON.parse(raw).state
			const { aiAudio, aiImage, aiText } = parsed

			if (!aiAudio && !aiImage && !aiText) {
				toast.error(
					'Результаты генерации отсутствуют. Сначала создайте историю.'
				)
				router.push('/tools')
			}
		} catch (err) {
			console.error('Ошибка при чтении localStorage:', err)
			toast.error('Произошла ошибка при загрузке результатов.')
			router.push('/tools')
		} finally {
			setIsLoading(false)
		}
	}, [router])

	if (isLoading) {
		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
				<div className="h-16 w-16 animate-spin rounded-full border-t-2 border-blue-500"></div>
			</div>
		)
	}

	return (
		<div className="overflow-hidden">
			<ToolsNavigation />
			{children}
		</div>
	)
}
