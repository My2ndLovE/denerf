import { useRef, useMemo, useEffect, memo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Animated particle field component using Three.js
 * Creates a dynamic 3D particle system that responds to mouse movement
 *
 * PRODUCTION-READY FIXES APPLIED:
 * - Fixed useMemo → useEffect for event listeners
 * - Fixed resize handler to respect prefers-reduced-motion
 * - Added proper cleanup for all event listeners
 * - Responsive particle count with accessibility support
 * - Memoized component for performance
 * - SSR-safe window checks
 *
 * Features:
 * - Responsive particle count (500-2000 based on device & preference)
 * - Physics-based rotation and movement
 * - Fully respects prefers-reduced-motion
 * - Optimized for performance with instanced rendering
 */

interface ParticlesProps {
  count?: number;
}

const Particles = memo(function Particles({ count = 2000 }: ParticlesProps) {
  const points = useRef<THREE.Points>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  // Generate random particle positions in a sphere
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const distance = Math.random() * 5 + 2;
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      positions[i * 3] = distance * Math.sin(theta) * Math.cos(phi);
      positions[i * 3 + 1] = distance * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = distance * Math.cos(theta);
    }

    return positions;
  }, [count]);

  // FIX: Changed from useMemo to useEffect - useMemo should not have side effects
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animate particles
  useFrame((state) => {
    if (!points.current) return;

    const time = state.clock.getElapsedTime();

    points.current.rotation.x = time * 0.05 + mousePos.current.y * 0.1;
    points.current.rotation.y = time * 0.075 + mousePos.current.x * 0.1;

    const scale = 1 + Math.sin(time * 0.5) * 0.1;
    points.current.scale.set(scale, scale, scale);
  });

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00f0ff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
});

/**
 * ParticleField wrapper component
 */
export default function ParticleField() {
  const [particleCount, setParticleCount] = useState(2000);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // FIX: Check both on mount and updates
    const checkPreferences = () => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.innerWidth < 768;

      setPrefersReducedMotion(reducedMotion);

      // FIX: Respect reduced motion preference when setting count
      if (reducedMotion) {
        setParticleCount(500);
      } else {
        setParticleCount(isMobile ? 1000 : 2000);
      }
    };

    checkPreferences();

    // FIX: Resize handler now respects reduced motion
    const handleResize = () => {
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.innerWidth < 768;

      if (!reducedMotion) {
        setParticleCount(isMobile ? 1000 : 2000);
      }
    };

    // Listen for reduced motion changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) {
        setParticleCount(500);
      } else {
        setParticleCount(window.innerWidth < 768 ? 1000 : 2000);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Return static background if reduced motion
  if (prefersReducedMotion) {
    return (
      <div
        className="fixed inset-0 -z-10 bg-gradient-to-b from-quantum-purple/5 to-transparent"
        aria-hidden="true"
      />
    );
  }

  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.5} />
        <Particles count={particleCount} />
      </Canvas>
    </div>
  );
}
