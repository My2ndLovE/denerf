import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

interface ParticleFieldProps {
  count?: number;
  active?: boolean;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 30,
  active = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Initialize particles
    particlesRef.current = Array.from({ length: count }, () => createParticle(width, height));

    function createParticle(w: number, h: number): Particle {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: 0,
        maxLife: Math.random() * 200 + 100,
      };
    }

    function animate() {
      if (!ctx || !active) return;

      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((particle, index) => {
        // Update particle
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life += 1;

        // Reset if out of bounds or dead
        if (
          particle.x < 0 ||
          particle.x > width ||
          particle.y < 0 ||
          particle.y > height ||
          particle.life > particle.maxLife
        ) {
          particlesRef.current[index] = createParticle(width, height);
          return;
        }

        // Calculate opacity based on life
        const opacity = 1 - particle.life / particle.maxLife;

        // Gradient colors (cyan to purple)
        const color = index % 2 === 0 ? '0, 212, 255' : '139, 92, 246';

        // Draw particle
        ctx.fillStyle = `rgba(${color}, ${opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    if (active) {
      animate();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [count, active]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      className="avatar-particles"
      style={{ position: 'absolute', inset: '-20%', pointerEvents: 'none' }}
    />
  );
};
