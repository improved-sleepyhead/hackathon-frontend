import { create } from 'zustand'

interface FeedbackModalState {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
}

export const useFeedbackModalStore = create<FeedbackModalState>(set => ({
    isOpen: false,
    setIsOpen: (isOpen: boolean) => set({ isOpen })
}))
