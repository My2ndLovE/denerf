import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Custom cursor with physics-based motion and magnetic interaction
 * Features:
 * - Smooth spring physics following mouse movement
 * - Magnetic effect on interactive elements
 * - Scale animation on hover
 * - Glow effect with gradient border
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Spring physics for smooth, organic motion
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    // Magnetic effect on interactive elements
    const handleMagneticEffect = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        const elem = target.closest('a, button') as HTMLElement;
        const rect = elem.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance and apply magnetic pull
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (distance < 100) {
          const pullStrength = 0.3;
          cursorX.set(e.clientX + distanceX * pullStrength);
          cursorY.set(e.clientY + distanceY * pullStrength);

          // Scale up cursor on interactive elements
          if (cursorRef.current) {
            cursorRef.current.style.transform = 'scale(1.5)';
          }
        } else if (cursorRef.current) {
          cursorRef.current.style.transform = 'scale(1)';
        }
      } else if (cursorRef.current) {
        cursorRef.current.style.transform = 'scale(1)';
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousemove', handleMagneticEffect);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousemove', handleMagneticEffect);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-quantum-cyan bg-quantum-cyan/20 backdrop-blur-sm transition-transform duration-200" />
      </motion.div>

      {/* Trailing cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-quantum-cyan rounded-full pointer-events-none z-[9999] mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
}
