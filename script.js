// ===================================
// SOFTWAVE DEV - INTERACTIVE FEATURES
// Making the web wave come alive
// ===================================

// ============ Custom Cursor ============
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor animation
function animateCursor() {
    // Cursor follows immediately
    cursorX += (mouseX - cursorX) * 0.5;
    cursorY += (mouseY - cursorY) * 0.5;

    // Follower lags behind
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

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

// ============ Particle System ============
const particlesContainer = document.getElementById('particles');
const particleCount = 50;

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
for (let i = 0; i < particleCount; i++) {
    createParticle();
}

// ============ Scroll Reveal Animation ============
const revealElements = document.querySelectorAll('.reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// ============ Counter Animation ============
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
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

// ============ Navbar Scroll Effect ============
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ============ 3D Card Tilt Effect ============
const cards3D = document.querySelectorAll('.card-3d');

cards3D.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// ============ Ripple Effect ============
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
        }, 600);
    });
});

// ============ Smooth Scroll ============
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

// ============ Parallax Effect on Hero Visual ============
const heroVisual = document.querySelector('.hero-visual');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// ============ Dynamic Gradient Animation ============
const animatedGradients = document.querySelectorAll('.animated-gradient');

animatedGradients.forEach(gradient => {
    let hue = 0;

    setInterval(() => {
        hue = (hue + 1) % 360;
        gradient.style.filter = `hue-rotate(${hue}deg)`;
    }, 50);
});

// ============ Service Card Hover Effect ============
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(124, 58, 237, 0.6), transparent)`;
        }
    });
});

// ============ Work Item Image Parallax ============
const workItems = document.querySelectorAll('.work-item');

workItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = (x / rect.width - 0.5) * 20;
        const yPercent = (y / rect.height - 0.5) * 20;

        const image = item.querySelector('.work-image');
        if (image) {
            image.style.transform = `scale(1.1) translate(${xPercent}px, ${yPercent}px)`;
        }
    });

    item.addEventListener('mouseleave', () => {
        const image = item.querySelector('.work-image');
        if (image) {
            image.style.transform = 'scale(1.1)';
        }
    });
});

// ============ Tech Item Pulse on Hover ============
const techItems = document.querySelectorAll('.tech-item');

techItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.boxShadow = '0 0 30px rgba(124, 58, 237, 0.5)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.boxShadow = 'none';
    });
});

// ============ Wave Background Mouse Interaction ============
const wavePaths = document.querySelectorAll('.wave-path');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    wavePaths.forEach((path, index) => {
        const speed = (index + 1) * 5;
        const offsetX = (x - 0.5) * speed;
        const offsetY = (y - 0.5) * speed;

        path.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
});

// ============ Loading Animation ============
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============ CTA Button Particle Explosion ============
const ctaButton = document.querySelector('.cta-content .primary-button');

if (ctaButton) {
    ctaButton.addEventListener('click', (e) => {
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
    });
}

// ============ Performance Optimization ============
// Debounce function for scroll events
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

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(() => {
    // Any expensive scroll operations can go here
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ============ Easter Egg: Konami Code ============
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join('') === konamiSequence.join('')) {
        // Activate party mode!
        document.body.style.animation = 'rainbow 2s infinite';

        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        // Create confetti
        for (let i = 0; i < 100; i++) {
            setTimeout(() => createConfetti(), i * 30);
        }
    }
});

function createConfetti() {
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
}

// ============ Console Message ============
console.log('%c🌊 Welcome to softwave dev!', 'font-size: 20px; font-weight: bold; color: #7c3aed;');
console.log('%cRiding the wave of innovation since 2025', 'font-size: 14px; color: #06b6d4;');
console.log('%cLike what you see? Let\'s create something amazing together!', 'font-size: 12px; color: #ec4899;');
console.log('%cPsst... try the Konami Code 😉', 'font-size: 10px; color: #666;');
