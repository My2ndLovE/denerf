// ========================================
// Main JavaScript
// ========================================

class PortfolioSite {
  constructor() {
    this.nav = document.querySelector('.nav');
    this.navToggle = document.querySelector('.nav-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');

    this.init();
  }

  init() {
    this.initNavigation();
    this.initSmoothScroll();
    this.initFormHandling();
    this.initMobileMenu();
    this.addScrollEffects();
  }

  initNavigation() {
    if (!this.nav) return;

    const sections = document.querySelectorAll('section[id]');

    // Combined scroll handler with throttle for better performance
    const handleScroll = throttle(() => {
      const currentScroll = window.pageYOffset;

      // Add background when scrolled
      if (currentScroll > 100) {
        this.nav.classList.add('scrolled');
      } else {
        this.nav.classList.remove('scrolled');
      }

      // Active link on scroll
      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (correspondingLink && currentScroll > sectionTop && currentScroll <= sectionTop + sectionHeight) {
          this.navLinks.forEach(link => link.classList.remove('active'));
          correspondingLink.classList.add('active');
        }
      });
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  initSmoothScroll() {
    // Smooth scroll for anchor links
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');

        if (targetId.startsWith('#')) {
          const targetSection = document.querySelector(targetId);

          if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;

            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });

            // Close mobile menu if open
            if (window.innerWidth <= 768) {
              this.navMenu.classList.remove('active');
              this.navToggle.classList.remove('active');
            }
          }
        }
      });
    });

    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId !== '#' && targetId.length > 1) {
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;

            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  initMobileMenu() {
    if (!this.navToggle || !this.navMenu) return;

    this.navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = this.navToggle.classList.toggle('active');
      this.navMenu.classList.toggle('active');

      // Update aria-expanded
      this.navToggle.setAttribute('aria-expanded', isActive);

      // Animate toggle icon
      const spans = this.navToggle.querySelectorAll('span');
      if (isActive) {
        spans[0].style.transform = 'rotate(45deg) translateY(8px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (this.navToggle.classList.contains('active') && !this.nav.contains(e.target)) {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        this.navToggle.setAttribute('aria-expanded', 'false');

        const spans = this.navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  initFormHandling() {
    const form = document.querySelector('.contact-form');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simulate form submission
        console.log('Form submitted:', data);

        // Show success message (you can customize this)
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.querySelector('.btn-text').textContent;

        submitBtn.querySelector('.btn-text').textContent = 'Message Sent!';
        submitBtn.disabled = true;

        // Reset after 3 seconds
        setTimeout(() => {
          submitBtn.querySelector('.btn-text').textContent = originalText;
          submitBtn.disabled = false;
          form.reset();
        }, 3000);

        // In production, you would send this to your backend:
        /*
        fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
        */
      });
    }
  }

  addScrollEffects() {
    // Add entrance animations to elements on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    // Observe elements with reveal classes
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
      observer.observe(el);
    });
  }
}

// ========================================
// Utility Functions
// ========================================

// Throttle function for performance (proper implementation)
function throttle(func, wait) {
  let waiting = false;
  return function executedFunction(...args) {
    if (!waiting) {
      func.apply(this, args);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, wait);
    }
  };
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Lerp (linear interpolation) for smooth animations
function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

// ========================================
// Initialize App
// ========================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new PortfolioSite();
  });
} else {
  new PortfolioSite();
}

// ========================================
// Performance Optimizations
// ========================================

// Hide loading screen when everything is loaded
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  if (loadingScreen) {
    // Small delay for smooth transition
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 500);
  }
  console.log('🎨 Portfolio loaded successfully!');
});

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause heavy animations when tab is not visible
    if (window.hero3DInstance) window.hero3DInstance.pause();
    if (window.cursorInstance) window.cursorInstance.pause();
  } else {
    // Resume animations when tab is visible
    if (window.hero3DInstance) window.hero3DInstance.resume();
    if (window.cursorInstance) window.cursorInstance.resume();
  }
});
