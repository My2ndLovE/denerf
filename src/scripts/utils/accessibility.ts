/**
 * Accessibility Utilities
 * Focus management, keyboard navigation, ARIA helpers
 */

/**
 * Focusable element selector
 */
const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Get all focusable elements within a container
 * @param container - Container element
 * @returns Array of focusable elements
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS));
}

/**
 * Create a focus trap within an element
 * @param element - Element to trap focus within
 * @returns Cleanup function to remove focus trap
 */
export function createFocusTrap(element: HTMLElement): () => void {
  const focusableElements = getFocusableElements(element);
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];

  // Store previously focused element
  const previouslyFocused = document.activeElement as HTMLElement;

  // Focus first element
  firstFocusable?.focus();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    }
  };

  element.addEventListener('keydown', handleKeyDown);

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleKeyDown);
    previouslyFocused?.focus();
  };
}

/**
 * Trap focus and handle escape key
 * @param element - Element to manage
 * @param onEscape - Callback for escape key
 * @returns Cleanup function
 */
export function manageFocusAndEscape(
  element: HTMLElement,
  onEscape: () => void
): () => void {
  const cleanupFocusTrap = createFocusTrap(element);

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onEscape();
    }
  };

  document.addEventListener('keydown', handleEscape);

  return () => {
    cleanupFocusTrap();
    document.removeEventListener('keydown', handleEscape);
  };
}

/**
 * Enable/disable body scroll (for modals)
 * @param disable - Whether to disable scroll
 */
export function toggleBodyScroll(disable: boolean): void {
  if (disable) {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
  } else {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
}

/**
 * Announce to screen readers
 * @param message - Message to announce
 * @param priority - 'polite' or 'assertive'
 */
export function announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
  const announcer = document.createElement('div');
  announcer.setAttribute('role', 'status');
  announcer.setAttribute('aria-live', priority);
  announcer.setAttribute('aria-atomic', 'true');
  announcer.className = 'sr-only';
  announcer.textContent = message;

  document.body.appendChild(announcer);

  setTimeout(() => {
    document.body.removeChild(announcer);
  }, 1000);
}
