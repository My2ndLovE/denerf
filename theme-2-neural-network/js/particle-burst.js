// PARTICLE BURST - Optimized click and interaction effects

class ParticleBurst {
    constructor() {
        this.canvas = document.getElementById('burst-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.rafId = null;
        this.lastTime = 0;

        // Mobile optimization
        this.isMobile = window.innerWidth < 768;
        this.fps = this.isMobile ? 24 : 60;
        this.frameInterval = 1000 / this.fps;

        this.resize();
        this.init();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.resizeHandler = () => {
            this.resize();
            this.isMobile = window.innerWidth < 768;
            this.fps = this.isMobile ? 24 : 60;
            this.frameInterval = 1000 / this.fps;
        };

        window.addEventListener('resize', this.resizeHandler);

        // Click burst
        this.clickHandler = (e) => {
            const count = this.isMobile ? 15 : 30;
            this.createBurst(e.clientX, e.clientY, count);
        };
        window.addEventListener('click', this.clickHandler);

        // Auto bursts on service card hover (desktop only)
        if (!this.isMobile) {
            document.querySelectorAll('[data-node-card]').forEach(card => {
                card.addEventListener('mouseenter', (e) => {
                    const rect = card.getBoundingClientRect();
                    this.createBurst(
                        rect.left + rect.width / 2,
                        rect.top + rect.height / 2,
                        15
                    );
                });
            });
        }

        this.animate();
    }

    createBurst(x, y, count = 20) {
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const speed = 2 + Math.random() * 3;

            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                decay: 0.02 + Math.random() * 0.02,
                size: 2 + Math.random() * 3,
                hue: 350 + Math.random() * 10 // Red hue range
            });
        }
    }

    animate(currentTime = 0) {
        this.rafId = requestAnimationFrame((time) => this.animate(time));

        // FPS throttling
        const deltaTime = currentTime - this.lastTime;
        if (deltaTime < this.frameInterval) return;

        this.lastTime = currentTime - (deltaTime % this.frameInterval);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // Gravity
            p.life -= p.decay;

            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            // Draw particle (no gradient for performance)
            this.ctx.globalAlpha = p.life;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsl(${p.hue}, 100%, 50%)`;
            this.ctx.fill();

            // Simple glow (desktop only)
            if (!this.isMobile && p.life > 0.5) {
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(139, 92, 246, ${p.life * 0.1})`;
                this.ctx.fill();
            }
        }

        this.ctx.globalAlpha = 1;
    }

    destroy() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }

        window.removeEventListener('resize', this.resizeHandler);
        window.removeEventListener('click', this.clickHandler);
        this.particles = [];
    }
}

// Initialize with error handling
try {
    if (document.getElementById('burst-canvas')) {
        window.particleBurst = new ParticleBurst();
    }
} catch (error) {
    console.error('Particle burst initialization failed:', error);
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.particleBurst && window.particleBurst.destroy) {
        window.particleBurst.destroy();
    }
});
