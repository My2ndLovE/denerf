// ===================================
// SOFTWAVE DEV - INTERACTIVE FEATURES
// Making the web wave come alive
// ===================================

(function() {
    'use strict';

    // ============ Constants ============
    const CONSTANTS = {
        CURSOR_FOLLOW_SPEED: 0.5,
        CURSOR_LAG_SPEED: 0.15,
        PARTICLE_COUNT: 50,
        SCROLL_DEBOUNCE_MS: 100,
        MOUSEMOVE_THROTTLE_MS: 16, // ~60fps
        REVEAL_STAGGER_MS: 100,
        COUNTER_DURATION_MS: 2000,
        COUNTER_FPS: 60,
        RIPPLE_DURATION_MS: 600,
        PARALLAX_SPEED: 0.5,
        HUE_ROTATION_INTERVAL_MS: 50,
        CONFETTI_COUNT: 100,
        CONFETTI_DELAY_MS: 30,
    };

    // ============ Utility Functions ============

    function throttle(func, wait) {
        let lastTime = 0;
        return function executedFunction(...args) {
            const now = Date.now();
            if (now - lastTime >= wait) {
                lastTime = now;
                return func(...args);
            }
        };
    }

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

    function isTouchDevice() {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    }

    function supportsIntersectionObserver() {
        return 'IntersectionObserver' in window;
    }

    // ============ State Management ============
    const state = {
        cursorAnimationFrame: null,
        gradientIntervals: [],
        isTabVisible: true,
        observers: [],
        cursorAnimator: null, // Store cursor animation function
    };

    // ============ Page Visibility API ============
    function handleVisibilityChange() {
        state.isTabVisible = !document.hidden;

        // Pause/resume animations when tab visibility changes
        if (!state.isTabVisible) {
            // Pause cursor animation
            if (state.cursorAnimationFrame) {
                cancelAnimationFrame(state.cursorAnimationFrame);
                state.cursorAnimationFrame = null;
            }
        } else if (!isTouchDevice() && !state.cursorAnimationFrame && state.cursorAnimator) {
            // Resume cursor animation using stored function
            state.cursorAnimationFrame = requestAnimationFrame(state.cursorAnimator);
        }
    }

    // ============ Custom Cursor ============
    function initCustomCursor() {
        // Skip on touch devices
        if (isTouchDevice()) {
            return;
        }

        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');

        // Check if elements exist
        if (!cursor || !cursorFollower) {
            console.warn('Cursor elements not found');
            return;
        }

        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let followerX = 0;
        let followerY = 0;

        // Track mouse position
        const handleMouseMove = throttle((e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, CONSTANTS.MOUSEMOVE_THROTTLE_MS);

        document.addEventListener('mousemove', handleMouseMove, { passive: true });

        // Smooth cursor animation
        function animateCursor() {
            if (!state.isTabVisible) {
                state.cursorAnimationFrame = null;
                return;
            }

            // Cursor follows immediately
            cursorX += (mouseX - cursorX) * CONSTANTS.CURSOR_FOLLOW_SPEED;
            cursorY += (mouseY - cursorY) * CONSTANTS.CURSOR_FOLLOW_SPEED;

            // Follower lags behind
            followerX += (mouseX - followerX) * CONSTANTS.CURSOR_LAG_SPEED;
            followerY += (mouseY - followerY) * CONSTANTS.CURSOR_LAG_SPEED;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';

            state.cursorAnimationFrame = requestAnimationFrame(animateCursor);
        }

        // Store the animator in state for resume capability
        state.cursorAnimator = animateCursor;

        // Start animation
        if (!state.cursorAnimationFrame) {
            state.cursorAnimationFrame = requestAnimationFrame(animateCursor);
        }

        // Cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .card-3d');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(3)';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(2)';
            });
        });
    }

    // ============ Particle System ============
    function initParticleSystem() {
        const particlesContainer = document.getElementById('particles');

        if (!particlesContainer) {
            console.warn('Particles container not found');
            return;
        }

        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const size = Math.random() * 4 + 2;
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            const duration = Math.random() * 20 + 15;
            const delay = Math.random() * 5;

            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            particle.style.animationDuration = duration + 's';
            particle.style.animationDelay = delay + 's';

            // Random colors
            const colors = [
                'rgba(124, 58, 237, 0.8)',
                'rgba(6, 182, 212, 0.8)',
                'rgba(236, 72, 153, 0.8)',
                'rgba(59, 130, 246, 0.8)'
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = `radial-gradient(circle, ${color}, transparent)`;

            particlesContainer.appendChild(particle);
        }

        // Create initial particles
        for (let i = 0; i < CONSTANTS.PARTICLE_COUNT; i++) {
            createParticle();
        }
    }

    // ============ Scroll Reveal Animation ============
    function initScrollReveal() {
        if (!supportsIntersectionObserver()) {
            // Fallback: just show all elements immediately
            const revealElements = document.querySelectorAll('.reveal-up');
            revealElements.forEach(el => el.classList.add('revealed'));
            return;
        }

        const revealElements = document.querySelectorAll('.reveal-up');
        const elementsArray = Array.from(revealElements);

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Get the actual index of the element in the original array
                    const elementIndex = elementsArray.indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, elementIndex * CONSTANTS.REVEAL_STAGGER_MS);
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        elementsArray.forEach(el => {
            revealObserver.observe(el);
        });

        state.observers.push(revealObserver);
    }

    // ============ Counter Animation ============
    function initCounterAnimations() {
        if (!supportsIntersectionObserver()) {
            return;
        }

        const statNumbers = document.querySelectorAll('.stat-number');

        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-target'), 10);
            if (isNaN(target)) return;

            const duration = CONSTANTS.COUNTER_DURATION_MS;
            const increment = target / (duration / (1000 / CONSTANTS.COUNTER_FPS));
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    element.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            };

            updateCounter();
        }

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });

        state.observers.push(statsObserver);
    }

    // ============ Consolidated Scroll Handler ============
    function initScrollEffects() {
        const navbar = document.querySelector('.navbar');
        const heroVisual = document.querySelector('.hero-visual');

        if (!navbar) {
            console.warn('Navbar not found');
        }

        const handleScroll = () => {
            const currentScroll = window.pageYOffset;

            // Navbar scroll effect
            if (navbar) {
                if (currentScroll > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }

            // Hero parallax effect
            if (heroVisual && currentScroll < window.innerHeight) {
                heroVisual.style.transform = `translateY(${currentScroll * CONSTANTS.PARALLAX_SPEED}px)`;
            }
        };

        const debouncedScroll = debounce(handleScroll, CONSTANTS.SCROLL_DEBOUNCE_MS);
        window.addEventListener('scroll', debouncedScroll, { passive: true });

        // Initial call
        handleScroll();
    }

    // ============ 3D Card Tilt Effect ============
    function init3DCardTilt() {
        const cards3D = document.querySelectorAll('.card-3d');

        const handleMouseMove = throttle((card, e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        }, CONSTANTS.MOUSEMOVE_THROTTLE_MS);

        cards3D.forEach(card => {
            card.addEventListener('mousemove', (e) => handleMouseMove(card, e), { passive: true });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    // ============ Ripple Effect ============
    function initRippleEffect() {
        const rippleButtons = document.querySelectorAll('.ripple-effect');

        rippleButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';

                this.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, CONSTANTS.RIPPLE_DURATION_MS);
            });
        });
    }

    // ============ Smooth Scroll ============
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;

                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============ Gradient Animation (CSS-based, no setInterval) ============
    // NOTE: Gradient animation is now handled entirely in CSS via @keyframes
    // Removed the setInterval memory leak from original code

    // ============ Service Card & Work Item Hover Effects ============
    function initHoverEffects() {
        // Service Card Glow
        const serviceCards = document.querySelectorAll('.service-card');
        const handleServiceCardMove = throttle((card, e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(124, 58, 237, 0.6), transparent)`;
            }
        }, CONSTANTS.MOUSEMOVE_THROTTLE_MS);

        serviceCards.forEach(card => {
            card.addEventListener('mousemove', (e) => handleServiceCardMove(card, e), { passive: true });
        });

        // Work Item Parallax
        const workItems = document.querySelectorAll('.work-item');
        const handleWorkItemMove = throttle((item, e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xPercent = (x / rect.width - 0.5) * 20;
            const yPercent = (y / rect.height - 0.5) * 20;

            const image = item.querySelector('.work-image');
            if (image) {
                image.style.transform = `scale(1.1) translate(${xPercent}px, ${yPercent}px)`;
            }
        }, CONSTANTS.MOUSEMOVE_THROTTLE_MS);

        workItems.forEach(item => {
            item.addEventListener('mousemove', (e) => handleWorkItemMove(item, e), { passive: true });

            item.addEventListener('mouseleave', () => {
                const image = item.querySelector('.work-image');
                if (image) {
                    image.style.transform = 'scale(1.1)';
                }
            });
        });

        // Tech Item Pulse
        const techItems = document.querySelectorAll('.tech-item');
        techItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.boxShadow = '0 0 30px rgba(124, 58, 237, 0.5)';
            });

            item.addEventListener('mouseleave', () => {
                item.style.boxShadow = 'none';
            });
        });
    }

    // ============ Wave Background Mouse Interaction ============
    function initWaveInteraction() {
        const wavePaths = document.querySelectorAll('.wave-path');

        if (wavePaths.length === 0) return;

        const handleMouseMove = throttle((e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;

            wavePaths.forEach((path, index) => {
                const speed = (index + 1) * 5;
                const offsetX = (x - 0.5) * speed;
                const offsetY = (y - 0.5) * speed;

                path.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
        }, CONSTANTS.MOUSEMOVE_THROTTLE_MS);

        document.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // ============ CTA Button Particle Explosion ============
    function initCTAParticleExplosion() {
        const ctaButton = document.querySelector('.cta-content .primary-button');

        if (!ctaButton) return;

        ctaButton.addEventListener('click', (e) => {
            try {
                const rect = ctaButton.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                for (let i = 0; i < 20; i++) {
                    const particle = document.createElement('div');
                    particle.style.position = 'fixed';
                    particle.style.left = centerX + 'px';
                    particle.style.top = centerY + 'px';
                    particle.style.width = '6px';
                    particle.style.height = '6px';
                    particle.style.borderRadius = '50%';
                    particle.style.background = 'var(--color-cyan)';
                    particle.style.pointerEvents = 'none';
                    particle.style.zIndex = '10000';

                    document.body.appendChild(particle);

                    const angle = (Math.PI * 2 * i) / 20;
                    const velocity = 5 + Math.random() * 5;
                    const vx = Math.cos(angle) * velocity;
                    const vy = Math.sin(angle) * velocity;

                    let x = 0;
                    let y = 0;
                    let opacity = 1;

                    const animate = () => {
                        x += vx;
                        y += vy;
                        opacity -= 0.02;

                        particle.style.transform = `translate(${x}px, ${y}px)`;
                        particle.style.opacity = opacity;

                        if (opacity > 0) {
                            requestAnimationFrame(animate);
                        } else {
                            particle.remove();
                        }
                    };

                    animate();
                }
            } catch (error) {
                console.error('Error creating particle explosion:', error);
            }
        });
    }

    // ============ Easter Egg: Konami Code ============
    function initKonamiCode() {
        let konamiCode = [];
        const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.key);
            konamiCode = konamiCode.slice(-10);

            if (konamiCode.join('') === konamiSequence.join('')) {
                activatePartyMode();
            }
        });
    }

    function activatePartyMode() {
        try {
            // Add CSS class instead of dynamically creating styles
            document.body.classList.add('party-mode');

            // Create confetti
            for (let i = 0; i < CONSTANTS.CONFETTI_COUNT; i++) {
                setTimeout(() => createConfetti(), i * CONSTANTS.CONFETTI_DELAY_MS);
            }

            // Add party mode styles if they don't exist
            if (!document.getElementById('party-mode-styles')) {
                const style = document.createElement('style');
                style.id = 'party-mode-styles';
                style.textContent = `
                    .party-mode {
                        animation: rainbow 2s infinite !important;
                    }
                    @keyframes rainbow {
                        0% { filter: hue-rotate(0deg); }
                        100% { filter: hue-rotate(360deg); }
                    }
                `;
                document.head.appendChild(style);
            }
        } catch (error) {
            console.error('Error activating party mode:', error);
        }
    }

    function createConfetti() {
        try {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-20px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '10000';

            document.body.appendChild(confetti);

            let y = -20;
            let rotation = 0;
            const fallSpeed = 2 + Math.random() * 3;
            const rotationSpeed = Math.random() * 10 - 5;

            const fall = () => {
                y += fallSpeed;
                rotation += rotationSpeed;
                confetti.style.transform = `translateY(${y}px) rotate(${rotation}deg)`;

                if (y < window.innerHeight) {
                    requestAnimationFrame(fall);
                } else {
                    confetti.remove();
                }
            };

            fall();
        } catch (error) {
            console.error('Error creating confetti:', error);
        }
    }

    // ============ Console Message ============
    function initConsoleMessage() {
        try {
            console.log('%c🌊 Welcome to softwave dev!', 'font-size: 20px; font-weight: bold; color: #7c3aed;');
            console.log('%cRiding the wave of innovation since 2025', 'font-size: 14px; color: #06b6d4;');
            console.log('%cLike what you see? Let\'s create something amazing together!', 'font-size: 12px; color: #ec4899;');
            console.log('%cPsst... try the Konami Code 😉', 'font-size: 10px; color: #666;');
        } catch (error) {
            // Silently fail if console is blocked
        }
    }

    // ============ Error Handling Wrapper ============
    function safeInit(fn, name) {
        try {
            fn();
        } catch (error) {
            console.error(`Error initializing ${name}:`, error);
        }
    }

    // ============ Cleanup Function ============
    function cleanup() {
        // Cancel cursor animation
        if (state.cursorAnimationFrame) {
            cancelAnimationFrame(state.cursorAnimationFrame);
        }

        // Clear all gradient intervals
        state.gradientIntervals.forEach(interval => clearInterval(interval));
        state.gradientIntervals = [];

        // Disconnect all observers
        state.observers.forEach(observer => observer.disconnect());
        state.observers = [];
    }

    // ============ Initialization ============
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        // Initialize Page Visibility API
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Initialize all features with error handling
        safeInit(initCustomCursor, 'Custom Cursor');
        safeInit(initParticleSystem, 'Particle System');
        safeInit(initScrollReveal, 'Scroll Reveal');
        safeInit(initCounterAnimations, 'Counter Animations');
        safeInit(initScrollEffects, 'Scroll Effects');
        safeInit(init3DCardTilt, 'Card 3D Tilt');
        safeInit(initRippleEffect, 'Ripple Effect');
        safeInit(initSmoothScroll, 'Smooth Scroll');
        safeInit(initHoverEffects, 'Hover Effects');
        safeInit(initWaveInteraction, 'Wave Interaction');
        safeInit(initCTAParticleExplosion, 'CTA Particle Explosion');
        safeInit(initKonamiCode, 'Konami Code');
        safeInit(initConsoleMessage, 'Console Message');

        // Cleanup on page unload
        window.addEventListener('beforeunload', cleanup);
    }

    // Start initialization
    init();

})();
