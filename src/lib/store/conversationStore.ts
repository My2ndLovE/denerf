import { create } from 'zustand';
import type { ConversationNode, Message, ButtonOption, Section } from '../conversation/conversation.types';

interface ConversationStore {
  currentSection: Section;
  currentNode: ConversationNode | null;
  messages: Message[];
  isAvatarSpeaking: boolean;
  currentOptions: ButtonOption[];
  conversationStarted: boolean;

  setCurrentSection: (section: Section) => void;
  setCurrentNode: (node: ConversationNode | null) => void;
  addMessage: (message: Message) => void;
  setIsAvatarSpeaking: (speaking: boolean) => void;
  setCurrentOptions: (options: ButtonOption[]) => void;
  setConversationStarted: (started: boolean) => void;
  clearMessages: () => void;
}

export const useConversationStore = create<ConversationStore>((set) => ({
  currentSection: 'hero',
  currentNode: null,
  messages: [],
  isAvatarSpeaking: false,
  currentOptions: [],
  conversationStarted: false,

  setCurrentSection: (section) => set({ currentSection: section }),
  setCurrentNode: (node) => set({ currentNode: node }),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setIsAvatarSpeaking: (speaking) => set({ isAvatarSpeaking: speaking }),
  setCurrentOptions: (options) => set({ currentOptions: options }),
  setConversationStarted: (started) => set({ conversationStarted: started }),
  clearMessages: () => set({ messages: [] }),
}));
