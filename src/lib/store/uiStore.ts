import { create } from 'zustand';

interface UIStore {
  isMobileMenuOpen: boolean;
  isModalOpen: boolean;
  isChatOpen: boolean;

  setMobileMenuOpen: (open: boolean) => void;
  setModalOpen: (open: boolean) => void;
  setChatOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isMobileMenuOpen: false,
  isModalOpen: false,
  isChatOpen: false,

  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  setModalOpen: (open) => set({ isModalOpen: open }),
  setChatOpen: (open) => set({ isChatOpen: open }),
}));
