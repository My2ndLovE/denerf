import React from 'react';

interface GlitchEffectProps {
  active?: boolean;
}

export const GlitchEffect: React.FC<GlitchEffectProps> = ({ active = false }) => {
  return <div className={`avatar-glitch ${active ? 'active' : ''}`} />;
};
