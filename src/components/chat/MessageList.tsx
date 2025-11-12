import React, { useEffect, useRef } from 'react';
import { useConversationStore } from '@/lib/store/conversationStore';
import { ChatBubble } from './ChatBubble';

export const MessageList: React.FC = () => {
  const { messages } = useConversationStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="message-list space-y-3 mb-6 max-h-96 overflow-y-auto px-2">
      {messages.map((message, index) => (
        <ChatBubble key={message.id} message={message} index={index} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};
