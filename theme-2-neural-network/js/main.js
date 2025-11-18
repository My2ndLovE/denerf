// MAIN CONTROLLER - Theme 2: Neural Network

class ThemeController {
    constructor() {
        this.currentSection = 0;
        this.sections = document.querySelectorAll('.section');
        this.navDots = document.querySelectorAll('.nav-dot');
        this.scrollProgress = document.querySelector('.scroll-progress');
        this.isScrolling = false;

        this.init();
    }

    init() {
        // GSAP setup
        gsap.registerPlugin(ScrollTrigger);

        // Scroll animations
        this.setupScrollAnimations();

        // Navigation
        this.setupNavigation();

        // Form handling
        this.setupForm();

        // Stats counter animation
        this.setupStats();

        // Section reveal animations
        this.setupSectionReveals();

        // Update scroll progress
        this.updateScrollProgress();
        window.addEventListener('scroll', () => this.updateScrollProgress());

        // Preloader
        this.hidePreloader();
    }

    setupScrollAnimations() {
        // Hero section parallax
        gsap.to('#hero h1', {
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            y: 100,
            opacity: 0.5
        });

        gsap.to('#hero .tagline', {
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            y: 150,
            opacity: 0
        });

        // About section animations
        gsap.from('#about .about-content', {
            scrollTrigger: {
                trigger: '#about',
                start: 'top 80%',
                end: 'top 20%',
                scrub: 1
            },
            x: -100,
            opacity: 0
        });

        // Services grid stagger
        gsap.from('[data-node-card]', {
            scrollTrigger: {
                trigger: '#services',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out'
        });

        // Portfolio carousel entrance
        gsap.from('#carousel-canvas', {
            scrollTrigger: {
                trigger: '#portfolio',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: 'back.out(1.7)'
        });

        // Contact form entrance
        gsap.from('.contact-form', {
            scrollTrigger: {
                trigger: '#contact',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        // Section titles reveal
        gsap.utils.toArray('.section h2').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
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

        // Update active dot on scroll
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
    }

    setupForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            console.log('Form submitted:', data);

            // Create burst effect at form center
            const rect = form.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            if (window.particleBurst) {
                window.particleBurst.createBurst(centerX, centerY, 100);
            }

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.textContent = 'Message sent successfully! We\'ll get back to you soon.';
            successMessage.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #e63946;
                color: white;
                padding: 2rem 3rem;
                border-radius: 8px;
                font-size: 1.2rem;
                font-weight: 600;
                z-index: 10000;
                box-shadow: 0 10px 40px rgba(230, 57, 70, 0.5);
            `;
            document.body.appendChild(successMessage);

            gsap.from(successMessage, {
                scale: 0,
                duration: 0.5,
                ease: 'back.out(2)'
            });

            // Remove after 3 seconds
            setTimeout(() => {
                gsap.to(successMessage, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'back.in(2)',
                    onComplete: () => successMessage.remove()
                });
            }, 3000);

            // Reset form
            form.reset();
        });

        // Input focus effects
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.borderColor = '#e63946';
            });

            input.addEventListener('blur', function() {
                this.parentElement.style.borderColor = '#333';
            });
        });
    }

    setupStats() {
        const stats = [
            { element: '.stat-projects', target: 127, suffix: '+' },
            { element: '.stat-clients', target: 89, suffix: '+' },
            { element: '.stat-countries', target: 34, suffix: '' }
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
        // Reveal sections with network effect
        this.sections.forEach((section, index) => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top 70%',
                onEnter: () => {
                    section.classList.add('revealed');

                    // Trigger network visualization effect
                    if (window.neuralNetwork && index > 0) {
                        window.neuralNetwork.pulse();
                    }

                    // Scramble title on section enter
                    if (window.networkTitle && index === 0) {
                        window.networkTitle.scramble();
                    }
                }
            });
        });
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
        // Wait for all resources to load
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.add('loaded');

                // Initial hero animation
                gsap.from('#hero h1', {
                    scale: 0.5,
                    opacity: 0,
                    duration: 1.5,
                    ease: 'back.out(1.7)',
                    delay: 0.2
                });

                gsap.from('#hero .tagline', {
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

                // Scramble title effect
                if (window.networkTitle) {
                    window.networkTitle.scramble();
                }
            }, 500);
        });
    }
}

// Mouse trail effect - Optimized
class MouseTrail {
    constructor() {
        this.trail = [];
        this.maxTrail = 20;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(this.canvas);

        this.rafId = null;
        this.lastTime = 0;

        // Mobile optimization - disable on mobile
        this.isMobile = window.innerWidth < 768;

        if (!this.isMobile) {
            this.fps = 60;
            this.frameInterval = 1000 / this.fps;

            this.resize();

            this.resizeHandler = () => {
                this.resize();
                this.isMobile = window.innerWidth < 768;
            };

            this.mouseMoveHandler = (e) => this.addPoint(e.clientX, e.clientY);

            window.addEventListener('resize', this.resizeHandler);
            window.addEventListener('mousemove', this.mouseMoveHandler);

            this.animate();
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    addPoint(x, y) {
        this.trail.push({ x, y, life: 1 });
        if (this.trail.length > this.maxTrail) {
            this.trail.shift();
        }
    }

    animate(currentTime = 0) {
        this.rafId = requestAnimationFrame((time) => this.animate(time));

        // FPS throttling
        const deltaTime = currentTime - this.lastTime;
        if (deltaTime < this.frameInterval) return;

        this.lastTime = currentTime - (deltaTime % this.frameInterval);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw trail (simplified, no gradient)
        for (let i = 0; i < this.trail.length; i++) {
            const point = this.trail[i];
            point.life -= 0.05;

            if (point.life <= 0) {
                this.trail.splice(i, 1);
                i--;
                continue;
            }

            const size = 3 * point.life;

            // Draw outer glow
            this.ctx.globalAlpha = point.life * 0.2;
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, size * 2, 0, Math.PI * 2);
            this.ctx.fillStyle = '#e63946';
            this.ctx.fill();

            // Draw center
            this.ctx.globalAlpha = point.life * 0.5;
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
            this.ctx.fillStyle = '#e63946';
            this.ctx.fill();
        }

        this.ctx.globalAlpha = 1;
    }

    destroy() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }

        if (!this.isMobile) {
            window.removeEventListener('resize', this.resizeHandler);
            window.removeEventListener('mousemove', this.mouseMoveHandler);
        }

        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }

        this.trail = [];
    }
}

// Service card glow effect
function setupServiceCardEffects() {
    const cards = document.querySelectorAll('[data-node-card]');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        card.addEventListener('mouseenter', () => {
            card.style.background = 'radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(230, 57, 70, 0.1), transparent 40%)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = 'none';
        });
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    // Main controller
    window.themeController = new ThemeController();

    // Mouse trail
    window.mouseTrail = new MouseTrail();

    // Service card effects
    setupServiceCardEffects();

    // Console welcome message
    console.log('%cDenerf - Neural Network Theme', 'color: #e63946; font-size: 20px; font-weight: bold;');
    console.log('%cBuilt with AI-powered creativity', 'color: #ffffff; font-size: 14px;');
});

// Smooth scroll for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
