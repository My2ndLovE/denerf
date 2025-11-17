/* ================================================
   MAIN.JS - Theme 1: Ocean Depth
   Main initialization and coordination
   ================================================ */

import { initLayeredTypography } from './layered-typography.js';
import { initLiquidSwipe } from './liquid-swipe.js';
import { initScrollController } from './scroll-controller.js';

// ================================================
// GSAP & Lenis Setup
// ================================================

gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Integrate Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// ================================================
// Initialize All Components
// ================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🌊 Denerf - Ocean Depth Theme Initializing...');

    // Initialize kinetic typography
    initLayeredTypography();

    // Initialize liquid swipe for portfolio
    initLiquidSwipe();

    // Initialize scroll controller and animations
    initScrollController(lenis);

    // Initialize scroll progress indicator
    initScrollProgress();

    // Initialize section animations
    initSectionAnimations();

    // Initialize form handling
    initContactForm();

    // Initialize portfolio navigation
    initPortfolioNav();

    // Initialize magnetic effects
    initMagneticEffects();

    console.log('✅ Theme initialized successfully');
});

// ================================================
// Scroll Progress Indicator
// ================================================

function initScrollProgress() {
    const dots = document.querySelectorAll('.dot');
    const sections = document.querySelectorAll('.section');
    const progressLine = document.querySelector('.progress-line');

    // Update active dot based on scroll position
    ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
            const progress = self.progress;
            if (progressLine) {
                progressLine.style.setProperty('--progress', progress);
                progressLine.querySelector('::after') ||
                    (progressLine.style.background = `linear-gradient(to bottom, var(--accent-teal) ${progress * 100}%, rgba(139, 149, 165, 0.2) ${progress * 100}%)`);
            }
        }
    });

    // Highlight active section dot
    sections.forEach((section, index) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => setActiveDot(index),
            onEnterBack: () => setActiveDot(index),
        });
    });

    function setActiveDot(index) {
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Click to navigate
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const section = sections[index];
            if (section) {
                lenis.scrollTo(section, {
                    offset: 0,
                    duration: 1.5,
                    easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
                });
            }
        });
    });
}

// ================================================
// Section Animations
// ================================================

function initSectionAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');

    animatedElements.forEach((el) => {
        const delay = el.getAttribute('data-delay') || 0;

        ScrollTrigger.create({
            trigger: el,
            start: 'top 80%',
            onEnter: () => {
                setTimeout(() => {
                    el.classList.add('animated');
                }, delay);
            },
            once: true,
        });
    });

    // Capability cards stagger
    gsap.utils.toArray('.capability-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
        });
    });

    // Service cards stagger
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out',
        });
    });

    // Stats counter animation
    animateStats();
}

function animateStats() {
    const stats = document.querySelectorAll('.stat-value');

    stats.forEach((stat) => {
        const target = stat.textContent;
        const isNumber = !isNaN(parseFloat(target));

        if (isNumber) {
            const endValue = parseFloat(target);

            ScrollTrigger.create({
                trigger: stat,
                start: 'top 80%',
                onEnter: () => {
                    gsap.from(stat, {
                        textContent: 0,
                        duration: 2,
                        ease: 'power2.out',
                        snap: { textContent: 1 },
                        onUpdate: function () {
                            stat.textContent = Math.ceil(this.targets()[0].textContent) + (target.includes('+') ? '+' : '');
                        }
                    });
                },
                once: true,
            });
        } else {
            // For non-numeric stats (like ∞), just animate in
            ScrollTrigger.create({
                trigger: stat,
                start: 'top 80%',
                onEnter: () => {
                    gsap.from(stat, {
                        scale: 0,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'back.out(1.7)',
                    });
                },
                once: true,
            });
        }
    });
}

// ================================================
// Contact Form
// ================================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    const formWrapper = document.querySelector('.contact-form-wrapper');
    const successMessage = document.getElementById('formSuccess');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.btn-submit');
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Show success message
        gsap.to(form, {
            opacity: 0,
            y: -30,
            duration: 0.5,
            onComplete: () => {
                form.style.display = 'none';
                successMessage.classList.add('show');
                gsap.from(successMessage, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    ease: 'power3.out',
                });
            }
        });

        // Reset form
        form.reset();
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    });

    // Floating label effect
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out',
            });
        });

        input.addEventListener('blur', () => {
            gsap.to(input, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out',
            });
        });
    });
}

// ================================================
// Portfolio Navigation
// ================================================

function initPortfolioNav() {
    const slides = document.querySelectorAll('.project-slide');
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');
    const currentProjectEl = document.querySelector('.current-project');

    if (!slides.length) return;

    let currentIndex = 0;

    // Hide all slides except first
    slides.forEach((slide, index) => {
        if (index !== 0) {
            gsap.set(slide, { opacity: 0, display: 'none' });
        }
    });

    function goToSlide(index) {
        if (index < 0 || index >= slides.length || index === currentIndex) return;

        const currentSlide = slides[currentIndex];
        const nextSlide = slides[index];

        // Animate out current
        gsap.to(currentSlide, {
            opacity: 0,
            x: index > currentIndex ? -50 : 50,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
                currentSlide.style.display = 'none';
                gsap.set(currentSlide, { x: 0 });
            }
        });

        // Animate in next
        nextSlide.style.display = 'flex';
        gsap.set(nextSlide, { x: index > currentIndex ? 50 : -50, opacity: 0 });
        gsap.to(nextSlide, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: 0.2,
        });

        currentIndex = index;
        updatePagination();
    }

    function updatePagination() {
        if (currentProjectEl) {
            gsap.to(currentProjectEl, {
                textContent: String(currentIndex + 1).padStart(2, '0'),
                duration: 0.3,
                snap: { textContent: 1 },
            });
        }
    }

    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
        if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
    });
}

// ================================================
// Magnetic Effects
// ================================================

function initMagneticEffects() {
    const magneticElements = document.querySelectorAll('.btn, .nav-arrow, .dot');

    magneticElements.forEach((el) => {
        el.addEventListener('mouseenter', () => {
            gsap.to(el, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out',
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                scale: 1,
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)',
            });
        });

        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(el, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out',
            });
        });
    });
}

// ================================================
// Smooth Scroll to Links
// ================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, {
                offset: -100,
                duration: 1.5,
            });
        }
    });
});

// ================================================
// Cursor Trail Effect (Optional)
// ================================================

if (window.innerWidth > 1024) { // Only on desktop
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: var(--accent-teal);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.2s ease;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

// ================================================
// Performance Monitoring
// ================================================

if (window.location.search.includes('debug')) {
    console.log('📊 Performance Monitoring Enabled');

    // Log scroll performance
    let frameCount = 0;
    let lastTime = performance.now();

    function measureFPS() {
        frameCount++;
        const currentTime = performance.now();

        if (currentTime >= lastTime + 1000) {
            console.log(`FPS: ${frameCount}`);
            frameCount = 0;
            lastTime = currentTime;
        }

        requestAnimationFrame(measureFPS);
    }
    measureFPS();
}

// ================================================
// Export for other modules
// ================================================

export { lenis, gsap, ScrollTrigger };
