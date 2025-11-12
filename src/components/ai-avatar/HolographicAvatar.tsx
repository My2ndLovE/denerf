import React, { useEffect, useRef, useState } from 'react';
import { useAvatarStore } from '@/lib/store/avatarStore';
import { getDeviceTier, isMobile, prefersReducedMotion } from '@/lib/utils/deviceDetection';
import { Silhouette } from './Silhouette';
import { ScanLines } from './ScanLines';
import { GlowEffect } from './GlowEffect';
import { GlitchEffect } from './GlitchEffect';
import { ParticleField } from './ParticleField';
import { ParticleFieldCSS } from './ParticleFieldCSS';

interface HolographicAvatarProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  client:load?: boolean;
}

export const HolographicAvatar: React.FC<HolographicAvatarProps> = ({
  size = 'medium',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { state } = useAvatarStore();
  const [isPaused, setIsPaused] = useState(false);
  const [deviceTier, setDeviceTier] = useState<'high' | 'medium' | 'low'>('medium');
  const [mobile, setMobile] = useState(false);

  // Size mapping
  const sizeMap = {
    small: mobile ? 80 : 120,
    medium: mobile ? 120 : 200,
    large: mobile ? 160 : 280
  };

  const avatarSize = sizeMap[size];

  // Initialize device detection
  useEffect(() => {
    setDeviceTier(getDeviceTier());
    setMobile(isMobile());
  }, []);

  // Pause animations when not visible (Intersection Observer)
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsPaused(!entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  // Determine particle system based on device tier and motion preferences
  const reducedMotion = prefersReducedMotion();
  const shouldUseCanvasParticles = !reducedMotion && deviceTier === 'high' && !mobile;
  const ParticleComponent = shouldUseCanvasParticles ? ParticleField : ParticleFieldCSS;

  // Particle count based on device tier
  const particleCount =
    reducedMotion ? 0 :
    deviceTier === 'high' ? 50 :
    deviceTier === 'medium' ? 20 :
    10;

  // Glow intensity based on state
  const glowIntensity = state === 'celebrating' ? 'high' : 'normal';

  // Should show glitch effect
  const shouldGlitch = !reducedMotion && (state === 'thinking' || state === 'error');

  return (
    <div
      ref={containerRef}
      className={`holographic-avatar holographic-avatar--${state} ${isPaused ? 'paused' : ''} ${className}`}
      style={{
        width: avatarSize,
        height: avatarSize,
        position: 'relative'
      }}
    >
      {/* Base silhouette */}
      <Silhouette size={avatarSize} />

      {/* Scan lines */}
      {!reducedMotion && <ScanLines active={state !== 'idle'} />}

      {/* Glow effect */}
      <GlowEffect intensity={glowIntensity} />

      {/* Glitch effect (desktop only) */}
      {deviceTier !== 'low' && <GlitchEffect active={shouldGlitch} />}

      {/* Particle field */}
      {particleCount > 0 && (
        <ParticleComponent
          count={particleCount}
          active={!isPaused && state !== 'idle'}
        />
      )}
    </div>
  );
};
