import { useLoginModalStore } from "../login-modal-store";

export const useLoginModal = () => {
  const { isOpen, setIsOpen } = useLoginModalStore();

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};