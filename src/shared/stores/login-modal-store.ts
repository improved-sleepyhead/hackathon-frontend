import { create } from 'zustand';

interface LoginModalState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const useLoginModalStore = create<LoginModalState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));