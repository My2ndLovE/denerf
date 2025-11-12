import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConversationStore } from '@/lib/store/conversationStore';
import { conversationEngine } from '@/lib/conversation/ConversationEngine';
import { MessageList } from './MessageList';
import { ButtonOptions } from './ButtonOptions';
import { TextInput } from './TextInput';
import { TypingIndicator } from './TypingIndicator';

interface ChatInterfaceProps {
  className?: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ className = '' }) => {
  const {
    currentOptions,
    currentNode,
    isAvatarSpeaking,
    conversationStarted
  } = useConversationStore();

  // Initialize conversation on mount
  useEffect(() => {
    if (!conversationStarted) {
      conversationEngine.initialize();
    }
  }, [conversationStarted]);

  return (
    <div className={`chat-interface ${className}`}>
      <div className="glass-container p-6 max-w-2xl mx-auto">
        {/* Message List */}
        <MessageList />

        {/* Typing Indicator */}
        <AnimatePresence>
          <TypingIndicator isTyping={isAvatarSpeaking} />
        </AnimatePresence>

        {/* Button Options */}
        {!isAvatarSpeaking && currentOptions.length > 0 && (
          <ButtonOptions options={currentOptions} />
        )}

        {/* Text Input */}
        {!isAvatarSpeaking && currentNode?.allowTextInput && (
          <TextInput enabled={currentNode.allowTextInput} />
        )}
      </div>
    </div>
  );
};
