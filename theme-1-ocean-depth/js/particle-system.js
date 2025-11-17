// PARTICLE SYSTEM - Optimized interactive particles

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.rafId = null;
        this.lastTime = 0;

        // Mobile detection and optimization
        this.isMobile = window.innerWidth < 768;
        this.particleCount = this.isMobile ? 30 : 60; // Reduced from 100
        this.maxConnections = this.isMobile ? 2 : 3; // Limit connections per particle
        this.connectionDistance = this.isMobile ? 80 : 100;
        this.fps = this.isMobile ? 30 : 60;
        this.frameInterval = 1000 / this.fps;

        this.resize();
        this.createParticles();
        this.init();
    }

    init() {
        this.resizeHandler = () => {
            this.resize();
            this.isMobile = window.innerWidth < 768;
            this.particleCount = this.isMobile ? 30 : 60;
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

        this.animate();
    }

    resize() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();

        // Use lower resolution on mobile
        this.canvas.width = rect.width * (this.isMobile ? 1 : dpr);
        this.canvas.height = rect.height * (this.isMobile ? 1 : dpr);

        this.ctx.scale(this.isMobile ? 1 : dpr, this.isMobile ? 1 : dpr);

        this.width = rect.width;
        this.height = rect.height;
    }

    createParticles() {
        this.particles = []; // Clear existing particles

        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.3,
                color: Math.random() > 0.5 ? '77, 184, 168' : '52, 152, 219',
                connections: 0 // Track number of connections
            });
        }
    }

    animate(currentTime = 0) {
        this.rafId = requestAnimationFrame((time) => this.animate(time));

        // FPS throttling
        const deltaTime = currentTime - this.lastTime;
        if (deltaTime < this.frameInterval) return;

        this.lastTime = currentTime - (deltaTime % this.frameInterval);

        // Clear with fade effect
        this.ctx.fillStyle = 'rgba(10, 25, 41, 0.1)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Reset connection counts
        for (const particle of this.particles) {
            particle.connections = 0;
        }

        // Update and draw particles
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];

            // Mouse interaction (desktop only)
            if (!this.isMobile) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const force = (150 - distance) / 150;
                    particle.vx -= (dx / distance) * force * 0.1;
                    particle.vy -= (dy / distance) * force * 0.1;
                }
            }

            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Damping
            particle.vx *= 0.99;
            particle.vy *= 0.99;

            // Boundaries with bounce
            if (particle.x < 0 || particle.x > this.width) {
                particle.vx *= -1;
                particle.x = Math.max(0, Math.min(this.width, particle.x));
            }
            if (particle.y < 0 || particle.y > this.height) {
                particle.vy *= -1;
                particle.y = Math.max(0, Math.min(this.height, particle.y));
            }

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`;
            this.ctx.fill();

            // Draw connections (optimized - only check forward)
            if (particle.connections < this.maxConnections) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const other = this.particles[j];

                    // Skip if either particle has max connections
                    if (other.connections >= this.maxConnections) continue;

                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.connectionDistance) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(other.x, other.y);
                        const opacity = (1 - distance / this.connectionDistance) * 0.2;
                        this.ctx.strokeStyle = `rgba(77, 184, 168, ${opacity})`;
                        this.ctx.lineWidth = 0.5;
                        this.ctx.stroke();

                        particle.connections++;
                        other.connections++;

                        // Break if max connections reached
                        if (particle.connections >= this.maxConnections) break;
                    }
                }
            }

            // Remove expired particles (from explode)
            if (particle.lifetime !== undefined) {
                particle.lifetime--;
                if (particle.lifetime <= 0) {
                    this.particles.splice(i, 1);
                    i--;
                }
            }
        }
    }

    explode(x, y) {
        // Reduced explosion particles for performance
        const count = this.isMobile ? 20 : 30;

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 4 + 2;

            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 1.5 + 0.5,
                opacity: 1,
                color: '77, 184, 168',
                lifetime: this.isMobile ? 30 : 45,
                connections: 999 // Prevent explosion particles from creating connections
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
        window.particleSystem = new ParticleSystem();
    }
} catch (error) {
    console.error('Particle system initialization failed:', error);
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.particleSystem && window.particleSystem.destroy) {
        window.particleSystem.destroy();
    }
});
