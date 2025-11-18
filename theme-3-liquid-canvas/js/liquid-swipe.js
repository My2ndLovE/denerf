// LIQUID SWIPE - Optimized liquid swipe transitions for portfolio

class LiquidSwipe {
    constructor() {
        this.wrapper = document.getElementById('portfolio-wrapper');
        if (!this.wrapper) return;

        this.slides = Array.from(this.wrapper.querySelectorAll('.swiper-slide'));
        this.currentIndex = 0;
        this.isAnimating = false;
        this.startX = 0;
        this.currentX = 0;
        this.isDragging = false;
        this.eventHandlers = [];

        // Mobile optimization
        this.isMobile = window.innerWidth < 768;
        this.animationDuration = this.isMobile ? 0.4 : 0.6;

        this.init();
    }

    init() {
        // Set initial slide
        this.updateSlides();

        // Mouse events (desktop)
        this.addEventHandler(this.wrapper, 'mousedown', (e) => this.startDrag(e));
        this.addEventHandler(this.wrapper, 'mousemove', (e) => this.onDrag(e));
        this.addEventHandler(this.wrapper, 'mouseup', (e) => this.endDrag(e));
        this.addEventHandler(this.wrapper, 'mouseleave', (e) => this.endDrag(e));

        // Touch events (mobile) - passive for better scroll performance
        this.addEventHandler(this.wrapper, 'touchstart', (e) => this.startDrag(e), { passive: true });
        this.addEventHandler(this.wrapper, 'touchmove', (e) => this.onDrag(e), { passive: true });
        this.addEventHandler(this.wrapper, 'touchend', (e) => this.endDrag(e), { passive: true });

        // Navigation buttons
        this.setupNavigation();

        // Create pagination
        this.createPagination();

        // Responsive updates
        this.resizeHandler = () => {
            this.isMobile = window.innerWidth < 768;
            this.animationDuration = this.isMobile ? 0.4 : 0.6;
        };
        this.addEventHandler(window, 'resize', this.resizeHandler);
    }

    addEventHandler(element, event, handler, options) {
        element.addEventListener(event, handler, options);
        this.eventHandlers.push({ element, event, handler, options });
    }

    setupNavigation() {
        const prevBtn = document.querySelector('.swiper-prev');
        const nextBtn = document.querySelector('.swiper-next');

        if (prevBtn) {
            this.addEventHandler(prevBtn, 'click', () => this.prev());
        }

        if (nextBtn) {
            this.addEventHandler(nextBtn, 'click', () => this.next());
        }
    }

    createPagination() {
        const pagination = document.querySelector('.swiper-pagination');
        if (!pagination) return;

        pagination.innerHTML = '';

        for (let i = 0; i < this.slides.length; i++) {
            const bullet = document.createElement('div');
            bullet.className = 'swiper-pagination-bullet';
            if (i === this.currentIndex) {
                bullet.classList.add('active');
            }

            this.addEventHandler(bullet, 'click', () => this.goTo(i));
            pagination.appendChild(bullet);
        }
    }

    updatePagination() {
        const bullets = document.querySelectorAll('.swiper-pagination-bullet');
        bullets.forEach((bullet, index) => {
            bullet.classList.toggle('active', index === this.currentIndex);
        });
    }

    startDrag(e) {
        if (this.isAnimating) return;

        this.isDragging = true;
        this.startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        this.wrapper.style.cursor = 'grabbing';
    }

    onDrag(e) {
        if (!this.isDragging) return;

        this.currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        const diff = this.currentX - this.startX;

        // Visual feedback during drag (reduced on mobile)
        const dragFactor = this.isMobile ? 0.05 : 0.1;
        this.wrapper.style.transform = `translateX(${diff * dragFactor}px)`;
    }

    endDrag(e) {
        if (!this.isDragging) return;

        this.isDragging = false;
        this.wrapper.style.cursor = 'grab';
        this.wrapper.style.transform = '';

        const diff = this.currentX - this.startX;
        const threshold = this.isMobile ? 30 : 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.prev();
            } else {
                this.next();
            }
        }

        this.currentX = 0;
        this.startX = 0;
    }

    prev() {
        if (this.isAnimating) return;

        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.animateTransition('left');
    }

    next() {
        if (this.isAnimating) return;

        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.animateTransition('right');
    }

    goTo(index) {
        if (this.isAnimating || index === this.currentIndex) return;

        const direction = index > this.currentIndex ? 'right' : 'left';
        this.currentIndex = index;
        this.animateTransition(direction);
    }

    animateTransition(direction) {
        this.isAnimating = true;

        // Update slides
        this.updateSlides();
        this.updatePagination();

        // Trigger particle burst (desktop only for performance)
        if (!this.isMobile && window.particleFlow) {
            const rect = this.wrapper.getBoundingClientRect();
            window.particleFlow.burst(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            );
        }

        // Reset animation flag after transition
        setTimeout(() => {
            this.isAnimating = false;
        }, this.animationDuration * 1000);
    }

    updateSlides() {
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentIndex);

            // Position slides
            const offset = index - this.currentIndex;
            const translateX = offset * 100;

            gsap.to(slide, {
                x: `${translateX}%`,
                opacity: index === this.currentIndex ? 1 : 0.5,
                scale: index === this.currentIndex ? 1 : 0.9,
                duration: this.animationDuration,
                ease: 'power2.out'
            });
        });
    }

    destroy() {
        // Remove all event listeners
        this.eventHandlers.forEach(({ element, event, handler, options }) => {
            element.removeEventListener(event, handler, options);
        });
        this.eventHandlers = [];

        // Clear any ongoing animations
        if (this.slides) {
            this.slides.forEach(slide => {
                gsap.killTweensOf(slide);
            });
        }

        this.slides = [];
    }
}

// Initialize with error handling
document.addEventListener('DOMContentLoaded', () => {
    try {
        if (document.getElementById('portfolio-wrapper')) {
            window.liquidSwipe = new LiquidSwipe();
        }
    } catch (error) {
        console.error('Liquid swipe initialization failed:', error);
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.liquidSwipe && window.liquidSwipe.destroy) {
        window.liquidSwipe.destroy();
    }
});
