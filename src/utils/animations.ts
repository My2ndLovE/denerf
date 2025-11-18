/**
 * Animation utilities for GSAP and ScrollTrigger
 * Provides reusable animation functions with proper cleanup
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Cleanup all ScrollTrigger instances
 * Call this on page navigation to prevent memory leaks
 */
export function cleanupScrollTriggers(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

/**
 * Initialize animations with proper cleanup on navigation
 */
export function initAnimations(callback: () => void): void {
  // Clean up existing animations
  cleanupScrollTriggers();

  // Run animations
  callback();
}

/**
 * Split text animation with GSAP
 * @param selector - CSS selector for elements to animate
 * @param options - Animation options
 */
export function splitTextAnimation(
  selector: string,
  options: {
    delay?: number;
    stagger?: number;
    duration?: number;
    y?: number;
  } = {}
): void {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    const text = element.textContent || '';
    const words = text.trim().split(' ');

    // Split text into spans
    element.innerHTML = words
      .map((word) => `<span class="split-text inline-block">${word}</span>`)
      .join(' ');

    const spans = element.querySelectorAll('.split-text');
    const delay = parseFloat(element.getAttribute('data-delay') || String(options.delay || 0));

    gsap.from(spans, {
      y: options.y || 100,
      opacity: 0,
      duration: options.duration || 0.8,
      stagger: options.stagger || 0.05,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
      },
    });
  });
}

/**
 * Fade in animation
 * @param selector - CSS selector for elements to animate
 * @param options - Animation options
 */
export function fadeInAnimation(
  selector: string,
  options: {
    delay?: number;
    duration?: number;
    y?: number;
  } = {}
): void {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    const delay = parseFloat(element.getAttribute('data-delay') || String(options.delay || 0));

    gsap.from(element, {
      opacity: 0,
      y: options.y || 30,
      duration: options.duration || 1,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
      },
    });
  });
}

/**
 * Parallax effect
 * @param selector - CSS selector for elements
 * @param trigger - Trigger element selector
 * @param speed - Parallax speed multiplier
 */
export function parallaxEffect(
  selector: string,
  trigger: string,
  speed: number = 0.5
): void {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    const elementSpeed = parseFloat(element.getAttribute('data-speed') || String(speed));

    gsap.to(element, {
      y: () => window.innerHeight * elementSpeed,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

/**
 * Stagger animation for multiple elements
 * @param selector - CSS selector for elements
 * @param options - Animation options
 */
export function staggerAnimation(
  selector: string,
  options: {
    from?: 'start' | 'center' | 'end';
    stagger?: number;
    duration?: number;
    y?: number;
  } = {}
): void {
  const elements = document.querySelectorAll(selector);

  gsap.from(elements, {
    opacity: 0,
    y: options.y || 50,
    duration: options.duration || 0.8,
    stagger: options.stagger || 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: selector,
      start: 'top 70%',
    },
  });
}

/**
 * Horizontal scroll animation
 * @param container - Container element selector
 * @param trigger - Trigger element selector
 */
export function horizontalScroll(container: string, trigger: string): void {
  const containerEl = document.querySelector(container);
  if (!containerEl) return;

  const scrollWidth = containerEl.scrollWidth - window.innerWidth;

  // Only apply on desktop
  if (window.innerWidth >= 768) {
    gsap.to(container, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger,
        pin: true,
        scrub: 1,
        end: () => `+=${scrollWidth}`,
        invalidateOnRefresh: true,
      },
    });
  }
}

/**
 * Refresh ScrollTrigger on resize
 * Use debounce to prevent excessive calls
 */
let resizeTimeout: ReturnType<typeof setTimeout>;
export function refreshOnResize(): void {
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });
}
