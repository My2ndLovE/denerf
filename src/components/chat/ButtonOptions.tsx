import React from 'react';
import { motion } from 'framer-motion';
import type { ButtonOption } from '@/lib/conversation/conversation.types';
import { conversationEngine } from '@/lib/conversation/ConversationEngine';

interface ButtonOptionsProps {
  options: ButtonOption[];
}

export const ButtonOptions: React.FC<ButtonOptionsProps> = ({ options }) => {
  if (options.length === 0) {
    return null;
  }

  const handleOptionClick = (optionId: string) => {
    conversationEngine.selectOption(optionId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="button-options grid grid-cols-1 md:grid-cols-2 gap-3"
    >
      {options.map((option, index) => (
        <motion.button
          key={option.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleOptionClick(option.id)}
          className="glass-button flex items-center gap-3 text-left min-h-[44px]"
        >
          <span className="text-2xl">{option.icon}</span>
          <span className="text-sm md:text-base">{option.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
};
