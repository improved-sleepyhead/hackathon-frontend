"use client"
import { useLoginModal } from "@/shared/stores/hooks/use-login-modal";
import { ResponsiveModal } from "@/shared/ui/responsive-modal";
import { LoginForm } from "./login-form";

export const LoginModal = () => {
    const { isOpen, setIsOpen, close } = useLoginModal();

    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <LoginForm onCancel={close}/>
        </ResponsiveModal>
    );
};