// Animation constants
export const ANIMATION = {
  CURSOR_SPEED: 0.2,
  TRAIL_SPEED: 0.1,
  TYPING_DELAY: 100,
  COUNTER_SPEED: 30,
  COUNTER_STEPS: 50,
} as const;

// Breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
} as const;

// Performance
export const PERF = {
  DEBOUNCE_DELAY: 100,
  INTERSECTION_THRESHOLD: 0.1,
  INTERSECTION_ROOT_MARGIN: '50px',
} as const;

// Colors (matching Tailwind config)
export const COLORS = {
  PRIMARY_BG: '#0A0E27',
  PRIMARY_PANEL: '#1A1F3A',
  PRIMARY_ACCENT: '#00FF88',
  PRIMARY_MAGENTA: '#FF0099',
  PRIMARY_TEXT: '#E0E6FF',
} as const;
