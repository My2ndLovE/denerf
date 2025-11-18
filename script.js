// ========================================
// CUSTOM CURSOR
// ========================================

const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

// Update mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animate cursor
function animateCursor() {
    // Smooth cursor movement
    const distX = mouseX - cursorX;
    const distY = mouseY - cursorY;

    cursorX += distX * 0.3;
    cursorY += distY * 0.3;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    // Follower with delay
    const followerDistX = mouseX - followerX;
    const followerDistY = mouseY - followerY;

    followerX += followerDistX * 0.1;
    followerY += followerDistY * 0.1;

    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effects
const interactiveElements = document.querySelectorAll('a, button, .project-card, .service-card, .skill-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.3)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// ========================================
// PARTICLE CANVAS ANIMATION
// ========================================

const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
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

const particles = [];
const particleCount = 100;

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = `rgba(0, 245, 255, ${0.1 * (1 - distance / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    connectParticles();
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Resize canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ========================================
// NAVIGATION
// ========================================

const navbar = document.querySelector('.navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

// Scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu on link click
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// SCROLL ANIMATIONS (AOS - Animate On Scroll)
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// ========================================
// STATS COUNTER ANIMATION
// ========================================

const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            animateStats();
        }
    });
}, { threshold: 0.5 });

if (document.querySelector('.stats')) {
    statsObserver.observe(document.querySelector('.stats'));
}

function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;

            if (current < target) {
                stat.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target + '+';
            }
        };

        updateCounter();
    });
}

// ========================================
// FLOATING ELEMENTS PARALLAX
// ========================================

const floatingElements = document.querySelectorAll('.float-item');

document.addEventListener('mousemove', (e) => {
    const mouseXPercent = e.clientX / window.innerWidth;
    const mouseYPercent = e.clientY / window.innerHeight;

    floatingElements.forEach(el => {
        const speed = el.getAttribute('data-speed') || 1;
        const x = (mouseXPercent - 0.5) * 50 * speed;
        const y = (mouseYPercent - 0.5) * 50 * speed;

        el.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ========================================
// PARALLAX SCROLL EFFECT
// ========================================

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    // Hero parallax
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    // Floating elements parallax
    floatingElements.forEach(el => {
        const speed = el.getAttribute('data-speed') || 1;
        el.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
    });
});

// ========================================
// FORM HANDLING
// ========================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        console.log('Form submitted:', formData);

        // Show success message (you can customize this)
        alert('Thank you for your message! I\'ll get back to you soon.');

        // Reset form
        contactForm.reset();

        // Remove focus from inputs to reset labels
        document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
            input.blur();
        });
    });
}

// ========================================
// GLITCH TEXT EFFECT
// ========================================

const glitchText = document.querySelector('.glitch-text');

if (glitchText) {
    setInterval(() => {
        if (Math.random() > 0.95) {
            glitchText.style.textShadow = `
                ${Math.random() * 5 - 2.5}px ${Math.random() * 5 - 2.5}px 0 rgba(0, 245, 255, 0.7),
                ${Math.random() * 5 - 2.5}px ${Math.random() * 5 - 2.5}px 0 rgba(178, 75, 243, 0.7)
            `;

            setTimeout(() => {
                glitchText.style.textShadow = 'none';
            }, 50);
        }
    }, 100);
}

// ========================================
// CODE WINDOW TYPING ANIMATION
// ========================================

const codeWindow = document.querySelector('.window-content code');

if (codeWindow) {
    const codeText = codeWindow.innerHTML;
    let charIndex = 0;

    // Wait for page load then animate
    window.addEventListener('load', () => {
        setTimeout(() => {
            codeWindow.innerHTML = '';

            function typeCode() {
                if (charIndex < codeText.length) {
                    codeWindow.innerHTML += codeText.charAt(charIndex);
                    charIndex++;

                    // Random typing speed
                    const speed = Math.random() * 30 + 10;
                    setTimeout(typeCode, speed);
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
                    codeWindow.appendChild(cursor);

                    // Add blink animation
                    const style = document.createElement('style');
                    style.textContent = `
                        @keyframes blink {
                            0%, 50% { opacity: 1; }
                            51%, 100% { opacity: 0; }
                        }
                    `;
                    document.head.appendChild(style);
                }
            }

            typeCode();
        }, 500);
    });
}

// ========================================
// PROJECT CARDS TILT EFFECT
// ========================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ========================================
// SERVICE CARDS ANIMATION
// ========================================

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'all 0.3s ease';
        }
    });

    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// ========================================
// SKILL CARDS HOVER EFFECT
// ========================================

const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const tags = card.querySelectorAll('.skill-tags span');
        tags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.transform = 'translateY(-5px)';
                tag.style.transition = 'all 0.3s ease';
            }, index * 50);
        });
    });

    card.addEventListener('mouseleave', () => {
        const tags = card.querySelectorAll('.skill-tags span');
        tags.forEach(tag => {
            tag.style.transform = 'translateY(0)';
        });
    });
});

// ========================================
// HIDE SCROLL INDICATOR ON SCROLL
// ========================================

const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '0.6';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}

// ========================================
// PRELOAD ANIMATIONS
// ========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('[data-aos]').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('aos-animate');
            }
        });
    }, 100);
});

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Throttle function for scroll events
function throttle(func, wait) {
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

// Debounce function for resize events
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

// Apply throttle to scroll events
const throttledScroll = throttle(() => {
    // Scroll-dependent animations
}, 100);

window.addEventListener('scroll', throttledScroll);

// Apply debounce to resize events
const debouncedResize = debounce(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}, 250);

window.addEventListener('resize', debouncedResize);

// ========================================
// EASTER EGG - KONAMI CODE
// ========================================

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);

    if (konamiCode.join('').includes(konamiSequence.join(''))) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Create rainbow effect
    document.body.style.animation = 'rainbow 2s linear infinite';

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Show message
    const message = document.createElement('div');
    message.textContent = '🎉 You found the secret! 🎉';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        font-weight: bold;
        z-index: 10000;
        animation: fadeOut 3s forwards;
    `;
    document.body.appendChild(message);

    setTimeout(() => {
        document.body.style.animation = '';
        message.remove();
        style.remove();
    }, 3000);
}

console.log('%c💎 Welcome to my portfolio! 💎', 'font-size: 20px; font-weight: bold; color: #00f5ff;');
console.log('%cLike what you see? Let\'s work together!', 'font-size: 14px; color: #b24bf3;');
console.log('%c📧 hello@developer.com', 'font-size: 12px; color: #fff;');
