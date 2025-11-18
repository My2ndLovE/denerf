// MAIN CONTROLLER - Theme 1: Ocean Depth
// Fixed: Completely rewritten to prevent freeze bug

class OceanDepthController {
    constructor() {
        this.currentSection = 0;
        this.isMobile = window.innerWidth < 768;
        this.isTablet = window.innerWidth < 1024;
        this.scrollTriggers = [];
        this.animations = [];
        this.destroyed = false;

        this.init();
    }

    init() {
        // Wait for DOM and GSAP
        if (typeof gsap === 'undefined') {
            console.error('GSAP not loaded');
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        // Detect mobile/tablet
        this.setupResponsive();

        // Initialize components
        this.setupScrollAnimations();
        this.setupInteractions();
        this.setupPortfolio();
        this.setupForm();
        this.setupNavigation();

        console.log('Ocean Depth Theme - Initialized');
    }

    setupResponsive() {
        let resizeTimer;
        this.resizeHandler = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (this.destroyed) return;
                this.isMobile = window.innerWidth < 768;
                this.isTablet = window.innerWidth < 1024;
                ScrollTrigger.refresh();
            }, 250);
        };
        window.addEventListener('resize', this.resizeHandler);
    }

    setupScrollAnimations() {
        const sections = document.querySelectorAll('.section');
        if (!sections.length) return;

        // Progress bar
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            const progressST = ScrollTrigger.create({
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                onUpdate: (self) => {
                    if (this.destroyed) return;
                    const progress = self.progress * 100;
                    progressBar.style.width = `${progress}%`;
                }
            });
            this.scrollTriggers.push(progressST);
        }

        // Section reveals
        sections.forEach((section, index) => {
            const st = ScrollTrigger.create({
                trigger: section,
                start: 'top 60%',
                end: 'bottom 40%',
                onEnter: () => {
                    if (this.destroyed) return;
                    this.onSectionEnter(index);
                },
                onEnterBack: () => {
                    if (this.destroyed) return;
                    this.onSectionEnter(index);
                }
            });
            this.scrollTriggers.push(st);

            // Reveal animations for elements
            const reveals = section.querySelectorAll('[data-reveal]');
            reveals.forEach((el, i) => {
                const anim = gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                        once: true
                    },
                    y: this.isMobile ? 30 : 50,
                    opacity: 0,
                    duration: this.isMobile ? 0.6 : 1,
                    delay: i * 0.1,
                    ease: 'power3.out'
                });
                this.animations.push(anim);
            });
        });

        // Stats counter
        const statElements = document.querySelectorAll('[data-count]');
        statElements.forEach(el => {
            const target = parseInt(el.dataset.count);
            if (isNaN(target)) return;

            const statST = ScrollTrigger.create({
                trigger: el,
                start: 'top 80%',
                onEnter: () => {
                    if (this.destroyed) return;
                    gsap.to(el, {
                        textContent: target,
                        duration: 2,
                        snap: { textContent: 1 },
                        ease: 'power2.out',
                        onUpdate: function() {
                            el.textContent = Math.ceil(this.targets()[0].textContent) + '+';
                        }
                    });
                },
                once: true
            });
            this.scrollTriggers.push(statST);
        });
    }

    onSectionEnter(index) {
        if (this.destroyed) return;
        this.currentSection = index;

        // Update navigation dots
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((ind, i) => {
            ind.classList.toggle('active', i === index);
        });

        // Update 3D text if available (with error handling)
        try {
            if (window.text3D && typeof window.text3D.morphToText === 'function') {
                const titles = [
                    'DENERF',
                    'ABOUT',
                    'SERVICES',
                    'PORTFOLIO',
                    'CONTACT'
                ];
                if (titles[index]) {
                    window.text3D.morphToText(titles[index]);
                }
            }
        } catch (e) {
            console.warn('3D text morph failed:', e.message);
        }
    }

    setupInteractions() {
        // Card hover effects (desktop only)
        if (!this.isMobile) {
            const hoverCards = document.querySelectorAll('[data-particle-hover]');
            hoverCards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    if (this.destroyed) return;
                    const rect = card.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                    const y = ((e.clientY - rect.top) / rect.height) * 100;

                    const glow = card.querySelector('.card-glow');
                    if (glow) {
                        glow.style.setProperty('--mouse-x', `${x}%`);
                        glow.style.setProperty('--mouse-y', `${y}%`);
                    }
                });
            });

            // 3D tilt effect
            const tiltCards = document.querySelectorAll('[data-tilt]');
            tiltCards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    if (this.destroyed) return;
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * 5;
                    const rotateY = ((x - centerX) / centerX) * -5;

                    gsap.to(card, {
                        rotateX: rotateX,
                        rotateY: rotateY,
                        duration: 0.3,
                        ease: 'power2.out',
                        overwrite: true
                    });
                });

                card.addEventListener('mouseleave', () => {
                    if (this.destroyed) return;
                    gsap.to(card, {
                        rotateX: 0,
                        rotateY: 0,
                        duration: 0.5,
                        ease: 'elastic.out(1, 0.5)',
                        overwrite: true
                    });
                });
            });
        }

        // Button effects
        const buttons = document.querySelectorAll('.btn-primary');
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (this.destroyed) return;
                // Ripple effect
                const ripple = document.createElement('span');
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 50%;
                    transform: scale(0);
                    pointer-events: none;
                `;
                btn.style.position = 'relative';
                btn.style.overflow = 'hidden';
                btn.appendChild(ripple);

                gsap.to(ripple, {
                    scale: 2,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    onComplete: () => ripple.remove()
                });
            });
        });
    }

    setupPortfolio() {
        this.currentProject = 0;
        const slides = document.querySelectorAll('.project-slide');

        if (!slides.length) return;

        // Show first project
        if (slides[0]) {
            slides[0].classList.add('active');
        }

        // Navigation buttons
        const nextBtn = document.querySelector('[data-portfolio-next]');
        const prevBtn = document.querySelector('[data-portfolio-prev]');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (this.destroyed) return;
                this.nextProject();
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (this.destroyed) return;
                this.prevProject();
            });
        }

        this.updateProjectCounter();
    }

    nextProject() {
        const slides = document.querySelectorAll('.project-slide');
        if (this.currentProject < slides.length - 1) {
            this.currentProject++;
            this.updateProject();
        }
    }

    prevProject() {
        if (this.currentProject > 0) {
            this.currentProject--;
            this.updateProject();
        }
    }

    updateProject() {
        if (this.destroyed) return;
        const slides = document.querySelectorAll('.project-slide');

        slides.forEach((slide, index) => {
            if (index === this.currentProject) {
                slide.classList.add('active');
                gsap.fromTo(slide,
                    { x: 100, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', overwrite: true }
                );
            } else {
                slide.classList.remove('active');
            }
        });

        this.updateProjectCounter();
    }

    updateProjectCounter() {
        const current = document.querySelector('.current');
        const total = document.querySelector('.total');
        const slides = document.querySelectorAll('.project-slide');

        if (current) {
            current.textContent = String(this.currentProject + 1).padStart(2, '0');
        }
        if (total) {
            total.textContent = String(slides.length).padStart(2, '0');
        }
    }

    setupForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (this.destroyed) return;

            const btn = form.querySelector('.btn-primary');
            const btnText = btn ? btn.querySelector('span') : null;

            if (!btn || !btnText) return;

            const originalText = btnText.textContent;

            // Disable and update button
            btn.disabled = true;
            btnText.textContent = 'Sending...';

            try {
                // Simulate send (replace with actual API call)
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Success
                btnText.textContent = 'Sent Successfully!';

                // Reset form after delay
                setTimeout(() => {
                    if (this.destroyed) return;
                    form.reset();
                    btnText.textContent = originalText;
                    btn.disabled = false;
                }, 2000);

            } catch (error) {
                btnText.textContent = 'Error. Try again.';
                btn.disabled = false;
                console.error('Form submit error:', error);
            }
        });

        // Input animations
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                if (this.destroyed) return;
                gsap.to(input, {
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out',
                    overwrite: true
                });
            });

            input.addEventListener('blur', () => {
                if (this.destroyed) return;
                gsap.to(input, {
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out',
                    overwrite: true
                });
            });
        });
    }

    setupNavigation() {
        const indicators = document.querySelectorAll('.indicator');
        const sections = document.querySelectorAll('.section');

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                if (this.destroyed) return;
                if (sections[index]) {
                    sections[index].scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    destroy() {
        console.log('Destroying Ocean Depth controller');
        this.destroyed = true;

        // Kill all ScrollTriggers
        this.scrollTriggers.forEach(st => {
            try {
                st.kill();
            } catch (e) {
                console.warn('Error killing ScrollTrigger:', e);
            }
        });

        // Kill all animations (including their scrollTriggers)
        this.animations.forEach(anim => {
            try {
                if (anim.scrollTrigger) {
                    anim.scrollTrigger.kill();
                }
                anim.kill();
            } catch (e) {
                console.warn('Error killing animation:', e);
            }
        });

        // Remove event listeners
        if (this.resizeHandler) {
            window.removeEventListener('resize', this.resizeHandler);
        }

        this.scrollTriggers = [];
        this.animations = [];
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.oceanDepth = new OceanDepthController();
    });
} else {
    window.oceanDepth = new OceanDepthController();
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.oceanDepth && window.oceanDepth.destroy) {
        window.oceanDepth.destroy();
    }
});
