import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { conversationEngine } from '@/lib/conversation/ConversationEngine';

interface TextInputProps {
  enabled?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({ enabled = true }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim() && enabled) {
      conversationEngine.handleTextInput(input);
      setInput('');
    }
  };

  if (!enabled) {
    return null;
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      onSubmit={handleSubmit}
      className="text-input-form mt-4"
    >
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Or type your message..."
          className="glass-input flex-1 text-sm md:text-base"
          aria-label="Type your message"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="glass-button px-4 md:px-6 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
        >
          Send
        </button>
      </div>
    </motion.form>
  );
};
