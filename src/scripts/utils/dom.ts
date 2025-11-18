/**
 * DOM Utilities
 * Safe element selection, event handling, cleanup
 */

/**
 * Safely query selector with null check
 * @param selector - CSS selector
 * @param context - Context element (default: document)
 * @returns Element or null
 */
export function $(selector: string, context: Document | HTMLElement = document): HTMLElement | null {
  return context.querySelector<HTMLElement>(selector);
}

/**
 * Safely query all with array return
 * @param selector - CSS selector
 * @param context - Context element (default: document)
 * @returns Array of elements
 */
export function $$(selector: string, context: Document | HTMLElement = document): HTMLElement[] {
  return Array.from(context.querySelectorAll<HTMLElement>(selector));
}

/**
 * Add event listener with automatic cleanup tracking
 */
export class EventManager {
  private listeners: Array<{
    element: Element | Window | Document;
    event: string;
    handler: EventListener;
    options?: AddEventListenerOptions;
  }> = [];

  /**
   * Add event listener
   * @param element - Element to attach listener to
   * @param event - Event name
   * @param handler - Event handler
   * @param options - Event listener options
   */
  add<K extends keyof HTMLElementEventMap>(
    element: HTMLElement,
    event: K,
    handler: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: AddEventListenerOptions
  ): void;
  add<K extends keyof WindowEventMap>(
    element: Window,
    event: K,
    handler: (this: Window, ev: WindowEventMap[K]) => any,
    options?: AddEventListenerOptions
  ): void;
  add<K extends keyof DocumentEventMap>(
    element: Document,
    event: K,
    handler: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: AddEventListenerOptions
  ): void;
  add(
    element: Element | Window | Document,
    event: string,
    handler: EventListener,
    options?: AddEventListenerOptions
  ): void {
    element.addEventListener(event, handler, options);
    this.listeners.push({ element, event, handler, options });
  }

  /**
   * Remove all tracked event listeners
   */
  removeAll(): void {
    this.listeners.forEach(({ element, event, handler, options }) => {
      element.removeEventListener(event, handler, options);
    });
    this.listeners = [];
  }
}

/**
 * Wait for DOM to be ready
 * @param callback - Function to execute when DOM is ready
 */
export function onReady(callback: () => void): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback, { once: true });
  } else {
    callback();
  }
}

/**
 * Create intersection observer with cleanup
 * @param callback - Callback function
 * @param options - Observer options
 * @returns Observer instance and cleanup function
 */
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): { observer: IntersectionObserver; cleanup: () => void } {
  const observer = new IntersectionObserver(callback, options);

  const cleanup = () => {
    observer.disconnect();
  };

  return { observer, cleanup };
}
