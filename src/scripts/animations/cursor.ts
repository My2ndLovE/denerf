/**
 * Smart Cursor System
 * Custom cursor that draws neural pathways and predicts click targets
 */

export function initSmartCursor() {
  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return; // Don't initialize custom cursor for users who prefer reduced motion
  }

  // Check if device supports hover (desktop)
  if (!window.matchMedia('(hover: hover)').matches) {
    return; // Don't initialize on touch devices
  }

  console.log('Smart cursor initialized');

  const cursor = createCursorElement();
  document.body.appendChild(cursor);

  // TODO: Implement cursor features
  // - Track mouse movement
  // - Draw neural pathway trails
  // - Predict likely click targets
  // - Change form per section
  // - Use blend modes for interaction with content
}

function createCursorElement(): HTMLDivElement {
  const cursor = document.createElement('div');
  cursor.className = 'smart-cursor';
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid var(--color-primary);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s ease-out;
    mix-blend-mode: difference;
  `;
  return cursor;
}
