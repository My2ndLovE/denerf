/**
 * Animation utility functions for GSAP
 */

import type { GSAPTween, GSAPTimeline } from 'gsap';

/**
 * Registry to track GSAP animations for cleanup
 */
class AnimationRegistry {
  private animations: Set<GSAPTween | GSAPTimeline> = new Set();

  register(animation: GSAPTween | GSAPTimeline): void {
    this.animations.add(animation);
  }

  unregister(animation: GSAPTween | GSAPTimeline): void {
    this.animations.delete(animation);
  }

  killAll(): void {
    this.animations.forEach((animation) => {
      if (animation && typeof animation.kill === 'function') {
        animation.kill();
      }
    });
    this.animations.clear();
  }

  getCount(): number {
    return this.animations.size;
  }
}

export const animationRegistry = new AnimationRegistry();

/**
 * Setup cleanup for Astro page transitions
 */
export function setupAnimationCleanup(): void {
  if (typeof document === 'undefined') return;

  document.addEventListener('astro:before-preparation', () => {
    animationRegistry.killAll();
  });
}

/**
 * Create AbortController for event cleanup
 */
export function createAbortController(): AbortController {
  return new AbortController();
}

/**
 * Cleanup function type
 */
export type CleanupFunction = () => void;

/**
 * Register cleanup function for Astro navigation
 */
export function onCleanup(cleanup: CleanupFunction): void {
  if (typeof document === 'undefined') return;

  const handler = () => {
    cleanup();
    document.removeEventListener('astro:before-preparation', handler);
  };

  document.addEventListener('astro:before-preparation', handler);
}

/**
 * Safe GSAP animation with auto-cleanup
 */
export function safeGsapTo(
  target: gsap.TweenTarget,
  vars: gsap.TweenVars,
  registerForCleanup: boolean = true
): GSAPTween | null {
  try {
    // Dynamic import handled by caller
    const tween = (globalThis as any).gsap?.to(target, vars);
    if (tween && registerForCleanup) {
      animationRegistry.register(tween);
    }
    return tween;
  } catch (error) {
    console.error('GSAP animation failed:', error);
    return null;
  }
}

/**
 * Initialize intersection observer for scroll animations
 */
export function createScrollObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1,
    ...options,
  };

  const observer = new IntersectionObserver(callback, defaultOptions);

  // Auto cleanup
  onCleanup(() => observer.disconnect());

  return observer;
}

/**
 * Lazy load GSAP with error handling
 */
export async function loadGsap() {
  try {
    const gsapModule = await import('gsap');
    const scrollTriggerModule = await import('gsap/ScrollTrigger');

    gsapModule.gsap.registerPlugin(scrollTriggerModule.ScrollTrigger);

    return {
      gsap: gsapModule.gsap,
      ScrollTrigger: scrollTriggerModule.ScrollTrigger,
    };
  } catch (error) {
    console.error('Failed to load GSAP:', error);
    return null;
  }
}

/**
 * Lazy load Three.js with error handling
 */
export async function loadThree() {
  try {
    return await import('three');
  } catch (error) {
    console.error('Failed to load Three.js:', error);
    return null;
  }
}

/**
 * Lazy load Lenis with error handling
 */
export async function loadLenis() {
  try {
    const { default: Lenis } = await import('lenis');
    return Lenis;
  } catch (error) {
    console.error('Failed to load Lenis:', error);
    return null;
  }
}
