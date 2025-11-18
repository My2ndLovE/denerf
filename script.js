// ========================================
// CONFIGURATION
// ========================================

const CONFIG = {
    particles: {
        count: 100,
        maxDistance: 100,
        speed: 0.5
    },
    cursor: {
        smoothness: 0.3,
        followerSmooth: 0.1
    },
    animations: {
        statsThreshold: 0.5,
        aosTh

reshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    },
    throttle: {
        scroll: 100,
        resize: 250,
        mousemove: 16 // ~60fps
    }
};

// ========================================
// UTILITIES
// ========================================

/**
 * Proper throttle implementation - executes immediately and prevents calls for wait period
 */
function throttle(func, wait) {
    let inThrottle = false;
    let lastArgs = null;

    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;

            setTimeout(() => {
                inThrottle = false;
                if (lastArgs) {
                    executedFunction.apply(this, lastArgs);
                    lastArgs = null;
                }
            }, wait);
        } else {
            lastArgs = args;
        }
    };
}

/**
 * Debounce implementation
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

/**
 * Check if user prefers reduced motion
 */
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Sanitize text content to prevent XSS
 */
function sanitizeText(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Validate email address
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ========================================
// STATE MANAGEMENT
// ========================================

const state = {
    animationFrames: [],
    intervals: [],
    timeouts: [],
    observers: [],
    eventListeners: [],
    particles: [],
    statsAnimated: false
};

/**
 * Track animation frame for cleanup
 */
function trackAnimationFrame(id) {
    state.animationFrames.push(id);
    return id;
}

/**
 * Track interval for cleanup
 */
function trackInterval(id) {
    state.intervals.push(id);
    return id;
}

/**
 * Track timeout for cleanup
 */
function trackTimeout(id) {
    state.timeouts.push(id);
    return id;
}

/**
 * Add event listener with tracking
 */
function addTrackedListener(element, event, handler, options = {}) {
    element.addEventListener(event, handler, options);
    state.eventListeners.push({ element, event, handler, options });
}

/**
 * Cleanup all tracked resources
 */
function cleanup() {
    // Cancel animation frames
    state.animationFrames.forEach(id => cancelAnimationFrame(id));
    state.animationFrames = [];

    // Clear intervals
    state.intervals.forEach(id => clearInterval(id));
    state.intervals = [];

    // Clear timeouts
    state.timeouts.forEach(id => clearTimeout(id));
    state.timeouts = [];

    // Disconnect observers
    state.observers.forEach(observer => observer.disconnect());
    state.observers = [];

    // Remove event listeners
    state.eventListeners.forEach(({ element, event, handler, options }) => {
        element.removeEventListener(event, handler, options);
    });
    state.eventListeners = [];
}

// ========================================
// CUSTOM CURSOR
// ========================================

function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (!cursor || !cursorFollower) return;

    // Only init on devices with hover capability
    if (!window.matchMedia('(hover: hover)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    // Update mouse position
    const handleMouseMove = throttle((e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, CONFIG.throttle.mousemove);

    addTrackedListener(document, 'mousemove', handleMouseMove, { passive: true });

    // Animate cursor
    function animateCursor() {
        const distX = mouseX - cursorX;
        const distY = mouseY - cursorY;

        cursorX += distX * CONFIG.cursor.smoothness;
        cursorY += distY * CONFIG.cursor.smoothness;

        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;

        // Follower with delay
        const followerDistX = mouseX - followerX;
        const followerDistY = mouseY - followerY;

        followerX += followerDistX * CONFIG.cursor.followerSmooth;
        followerY += followerDistY * CONFIG.cursor.followerSmooth;

        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top = `${followerY}px`;

        trackAnimationFrame(requestAnimationFrame(animateCursor));
    }

    trackAnimationFrame(requestAnimationFrame(animateCursor));

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card, .skill-card');
    interactiveElements.forEach(el => {
        addTrackedListener(el, 'mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.3)';
        });

        addTrackedListener(el, 'mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// ========================================
// PARTICLE CANVAS ANIMATION
// ========================================

function initParticleCanvas() {
    if (prefersReducedMotion()) return;

    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }

    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * CONFIG.particles.speed;
            this.speedY = (Math.random() - 0.5) * CONFIG.particles.speed;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Wrap around screen
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = `rgba(0, 245, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        state.particles = [];
        for (let i = 0; i < CONFIG.particles.count; i++) {
            state.particles.push(new Particle());
        }
    }

    initParticles();

    function connectParticles() {
        const maxDistance = CONFIG.particles.maxDistance;
        for (let i = 0; i < state.particles.length; i++) {
            for (let j = i + 1; j < state.particles.length; j++) {
                const dx = state.particles[i].x - state.particles[j].x;
                const dy = state.particles[i].y - state.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const opacity = 0.1 * (1 - distance / maxDistance);
                    ctx.strokeStyle = `rgba(0, 245, 255, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(state.particles[i].x, state.particles[i].y);
                    ctx.lineTo(state.particles[j].x, state.particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        state.particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        connectParticles();
        trackAnimationFrame(requestAnimationFrame(animateParticles));
    }

    trackAnimationFrame(requestAnimationFrame(animateParticles));

    // Debounced resize handler
    const handleResize = debounce(resizeCanvas, CONFIG.throttle.resize);
    addTrackedListener(window, 'resize', handleResize);
}

// ========================================
// NAVIGATION
// ========================================

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    if (!navbar) return;

    // Scroll effect
    const handleScroll = throttle(() => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, CONFIG.throttle.scroll);

    addTrackedListener(window, 'scroll', handleScroll, { passive: true });

    // Mobile menu toggle
    if (menuToggle && navLinks) {
        addTrackedListener(menuToggle, 'click', () => {
            const isActive = menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive.toString());
        });

        // Close menu on link click
        navLinksItems.forEach(link => {
            addTrackedListener(link, 'click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');

    const updateActiveLink = throttle(() => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            const href = link.getAttribute('href');
            if (href && href.slice(1) === current) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }, CONFIG.throttle.scroll);

    addTrackedListener(window, 'scroll', updateActiveLink, { passive: true });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        addTrackedListener(anchor, 'click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === 'javascript:void(0)') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// SCROLL ANIMATIONS (AOS)
// ========================================

function initScrollAnimations() {
    if (prefersReducedMotion()) {
        // Immediately show all elements if user prefers reduced motion
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.classList.add('aos-animate');
        });
        return;
    }

    const observerOptions = {
        threshold: CONFIG.animations.aosThreshold,
        rootMargin: CONFIG.animations.rootMargin
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    state.observers.push(observer);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

// ========================================
// STATS COUNTER ANIMATION
// ========================================

function initStatsCounter() {
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;

    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    function animateStats() {
        if (state.statsAnimated) return;
        state.statsAnimated = true;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            if (isNaN(target)) return;

            const duration = prefersReducedMotion() ? 0 : 2000;
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                const current = Math.floor(progress * target);
                stat.textContent = current + '+';

                if (progress < 1) {
                    trackAnimationFrame(requestAnimationFrame(updateCounter));
                } else {
                    stat.textContent = target + '+';
                }
            }

            trackAnimationFrame(requestAnimationFrame(updateCounter));
        });
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
            }
        });
    }, { threshold: CONFIG.animations.statsThreshold });

    state.observers.push(statsObserver);
    statsObserver.observe(statsSection);
}

// ========================================
// PARALLAX EFFECTS
// ========================================

function initParallaxEffects() {
    if (prefersReducedMotion()) return;

    const floatingElements = document.querySelectorAll('.float-item');
    const heroContent = document.querySelector('.hero-content');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    // Mouse parallax for floating elements
    const handleMouseMove = throttle((e) => {
        const mouseXPercent = e.clientX / window.innerWidth;
        const mouseYPercent = e.clientY / window.innerHeight;

        floatingElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-speed')) || 1;
            const x = (mouseXPercent - 0.5) * 50 * speed;
            const y = (mouseYPercent - 0.5) * 50 * speed;

            // Use transform to avoid conflict with scroll parallax
            const currentTransform = el.style.transform || '';
            const scrollTransform = currentTransform.match(/translateY\([^)]+\)/);
            const baseTransform = scrollTransform ? scrollTransform[0] : '';

            el.style.transform = `translate(${x}px, ${y}px) ${baseTransform}`;
        });
    }, CONFIG.throttle.mousemove);

    addTrackedListener(document, 'mousemove', handleMouseMove, { passive: true });

    // Scroll parallax
    const handleScroll = throttle(() => {
        const scrolled = window.scrollY;

        // Hero parallax
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }

        // Hide scroll indicator
        if (scrollIndicator) {
            if (scrolled > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '0.6';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        }
    }, CONFIG.throttle.scroll);

    addTrackedListener(window, 'scroll', handleScroll, { passive: true });
}

// ========================================
// FORM VALIDATION & HANDLING
// ========================================

function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    const inputs = contactForm.querySelectorAll('input, textarea');

    // Real-time validation
    inputs.forEach(input => {
        addTrackedListener(input, 'blur', () => validateField(input));
        addTrackedListener(input, 'input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });

    // Form submission
    addTrackedListener(contactForm, 'submit', (e) => {
        e.preventDefault();

        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) return;

        // Get sanitized form data
        const formData = {
            name: sanitizeText(document.getElementById('name').value.trim()),
            email: document.getElementById('email').value.trim(),
            subject: sanitizeText(document.getElementById('subject').value.trim()),
            message: sanitizeText(document.getElementById('message').value.trim())
        };

        // In a real application, you would send this to a server
        // For now, just show a success message
        showFormSuccess();

        // Reset form
        contactForm.reset();

        // Remove error states
        inputs.forEach(input => {
            input.classList.remove('error');
            const errorSpan = input.parentElement.querySelector('.form-error');
            if (errorSpan) errorSpan.textContent = '';
        });
    });

    function validateField(field) {
        const errorSpan = field.parentElement.querySelector('.form-error');
        let error = '';

        if (!field.value.trim()) {
            error = 'This field is required';
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            error = 'Please enter a valid email address';
        } else if (field.minLength && field.value.length < field.minLength) {
            error = `Minimum ${field.minLength} characters required`;
        } else if (field.maxLength && field.value.length > field.maxLength) {
            error = `Maximum ${field.maxLength} characters allowed`;
        }

        if (error) {
            field.classList.add('error');
            if (errorSpan) errorSpan.textContent = error;
            return false;
        } else {
            field.classList.remove('error');
            if (errorSpan) errorSpan.textContent = '';
            return true;
        }
    }

    function showFormSuccess() {
        // Create success message
        const message = document.createElement('div');
        message.textContent = '✓ Thank you! Your message has been sent successfully.';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(39, 201, 63, 0.95);
            color: white;
            padding: 1.5rem 2rem;
            border-radius: 0.5rem;
            font-size: 1.1rem;
            font-weight: 600;
            z-index: 10000;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            animation: fadeInOut 3s forwards;
        `;

        // Add animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -60%); }
                10%, 90% { opacity: 1; transform: translate(-50%, -50%); }
                100% { opacity: 0; transform: translate(-50%, -40%); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(message);

        trackTimeout(setTimeout(() => {
            message.remove();
            style.remove();
        }, 3000));
    }
}

// ========================================
// GLITCH TEXT EFFECT
// ========================================

function initGlitchEffect() {
    if (prefersReducedMotion()) return;

    const glitchText = document.querySelector('.glitch-text');
    if (!glitchText) return;

    const intervalId = setInterval(() => {
        if (Math.random() > 0.95) {
            const shadows = [
                `${Math.random() * 5 - 2.5}px ${Math.random() * 5 - 2.5}px 0 rgba(0, 245, 255, 0.7)`,
                `${Math.random() * 5 - 2.5}px ${Math.random() * 5 - 2.5}px 0 rgba(178, 75, 243, 0.7)`
            ];
            glitchText.style.textShadow = shadows.join(', ');

            trackTimeout(setTimeout(() => {
                glitchText.style.textShadow = 'none';
            }, 50));
        }
    }, 100);

    trackInterval(intervalId);
}

// ========================================
// CODE WINDOW TYPING ANIMATION
// ========================================

function initCodeTyping() {
    if (prefersReducedMotion()) return;

    const codeWindow = document.querySelector('#code-content');
    if (!codeWindow) return;

    const originalHTML = codeWindow.innerHTML;
    let charIndex = 0;
    let isTyping = false;

    addTrackedListener(window, 'load', () => {
        trackTimeout(setTimeout(() => {
            codeWindow.textContent = '';
            isTyping = true;

            function typeCode() {
                if (!isTyping) return;

                if (charIndex < originalHTML.length) {
                    // Use textContent to safely add text, but we need to preserve HTML
                    // So we'll use innerHTML but limit to the original content
                    codeWindow.innerHTML = originalHTML.substring(0, charIndex + 1);
                    charIndex++;

                    const speed = Math.random() * 30 + 10;
                    trackTimeout(setTimeout(typeCode, speed));
                } else {
                    // Add blinking cursor
                    const cursor = document.createElement('span');
                    cursor.className = 'typing-cursor';
                    cursor.style.cssText = `
                        display: inline-block;
                        width: 2px;
                        height: 1em;
                        background: var(--accent-primary);
                        margin-left: 2px;
                        animation: blink 1s infinite;
                    `;
                    cursor.setAttribute('aria-hidden', 'true');

                    // Check if style already exists
                    if (!document.getElementById('blink-animation')) {
                        const style = document.createElement('style');
                        style.id = 'blink-animation';
                        style.textContent = `
                            @keyframes blink {
                                0%, 50% { opacity: 1; }
                                51%, 100% { opacity: 0; }
                            }
                        `;
                        document.head.appendChild(style);
                    }

                    codeWindow.appendChild(cursor);
                }
            }

            typeCode();
        }, 500));
    });
}

// ========================================
// CARD ANIMATIONS
// ========================================

function initCardAnimations() {
    if (prefersReducedMotion()) return;

    // Project cards tilt effect
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        addTrackedListener(card, 'mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        addTrackedListener(card, 'mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Service cards animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const icon = card.querySelector('.service-icon');

        addTrackedListener(card, 'mouseenter', () => {
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });

        addTrackedListener(card, 'mouseleave', () => {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Skill cards hover effect
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        const tags = card.querySelectorAll('.skill-tags span');

        addTrackedListener(card, 'mouseenter', () => {
            tags.forEach((tag, index) => {
                trackTimeout(setTimeout(() => {
                    tag.style.transform = 'translateY(-5px)';
                }, index * 50));
            });
        });

        addTrackedListener(card, 'mouseleave', () => {
            tags.forEach(tag => {
                tag.style.transform = 'translateY(0)';
            });
        });
    });
}

// ========================================
// EASTER EGG - KONAMI CODE
// ========================================

function initEasterEgg() {
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

    addTrackedListener(document, 'keydown', (e) => {
        konamiCode.push(e.key);
        konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);

        if (konamiCode.join('').includes(konamiSequence.join(''))) {
            activateEasterEgg();
            konamiCode = [];
        }
    });

    function activateEasterEgg() {
        if (document.getElementById('easter-egg-active')) return;

        // Create rainbow effect
        document.body.style.animation = 'rainbow 2s linear infinite';

        const style = document.createElement('style');
        style.id = 'easter-egg-style';
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
            @keyframes easterFadeOut {
                0% { opacity: 0; transform: translate(-50%, -60%) scale(0.8); }
                10%, 90% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -40%) scale(0.8); }
            }
        `;
        document.head.appendChild(style);

        // Show message
        const message = document.createElement('div');
        message.id = 'easter-egg-active';
        message.textContent = '🎉 You found the secret! 🎉';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            font-weight: bold;
            z-index: 10000;
            animation: easterFadeOut 3s forwards;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
        `;
        message.setAttribute('aria-live', 'polite');
        document.body.appendChild(message);

        trackTimeout(setTimeout(() => {
            document.body.style.animation = '';
            message.remove();
            style.remove();
        }, 3000));
    }
}

// ========================================
// UPDATE CURRENT YEAR
// ========================================

function updateCurrentYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// ========================================
// INITIALIZATION
// ========================================

function init() {
    // Update current year
    updateCurrentYear();

    // Initialize all features
    initCustomCursor();
    initParticleCanvas();
    initNavigation();
    initScrollAnimations();
    initStatsCounter();
    initParallaxEffects();
    initContactForm();
    initGlitchEffect();
    initCodeTyping();
    initCardAnimations();
    initEasterEgg();

    // Log welcome message
    console.log('%c💎 Welcome to my portfolio! 💎', 'font-size: 20px; font-weight: bold; color: #00f5ff;');
    console.log('%cLike what you see? Let\'s work together!', 'font-size: 14px; color: #b24bf3;');
    console.log('%c📧 hello@developer.com', 'font-size: 12px; color: #fff;');
}

// ========================================
// START APPLICATION
// ========================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Cleanup on page unload
addTrackedListener(window, 'beforeunload', cleanup);

// Handle visibility change to pause/resume animations
addTrackedListener(document, 'visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, could pause heavy animations here
        console.log('Page hidden - animations could be paused');
    } else {
        // Page is visible again
        console.log('Page visible - animations resumed');
    }
});
