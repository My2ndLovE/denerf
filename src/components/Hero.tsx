import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ParticleField from './ParticleField';

/**
 * Hero Section - The First Wow Moment
 *
 * Signature moves:
 * 1. 3D particle field background with cursor interaction
 * 2. Kinetic typography with GSAP animations
 * 3. Floating 3D text effect
 * 4. Magnetic CTA button
 * 5. Scroll indicator with pulse animation
 */
export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Kinetic typography animation on mount
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll('.word');

      gsap.fromTo(
        words,
        {
          y: 100,
          opacity: 0,
          rotationX: -90,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: 'power4.out',
        }
      );
    }

    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.8,
          ease: 'power3.out',
        }
      );
    }

    // Floating animation for title
    if (titleRef.current) {
      gsap.to(titleRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Particle Background */}
      <ParticleField />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-quantum-darker/50 via-transparent to-quantum-darker -z-10" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
        {/* Main Title with Kinetic Typography */}
        <motion.h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 perspective-1000"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="word inline-block transform-3d gradient-text">We</span>{' '}
          <span className="word inline-block transform-3d gradient-text">Build</span>{' '}
          <span className="word inline-block transform-3d gradient-text">The</span>
          <br />
          <span className="word inline-block transform-3d gradient-text">Future</span>{' '}
          <span className="word inline-block transform-3d gradient-text">of</span>{' '}
          <span className="word inline-block transform-3d gradient-text">Software</span>
        </motion.h1>

        {/* Subtitle with Glassmorphism */}
        <motion.p
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-white/80 mb-12 max-w-3xl mx-auto glass glass-hover px-8 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Quantum-grade engineering meets bold creativity.
          <br />
          <span className="text-quantum-cyan">We don't just write code—we craft experiences.</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <a href="#contact" className="btn-quantum group">
            <span className="relative z-10">Start Your Project</span>
            <motion.span
              className="absolute right-4 top-1/2 -translate-y-1/2"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </a>

          <a
            href="#portfolio"
            className="px-8 py-4 border-2 border-quantum-cyan/50 rounded-full font-semibold text-white hover:bg-quantum-cyan/10 hover:border-quantum-cyan transition-all duration-300 group"
          >
            <span>View Our Work</span>
            <span className="inline-block ml-2 group-hover:rotate-90 transition-transform duration-300">
              ↗
            </span>
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 cursor-pointer group"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            onClick={() => {
              document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="text-sm text-white/60 group-hover:text-quantum-cyan transition-colors">
              Scroll to explore
            </span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full p-1 group-hover:border-quantum-cyan transition-colors">
              <motion.div
                className="w-1.5 h-1.5 bg-quantum-cyan rounded-full mx-auto"
                animate={{ y: [0, 20, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-quantum-purple/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-quantum-cyan/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
    </section>
  );
}
