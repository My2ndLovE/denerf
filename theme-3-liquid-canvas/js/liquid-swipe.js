// LIQUID SWIPE - Portfolio carousel using Swiper.js with proper snapping

class LiquidSwipe {
    constructor() {
        this.wrapper = document.getElementById('portfolio-wrapper');
        if (!this.wrapper) return;

        this.swiper = null;
        this.isMobile = window.innerWidth < 768;

        this.init();
    }

    init() {
        // Check if Swiper is loaded
        if (typeof Swiper === 'undefined') {
            console.warn('Swiper.js not loaded, using fallback');
            this.initFallback();
            return;
        }

        // Initialize Swiper with proper settings
        const swiperContainer = this.wrapper.closest('.swiper-container') || this.wrapper.parentElement;

        this.swiper = new Swiper(swiperContainer, {
            // Core parameters
            slidesPerView: 1,
            spaceBetween: 30,
            centeredSlides: true,
            loop: false,
            speed: this.isMobile ? 400 : 600,

            // Snapping
            resistance: true,
            resistanceRatio: 0.85,

            // Breakpoints for responsive
            breakpoints: {
                768: {
                    slidesPerView: 1.5,
                    spaceBetween: 40
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 50
                }
            },

            // Navigation
            navigation: {
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
            },

            // Pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: this.isMobile,
            },

            // Touch/Mouse
            grabCursor: true,
            touchRatio: 1,
            touchAngle: 45,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,

            // Accessibility
            a11y: {
                enabled: true
            },

            // Effects
            effect: 'slide',

            // Callbacks
            on: {
                slideChange: () => this.onSlideChange(),
                reachEnd: () => this.onReachEnd(),
                reachBeginning: () => this.onReachBeginning()
            }
        });

        // Responsive updates
        this.resizeHandler = () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                this.isMobile = window.innerWidth < 768;
                if (this.swiper) {
                    this.swiper.update();
                }
            }, 250);
        };

        window.addEventListener('resize', this.resizeHandler);
    }

    initFallback() {
        // Fallback implementation if Swiper.js fails to load
        console.log('Using fallback carousel implementation');

        this.slides = Array.from(this.wrapper.querySelectorAll('.swiper-slide'));
        this.currentIndex = 0;
        this.isAnimating = false;

        // Show first slide
        this.updateFallbackSlides();

        // Setup navigation
        const prevBtn = document.querySelector('.swiper-prev');
        const nextBtn = document.querySelector('.swiper-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevFallback());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextFallback());
        }
    }

    prevFallback() {
        if (this.isAnimating || this.currentIndex === 0) return;
        this.currentIndex--;
        this.updateFallbackSlides();
    }

    nextFallback() {
        if (this.isAnimating || this.currentIndex === this.slides.length - 1) return;
        this.currentIndex++;
        this.updateFallbackSlides();
    }

    updateFallbackSlides() {
        this.isAnimating = true;

        this.slides.forEach((slide, index) => {
            const offset = index - this.currentIndex;
            const translateX = offset * 100;

            gsap.to(slide, {
                x: `${translateX}%`,
                opacity: index === this.currentIndex ? 1 : 0.5,
                scale: index === this.currentIndex ? 1 : 0.9,
                duration: 0.6,
                ease: 'power2.out',
                onComplete: () => {
                    if (index === this.currentIndex) {
                        this.isAnimating = false;
                    }
                }
            });
        });
    }

    onSlideChange() {
        // Trigger particle burst effect when slide changes (desktop only)
        if (!this.isMobile && window.particleFlow) {
            const activeSlide = this.swiper.slides[this.swiper.activeIndex];
            if (activeSlide) {
                const rect = activeSlide.getBoundingClientRect();
                window.particleFlow.burst(
                    rect.left + rect.width / 2,
                    rect.top + rect.height / 2,
                    20
                );
            }
        }
    }

    onReachEnd() {
        // Optional: Handle reaching the end
        console.log('Reached end of carousel');
    }

    onReachBeginning() {
        // Optional: Handle reaching the beginning
        console.log('Reached beginning of carousel');
    }

    destroy() {
        // Destroy Swiper instance
        if (this.swiper) {
            this.swiper.destroy(true, true);
            this.swiper = null;
        }

        // Remove event listeners
        if (this.resizeHandler) {
            window.removeEventListener('resize', this.resizeHandler);
        }

        clearTimeout(this.resizeTimeout);

        // Cleanup fallback
        if (this.slides) {
            this.slides.forEach(slide => {
                gsap.killTweensOf(slide);
            });
            this.slides = [];
        }
    }
}

// Initialize with proper timing
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit to ensure Swiper.js is loaded
    setTimeout(() => {
        try {
            if (document.getElementById('portfolio-wrapper')) {
                window.liquidSwipe = new LiquidSwipe();
            }
        } catch (error) {
            console.error('Liquid swipe initialization failed:', error);
        }
    }, 100);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.liquidSwipe && window.liquidSwipe.destroy) {
        window.liquidSwipe.destroy();
    }
});
