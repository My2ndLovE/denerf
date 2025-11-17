/* ================================================
   LIQUID-SWIPE.JS - Theme 1: Ocean Depth
   Liquid/blob morphing transitions for portfolio
   ================================================ */

export function initLiquidSwipe() {
    const portfolioSection = document.querySelector('.section-portfolio');

    if (!portfolioSection) {
        console.warn('Portfolio section not found');
        return;
    }

    // Add liquid transition elements
    createLiquidOverlay();

    // Initialize swipe gestures for touch devices
    if ('ontouchstart' in window) {
        initTouchSwipe();
    }

    console.log('✅ Liquid swipe initialized');
}

// ================================================
// Create Liquid Overlay Element
// ================================================

function createLiquidOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'liquid-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 999;
        overflow: hidden;
    `;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.cssText = 'display: block;';

    // Create morphing blob path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('id', 'liquidPath');
    path.setAttribute('fill', 'url(#liquidGradient)');

    // Define gradient
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'liquidGradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '100%');

    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#134e5e');

    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#71b280');

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
    svg.appendChild(path);
    overlay.appendChild(svg);

    document.body.appendChild(overlay);

    window.liquidOverlay = {
        element: overlay,
        path: path,
        show: showLiquidTransition,
        hide: hideLiquidTransition
    };
}

// ================================================
// Liquid Transition Animations
// ================================================

function showLiquidTransition(direction = 'left', callback) {
    const path = document.getElementById('liquidPath');
    const overlay = document.querySelector('.liquid-overlay');

    if (!path || !overlay) return;

    overlay.style.pointerEvents = 'all';

    const width = window.innerWidth;
    const height = window.innerHeight;

    let pathData;

    if (direction === 'left') {
        // Swipe from left to right
        pathData = [
            `M ${-width} 0`,
            `Q ${-width/2} ${height/2}, ${-width} ${height}`,
            `L ${-width} ${height}`,
            `L ${-width} 0`,
            'Z'
        ].join(' ');
    } else {
        // Swipe from right to left
        pathData = [
            `M ${width*2} 0`,
            `Q ${width*1.5} ${height/2}, ${width*2} ${height}`,
            `L ${width*2} ${height}`,
            `L ${width*2} 0`,
            'Z'
        ].join(' ');
    }

    path.setAttribute('d', pathData);

    // Animate the blob sweeping across screen
    const timeline = gsap.timeline({
        onComplete: () => {
            if (callback) callback();
        }
    });

    if (direction === 'left') {
        timeline
            .to(path, {
                attr: {
                    d: [
                        `M 0 0`,
                        `Q ${width/2} ${height/2}, 0 ${height}`,
                        `L 0 ${height}`,
                        `L 0 0`,
                        'Z'
                    ].join(' ')
                },
                duration: 0.001,
                ease: 'none',
            })
            .to(path, {
                attr: {
                    d: [
                        `M 0 0`,
                        `Q ${width*0.8} ${height/2}, 0 ${height}`,
                        `L ${width} ${height}`,
                        `L ${width} 0`,
                        'Z'
                    ].join(' ')
                },
                duration: 0.8,
                ease: 'power2.inOut',
            })
            .to(path, {
                attr: {
                    d: [
                        `M ${width} 0`,
                        `Q ${width*1.2} ${height/2}, ${width} ${height}`,
                        `L ${width} ${height}`,
                        `L ${width} 0`,
                        'Z'
                    ].join(' ')
                },
                duration: 0.6,
                ease: 'power2.in',
            });
    } else {
        timeline
            .to(path, {
                attr: {
                    d: [
                        `M ${width} 0`,
                        `Q ${width/2} ${height/2}, ${width} ${height}`,
                        `L ${width} ${height}`,
                        `L ${width} 0`,
                        'Z'
                    ].join(' ')
                },
                duration: 0.001,
                ease: 'none',
            })
            .to(path, {
                attr: {
                    d: [
                        `M ${width} 0`,
                        `Q ${width*0.2} ${height/2}, ${width} ${height}`,
                        `L 0 ${height}`,
                        `L 0 0`,
                        'Z'
                    ].join(' ')
                },
                duration: 0.8,
                ease: 'power2.inOut',
            })
            .to(path, {
                attr: {
                    d: [
                        `M 0 0`,
                        `Q ${-width*0.2} ${height/2}, 0 ${height}`,
                        `L 0 ${height}`,
                        `L 0 0`,
                        'Z'
                    ].join(' ')
                },
                duration: 0.6,
                ease: 'power2.in',
            });
    }

    return timeline;
}

function hideLiquidTransition() {
    const overlay = document.querySelector('.liquid-overlay');
    if (overlay) {
        gsap.to(overlay, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                overlay.style.pointerEvents = 'none';
                overlay.style.opacity = 1;
            }
        });
    }
}

// ================================================
// Touch Swipe for Mobile
// ================================================

function initTouchSwipe() {
    const portfolioSection = document.querySelector('.section-portfolio');
    if (!portfolioSection) return;

    let touchStartX = 0;
    let touchEndX = 0;

    portfolioSection.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    portfolioSection.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) < swipeThreshold) return;

        if (diff > 0) {
            // Swipe left - next project
            document.querySelector('.nav-next')?.click();
        } else {
            // Swipe right - previous project
            document.querySelector('.nav-prev')?.click();
        }
    }
}

// ================================================
// Blob Morph Utility
// ================================================

export function createBlobPath(centerX, centerY, radius, randomness = 0.3) {
    const points = 8;
    const angleStep = (Math.PI * 2) / points;
    let path = '';

    for (let i = 0; i <= points; i++) {
        const angle = i * angleStep;
        const radiusVariation = radius + (Math.random() - 0.5) * radius * randomness;

        const x = centerX + Math.cos(angle) * radiusVariation;
        const y = centerY + Math.sin(angle) * radiusVariation;

        if (i === 0) {
            path += `M ${x} ${y}`;
        } else {
            // Use quadratic curves for smooth blob shape
            const prevAngle = (i - 1) * angleStep;
            const prevX = centerX + Math.cos(prevAngle) * radiusVariation;
            const prevY = centerY + Math.sin(prevAngle) * radiusVariation;

            const cpX = (x + prevX) / 2 + (Math.random() - 0.5) * radius * 0.3;
            const cpY = (y + prevY) / 2 + (Math.random() - 0.5) * radius * 0.3;

            path += ` Q ${cpX} ${cpY}, ${x} ${y}`;
        }
    }

    path += ' Z';
    return path;
}

// ================================================
// Animate Blob Morph
// ================================================

export function animateBlobMorph(element, duration = 2, infinite = true) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const radius = Math.min(window.innerWidth, window.innerHeight) * 0.4;

    function morph() {
        const newPath = createBlobPath(centerX, centerY, radius, 0.3);
        gsap.to(element, {
            attr: { d: newPath },
            duration: duration,
            ease: 'sine.inOut',
            onComplete: () => {
                if (infinite) morph();
            }
        });
    }

    morph();
}

// ================================================
// Ripple Effect on Click
// ================================================

export function createRipple(x, y, color = '#4db8a8') {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: ${color};
        opacity: 0.6;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
    `;

    document.body.appendChild(ripple);

    gsap.to(ripple, {
        width: 500,
        height: 500,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
        onComplete: () => ripple.remove()
    });
}

// Add ripple effect to clickable elements
document.addEventListener('click', (e) => {
    const target = e.target.closest('button, .btn, a');
    if (target) {
        createRipple(e.clientX, e.clientY);
    }
});
