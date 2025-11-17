/* ================================================
   LAYERED-TYPOGRAPHY.JS - Theme 1: Ocean Depth
   Kinetic typography with layered depth shift
   ================================================ */

// Section titles for transformation
const sectionTitles = {
    hero: 'AI-POWERED CREATION',
    about: 'OUR STORY',
    services: 'WHAT WE DO',
    portfolio: 'OUR WORK',
    contact: "LET'S TALK"
};

let currentSection = 'hero';
let isTransitioning = false;

export function initLayeredTypography() {
    const header = document.querySelector('.kinetic-header');
    const layers = document.querySelectorAll('.layer');

    if (!header || !layers.length) {
        console.warn('Kinetic header elements not found');
        return;
    }

    // Set initial text
    layers.forEach(layer => {
        layer.textContent = sectionTitles.hero;
    });

    // Initialize parallax on scroll
    initHeaderParallax(layers);

    // Setup section-based transitions
    setupSectionTriggers();

    console.log('✅ Layered typography initialized');
}

// ================================================
// Header Parallax Effect
// ================================================

function initHeaderParallax(layers) {
    gsap.to(layers[0], {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
        },
        y: 100,
        ease: 'none',
    });

    gsap.to(layers[1], {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
        },
        y: 50,
        ease: 'none',
    });

    gsap.to(layers[2], {
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
        },
        y: 25,
        ease: 'none',
    });
}

// ================================================
// Section-Based Title Transitions
// ================================================

function setupSectionTriggers() {
    const sections = document.querySelectorAll('.section');

    sections.forEach((section) => {
        const sectionId = section.id;
        if (!sectionId || !sectionTitles[sectionId]) return;

        ScrollTrigger.create({
            trigger: section,
            start: 'top 50%',
            end: 'bottom 50%',
            onEnter: () => transitionToSection(sectionId),
            onEnterBack: () => transitionToSection(sectionId),
        });
    });
}

// ================================================
// Title Transition Animation
// ================================================

function transitionToSection(sectionId) {
    if (sectionId === currentSection || isTransitioning) return;

    isTransitioning = true;
    const newTitle = sectionTitles[sectionId];
    const layers = document.querySelectorAll('.layer');

    console.log(`Transitioning: ${currentSection} → ${sectionId}`);

    // Create transition timeline
    const tl = gsap.timeline({
        onComplete: () => {
            currentSection = sectionId;
            isTransitioning = false;
        }
    });

    // Phase 1: Separate layers (depth shift)
    tl.to(layers[0], {
        y: -80,
        x: -40,
        rotateZ: -5,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in',
    }, 0);

    tl.to(layers[1], {
        y: -60,
        x: 0,
        rotateZ: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in',
    }, 0.1);

    tl.to(layers[2], {
        y: -40,
        x: 40,
        rotateZ: 5,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in',
    }, 0.2);

    // Phase 2: Change text (midpoint)
    tl.call(() => {
        layers.forEach(layer => {
            layer.textContent = newTitle;
        });
    }, null, 0.6);

    // Phase 3: Converge layers (reform)
    tl.fromTo(layers[0],
        { y: 80, x: 40, rotateZ: 5, opacity: 0 },
        {
            y: 0,
            x: 0,
            rotateZ: 0,
            opacity: 0.2, // Back layer opacity
            duration: 0.8,
            ease: 'power3.out',
        }, 0.8
    );

    tl.fromTo(layers[1],
        { y: 60, x: 0, rotateZ: 0, opacity: 0 },
        {
            y: 0,
            x: 0,
            rotateZ: 0,
            opacity: 0.5, // Mid layer opacity
            duration: 0.8,
            ease: 'power3.out',
        }, 0.9
    );

    tl.fromTo(layers[2],
        { y: 40, x: -40, rotateZ: -5, opacity: 0 },
        {
            y: 0,
            x: 0,
            rotateZ: 0,
            opacity: 1, // Front layer full opacity
            duration: 0.8,
            ease: 'power3.out',
        }, 1.0
    );

    // Add subtle float animation at the end
    tl.to(layers, {
        y: '+=5',
        duration: 1.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
    }, 1.8);
}

// ================================================
// Advanced Letter-by-Letter Animation (Alternative)
// ================================================

export function letterMorphTransition(fromText, toText, layers) {
    // Split text into individual letters
    const splitFrom = fromText.split('');
    const splitTo = toText.split('');

    const maxLength = Math.max(splitFrom.length, splitTo.length);

    layers.forEach((layer, layerIndex) => {
        layer.innerHTML = ''; // Clear current text

        // Create letter elements
        for (let i = 0; i < maxLength; i++) {
            const letter = document.createElement('span');
            letter.className = 'letter';
            letter.textContent = splitFrom[i] || ' ';
            letter.style.display = 'inline-block';
            layer.appendChild(letter);
        }

        // Animate each letter
        const letters = layer.querySelectorAll('.letter');
        letters.forEach((letter, i) => {
            const targetLetter = splitTo[i] || ' ';

            gsap.timeline()
                .to(letter, {
                    y: -50,
                    rotateX: 90,
                    opacity: 0,
                    duration: 0.4,
                    delay: i * 0.03 + layerIndex * 0.1,
                    ease: 'power2.in',
                })
                .call(() => {
                    letter.textContent = targetLetter;
                })
                .to(letter, {
                    y: 0,
                    rotateX: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.out',
                });
        });
    });
}

// ================================================
// Mouse Parallax Effect
// ================================================

export function initMouseParallax() {
    const header = document.querySelector('.kinetic-header');
    const layers = document.querySelectorAll('.layer');

    if (!header) return;

    let mouseX = 0;
    let mouseY = 0;

    header.addEventListener('mousemove', (e) => {
        const rect = header.getBoundingClientRect();
        mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width;
        mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height;

        layers.forEach((layer, index) => {
            const speed = (index + 1) * 10;
            gsap.to(layer, {
                x: mouseX * speed,
                y: mouseY * speed,
                duration: 0.5,
                ease: 'power2.out',
            });
        });
    });

    header.addEventListener('mouseleave', () => {
        layers.forEach((layer) => {
            gsap.to(layer, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.5)',
            });
        });
    });
}

// Initialize mouse parallax if not on mobile
if (window.innerWidth > 1024) {
    setTimeout(() => {
        initMouseParallax();
    }, 1000);
}

// ================================================
// Glitch Effect (Optional Special Effect)
// ================================================

export function applyGlitchEffect(layer, duration = 0.5) {
    const glitchTimeline = gsap.timeline();

    glitchTimeline
        .to(layer, {
            x: -5,
            duration: 0.05,
            repeat: 3,
            yoyo: true,
        })
        .to(layer, {
            x: 5,
            duration: 0.05,
            repeat: 3,
            yoyo: true,
        })
        .to(layer, {
            x: 0,
            duration: 0.1,
        });

    return glitchTimeline;
}

// ================================================
// Wave Distortion Effect (Advanced)
// ================================================

export function applyWaveEffect(text, layers) {
    layers.forEach((layer, layerIndex) => {
        layer.innerHTML = '';

        // Split into letters
        text.split('').forEach((char, i) => {
            const letter = document.createElement('span');
            letter.className = 'letter';
            letter.textContent = char;
            letter.style.display = 'inline-block';
            layer.appendChild(letter);

            // Wave animation
            gsap.to(letter, {
                y: -20,
                duration: 0.5,
                delay: i * 0.05 + layerIndex * 0.1,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
            });
        });
    });
}
