/**
 * Utility helper functions
 */

import { PERFORMANCE } from './constants';

/**
 * Throttle function execution
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number = PERFORMANCE.THROTTLE_DELAY
): (...args: Parameters<T>) => void {
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

/**
 * Debounce function execution
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number = PERFORMANCE.DEBOUNCE_DELAY
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Linear interpolation
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/**
 * Clamp value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Check if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if user is on touch device
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore - legacy property
    navigator.msMaxTouchPoints > 0
  );
}

/**
 * Get viewport dimensions
 */
export function getViewport() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: Element, threshold: number = 0): boolean {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const vertInView = rect.top <= windowHeight - threshold && rect.top + rect.height >= threshold;
  const horInView = rect.left <= windowWidth - threshold && rect.left + rect.width >= threshold;

  return vertInView && horInView;
}

/**
 * Wait for specific time
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Request idle callback with fallback
 */
export function requestIdleCallback(
  callback: IdleRequestCallback,
  options?: IdleRequestOptions
): number {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, options);
  }
  // Fallback for Safari
  return setTimeout(() => callback({ didTimeout: false, timeRemaining: () => 50 }), 1) as any;
}

/**
 * Cancel idle callback with fallback
 */
export function cancelIdleCallback(id: number): void {
  if (typeof window !== 'undefined' && 'cancelIdleCallback' in window) {
    window.cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
}

/**
 * Safe querySelector with type
 */
export function qs<T extends Element = Element>(
  selector: string,
  parent: Document | Element = document
): T | null {
  return parent.querySelector<T>(selector);
}

/**
 * Safe querySelectorAll with type
 */
export function qsa<T extends Element = Element>(
  selector: string,
  parent: Document | Element = document
): NodeListOf<T> {
  return parent.querySelectorAll<T>(selector);
}

/**
 * Safely parse JSON with fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

/**
 * Generate unique ID
 */
let idCounter = 0;
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${++idCounter}-${Date.now()}`;
}
