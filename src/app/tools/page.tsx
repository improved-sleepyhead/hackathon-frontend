'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Label } from '@/shared/ui/kit/label'
import { Card } from '@/shared/ui/kit/card'
import { TOOLS } from '@/widgets/tools/config'
import { Textarea } from '@/shared/ui/kit/textarea'
import { Button } from '@/shared/ui/kit/button'
import { useAiResultStore } from '@/shared/stores/ai-result-store'
import Link from 'next/link'

export default function Page() {
	const [hasStoredResults, setHasStoredResults] = useState(false)

	const [selectedTools, setSelectedTools] = useState<number[]>([])
	const [storyText, setStoryText] = useState('')
	const [isGenerating, setIsGenerating] = useState(false)
	const [generationStatus, setGenerationStatus] = useState('')
	const { setAiText, setAiImage, setAiAudio } = useAiResultStore()

	useEffect(() => {
		if (storyText.trim() !== '' && !selectedTools.includes(1)) {
			setSelectedTools(prev => [...prev, 1])
		}
	}, [storyText, selectedTools])

	const handleToolToggle = (toolId: number) => {
		if (isGenerating) return

		const isTextTool = toolId === 1
		const isMusicOrSong = toolId === 2 || toolId === 3

		if (isTextTool) {
			setSelectedTools(prev => (prev.includes(toolId) ? [] : [toolId]))
			return
		}

		if (!selectedTools.includes(1)) return

		if (isMusicOrSong) {
			const filtered = selectedTools.filter(id => id !== 2 && id !== 3)
			setSelectedTools(
				selectedTools.includes(toolId)
					? filtered
					: [...filtered, toolId]
			)
			return
		}

		setSelectedTools(prev =>
			prev.includes(toolId)
				? prev.filter(id => id !== toolId)
				: [...prev, toolId]
		)
	}

	const canGenerate = storyText.trim().length > 0 && selectedTools.length >= 1
	const baseUrl = 'https://yamata-no-orochi.nktkln.com/models'
	const textUrl = '/get_llm_answer'
	const audioUrl = '/get_llm_audio'
	const imageUrl = '/get_llm_image'

	const handleSubmit = async () => {
		if (!canGenerate || isGenerating) return

		setIsGenerating(true)
		setGenerationStatus('Начало генерации...')
		try {
			const requests = []

			for (const toolId of selectedTools) {
				if (toolId === 1) {
					setGenerationStatus('Генерация текста...')
					requests.push(
						axios
							.get(`${baseUrl}${textUrl}`, {
								params: {
									prompt: storyText
								}
							})
							.then(response => {
								setAiText(response.data)
								setHasStoredResults(true)
							})
					)
				} else if (toolId === 2 || toolId === 3) {
					const toolType = toolId === 2 ? 'музыки' : 'песни'
					setGenerationStatus(`Генерация ${toolType}...`)

					requests.push(
						axios
							.get(`${baseUrl}${audioUrl}`, {
								params: {
									prompt: storyText,
									generate_words_with_audio: toolId === 3
								}
							})

							.then(response => {
								setAiAudio(response.data)
								setHasStoredResults(true)
							})
					)
				} else if (toolId === 4) {
					setGenerationStatus('Генерация изображения...')
					requests.push(
						axios
							.get(`${baseUrl}${imageUrl}`, {
								params: {
									prompt: storyText
								}
							})
							.then(response => {
								setAiImage(response.data)
								setHasStoredResults(true)
							})
					)
				}
			}

			await Promise.all(requests)

			setGenerationStatus('Генерация завершена успешно!')
		} catch (error) {
			console.error('Ошибка генерации:', error)
		} finally {
			setIsGenerating(false)
		}
	}

	useEffect(() => {
		try {
			const raw = localStorage.getItem('ai-results-storage')
			if (!raw) return

			const parsed = JSON.parse(raw).state
			const { aiAudio, aiImage, aiText } = parsed

			if (aiAudio || aiImage || aiText) {
				setHasStoredResults(true)
			}
		} catch (err) {
			console.error('Ошибка при чтении localStorage:', err)
		}
	}, [])

	return (
		<div className="relative flex min-h-[90vh] flex-col justify-between overflow-hidden rounded-xl border bg-white p-6 shadow-lg">
			<div className="relative z-10 flex flex-col gap-6 md:flex-row">
				{/* Текстовое поле */}
				<div className="w-full md:w-2/3">
					<Label className="font-combat mb-3 block border-b text-lg tracking-wide text-gray-800">
						Военная история
					</Label>
					<Textarea
						value={storyText}
						onChange={e => setStoryText(e.target.value)}
						placeholder="Опишите боевую операцию..."
						className="min-h-[500px] w-full rounded-lg border-2 border-gray-300 bg-gray-50 px-4 py-3 text-base text-gray-900 placeholder-gray-500 shadow-inner transition focus:ring-2 focus:ring-gray-500"
						disabled={isGenerating}
					/>
				</div>

				{/* Инструменты */}
				<div className="flex w-full items-center lg:w-1/3">
					<div className="w-full space-y-3">
						{/* Остальные инструменты */}
						{TOOLS.filter(t => t.id !== 2 && t.id !== 3).map(
							tool => {
								const isActive = selectedTools.includes(tool.id)
								const isDisabled =
									(tool.id !== 1 &&
										!selectedTools.includes(1)) ||
									isGenerating

								return (
									<Card
										key={tool.id}
										className={`flex items-center justify-between border-2 px-4 py-2 transition-all ${
											isActive
												? `${tool.color} ring-2 ring-gray-800`
												: 'border-gray-300 bg-white hover:bg-gray-50'
										} ${
											isDisabled
												? 'cursor-not-allowed opacity-50'
												: 'cursor-pointer'
										}`}
										onClick={() =>
											!isDisabled &&
											handleToolToggle(tool.id)
										}
									>
										<div className="flex items-center gap-3">
											<div
												className={`rounded-full p-1 ${
													isActive
														? 'bg-gray-800'
														: 'bg-gray-500'
												}`}
											>
												{tool.icon}
											</div>
											<span
												className={`font-medium ${
													isActive
														? 'text-gray-900'
														: 'text-gray-700'
												}`}
											>
												{tool.title}
											</span>
										</div>
										<div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-400">
											{isActive && (
												<div className="h-2 w-2 animate-pulse rounded-full bg-gray-800" />
											)}
										</div>
									</Card>
								)
							}
						)}
						<div className="flex gap-3">
							{TOOLS.filter(t => t.id === 2 || t.id === 3).map(
								tool => {
									const isActive = selectedTools.includes(
										tool.id
									)
									const isDisabled =
										!selectedTools.includes(1) ||
										isGenerating

									return (
										<Card
											key={tool.id}
											className={`flex w-full items-center justify-between border-2 px-4 py-2 transition-all ${
												isActive
													? `${tool.color} ring-2 ring-gray-800`
													: 'border-gray-300 bg-white hover:bg-gray-50'
											} ${
												isDisabled
													? 'cursor-not-allowed opacity-50'
													: 'cursor-pointer'
											}`}
											onClick={() =>
												!isDisabled &&
												handleToolToggle(tool.id)
											}
										>
											<div className="flex items-center gap-3">
												<div
													className={`rounded-full p-1 ${
														isActive
															? 'bg-gray-800'
															: 'bg-gray-500'
													}`}
												>
													{tool.icon}
												</div>
												<span
													className={`font-medium ${
														isActive
															? 'text-gray-900'
															: 'text-gray-700'
													}`}
												>
													{tool.title}
												</span>
											</div>
											<div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-400">
												{isActive && (
													<div className="h-2 w-2 animate-pulse rounded-full bg-gray-800" />
												)}
											</div>
										</Card>
									)
								}
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Кнопка с индикатором загрузки */}
			<div className="relative z-10 mt-10 flex justify-center md:absolute md:bottom-6 md:left-1/2 md:-translate-x-1/2">
				<Button
					disabled={!canGenerate || isGenerating}
					onClick={handleSubmit}
					className="px-8 py-3 text-lg font-semibold tracking-wide disabled:cursor-not-allowed disabled:opacity-50"
				>
					{isGenerating ? (
						<div className="flex items-center gap-2">
							<svg
								className="h-5 w-5 animate-spin text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							<span>{generationStatus}...</span>
						</div>
					) : (
						'Сгенерировать'
					)}
				</Button>
				{hasStoredResults && !isGenerating && (
					<Button
						// onClick={() => router.push('/results')}
						className="ml-4 px-8 py-3 text-lg font-semibold tracking-wide"
					>
						<Link href={`tools/model`}>Просмотреть результаты</Link>
					</Button>
				)}
			</div>
		</div>
	)
}
