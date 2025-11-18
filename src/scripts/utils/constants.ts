/**
 * Application Constants
 * Animation timing, breakpoints, configuration values
 */

/**
 * Animation timing constants (in milliseconds)
 */
export const ANIMATION_TIMING = {
  INSTANT: 100,
  FAST: 300,
  NORMAL: 600,
  SLOW: 1000,
  CODE_REVEAL: 1500,
  AUTO_CLOSE_DELAY: 3000,
} as const;

/**
 * Debounce/throttle timing (in milliseconds)
 */
export const TIMING = {
  SCROLL_DEBOUNCE: 10,
  RESIZE_DEBOUNCE: 250,
  INPUT_DEBOUNCE: 300,
} as const;

/**
 * Breakpoints (must match Tailwind config)
 */
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

/**
 * Z-index layers
 */
export const Z_INDEX = {
  BASE: 0,
  DROPDOWN: 10,
  STICKY: 20,
  FIXED: 30,
  MODAL_BACKDROP: 40,
  MODAL: 50,
  POPOVER: 60,
  TOOLTIP: 70,
} as const;

/**
 * Intersection observer options
 */
export const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px',
};

/**
 * Form validation limits
 */
export const VALIDATION = {
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 254,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 1000,
} as const;
