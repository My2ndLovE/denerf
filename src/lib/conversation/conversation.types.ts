export type Section = 'hero' | 'about' | 'services' | 'portfolio' | 'contact';

export type AvatarState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'celebrating' | 'error';

export interface Message {
  id: string;
  text: string;
  delay: number;
  avatarState: AvatarState;
}

export interface ButtonOption {
  id: string;
  icon: string;
  label: string;
  keywords: string[];
  responseNodeId: string;
}

export interface ConversationAction {
  type: 'scrollToSection' | 'submitForm' | 'openLink' | 'celebrate';
  payload: any;
}

export interface ConversationNode {
  id: string;
  section: Section;
  messages: Message[];
  options?: ButtonOption[];
  allowTextInput: boolean;
  nextNode?: string;
  action?: ConversationAction;
  isEntryPoint?: boolean;
}

export interface ConversationData {
  nodes: Record<string, ConversationNode>;
  startNode: string;
}
