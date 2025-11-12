import React from 'react';
import { motion } from 'framer-motion';
import type { Message } from '@/lib/conversation/conversation.types';

interface ChatBubbleProps {
  message: Message;
  index: number;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: index * 0.1,
        ease: 'easeOut'
      }}
      className="chat-bubble"
    >
      <div className="glass-card p-4 max-w-md">
        <p className="text-text-primary text-sm md:text-base">{message.text}</p>
      </div>
    </motion.div>
  );
};
