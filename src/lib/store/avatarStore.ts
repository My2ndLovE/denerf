import { create } from 'zustand';
import type { AvatarState } from '../conversation/conversation.types';

export interface AvatarPosition {
  x: number;
  y: number;
}

interface AvatarStore {
  state: AvatarState;
  position: AvatarPosition | null;
  isPaused: boolean;

  setState: (state: AvatarState) => void;
  setPosition: (position: AvatarPosition | null) => void;
  setPaused: (paused: boolean) => void;
}

export const useAvatarStore = create<AvatarStore>((set) => ({
  state: 'idle',
  position: null,
  isPaused: false,

  setState: (state) => set({ state }),
  setPosition: (position) => set({ position }),
  setPaused: (paused) => set({ isPaused: paused }),
}));
