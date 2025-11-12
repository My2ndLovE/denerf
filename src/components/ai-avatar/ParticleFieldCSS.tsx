import React from 'react';

interface ParticleFieldCSSProps {
  count?: number;
  active?: boolean;
}

export const ParticleFieldCSS: React.FC<ParticleFieldCSSProps> = ({
  count = 10,
  active = true
}) => {
  if (!active) return null;

  const particles = Array.from({ length: count }, (_, i) => {
    const x = Math.random() * 40 - 20; // -20 to 20
    const y = Math.random() * -50 - 10; // -60 to -10
    const delay = Math.random() * 3;
    const left = Math.random() * 100;
    const top = Math.random() * 100;

    return (
      <div
        key={i}
        className="particle"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          animationDelay: `${delay}s`,
          // @ts-ignore
          '--x': `${x}px`,
          '--y': `${y}px`,
        }}
      />
    );
  });

  return <div className="avatar-particles">{particles}</div>;
};
