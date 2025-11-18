/**
 * Application-wide constants
 */

// Animation Durations (in seconds)
export const DURATION = {
  FAST: 0.15,
  BASE: 0.3,
  SLOW: 0.5,
  SLOWER: 0.7,
} as const;

// Easing Functions
export const EASE = {
  IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  OUT: 'cubic-bezier(0, 0, 0.2, 1)',
  IN: 'cubic-bezier(0.4, 0, 1, 1)',
  BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

// GSAP Easing
export const GSAP_EASE = {
  POWER2_OUT: 'power2.out',
  POWER2_IN: 'power2.in',
  POWER3_OUT: 'power3.out',
  ELASTIC: 'elastic.out(1, 0.3)',
  BACK_OUT: 'back.out(1.7)',
} as const;

// Breakpoints (matches Tailwind)
export const BREAKPOINT = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Performance
export const PERFORMANCE = {
  THROTTLE_DELAY: 16, // ~60fps
  DEBOUNCE_DELAY: 150,
  IDLE_TIMEOUT: 2000,
} as const;

// Animation Settings
export const ANIMATION = {
  MAGNETIC_STRENGTH: 0.3,
  PARALLAX_STRENGTH: 0.1,
  CURSOR_LERP: 0.1,
  SMOOTH_SCROLL_DURATION: 1.2,
} as const;
