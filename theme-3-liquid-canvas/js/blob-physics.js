// BLOB PHYSICS - Interactive blobs for cards and sections

class BlobPhysics {
    constructor(element) {
        this.element = element;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.element.appendChild(this.canvas);

        this.points = [];
        this.pointCount = 12;
        this.baseRadius = 150;
        this.centerX = 0;
        this.centerY = 0;
        this.mouse = { x: 0, y: 0 };
        this.springs = [];

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Mouse tracking
        this.element.addEventListener('mousemove', (e) => {
            const rect = this.element.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        this.element.addEventListener('mouseleave', () => {
            this.mouse.x = this.centerX;
            this.mouse.y = this.centerY;
        });

        this.createPhysicsBlob();
        this.animate();
    }

    resize() {
        this.canvas.width = this.element.clientWidth;
        this.canvas.height = this.element.clientHeight;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.baseRadius = Math.min(this.canvas.width, this.canvas.height) * 0.35;

        this.mouse.x = this.centerX;
        this.mouse.y = this.centerY;
    }

    createPhysicsBlob() {
        this.points = [];

        // Create points in circle
        for (let i = 0; i < this.pointCount; i++) {
            const angle = (i / this.pointCount) * Math.PI * 2;
            const x = this.centerX + Math.cos(angle) * this.baseRadius;
            const y = this.centerY + Math.sin(angle) * this.baseRadius;

            this.points.push({
                x: x,
                y: y,
                vx: 0,
                vy: 0,
                angle: angle,
                baseX: x,
                baseY: y,
                mass: 1,
                damping: 0.9
            });
        }

        // Create springs between adjacent points
        this.springs = [];
        for (let i = 0; i < this.pointCount; i++) {
            const nextIndex = (i + 1) % this.pointCount;
            this.springs.push({
                p1: i,
                p2: nextIndex,
                restLength: this.calculateDistance(this.points[i], this.points[nextIndex]),
                stiffness: 0.1
            });
        }
    }

    calculateDistance(p1, p2) {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const time = Date.now() * 0.001;

        // Apply forces
        for (let i = 0; i < this.points.length; i++) {
            const point = this.points[i];

            // Mouse attraction/repulsion
            const dx = this.mouse.x - point.x;
            const dy = this.mouse.y - point.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                // Repulsion
                const force = (150 - distance) / 150 * 0.5;
                point.vx -= (dx / distance) * force;
                point.vy -= (dy / distance) * force;
            }

            // Spring back to base position
            const baseDx = point.baseX - point.x;
            const baseDy = point.baseY - point.y;
            point.vx += baseDx * 0.02;
            point.vy += baseDy * 0.02;

            // Organic wave motion
            const waveForce = Math.sin(time * 2 + i * 0.5) * 0.3;
            point.vx += Math.cos(point.angle) * waveForce;
            point.vy += Math.sin(point.angle) * waveForce;
        }

        // Apply spring constraints
        for (const spring of this.springs) {
            const p1 = this.points[spring.p1];
            const p2 = this.points[spring.p2];

            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance === 0) continue;

            const force = (distance - spring.restLength) * spring.stiffness;
            const fx = (dx / distance) * force;
            const fy = (dy / distance) * force;

            p1.vx += fx;
            p1.vy += fy;
            p2.vx -= fx;
            p2.vy -= fy;
        }

        // Update positions
        for (const point of this.points) {
            point.x += point.vx;
            point.y += point.vy;
            point.vx *= point.damping;
            point.vy *= point.damping;

            // Update base position for rotation
            point.angle += 0.01;
            point.baseX = this.centerX + Math.cos(point.angle) * this.baseRadius;
            point.baseY = this.centerY + Math.sin(point.angle) * this.baseRadius;
        }

        // Draw blob
        this.ctx.beginPath();

        for (let i = 0; i < this.points.length; i++) {
            const current = this.points[i];
            const next = this.points[(i + 1) % this.points.length];

            // Control point between current and next
            const cpX = (current.x + next.x) / 2;
            const cpY = (current.y + next.y) / 2;

            if (i === 0) {
                this.ctx.moveTo(current.x, current.y);
            }

            this.ctx.quadraticCurveTo(current.x, current.y, cpX, cpY);
        }

        this.ctx.closePath();

        // Gradient fill
        const gradient = this.ctx.createRadialGradient(
            this.centerX, this.centerY, 0,
            this.centerX, this.centerY, this.baseRadius
        );
        gradient.addColorStop(0, 'rgba(255, 107, 53, 0.3)');
        gradient.addColorStop(0.5, 'rgba(255, 210, 63, 0.2)');
        gradient.addColorStop(1, 'rgba(255, 140, 66, 0.1)');

        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        // Stroke with glow
        this.ctx.strokeStyle = 'rgba(255, 107, 53, 0.5)';
        this.ctx.lineWidth = 3;
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = 'rgba(255, 107, 53, 0.8)';
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;

        // Draw points (for debugging - remove in production)
        // for (const point of this.points) {
        //     this.ctx.beginPath();
        //     this.ctx.arc(point.x, point.y, 3, 0, Math.PI * 2);
        //     this.ctx.fillStyle = '#ff6b35';
        //     this.ctx.fill();
        // }
    }

    jolt() {
        // Add random impulse to all points
        for (const point of this.points) {
            point.vx += (Math.random() - 0.5) * 10;
            point.vy += (Math.random() - 0.5) * 10;
        }
    }
}

// Initialize blobs for about section and project visuals
document.addEventListener('DOMContentLoaded', () => {
    // About section blob
    const aboutBlob = document.querySelector('[data-liquid-blob]');
    if (aboutBlob) {
        window.aboutBlob = new BlobPhysics(aboutBlob);
    }

    // Project visual blobs
    document.querySelectorAll('[data-project-blob]').forEach(el => {
        new BlobPhysics(el);
    });

    // Service card hover blobs (smaller, simpler)
    document.querySelectorAll('[data-liquid-card]').forEach(card => {
        const blobContainer = card.querySelector('.service-hover-blob');
        if (blobContainer) {
            const miniBlob = new BlobPhysics(blobContainer);

            card.addEventListener('mouseenter', () => {
                miniBlob.jolt();
            });
        }
    });
});
