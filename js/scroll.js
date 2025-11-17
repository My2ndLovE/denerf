// ========================================
// GSAP Scroll Animations
// ========================================

class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Wait for GSAP and ScrollTrigger to load
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP or ScrollTrigger not loaded');
      return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    this.initHeroAnimations();
    this.initSectionAnimations();
    this.initCounterAnimations();
    this.initWorkGridAnimations();
    this.initParallaxEffects();
  }

  initHeroAnimations() {
    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate hero title words
    timeline.to('.word', {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      delay: 0.3
    });

    // Animate subtitle
    timeline.to('.hero-subtitle', {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, '-=0.4');

    // Animate CTA buttons
    timeline.to('.hero-cta', {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, '-=0.4');

    // Animate scroll indicator
    timeline.to('.scroll-indicator', {
      opacity: 1,
      duration: 0.6
    }, '-=0.2');
  }

  initSectionAnimations() {
    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });

    // About content
    gsap.from('.about-text', {
      scrollTrigger: {
        trigger: '.about-content',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      x: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.about-stats', {
      scrollTrigger: {
        trigger: '.about-content',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      x: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Service cards
    gsap.utils.toArray('.service-card').forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
      });
    });

    // Contact content
    gsap.from('.contact-text', {
      scrollTrigger: {
        trigger: '.contact-content',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      x: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.contact-form-wrapper', {
      scrollTrigger: {
        trigger: '.contact-content',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      x: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
  }

  initCounterAnimations() {
    // Animate counting numbers
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));

      // Create a counter object to animate
      const counter = { value: 0 };

      gsap.to(counter, {
        scrollTrigger: {
          trigger: stat,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          onEnter: () => stat.classList.add('counting'),
          onLeaveBack: () => stat.classList.remove('counting')
        },
        value: target,
        duration: 2,
        ease: 'power2.out',
        onUpdate: function() {
          stat.innerText = Math.ceil(counter.value) + '+';
        }
      });
    });
  }

  initWorkGridAnimations() {
    // Work items with stagger
    gsap.utils.toArray('.work-item').forEach((item, index) => {
      // Image reveal
      gsap.from(item.querySelector('.work-image'), {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.05,
        ease: 'power3.out'
      });

      // Info slide up
      gsap.from(item.querySelector('.work-info'), {
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.05 + 0.2,
        ease: 'power3.out'
      });

      // Add hover tilt effect
      item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        gsap.to(item.querySelector('.work-image-inner'), {
          rotateX: rotateX,
          rotateY: rotateY,
          duration: 0.5,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      });

      item.addEventListener('mouseleave', () => {
        gsap.to(item.querySelector('.work-image-inner'), {
          rotateX: 0,
          rotateY: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      });
    });
  }

  initParallaxEffects() {
    // Parallax scroll for sections
    gsap.utils.toArray('.section-title').forEach(title => {
      gsap.to(title, {
        scrollTrigger: {
          trigger: title,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: -50,
        ease: 'none'
      });
    });

    // Service icons float on scroll
    gsap.utils.toArray('.service-icon').forEach(icon => {
      gsap.to(icon, {
        scrollTrigger: {
          trigger: icon,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: -30,
        ease: 'none'
      });
    });
  }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
  });
} else {
  new ScrollAnimations();
}
