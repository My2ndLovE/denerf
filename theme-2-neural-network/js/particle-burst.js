// PARTICLE BURST - Click and interaction effects

class ParticleBurst {
    constructor() {
        this.canvas = document.getElementById('burst-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];

        this.resize();
        this.init();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('click', (e) => this.createBurst(e.clientX, e.clientY, 30));

        // Auto bursts on service card hover
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
                color: `rgba(230, 57, 70, ${0.8 + Math.random() * 0.2})`
            });
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

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

            // Draw particle
            this.ctx.globalAlpha = p.life;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();

            // Draw glow
            const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
            gradient.addColorStop(0, `rgba(230, 57, 70, ${p.life * 0.3})`);
            gradient.addColorStop(1, 'transparent');
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(p.x - p.size * 3, p.y - p.size * 3, p.size * 6, p.size * 6);
        }

        this.ctx.globalAlpha = 1;
    }
}

// Initialize
if (document.getElementById('burst-canvas')) {
    window.particleBurst = new ParticleBurst();
}
