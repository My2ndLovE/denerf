// MAIN CONTROLLER - Theme 1: Ocean Depth

// GSAP Setup
gsap.registerPlugin(ScrollTrigger);

// State
let currentSection = 0;
const sections = document.querySelectorAll('.section');
const indicators = document.querySelectorAll('.indicator');

// Section titles for 3D text morphing
const sectionTitles = [
    'AI-POWERED\nCREATION',
    'OUR STORY',
    'WHAT WE DO',
    'OUR WORK',
    "LET'S TALK"
];

// Init on load
window.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initInteractions();
    initPortfolioSlider();
    initForm();
    setupSectionIndicators();
});

// Scroll Animations
function initScrollAnimations() {
    // Scroll progress bar
    ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
            const progress = self.progress * 100;
            document.querySelector('.progress-bar').style.setProperty('--progress', progress + '%');
        }
    });

    // Section-based animations
    sections.forEach((section, index) => {
        ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => updateSection(index),
            onEnterBack: () => updateSection(index)
        });

        // Reveal animations
        const reveals = section.querySelectorAll('[data-reveal]');
        reveals.forEach((el, i) => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });
    });

    // Stats counter animation
    document.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count);
        ScrollTrigger.create({
            trigger: el,
            start: 'top 80%',
            onEnter: () => {
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
    });
}

// Update active section
function updateSection(index) {
    currentSection = index;

    // Update indicators
    indicators.forEach((ind, i) => {
        ind.classList.toggle('active', i === index);
    });

    // Morph 3D text if exists
    if (window.text3D && index > 0) {
        window.text3D.morphToText(sectionTitles[index]);
    }
}

// Setup section indicators
function setupSectionIndicators() {
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            scrollToSection(index);
        });
    });
}

// Scroll to section
function scrollToSection(index) {
    if (sections[index]) {
        sections[index].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Interactive elements
function initInteractions() {
    // Card hover glow effect
    document.querySelectorAll('[data-particle-hover]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.setProperty('--mouse-x', x + '%');
                glow.style.setProperty('--mouse-y', y + '%');
            }
        });
    });

    // 3D tilt effect for service cards
    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', (e) => {
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
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });

    // Button particle effects on hover
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (window.particleSystem) {
                const rect = btn.getBoundingClientRect();
                window.particleSystem.explode(
                    rect.left + rect.width / 2,
                    rect.top + rect.height / 2
                );
            }
        });
    });

    // Input focus animations
    document.querySelectorAll('[data-particle-input]').forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        input.addEventListener('blur', () => {
            gsap.to(input, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Portfolio slider
let currentProject = 0;
const projectSlides = document.querySelectorAll('.project-slide');

function initPortfolioSlider() {
    updateProjectCounter();
}

function nextProject() {
    if (currentProject < projectSlides.length - 1) {
        currentProject++;
        updateProject();
    }
}

function prevProject() {
    if (currentProject > 0) {
        currentProject--;
        updateProject();
    }
}

function updateProject() {
    projectSlides.forEach((slide, index) => {
        if (index === currentProject) {
            slide.classList.add('active');
            gsap.from(slide, {
                x: 100,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        } else {
            slide.classList.remove('active');
        }
    });

    updateProjectCounter();

    // Morph blob
    const activeMockup = projectSlides[currentProject].querySelector('[data-morph]');
    if (activeMockup && activeMockup.blobMorph) {
        activeMockup.blobMorph.morph();
    }
}

function updateProjectCounter() {
    const current = document.querySelector('.current');
    if (current) {
        current.textContent = String(currentProject + 1).padStart(2, '0');
    }
}

// Form handling
function initForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = form.querySelector('.btn-primary');
        const originalText = btn.querySelector('span').textContent;

        // Animate button
        btn.querySelector('span').textContent = 'Sending...';
        btn.disabled = true;

        // Simulate send
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Success animation
        btn.querySelector('span').textContent = '✓ Sent!';

        gsap.to(form, {
            scale: 0.95,
            opacity: 0.5,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
                form.reset();
                gsap.to(form, {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.out',
                    onComplete: () => {
                        btn.querySelector('span').textContent = originalText;
                        btn.disabled = false;
                    }
                });
            }
        });

        // Particle explosion
        if (window.particleSystem) {
            const rect = btn.getBoundingClientRect();
            window.particleSystem.explode(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            );
        }
    });
}

// Mouse trail effect (optional enhancement)
if (window.innerWidth > 1024) {
    let trailDots = [];
    const maxTrailDots = 20;

    document.addEventListener('mousemove', (e) => {
        if (trailDots.length >= maxTrailDots) {
            const oldDot = trailDots.shift();
            oldDot.remove();
        }

        const dot = document.createElement('div');
        dot.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            width: 4px;
            height: 4px;
            background: rgba(77, 184, 168, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
        `;

        document.body.appendChild(dot);
        trailDots.push(dot);

        gsap.to(dot, {
            scale: 0,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            onComplete: () => dot.remove()
        });
    });
}

console.log('🌊 Theme 1: Ocean Depth - Loaded with 3D effects!');
