import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Custom cursor with physics-based motion and magnetic interaction
 *
 * PRODUCTION-READY FIXES APPLIED:
 * - Fixed dependency array (MotionValues are stable, shouldn't be in deps)
 * - Added device detection (only show on desktop with mouse)
 * - Added proper event listener cleanup
 * - Added passive event listeners for performance
 * - Added SSR safety checks
 *
 * Features:
 * - Smooth spring physics following mouse movement
 * - Magnetic effect on interactive elements
 * - Scale animation on hover
 * - Only renders on desktop devices with fine pointer
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Spring physics for smooth, organic motion
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // FIX: Check if device has fine pointer (mouse) - SSR safe
  useEffect(() => {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isWideScreen = window.innerWidth >= 768;
    setIsDesktop(hasFinePointer && isWideScreen);
  }, []);

  // FIX: Removed cursorX and cursorY from deps - MotionValues are stable references!
  useEffect(() => {
    if (!isDesktop) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    // Magnetic effect on interactive elements
    const handleMagneticEffect = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button');

      if (interactive) {
        const elem = interactive as HTMLElement;
        const rect = elem.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

        if (distance < 100) {
          const pullStrength = 0.3;
          cursorX.set(e.clientX + distanceX * pullStrength);
          cursorY.set(e.clientY + distanceY * pullStrength);

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

    // FIX: Added passive listeners for better performance
    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mousemove', handleMagneticEffect, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousemove', handleMagneticEffect);
    };
  }, [isDesktop]); // FIX: Only isDesktop in deps, NOT MotionValues!

  // Don't render on mobile/touch devices
  if (!isDesktop) {
    return null;
  }

  return (
    <>
      {/* Hide default cursor only on desktop */}
      <style>{`
        @media (pointer: fine) and (min-width: 768px) {
          body {
            cursor: none;
          }
        }
      `}</style>

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
