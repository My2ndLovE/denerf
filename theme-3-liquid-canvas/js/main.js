// MAIN CONTROLLER - Theme 3: Liquid Canvas

class ThemeController {
    constructor() {
        this.currentSection = 0;
        this.sections = document.querySelectorAll('.section');
        this.navDots = document.querySelectorAll('.nav-dot');
        this.scrollProgress = document.querySelector('.scroll-progress');

        this.init();
    }

    init() {
        // GSAP setup
        gsap.registerPlugin(ScrollTrigger);

        // Setup all features
        this.setupScrollAnimations();
        this.setupNavigation();
        this.setupForm();
        this.setupStats();
        this.setupSectionReveals();
        this.setupInteractiveEffects();

        // Update scroll progress
        this.updateScrollProgress();
        window.addEventListener('scroll', () => this.updateScrollProgress());

        // Preloader
        this.hidePreloader();
    }

    setupScrollAnimations() {
        // Hero parallax
        gsap.to('.hero-title', {
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            y: 150,
            opacity: 0,
            scale: 0.8
        });

        gsap.to('.tagline', {
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            y: 200,
            opacity: 0
        });

        gsap.to('.cta-button', {
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            y: 100,
            opacity: 0
        });

        // About section
        gsap.from('.about-content h3', {
            scrollTrigger: {
                trigger: '#about',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });

        gsap.from('.about-content p', {
            scrollTrigger: {
                trigger: '#about',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            x: -100,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            stagger: 0.1,
            ease: 'power2.out'
        });

        // Stats animation
        gsap.from('.stat-item', {
            scrollTrigger: {
                trigger: '.stats-grid',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'back.out(1.5)'
        });

        // Services cards stagger
        gsap.from('.service-card', {
            scrollTrigger: {
                trigger: '#services',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            y: 80,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out'
        });

        // Portfolio entrance
        gsap.from('.portfolio-swiper', {
            scrollTrigger: {
                trigger: '#portfolio',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.9,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });

        // Contact grid
        gsap.from('.contact-info', {
            scrollTrigger: {
                trigger: '#contact',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });

        gsap.from('.contact-form', {
            scrollTrigger: {
                trigger: '#contact',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            x: 100,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });

        // Section titles with liquid effect
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 80,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        });
    }

    setupNavigation() {
        // Navigation dots
        this.navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.sections[index].scrollIntoView({ behavior: 'smooth' });
            });
        });

        // Update active dot
        const updateActiveDot = () => {
            const scrollPos = window.scrollY + window.innerHeight / 2;

            this.sections.forEach((section, index) => {
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;

                if (scrollPos >= top && scrollPos < bottom) {
                    this.navDots.forEach(dot => dot.classList.remove('active'));
                    this.navDots[index].classList.add('active');
                    this.currentSection = index;
                }
            });
        };

        window.addEventListener('scroll', updateActiveDot);
        updateActiveDot();

        // CTA button
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
            });
        }

        // Smooth scroll for all links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    setupForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            console.log('Form submitted:', data);

            // Particle burst effect
            const rect = form.getBoundingClientRect();
            if (window.particleFlow) {
                window.particleFlow.burst(
                    rect.left + rect.width / 2,
                    rect.top + rect.height / 2
                );
            }

            // Liquid morph explosion
            if (window.liquidMorph) {
                window.liquidMorph.explode();
            }

            // Success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.textContent = 'Message sent! We\'ll get back to you soon.';
            successMessage.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #ff6b35, #ff8c42);
                color: white;
                padding: 2rem 3rem;
                border-radius: 20px;
                font-size: 1.2rem;
                font-weight: 600;
                z-index: 10000;
                box-shadow: 0 20px 60px rgba(255, 107, 53, 0.5);
            `;
            document.body.appendChild(successMessage);

            gsap.from(successMessage, {
                scale: 0,
                duration: 0.5,
                ease: 'back.out(2)'
            });

            setTimeout(() => {
                gsap.to(successMessage, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'back.in(2)',
                    onComplete: () => successMessage.remove()
                });
            }, 3000);

            form.reset();
        });

        // Input liquid effects
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                gsap.to(this, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            input.addEventListener('blur', function() {
                gsap.to(this, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
    }

    setupStats() {
        const stats = [
            { element: '.stat-projects', target: 127, suffix: '+' },
            { element: '.stat-clients', target: 89, suffix: '+' },
            { element: '.stat-speed', target: 10, suffix: 'x' }
        ];

        stats.forEach(stat => {
            const element = document.querySelector(stat.element);
            if (!element) return;

            ScrollTrigger.create({
                trigger: element,
                start: 'top 80%',
                onEnter: () => {
                    gsap.to(element, {
                        innerText: stat.target,
                        duration: 2,
                        snap: { innerText: 1 },
                        ease: 'power1.out',
                        onUpdate: function() {
                            element.innerText = Math.ceil(this.targets()[0].innerText) + stat.suffix;
                        }
                    });
                }
            });
        });
    }

    setupSectionReveals() {
        this.sections.forEach((section, index) => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top 70%',
                onEnter: () => {
                    section.classList.add('revealed');

                    // Trigger liquid effects
                    if (window.liquidMorph && index > 0) {
                        // Subtle blob movement
                        const randomBlob = window.liquidMorph.blobs[Math.floor(Math.random() * window.liquidMorph.blobs.length)];
                        if (randomBlob) {
                            randomBlob.vx += (Math.random() - 0.5) * 2;
                            randomBlob.vy += (Math.random() - 0.5) * 2;
                        }
                    }
                }
            });
        });
    }

    setupInteractiveEffects() {
        // Service card interactions
        document.querySelectorAll('[data-liquid-card]').forEach(card => {
            card.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });

                // Particle burst
                if (window.particleFlow) {
                    const rect = this.getBoundingClientRect();
                    window.particleFlow.burst(
                        rect.left + rect.width / 2,
                        rect.top + rect.height / 2
                    );
                }
            });

            card.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        // Project card interactions
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    y: -10,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        // Blob interaction on about section
        const aboutBlob = document.querySelector('[data-liquid-blob]');
        if (aboutBlob) {
            ScrollTrigger.create({
                trigger: aboutBlob,
                start: 'top 70%',
                onEnter: () => {
                    if (window.aboutBlob) {
                        window.aboutBlob.jolt();
                    }
                }
            });
        }
    }

    updateScrollProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;

        if (this.scrollProgress) {
            this.scrollProgress.style.width = `${progress}%`;
        }
    }

    hidePreloader() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.add('loaded');

                // Hero entrance animation
                gsap.from('.hero-title', {
                    scale: 0.5,
                    opacity: 0,
                    duration: 1.5,
                    ease: 'back.out(1.5)',
                    delay: 0.2
                });

                gsap.from('.tagline', {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    delay: 0.8
                });

                gsap.from('.cta-button', {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    delay: 1.2
                });

                gsap.from('.scroll-indicator', {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    delay: 1.4
                });

                // Liquid text explosion
                if (window.liquidText) {
                    setTimeout(() => {
                        window.liquidText.explode();
                    }, 1000);
                }
            }, 300);
        });
    }
}

// Mouse cursor effect
class LiquidCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'liquid-cursor';
        this.cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 107, 53, 0.6), rgba(255, 210, 63, 0.3));
            pointer-events: none;
            z-index: 10000;
            mix-blend-mode: screen;
            transform: translate(-50%, -50%);
            transition: width 0.3s ease, height 0.3s ease;
        `;
        document.body.appendChild(this.cursor);

        this.x = 0;
        this.y = 0;
        this.targetX = 0;
        this.targetY = 0;

        window.addEventListener('mousemove', (e) => {
            this.targetX = e.clientX;
            this.targetY = e.clientY;
        });

        // Enlarge on interactive elements
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('a, button, input, textarea, .service-card, .project-card')) {
                this.cursor.style.width = '40px';
                this.cursor.style.height = '40px';
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.matches('a, button, input, textarea, .service-card, .project-card')) {
                this.cursor.style.width = '20px';
                this.cursor.style.height = '20px';
            }
        });

        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.x += (this.targetX - this.x) * 0.15;
        this.y += (this.targetY - this.y) * 0.15;

        this.cursor.style.left = `${this.x}px`;
        this.cursor.style.top = `${this.y}px`;
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    window.themeController = new ThemeController();
    window.liquidCursor = new LiquidCursor();

    // Console message
    console.log('%c🌊 Denerf - Liquid Canvas Theme', 'color: #ff6b35; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with AI-powered creativity', 'color: #ffd23f; font-size: 14px;');
});
