'use client'

import { atom, useAtom } from 'jotai'
import { useEffect } from 'react'
import { generateRandomText } from './lib/textureGenerator'
import { useAiResultStore } from '@/shared/stores/ai-result-store'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Function to split text into pages (roughly 500 words per page)
function splitTextIntoPages(text) {
	if (!text) return ['']
	const words = text.split(' ')
	const pages = []
	const wordsPerPage = 500

	for (let i = 0; i < words.length; i += wordsPerPage) {
		pages.push(words.slice(i, i + wordsPerPage).join(' '))
	}

	return pages
}

// Get AI text from localStorage
function getAIText() {
	try {
		const stored = localStorage.getItem('ai-results-storage')
		if (!stored) return ''

		const parsed = JSON.parse(stored)
		const text = parsed?.state?.aiText?.ai_answer || ''
		return text
	} catch (error) {
		console.error('Error reading AI text:', error)
		return ''
	}
}

// Split the AI text into pages
const aiText = getAIText()
const aiTextPages = splitTextIntoPages(aiText)

// Основные страницы в середине книги
const mainPages = aiTextPages.map((content, index) => ({
	title: index === 0 ? 'БОЕВОЙ ПУТЬ' : `ПРОДОЛЖЕНИЕ ${index + 1}`,
	content: content
}))

export const pageAtom = atom(0)

// Создаем структуру страниц
export const pages = [
	// Обложка
	{
		front: 'book-cover',
		back: 'book-back',
		frontText: 'ВОЕННЫЙ\nДНЕВНИК',
		backText: '',
		isMainPage: false
	}
]

// Добавляем пустые страницы в начале (создаем толщину)
const EMPTY_PAGES_START = 20
for (let i = 0; i < EMPTY_PAGES_START; i++) {
	pages.push({
		front: 'page',
		back: 'page',
		frontText: '',
		backText: '',
		isMainPage: false
	})
}

// Добавляем основные страницы контента
mainPages.forEach((page, index) => {
	pages.push({
		front: 'page',
		back: 'page',
		frontText: `${page.title}\n\n${page.content}`,
		backText: generateRandomText(100),
		isMainPage: true,
		pageNumber: index + 1
	})
})

// Добавляем пустые страницы в конце (создаем толщину)
const EMPTY_PAGES_END = 20
for (let i = 0; i < EMPTY_PAGES_END; i++) {
	pages.push({
		front: 'page',
		back: 'page',
		frontText: '',
		backText: '',
		isMainPage: false
	})
}

// Добавляем заднюю обложку
pages.push({
	front: 'book-back',
	back: 'book-back',
	frontText: '',
	backText: '',
	isMainPage: false
})

export const UI = () => {
	const [page, setPage] = useAtom(pageAtom)

	useEffect(() => {
		const audio = new Audio('/audios/page-flip-01a.mp3')
		audio.play().catch(() => {
			// Ignore audio play errors
		})
	}, [page])

	// Находим индекс первой основной страницы
	const mainPagesStartIndex = EMPTY_PAGES_START + 1
	const mainPagesEndIndex = mainPagesStartIndex + mainPages.length - 1

	// Определяем, находимся ли мы на основной странице
	const isMainPage = page >= mainPagesStartIndex && page <= mainPagesEndIndex

	return (
		<div className="pointer-events-none fixed inset-0 z-50 flex select-none flex-col justify-between">
			<div className="pointer-events-auto flex w-full justify-center overflow-hidden">
				<div className="mt-10 flex max-w-full items-center gap-4 p-10">
					{/* Кнопка для обложки */}
					<button
						className={`shrink-0 rounded-full border border-transparent px-4 py-3 text-lg uppercase transition-all duration-300 hover:border-white ${
							page === 0
								? 'bg-white/90 text-black'
								: 'bg-black/30 text-white'
						}`}
						onClick={e => {
							e.stopPropagation()
							setPage(0)
						}}
					>
						Обложка
					</button>

					{/* Кнопки для основных страниц */}
					{mainPages.map((mainPage, index) => (
						<button
							key={index}
							className={`shrink-0 rounded-full border border-transparent px-4 py-3 text-lg uppercase transition-all duration-300 hover:border-white ${
								page === mainPagesStartIndex + index
									? 'bg-white/90 text-black'
									: 'bg-black/30 text-white'
							}`}
							onClick={e => {
								e.stopPropagation()
								setPage(mainPagesStartIndex + index)
							}}
						>
							{index === 0 ? 'Начало' : `Страница ${index + 1}`}
						</button>
					))}

					{/* Кнопка для задней обложки */}
					<button
						className={`shrink-0 rounded-full border border-transparent px-4 py-3 text-lg uppercase transition-all duration-300 hover:border-white ${
							page === pages.length - 1
								? 'bg-white/90 text-black'
								: 'bg-black/30 text-white'
						}`}
						onClick={e => {
							e.stopPropagation()
							setPage(pages.length - 1)
						}}
					>
						Конец
					</button>
				</div>
			</div>
		</div>
	)
}
