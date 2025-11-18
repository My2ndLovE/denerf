// PARTICLE FLOW - Optimized flowing particle system

class ParticleFlow {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.rafId = null;
        this.lastTime = 0;

        // Mobile optimization
        this.isMobile = window.innerWidth < 768;
        this.particleCount = this.isMobile ? 20 : 40; // Reduced from 80
        this.fps = this.isMobile ? 24 : 60;
        this.frameInterval = 1000 / this.fps;

        this.init();
    }

    init() {
        this.resize();

        this.resizeHandler = () => {
            this.resize();
            this.isMobile = window.innerWidth < 768;
            this.particleCount = this.isMobile ? 20 : 40;
        };

        this.mouseMoveHandler = (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        };

        window.addEventListener('resize', this.resizeHandler);

        // Only track mouse on desktop
        if (!this.isMobile) {
            window.addEventListener('mousemove', this.mouseMoveHandler);
        }

        this.createParticles();
        this.animate();
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();

        // Lower resolution on mobile
        const scale = this.isMobile ? 0.75 : 1;
        this.canvas.width = rect.width * scale;
        this.canvas.height = rect.height * scale;

        this.width = rect.width;
        this.height = rect.height;

        if (scale !== 1) {
            this.ctx.scale(scale, scale);
        }
    }

    createParticles() {
        const colors = [
            'rgba(255, 107, 53',    // Orange primary
            'rgba(255, 210, 63'     // Yellow accent
        ];

        this.particles = [];

        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.4 + 0.2,
                color: colors[Math.floor(Math.random() * colors.length)],
                trail: [],
                maxTrailLength: this.isMobile ? 3 : 5 // Reduced trail
            });
        }
    }

    getFlowAt(x, y, time) {
        // Simplified flow field calculation
        const angle = Math.sin(x * 0.005 + time) * Math.cos(y * 0.005 + time) * Math.PI * 2;
        return {
            x: Math.cos(angle) * 0.2,
            y: Math.sin(angle) * 0.2
        };
    }

    animate(currentTime = 0) {
        this.rafId = requestAnimationFrame((time) => this.animate(time));

        // FPS throttling
        const deltaTime = currentTime - this.lastTime;
        if (deltaTime < this.frameInterval) return;

        this.lastTime = currentTime - (deltaTime % this.frameInterval);

        // Fade background
        this.ctx.fillStyle = 'rgba(26, 15, 10, 0.08)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        const time = currentTime * 0.0005;

        // Update and draw particles
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];

            // Get flow force
            const flow = this.getFlowAt(particle.x, particle.y, time);
            particle.vx += flow.x * 0.08;
            particle.vy += flow.y * 0.08;

            // Mouse interaction (desktop only)
            if (!this.isMobile) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const force = (120 - distance) / 120 * 0.15;
                    particle.vx += (dx / distance) * force;
                    particle.vy += (dy / distance) * force;
                }
            }

            // Damping
            particle.vx *= 0.98;
            particle.vy *= 0.98;

            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Add to trail
            particle.trail.push({ x: particle.x, y: particle.y });
            if (particle.trail.length > particle.maxTrailLength) {
                particle.trail.shift();
            }

            // Wrap around edges
            if (particle.x < 0) particle.x = this.width;
            if (particle.x > this.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.height;
            if (particle.y > this.height) particle.y = 0;

            // Draw trail (simplified, desktop only)
            if (particle.trail.length > 1 && !this.isMobile) {
                this.ctx.beginPath();
                this.ctx.moveTo(particle.trail[0].x, particle.trail[0].y);

                for (let j = 1; j < particle.trail.length; j++) {
                    this.ctx.lineTo(particle.trail[j].x, particle.trail[j].y);
                }

                const trailOpacity = particle.opacity * 0.2;
                this.ctx.strokeStyle = `${particle.color}, ${trailOpacity})`;
                this.ctx.lineWidth = 0.5;
                this.ctx.stroke();
            }

            // Draw particle (no gradient for performance)
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `${particle.color}, ${particle.opacity})`;
            this.ctx.fill();

            // Draw connections (limited on mobile, optimized O(n))
            const maxConnections = this.isMobile ? 1 : 2;
            let connections = 0;

            for (let j = i + 1; j < this.particles.length; j++) {
                if (connections >= maxConnections) break;

                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 80) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    const lineOpacity = (1 - distance / 80) * particle.opacity * 0.15;
                    this.ctx.strokeStyle = `rgba(255, 107, 53, ${lineOpacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                    connections++;
                }
            }

            // Remove expired particles (from burst)
            if (particle.life !== undefined) {
                particle.life--;
                if (particle.life <= 0) {
                    this.particles.splice(i, 1);
                    i--;
                }
            }
        }
    }

    burst(x, y) {
        // Reduced burst particles
        const count = this.isMobile ? 10 : 15;

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2 + 1;

            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 1.5 + 0.5,
                opacity: 0.8,
                color: 'rgba(255, 107, 53',
                trail: [],
                maxTrailLength: 3,
                life: this.isMobile ? 20 : 30
            });
        }
    }

    destroy() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }

        window.removeEventListener('resize', this.resizeHandler);
        window.removeEventListener('mousemove', this.mouseMoveHandler);

        this.particles = [];
    }
}

// Initialize with error handling
try {
    if (document.getElementById('particle-canvas')) {
        window.particleFlow = new ParticleFlow();
    }
} catch (error) {
    console.error('Particle flow initialization failed:', error);
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.particleFlow && window.particleFlow.destroy) {
        window.particleFlow.destroy();
    }
});
