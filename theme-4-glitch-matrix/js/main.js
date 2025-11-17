// MAIN CONTROLLER - Theme 4: Glitch Matrix

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
        this.setupGlitchEffects();
        this.setupInteractions();

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
            y: 200,
            opacity: 0
        });

        gsap.to('.terminal-text', {
            scrollTrigger: {
                trigger: '#hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            },
            y: 150,
            opacity: 0
        });

        // Terminal window entrance
        gsap.from('.terminal-window', {
            scrollTrigger: {
                trigger: '.terminal-window',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });

        // Stats matrix entrance
        gsap.from('.stat-block', {
            scrollTrigger: {
                trigger: '.stats-matrix',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            x: 100,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power2.out'
        });

        // Service boxes stagger
        gsap.from('.service-box', {
            scrollTrigger: {
                trigger: '#services',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            scale: 0.8,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: 'back.out(1.5)'
        });

        // Projects grid
        gsap.from('.project-item', {
            scrollTrigger: {
                trigger: '#portfolio',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power2.out'
        });

        // Contact form
        gsap.from('.terminal-form', {
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

        gsap.from('.contact-info-matrix', {
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

                // Trigger glitch
                if (window.glitchEffect) {
                    window.glitchEffect.trigger(0.8);
                }
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
        const form = document.querySelector('.terminal-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            console.log('Form submitted:', data);

            // Glitch explosion
            if (window.glitchEffect) {
                window.glitchEffect.explode();
            }

            // Matrix rain burst
            if (window.matrixRain) {
                const rect = form.getBoundingClientRect();
                window.matrixRain.burst(
                    rect.left + rect.width / 2,
                    rect.top + rect.height / 2
                );
            }

            // Success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = `
                <div style="font-family: 'Orbitron', monospace; color: #00ff41; text-shadow: 0 0 10px rgba(0, 255, 65, 0.8);">
                    &gt; TRANSMISSION SUCCESSFUL
                </div>
                <div style="font-family: 'Share Tech Mono', monospace; margin-top: 1rem;">
                    Message delivered. Response time &lt; 2 hours.
                </div>
            `;
            successMessage.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.95);
                border: 2px solid #00ff41;
                color: white;
                padding: 2rem 3rem;
                font-size: 1.2rem;
                font-weight: 600;
                z-index: 10000;
                box-shadow: 0 0 40px rgba(0, 255, 65, 0.5);
                clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
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

        // Input glitch effects
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                if (window.glitchEffect) {
                    window.glitchEffect.trigger(0.3);
                }
            });
        });
    }

    setupStats() {
        // Animate stat numbers
        const stats = [
            { element: '.stat-projects', target: 127, suffix: '' },
            { element: '.stat-clients', target: 89, suffix: '' },
            { element: '.stat-accuracy', target: 99.8, suffix: '%', decimals: 1 }
        ];

        stats.forEach(stat => {
            const element = document.querySelector(stat.element);
            if (!element) return;

            ScrollTrigger.create({
                trigger: element,
                start: 'top 80%',
                onEnter: () => {
                    // Animate number
                    gsap.to(element, {
                        innerText: stat.target,
                        duration: 2,
                        snap: stat.decimals ? { innerText: 0.1 } : { innerText: 1 },
                        ease: 'power1.out',
                        onUpdate: function() {
                            const value = this.targets()[0].innerText;
                            element.innerText = stat.decimals
                                ? parseFloat(value).toFixed(1) + stat.suffix
                                : Math.ceil(value) + stat.suffix;
                        }
                    });

                    // Animate stat bar
                    const statFill = element.parentElement.querySelector('.stat-fill');
                    if (statFill) {
                        gsap.to(statFill, {
                            width: '100%',
                            duration: 2,
                            ease: 'power1.out'
                        });
                    }
                }
            });
        });
    }

    setupGlitchEffects() {
        // Section transitions trigger glitches
        this.sections.forEach((section, index) => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top 70%',
                onEnter: () => {
                    if (window.glitchEffect && index > 0) {
                        window.glitchEffect.trigger(0.5);
                    }

                    if (window.glitchText && index === 0) {
                        window.glitchText.scramble();
                    }
                }
            });
        });
    }

    setupInteractions() {
        // Service box interactions
        document.querySelectorAll('.service-box').forEach(box => {
            box.addEventListener('mouseenter', function() {
                if (window.glitchEffect) {
                    window.glitchEffect.trigger(0.3);
                }

                gsap.to(this, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            box.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        // Project item interactions
        document.querySelectorAll('.project-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                if (window.glitchEffect) {
                    window.glitchEffect.trigger(0.4);
                }

                gsap.to(this, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            item.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
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
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.add('loaded');

                // Hero entrance
                gsap.from('.hero-title', {
                    scale: 0.5,
                    opacity: 0,
                    duration: 1.5,
                    ease: 'back.out(1.5)',
                    delay: 0.2
                });

                gsap.from('.terminal-text', {
                    x: -50,
                    opacity: 0,
                    stagger: 0.2,
                    duration: 1,
                    delay: 0.8
                });

                gsap.from('.cta-button', {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    delay: 1.4
                });

                // Initial glitch
                if (window.glitchEffect) {
                    setTimeout(() => {
                        window.glitchEffect.trigger(1);
                    }, 1000);
                }
            }, 300);
        });
    }
}

// Scan line effect
class ScanLineEffect {
    constructor() {
        this.scanLine = document.querySelector('.scan-line');
        if (!this.scanLine) return;

        this.isActive = true;
        this.init();
    }

    init() {
        // Random deactivation/reactivation
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.scanLine.style.opacity = this.isActive ? '0' : '1';
                this.isActive = !this.isActive;
            }
        }, 5000);
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    window.themeController = new ThemeController();
    window.scanLineEffect = new ScanLineEffect();

    // Console message
    console.log('%c> SYSTEM INITIALIZED', 'color: #00ff41; font-family: monospace; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px rgba(0, 255, 65, 0.8)');
    console.log('%c> Denerf - Glitch Matrix Theme', 'color: #ff006e; font-family: monospace; font-size: 16px;');
    console.log('%c> Build version: 4.0 | Status: ONLINE', 'color: #00d9ff; font-family: monospace; font-size: 14px;');
});
