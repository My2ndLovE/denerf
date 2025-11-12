import React from 'react';

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({ children, className = '' }) => {
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/30 ${className}`}
    >
      {children}
    </span>
  );
};
