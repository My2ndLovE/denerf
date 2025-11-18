import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Animated particle field component using Three.js
 * Creates a dynamic 3D particle system that responds to mouse movement
 *
 * Features:
 * - 2000+ particles in 3D space
 * - Physics-based rotation and movement
 * - Responsive to cursor position
 * - Optimized for performance with instanced rendering
 */
function Particles({ count = 2000 }: { count?: number }) {
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

  // Track mouse movement
  useMemo(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
}

/**
 * ParticleField wrapper component
 * Renders the 3D canvas with particles as a background effect
 */
export default function ParticleField() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <Particles count={2000} />
      </Canvas>
    </div>
  );
}
