import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glass = true
}) => {
  return (
    <div className={`${glass ? 'glass-card' : 'bg-glass border border-white/10 rounded-2xl'} ${className}`}>
      {children}
    </div>
  );
};
