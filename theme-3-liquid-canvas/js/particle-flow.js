// PARTICLE FLOW - Flowing particle system

class ParticleFlow {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 80;
        this.flowLines = [];
        this.mouse = { x: 0, y: 0 };

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        this.createParticles();
        this.createFlowField();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createFlowField();
    }

    createFlowField() {
        this.flowLines = [];
        const resolution = 50;

        for (let x = 0; x < this.canvas.width; x += resolution) {
            for (let y = 0; y < this.canvas.height; y += resolution) {
                const angle = Math.sin(x * 0.01) * Math.cos(y * 0.01) * Math.PI * 2;
                this.flowLines.push({
                    x: x,
                    y: y,
                    angle: angle
                });
            }
        }
    }

    createParticles() {
        const colors = [
            'rgba(255, 107, 53',    // Orange primary
            'rgba(255, 140, 66',    // Orange light
            'rgba(255, 210, 63',    // Yellow accent
            'rgba(255, 229, 93'     // Yellow light
        ];

        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.3,
                color: colors[Math.floor(Math.random() * colors.length)],
                trail: [],
                maxTrailLength: 10
            });
        }
    }

    getFlowAt(x, y) {
        const time = Date.now() * 0.0005;
        const angle = Math.sin(x * 0.005 + time) * Math.cos(y * 0.005 + time) * Math.PI * 2;
        return {
            x: Math.cos(angle) * 0.3,
            y: Math.sin(angle) * 0.3
        };
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.ctx.fillStyle = 'rgba(26, 15, 10, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        for (const particle of this.particles) {
            // Get flow force
            const flow = this.getFlowAt(particle.x, particle.y);
            particle.vx += flow.x * 0.1;
            particle.vy += flow.y * 0.1;

            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const force = (150 - distance) / 150 * 0.2;
                particle.vx += (dx / distance) * force;
                particle.vy += (dy / distance) * force;
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
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;

            // Draw trail
            if (particle.trail.length > 1) {
                this.ctx.beginPath();
                this.ctx.moveTo(particle.trail[0].x, particle.trail[0].y);

                for (let i = 1; i < particle.trail.length; i++) {
                    this.ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
                }

                const trailOpacity = particle.opacity * 0.3;
                this.ctx.strokeStyle = `${particle.color}, ${trailOpacity})`;
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
            }

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `${particle.color}, ${particle.opacity})`;
            this.ctx.fill();

            // Glow
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size * 3
            );
            gradient.addColorStop(0, `${particle.color}, ${particle.opacity * 0.5})`);
            gradient.addColorStop(1, 'transparent');
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(
                particle.x - particle.size * 3,
                particle.y - particle.size * 3,
                particle.size * 6,
                particle.size * 6
            );

            // Draw connections
            for (const other of this.particles) {
                if (particle === other) continue;

                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    const lineOpacity = (1 - distance / 100) * particle.opacity * 0.2;
                    this.ctx.strokeStyle = `rgba(255, 107, 53, ${lineOpacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }
    }

    burst(x, y) {
        // Create burst of particles at position
        for (let i = 0; i < 30; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3 + 1;

            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * 2 + 1,
                opacity: 1,
                color: 'rgba(255, 107, 53',
                trail: [],
                maxTrailLength: 5,
                life: 60
            });
        }
    }
}

// Initialize
if (document.getElementById('particle-canvas')) {
    window.particleFlow = new ParticleFlow();
}
