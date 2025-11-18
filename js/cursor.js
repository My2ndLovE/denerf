// ========================================
// Custom Cursor
// ========================================

class CustomCursor {
  constructor() {
    this.cursor = document.querySelector('.cursor');
    this.dot = document.querySelector('.cursor-dot');
    this.outline = document.querySelector('.cursor-outline');

    this.cursorPos = { x: 0, y: 0 };
    this.dotPos = { x: 0, y: 0 };
    this.outlinePos = { x: 0, y: 0 };
    this.animationId = null;
    this.isAnimating = true;

    this.init();
  }

  init() {
    // Check if cursor elements exist
    if (!this.cursor || !this.dot || !this.outline) {
      console.warn('Cursor elements not found');
      return;
    }

    // Hide default cursor on desktop
    if (window.innerWidth > 768) {
      document.body.style.cursor = 'none';
    }

    this.addEventListeners();
    this.animate();
  }

  addEventListeners() {
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
      this.cursorPos.x = e.clientX;
      this.cursorPos.y = e.clientY;
    });

    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .btn, .work-item, .service-card, input, textarea'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        this.cursor.classList.add('hover');
      });

      el.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('hover');
      });
    });

    // Handle window resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768) {
          document.body.style.cursor = 'none';
          if (this.cursor) this.cursor.style.display = 'block';
        } else {
          document.body.style.cursor = 'auto';
          if (this.cursor) this.cursor.style.display = 'none';
        }
      }, 150);
    });
  }

  animate() {
    if (!this.isAnimating) return;

    // Smooth cursor following with lerp (linear interpolation)
    const dotSpeed = 0.3;
    const outlineSpeed = 0.15;

    this.dotPos.x += (this.cursorPos.x - this.dotPos.x) * dotSpeed;
    this.dotPos.y += (this.cursorPos.y - this.dotPos.y) * dotSpeed;

    this.outlinePos.x += (this.cursorPos.x - this.outlinePos.x) * outlineSpeed;
    this.outlinePos.y += (this.cursorPos.y - this.outlinePos.y) * outlineSpeed;

    // Apply positions
    if (this.dot && this.outline) {
      this.dot.style.left = `${this.dotPos.x}px`;
      this.dot.style.top = `${this.dotPos.y}px`;

      this.outline.style.left = `${this.outlinePos.x}px`;
      this.outline.style.top = `${this.outlinePos.y}px`;
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  pause() {
    this.isAnimating = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  resume() {
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.animate();
    }
  }
}

// Initialize when DOM is loaded
window.cursorInstance = null;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.cursorInstance = new CustomCursor();
  });
} else {
  window.cursorInstance = new CustomCursor();
}
