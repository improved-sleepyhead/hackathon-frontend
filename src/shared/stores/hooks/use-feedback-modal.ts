import { useFeedbackModalStore } from '../feedback-modal-store'

export const useFeedbackModal = () => {
    const { isOpen, setIsOpen } = useFeedbackModalStore()

    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)

    return {
        isOpen,
        open,
        close,
        setIsOpen
    }
}
