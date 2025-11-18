import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export default function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Initialize particles
    const initParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.3,
        });
      }

      particlesRef.current = particles;
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Touch move handler for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const magneticRadius = 150;

      particlesRef.current.forEach((particle) => {
        // Calculate distance to mouse
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Magnetic attraction
        if (distance < magneticRadius) {
          const force = (magneticRadius - distance) / magneticRadius;
          particle.vx += (dx / distance) * force * 0.3;
          particle.vy += (dy / distance) * force * 0.3;
        }

        // Return to base position (gentle spring)
        const returnForce = 0.05;
        particle.vx += (particle.baseX - particle.x) * returnForce;
        particle.vy += (particle.baseY - particle.y) * returnForce;

        // Apply friction
        particle.vx *= 0.95;
        particle.vy *= 0.95;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${particle.opacity})`;
        ctx.fill();

        // Draw glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 3
        );
        gradient.addColorStop(0, `rgba(0, 245, 255, ${particle.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(0, 245, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw connections
        particlesRef.current.forEach((otherParticle) => {
          const dx2 = particle.x - otherParticle.x;
          const dy2 = particle.y - otherParticle.y;
          const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(0, 245, 255, ${0.2 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Show text after a brief delay
    const textTimer = setTimeout(() => setShowText(true), 500);

    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-base">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h1
          className={`text-hero font-bold mb-6 gradient-text transition-all duration-1000 ${
            showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          What if code
          <br />
          could feel <span className="italic">alive</span>?
        </h1>

        <p
          className={`text-xl md:text-2xl text-text-muted max-w-2xl mb-8 transition-all duration-1000 delay-300 ${
            showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          We craft digital experiences that make users stop, explore, and feel something unexpected.
        </p>

        <p
          className={`text-sm md:text-base text-text-muted/60 transition-all duration-1000 delay-500 ${
            showText ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Move to explore
        </p>

        {/* Scroll Indicator */}
        <div
          className={`absolute bottom-12 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-700 ${
            showText ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>

      {/* Reduce motion fallback */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          canvas {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
