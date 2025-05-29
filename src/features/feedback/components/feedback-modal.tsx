'use client'
import { ResponsiveModal } from '@/shared/ui/responsive-modal'
import { FeedbackForm } from './feedback-form'
import { useFeedbackModal } from '@/shared/stores/hooks/use-feedback-modal'

export const FeedbackModal = () => {
    const { isOpen, setIsOpen, close } = useFeedbackModal()

    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <FeedbackForm onCancel={close} />
        </ResponsiveModal>
    )
}