import React from 'react';

interface SilhouetteProps {
  size: number;
  className?: string;
}

export const Silhouette: React.FC<SilhouetteProps> = ({ size, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`avatar-silhouette ${className}`}
    >
      <defs>
        <linearGradient id="hologram-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Head */}
      <ellipse
        cx="100"
        cy="60"
        rx="35"
        ry="40"
        fill="url(#hologram-gradient)"
      />

      {/* Neck */}
      <rect
        x="90"
        y="95"
        width="20"
        height="15"
        fill="url(#hologram-gradient)"
      />

      {/* Shoulders */}
      <path
        d="M 70 110 Q 60 120 50 130 L 50 180 L 70 180 L 70 130 Z"
        fill="url(#hologram-gradient)"
      />
      <path
        d="M 130 110 Q 140 120 150 130 L 150 180 L 130 180 L 130 130 Z"
        fill="url(#hologram-gradient)"
      />

      {/* Torso */}
      <rect
        x="70"
        y="110"
        width="60"
        height="70"
        rx="10"
        fill="url(#hologram-gradient)"
      />

      {/* Arms */}
      <rect
        x="45"
        y="130"
        width="15"
        height="55"
        rx="7"
        fill="url(#hologram-gradient)"
      />
      <rect
        x="140"
        y="130"
        width="15"
        height="55"
        rx="7"
        fill="url(#hologram-gradient)"
      />
    </svg>
  );
};
