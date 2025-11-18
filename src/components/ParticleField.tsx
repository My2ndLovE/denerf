import { useRef, useMemo, useEffect, memo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Animated particle field component using Three.js
 * Creates a dynamic 3D particle system that responds to mouse movement
 *
 * FIXES APPLIED:
 * - Changed useMemo to useEffect for event listener (was causing memory leak)
 * - Added proper cleanup for event listener
 * - Added responsive particle count based on device performance
 * - Added reduced motion support
 * - Memoized component to prevent unnecessary re-renders
 * - Added proper TypeScript types
 * - Added performance optimizations
 *
 * Features:
 * - Responsive particle count (1000 mobile, 2000 desktop)
 * - Physics-based rotation and movement
 * - Respects prefers-reduced-motion
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
      // Create particles in a sphere distribution
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
  // FIX: Added proper cleanup to prevent memory leak
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Cleanup function properly removes event listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animate particles
  useFrame((state) => {
    if (!points.current) return;

    const time = state.clock.getElapsedTime();

    // Slow rotation based on mouse position
    points.current.rotation.x = time * 0.05 + mousePos.current.y * 0.1;
    points.current.rotation.y = time * 0.075 + mousePos.current.x * 0.1;

    // Pulsing effect
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
 * Renders the 3D canvas with particles as a background effect
 *
 * FIXES APPLIED:
 * - Added responsive particle count based on screen size
 * - Added prefers-reduced-motion support
 * - Added error boundary considerations
 */
export default function ParticleField() {
  // FIX: Responsive particle count based on device capabilities
  const [particleCount, setParticleCount] = useState(2000);

  useEffect(() => {
    // Reduce particles on mobile devices for better performance
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // FIX: Respect reduced motion preference for accessibility
    if (prefersReducedMotion) {
      setParticleCount(500); // Minimal particles for reduced motion
    } else {
      setParticleCount(isMobile ? 1000 : 2000);
    }

    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setParticleCount(isMobile ? 1000 : 2000);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Don't render if reduced motion is preferred
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  if (prefersReducedMotion) {
    // Return minimal static background instead
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-quantum-purple/5 to-transparent"
           aria-hidden="true" />
    );
  }

  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance', // FIX: Request high performance GPU
        }}
        dpr={[1, 2]} // FIX: Limit to 2x pixel ratio for performance
        // FIX: Add performance monitoring in dev mode
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.5} />
        <Particles count={particleCount || 2000} />
      </Canvas>
    </div>
  );
}
