// LIQUID SWIPE - Smooth liquid swipe transitions for portfolio

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

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.waveOffset = 0;

        this.init();
    }

    init() {
        // Set initial slide
        this.updateSlides();

        // Touch/Mouse events
        this.wrapper.addEventListener('mousedown', (e) => this.startDrag(e));
        this.wrapper.addEventListener('mousemove', (e) => this.onDrag(e));
        this.wrapper.addEventListener('mouseup', (e) => this.endDrag(e));
        this.wrapper.addEventListener('mouseleave', (e) => this.endDrag(e));

        this.wrapper.addEventListener('touchstart', (e) => this.startDrag(e));
        this.wrapper.addEventListener('touchmove', (e) => this.onDrag(e));
        this.wrapper.addEventListener('touchend', (e) => this.endDrag(e));

        // Navigation buttons
        this.setupNavigation();

        // Create pagination
        this.createPagination();
    }

    setupNavigation() {
        const prevBtn = document.querySelector('.swiper-prev');
        const nextBtn = document.querySelector('.swiper-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prev());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.next());
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

            bullet.addEventListener('click', () => this.goTo(i));
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

        // Visual feedback during drag
        this.wrapper.style.transform = `translateX(${diff * 0.1}px)`;
    }

    endDrag(e) {
        if (!this.isDragging) return;

        this.isDragging = false;
        this.wrapper.style.cursor = 'grab';
        this.wrapper.style.transform = '';

        const diff = this.currentX - this.startX;
        const threshold = 50;

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

        // Liquid wave animation
        const duration = 600;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);

            this.waveOffset = eased;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.isAnimating = false;
                this.waveOffset = 0;
                this.updateSlides();
                this.updatePagination();
            }
        };

        animate();
        this.updateSlides();
        this.updatePagination();

        // Trigger particle burst
        if (window.particleFlow) {
            const rect = this.wrapper.getBoundingClientRect();
            window.particleFlow.burst(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            );
        }
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
                duration: 0.6,
                ease: 'power2.out'
            });
        });
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('portfolio-wrapper')) {
        window.liquidSwipe = new LiquidSwipe();
    }
});
