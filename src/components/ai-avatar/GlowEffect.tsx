import React from 'react';

interface GlowEffectProps {
  intensity?: 'low' | 'normal' | 'high';
}

export const GlowEffect: React.FC<GlowEffectProps> = ({ intensity = 'normal' }) => {
  const intensityClass = `avatar-glow avatar-glow--${intensity}`;

  return <div className={intensityClass} />;
};
