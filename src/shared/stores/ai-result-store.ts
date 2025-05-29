import { create } from 'zustand'
import { persist } from 'zustand/middleware' // Добавляем middleware для работы с Local Storage

interface AiResultState {
	aiText: string | null
	aiImage: string | null
	aiAudio: string | null

	setAiText: (data: string) => void
	setAiImage: (data: string) => void
	setAiAudio: (data: string) => void
}

export const useAiResultStore = create<AiResultState>()(
	persist(
		set => ({
			aiText: null,
			aiImage: null,
			aiAudio: null,

			setAiText: data => {
				set({ aiText: data })
			},
			setAiImage: data => {
				set({ aiImage: data })
			},
			setAiAudio: data => {
				set({ aiAudio: data })
			}
		}),
		{
			name: 'ai-results-storage',
			partialize: state => ({
				aiText: state.aiText,
				aiImage: state.aiImage,
				aiAudio: state.aiAudio
			})
		}
	)
)
