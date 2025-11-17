/* ================================================
   SCROLL-CONTROLLER.JS - Theme 1: Ocean Depth
   Advanced scroll-based animations and triggers
   ================================================ */

export function initScrollController(lenis) {
    console.log('🎢 Initializing scroll controller...');

    // Parallax backgrounds
    initParallaxBackgrounds();

    // Fade in/out effects
    initFadeEffects();

    // Scale effects
    initScaleEffects();

    // Rotate effects
    initRotateEffects();

    // Custom scroll animations
    initCustomScrollAnimations();

    // Section background changes
    initSectionBackgrounds();

    console.log('✅ Scroll controller initialized');
}

// ================================================
// Parallax Backgrounds
// ================================================

function initParallaxBackgrounds() {
    const gradientBg = document.querySelector('.gradient-bg');

    if (gradientBg) {
        gsap.to(gradientBg, {
            scrollTrigger: {
                trigger: '.section-hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
            y: 200,
            opacity: 0.3,
            ease: 'none',
        });
    }

    // Parallax for service cards
    gsap.utils.toArray('.service-card').forEach((card, index) => {
        const speed = (index % 2 === 0) ? 50 : -50;

        gsap.to(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
            },
            y: speed,
            ease: 'none',
        });
    });
}

// ================================================
// Fade Effects
// ================================================

function initFadeEffects() {
    // Fade in elements
    gsap.utils.toArray('.capability-card, .tech-category').forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                end: 'top 60%',
                scrub: 1,
            },
            opacity: 0,
            y: 30,
        });
    });

    // Fade out hero content on scroll
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        gsap.to(heroContent, {
            scrollTrigger: {
                trigger: '.section-hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
            opacity: 0,
            y: -50,
            ease: 'none',
        });
    }
}

// ================================================
// Scale Effects
// ================================================

function initScaleEffects() {
    // Scale up effect for project mockups
    gsap.utils.toArray('.project-mockup').forEach((mockup) => {
        gsap.from(mockup, {
            scrollTrigger: {
                trigger: mockup,
                start: 'top 80%',
                end: 'top 50%',
                scrub: 1,
            },
            scale: 0.8,
            opacity: 0,
        });
    });

    // Scale pulse for stats
    gsap.utils.toArray('.stat').forEach((stat, index) => {
        gsap.from(stat, {
            scrollTrigger: {
                trigger: stat,
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
            scale: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'back.out(1.7)',
        });
    });
}

// ================================================
// Rotate Effects
// ================================================

function initRotateEffects() {
    // Subtle rotate for service icons
    gsap.utils.toArray('.service-icon').forEach((icon) => {
        gsap.from(icon, {
            scrollTrigger: {
                trigger: icon,
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
            rotateY: 180,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
        });
    });

    // Rotate on scroll for capability icons
    gsap.utils.toArray('.capability-icon').forEach((icon) => {
        gsap.to(icon, {
            scrollTrigger: {
                trigger: icon,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2,
            },
            rotate: 360,
            ease: 'none',
        });
    });
}

// ================================================
// Custom Scroll Animations
// ================================================

function initCustomScrollAnimations() {
    // Tech tags wave animation
    const techTags = document.querySelectorAll('.tech-tags span');
    techTags.forEach((tag, index) => {
        gsap.from(tag, {
            scrollTrigger: {
                trigger: tag.parentElement,
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
            y: 20,
            opacity: 0,
            duration: 0.5,
            delay: index * 0.05,
            ease: 'power2.out',
        });
    });

    // Service features list animation
    gsap.utils.toArray('.service-features li').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item.parentElement,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            x: -20,
            opacity: 0,
            duration: 0.4,
            delay: index * 0.1,
            ease: 'power2.out',
        });
    });

    // Project results stagger
    gsap.utils.toArray('.project-results').forEach((results) => {
        const items = results.querySelectorAll('.result-item');

        gsap.from(items, {
            scrollTrigger: {
                trigger: results,
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out',
        });
    });

    // Contact info items
    gsap.utils.toArray('.info-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
            x: 50,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.2,
            ease: 'power2.out',
        });
    });
}

// ================================================
// Section Background Color Changes
// ================================================

function initSectionBackgrounds() {
    const sections = gsap.utils.toArray('.section');

    sections.forEach((section, index) => {
        const isEven = index % 2 === 0;

        ScrollTrigger.create({
            trigger: section,
            start: 'top 75%',
            end: 'bottom 25%',
            onEnter: () => {
                if (isEven) {
                    gsap.to('body', {
                        backgroundColor: '#0a1929',
                        duration: 0.8,
                        ease: 'power2.inOut',
                    });
                } else {
                    gsap.to('body', {
                        backgroundColor: '#0f2537',
                        duration: 0.8,
                        ease: 'power2.inOut',
                    });
                }
            },
            onEnterBack: () => {
                if (isEven) {
                    gsap.to('body', {
                        backgroundColor: '#0a1929',
                        duration: 0.8,
                        ease: 'power2.inOut',
                    });
                } else {
                    gsap.to('body', {
                        backgroundColor: '#0f2537',
                        duration: 0.8,
                        ease: 'power2.inOut',
                    });
                }
            },
        });
    });
}

// ================================================
// Horizontal Scroll Section (Optional)
// ================================================

export function initHorizontalScroll(selector) {
    const section = document.querySelector(selector);
    if (!section) return;

    const items = section.querySelectorAll('.scroll-item');
    const totalWidth = items.length * 100; // 100vw per item

    gsap.to(items, {
        xPercent: -100 * (items.length - 1),
        ease: 'none',
        scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1,
            snap: 1 / (items.length - 1),
            end: `+=${totalWidth * 10}`,
        },
    });
}

// ================================================
// Pin Section with Animation
// ================================================

export function pinSectionWithAnimation(selector, animation) {
    const section = document.querySelector(selector);
    if (!section) return;

    ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=200%',
        pin: true,
        pinSpacing: true,
        animation: animation,
        scrub: 1,
    });
}

// ================================================
// Reveal on Scroll with Clip Path
// ================================================

export function initClipPathReveal() {
    gsap.utils.toArray('[data-clip-reveal]').forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                end: 'top 50%',
                scrub: 1,
            },
            clipPath: 'inset(0 100% 0 0)',
            ease: 'power2.inOut',
        });
    });
}

// ================================================
// Text Reveal Animation
// ================================================

export function initTextReveal() {
    gsap.utils.toArray('[data-text-reveal]').forEach((el) => {
        const text = el.textContent;
        el.innerHTML = '';

        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            el.appendChild(span);

            gsap.from(span, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
                y: 50,
                opacity: 0,
                duration: 0.5,
                delay: i * 0.03,
                ease: 'power2.out',
            });
        });
    });
}

// ================================================
// Smooth Section Transitions
// ================================================

export function initSmoothSectionTransitions() {
    const sections = gsap.utils.toArray('.section');

    sections.forEach((section, index) => {
        if (index === 0) return; // Skip hero

        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top center',
                scrub: 1,
            },
            y: 100,
            opacity: 0,
            ease: 'none',
        });
    });
}

// Initialize smooth transitions
initSmoothSectionTransitions();

// ================================================
// Performance Optimization
// ================================================

// Disable ScrollTrigger on devices with reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    console.log('⚠️ Scroll animations disabled due to reduced motion preference');
}

// Optimize for mobile
if (window.innerWidth < 768) {
    ScrollTrigger.config({
        limitCallbacks: true,
        syncInterval: 150, // Less frequent updates on mobile
    });
}
