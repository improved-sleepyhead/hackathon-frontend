import { CanvasTexture } from 'three'

function getAIText() {
	if (typeof window === 'undefined') return ''

	try {
		const aiResults = localStorage.getItem('ai-results-storage')
		if (!aiResults) return ''

		const state = JSON.parse(aiResults)
		console.log('AI Results from storage:', state) // Debug log

		// Проверяем все возможные пути к тексту
		const text =
			state?.aiText?.ai_answer || state?.ai_answer || state?.text || ''
		console.log('Final text:', text) // Debug log
		return text
	} catch (error) {
		console.error('Error reading AI text from localStorage:', error)
		return ''
	}
}

export function generateTextTexture(text, width = 2048, height = 2048) {
	// If text is a special marker, get it from localStorage
	if (text === '[AI_TEXT]') {
		text = getAIText()
		console.log('Generated text from AI:', text)
	}

	// Если текст пустой, возвращаем базовую текстуру
	if (!text) {
		const canvas = document.createElement('canvas')
		canvas.width = width
		canvas.height = height
		const context = canvas.getContext('2d')
		context.fillStyle = '#f4e4bc'
		context.fillRect(0, 0, width, height)
		addPaperTexture(context, width, height)
		const texture = new CanvasTexture(canvas)
		texture.anisotropy = 16
		texture.needsUpdate = true
		return texture
	}

	const canvas = document.createElement('canvas')
	canvas.width = width
	canvas.height = height
	const context = canvas.getContext('2d')

	// Enable font smoothing
	context.imageSmoothingEnabled = true
	context.imageSmoothingQuality = 'high'

	// Set background with a slight texture
	context.fillStyle = '#f4e4bc'
	context.fillRect(0, 0, width, height)

	// Добавляем текстуру старой бумаги
	addPaperTexture(context, width, height)

	const isCoverText = text.includes('\n') && text === text.toUpperCase()

	if (isCoverText) {
		// Конфигурация для обложки
		context.fillStyle = '#000000'
		context.textAlign = 'center'
		context.textBaseline = 'middle'

		const lines = text.split('\n')
		const fontSize = 200
		context.font = `900 ${fontSize}px 'Arial'`

		context.shadowColor = 'rgba(0, 0, 0, 0.6)'
		context.shadowBlur = 12
		context.shadowOffsetX = 6
		context.shadowOffsetY = 6

		const lineHeight = fontSize * 1.2
		const totalHeight = lineHeight * lines.length
		let y = (height - totalHeight) / 2 + fontSize / 2

		lines.forEach(line => {
			context.strokeStyle = '#000000'
			context.lineWidth = 4
			context.strokeText(line, width / 2, y)
			context.strokeText(line, width / 2, y)
			context.fillText(line, width / 2, y)
			y += lineHeight
		})

		addMilitaryDecoration(context, width, height)
	} else if (text) {
		// Разделяем заголовок и содержимое
		const parts = text.split('\n\n')
		const hasTitle = parts.length > 1
		const title = hasTitle ? parts[0] : ''
		const content = hasTitle ? parts.slice(1).join('\n\n') : text

		const padding = {
			top: 150,
			right: 150,
			bottom: 350,
			left: 450
		}

		let currentY = padding.top

		// Отрисовка заголовка
		if (hasTitle) {
			context.fillStyle = '#000000'
			context.textAlign = 'center'
			context.textBaseline = 'top'
			const titleFontSize = 100
			context.font = `900 ${titleFontSize}px 'Arial'`

			context.shadowColor = 'rgba(0, 0, 0, 0.4)'
			context.shadowBlur = 6
			context.shadowOffsetX = 3
			context.shadowOffsetY = 3

			context.strokeStyle = '#000000'
			context.lineWidth = 2
			context.strokeText(title, width / 2 + 50, currentY)
			context.fillText(title, width / 2 + 50, currentY)
			currentY += titleFontSize * 2
		}

		// Настройка для основного текста
		context.fillStyle = '#000000'
		context.textAlign = 'left'
		context.textBaseline = 'top'
		const fontSize = 64
		context.font = `bold ${fontSize}px 'Arial'`

		context.shadowColor = 'rgba(0, 0, 0, 0.2)'
		context.shadowBlur = 2
		context.shadowOffsetX = 1
		context.shadowOffsetY = 1

		const lineHeight = fontSize * 1.5
		const maxWidth = width - (padding.left + padding.right)

		// Parse markdown and render with special formatting
		const lines = content.split('\n')
		let currentStyle = 'normal'

		for (let line of lines) {
			// Handle markdown headers
			if (line.startsWith('# ')) {
				context.font = `bold ${fontSize * 1.5}px 'Arial'`
				line = line.substring(2)
			} else if (line.startsWith('## ')) {
				context.font = `bold ${fontSize * 1.2}px 'Arial'`
				line = line.substring(3)
			} else if (line.startsWith('### ')) {
				context.font = `bold ${fontSize * 1.1}px 'Arial'`
				line = line.substring(4)
			} else {
				context.font = `bold ${fontSize}px 'Arial'`
			}

			// Handle bold and italic text
			line = line.replace(/\*\*(.*?)\*\*/g, (match, p1) => {
				context.font = `900 ${fontSize}px 'Arial'`
				return p1
			})
			line = line.replace(/\*(.*?)\*/g, (match, p1) => {
				context.font = `italic ${fontSize}px 'Arial'`
				return p1
			})

			// Split line into words and handle word wrapping
			const words = line.split(' ')
			let currentLine = ''

			for (let word of words) {
				const testLine = currentLine + word + ' '
				const metrics = context.measureText(testLine)
				const testWidth = metrics.width

				if (testWidth > maxWidth && currentLine !== '') {
					context.fillText(currentLine, padding.left, currentY)
					currentLine = word + ' '
					currentY += lineHeight

					if (currentY > height - padding.bottom) {
						break
					}
				} else {
					currentLine = testLine
				}
			}

			if (currentLine !== '' && currentY <= height - padding.bottom) {
				context.fillText(currentLine.trim(), padding.left, currentY)
				currentY += lineHeight
			}

			// Add extra spacing after headers
			if (line.startsWith('#')) {
				currentY += lineHeight * 0.5
			}
		}

		if (hasTitle) {
			addPageDecoration(context, width, height)
		}
	}

	const texture = new CanvasTexture(canvas)
	texture.anisotropy = 16
	texture.needsUpdate = true

	return texture
}

function addPaperTexture(context, width, height) {
	// Добавляем легкую зернистость
	for (let i = 0; i < (width * height) / 100; i++) {
		const x = Math.random() * width
		const y = Math.random() * height
		const alpha = Math.random() * 0.1
		context.fillStyle = `rgba(0, 0, 0, ${alpha})`
		context.fillRect(x, y, 1, 1)
	}

	// Добавляем легкие пятна
	for (let i = 0; i < 5; i++) {
		const x = Math.random() * width
		const y = Math.random() * height
		const radius = Math.random() * 50 + 20
		const gradient = context.createRadialGradient(x, y, 0, x, y, radius)
		gradient.addColorStop(0, 'rgba(160, 140, 100, 0.1)')
		gradient.addColorStop(1, 'rgba(160, 140, 100, 0)')
		context.fillStyle = gradient
		context.beginPath()
		context.arc(x, y, radius, 0, Math.PI * 2)
		context.fill()
	}
}

function addMilitaryDecoration(context, width, height) {
	// Добавляем звезду
	const starRadius = 100
	context.save()
	context.translate(width / 2, height - 200)
	drawStar(context, 0, 0, 5, starRadius, starRadius / 2)
	context.restore()

	// Добавляем декоративные линии
	context.strokeStyle = '#2b2b2b'
	context.lineWidth = 3
	context.beginPath()
	context.moveTo(100, 100)
	context.lineTo(width - 100, 100)
	context.moveTo(100, height - 100)
	context.lineTo(width - 100, height - 100)
	context.stroke()
}

function addPageDecoration(context, width, height) {
	// Добавляем декоративные линии вверху и внизу страницы
	context.strokeStyle = '#2b2b2b'
	context.lineWidth = 2

	// Верхняя декоративная линия
	const topY = 100
	context.beginPath()
	context.moveTo(100, topY)
	context.lineTo(width - 100, topY)
	context.stroke()

	// Нижняя декоративная линия
	const bottomY = height - 100
	context.beginPath()
	context.moveTo(100, bottomY)
	context.lineTo(width - 100, bottomY)
	context.stroke()

	// Добавляем небольшие уголки в углах
	const cornerSize = 30
	const margin = 70

	// Верхние уголки
	context.beginPath()
	context.moveTo(margin, margin)
	context.lineTo(margin + cornerSize, margin)
	context.moveTo(margin, margin)
	context.lineTo(margin, margin + cornerSize)

	context.moveTo(width - margin, margin)
	context.lineTo(width - margin - cornerSize, margin)
	context.moveTo(width - margin, margin)
	context.lineTo(width - margin, margin + cornerSize)

	// Нижние уголки
	context.moveTo(margin, height - margin)
	context.lineTo(margin + cornerSize, height - margin)
	context.moveTo(margin, height - margin)
	context.lineTo(margin, height - margin - cornerSize)

	context.moveTo(width - margin, height - margin)
	context.lineTo(width - margin - cornerSize, height - margin)
	context.moveTo(width - margin, height - margin)
	context.lineTo(width - margin, height - margin - cornerSize)

	context.stroke()
}

function drawStar(context, cx, cy, spikes, outerRadius, innerRadius) {
	let rot = (Math.PI / 2) * 3
	let x = cx
	let y = cy
	const step = Math.PI / spikes

	context.beginPath()
	context.moveTo(cx, cy - outerRadius)

	for (let i = 0; i < spikes; i++) {
		x = cx + Math.cos(rot) * outerRadius
		y = cy + Math.sin(rot) * outerRadius
		context.lineTo(x, y)
		rot += step

		x = cx + Math.cos(rot) * innerRadius
		y = cy + Math.sin(rot) * innerRadius
		context.lineTo(x, y)
		rot += step
	}

	context.lineTo(cx, cy - outerRadius)
	context.closePath()
	context.fillStyle = '#2b2b2b'
	context.fill()
	context.strokeStyle = '#000000'
	context.lineWidth = 2
	context.stroke()
}

export function generateRandomText(length = 200) {
	// Try to get AI text first
	const aiText = getAIText()
	if (aiText) {
		return aiText
	}

	// Fallback to random text if no AI text is available
	const words = [
		'долг',
		'честь',
		'отвага',
		'Родина',
		'победа',
		'герой',
		'подвиг',
		'мужество',
		'сила',
		'братство',
		'доблесть',
		'слава',
		'защита',
		'верность',
		'традиция',
		'память',
		'история',
		'будущее',
		'единство',
		'стойкость'
	]

	let result = []
	for (let i = 0; i < length; i++) {
		result.push(words[Math.floor(Math.random() * words.length)])
	}

	return result.join(' ')
}
