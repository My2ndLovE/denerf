// BLOB PHYSICS - Optimized interactive blobs

class BlobPhysics {
    constructor(element) {
        this.element = element;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.element.appendChild(this.canvas);

        this.points = [];
        this.centerX = 0;
        this.centerY = 0;
        this.mouse = { x: 0, y: 0 };
        this.springs = [];
        this.rafId = null;
        this.lastTime = 0;

        // Mobile optimization
        this.isMobile = window.innerWidth < 768;
        this.pointCount = this.isMobile ? 6 : 8; // Reduced from 12
        this.baseRadius = 150;
        this.fps = this.isMobile ? 24 : 60;
        this.frameInterval = 1000 / this.fps;

        this.init();
    }

    init() {
        this.resize();

        this.resizeHandler = () => {
            this.resize();
            this.isMobile = window.innerWidth < 768;
        };

        window.addEventListener('resize', this.resizeHandler);

        // Mouse tracking (desktop only)
        if (!this.isMobile) {
            this.mouseMoveHandler = (e) => {
                const rect = this.element.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            };

            this.mouseLeaveHandler = () => {
                this.mouse.x = this.centerX;
                this.mouse.y = this.centerY;
            };

            this.element.addEventListener('mousemove', this.mouseMoveHandler);
            this.element.addEventListener('mouseleave', this.mouseLeaveHandler);
        }

        this.createPhysicsBlob();
        this.animate();
    }

    resize() {
        const rect = this.element.getBoundingClientRect();

        // Lower resolution on mobile
        const scale = this.isMobile ? 0.7 : 1;
        this.canvas.width = rect.width * scale;
        this.canvas.height = rect.height * scale;

        if (scale !== 1) {
            this.ctx.scale(scale, scale);
        }

        this.width = rect.width;
        this.height = rect.height;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        this.baseRadius = Math.min(this.width, this.height) * 0.3;

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
                damping: 0.88
            });
        }

        // Create springs between adjacent points
        this.springs = [];
        for (let i = 0; i < this.pointCount; i++) {
            const nextIndex = (i + 1) % this.pointCount;
            const p1 = this.points[i];
            const p2 = this.points[nextIndex];
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const restLength = Math.sqrt(dx * dx + dy * dy);

            this.springs.push({
                p1: i,
                p2: nextIndex,
                restLength: restLength,
                stiffness: 0.08
            });
        }
    }

    animate(currentTime = 0) {
        this.rafId = requestAnimationFrame((time) => this.animate(time));

        // FPS throttling
        const deltaTime = currentTime - this.lastTime;
        if (deltaTime < this.frameInterval) return;

        this.lastTime = currentTime - (deltaTime % this.frameInterval);

        this.ctx.clearRect(0, 0, this.width, this.height);

        const time = currentTime * 0.001;

        // Apply forces
        for (let i = 0; i < this.points.length; i++) {
            const point = this.points[i];

            // Mouse repulsion (desktop only)
            if (!this.isMobile) {
                const dx = this.mouse.x - point.x;
                const dy = this.mouse.y - point.y;
                const distSq = dx * dx + dy * dy;

                if (distSq < 22500) { // 150^2
                    const distance = Math.sqrt(distSq);
                    const force = (150 - distance) / 150 * 0.4;
                    point.vx -= (dx / distance) * force;
                    point.vy -= (dy / distance) * force;
                }
            }

            // Spring back to base position
            const baseDx = point.baseX - point.x;
            const baseDy = point.baseY - point.y;
            point.vx += baseDx * 0.015;
            point.vy += baseDy * 0.015;

            // Organic wave motion
            const waveForce = Math.sin(time * 1.5 + i * 0.5) * 0.25;
            point.vx += Math.cos(point.angle) * waveForce;
            point.vy += Math.sin(point.angle) * waveForce;
        }

        // Apply spring constraints
        for (const spring of this.springs) {
            const p1 = this.points[spring.p1];
            const p2 = this.points[spring.p2];

            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const distSq = dx * dx + dy * dy;

            if (distSq === 0) continue;

            const distance = Math.sqrt(distSq);
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
            point.angle += 0.008;
            point.baseX = this.centerX + Math.cos(point.angle) * this.baseRadius;
            point.baseY = this.centerY + Math.sin(point.angle) * this.baseRadius;
        }

        // Draw blob (simplified)
        this.ctx.beginPath();

        for (let i = 0; i < this.points.length; i++) {
            const current = this.points[i];
            const next = this.points[(i + 1) % this.points.length];

            const cpX = (current.x + next.x) / 2;
            const cpY = (current.y + next.y) / 2;

            if (i === 0) {
                this.ctx.moveTo(current.x, current.y);
            }

            this.ctx.quadraticCurveTo(current.x, current.y, cpX, cpY);
        }

        this.ctx.closePath();

        // Simplified fill (no gradient for performance)
        this.ctx.fillStyle = 'rgba(255, 107, 53, 0.2)';
        this.ctx.fill();

        // Simplified stroke (no shadow blur)
        this.ctx.strokeStyle = 'rgba(255, 107, 53, 0.4)';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    jolt() {
        // Add random impulse to all points
        for (const point of this.points) {
            point.vx += (Math.random() - 0.5) * 6;
            point.vy += (Math.random() - 0.5) * 6;
        }
    }

    destroy() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }

        window.removeEventListener('resize', this.resizeHandler);

        if (!this.isMobile) {
            this.element.removeEventListener('mousemove', this.mouseMoveHandler);
            this.element.removeEventListener('mouseleave', this.mouseLeaveHandler);
        }

        this.points = [];
        this.springs = [];
    }
}

// Initialize blobs for about section and project visuals
document.addEventListener('DOMContentLoaded', () => {
    const isMobile = window.innerWidth < 768;
    const blobs = [];

    // About section blob
    const aboutBlob = document.querySelector('[data-liquid-blob]');
    if (aboutBlob) {
        const blob = new BlobPhysics(aboutBlob);
        window.aboutBlob = blob;
        blobs.push(blob);
    }

    // Project visual blobs (limit on mobile)
    const projectBlobElements = document.querySelectorAll('[data-project-blob]');
    const maxProjectBlobs = isMobile ? 2 : projectBlobElements.length;

    projectBlobElements.forEach((el, index) => {
        if (index < maxProjectBlobs) {
            blobs.push(new BlobPhysics(el));
        }
    });

    // Service card hover blobs (disabled on mobile for performance)
    if (!isMobile) {
        document.querySelectorAll('[data-liquid-card]').forEach(card => {
            const blobContainer = card.querySelector('.service-hover-blob');
            if (blobContainer) {
                const miniBlob = new BlobPhysics(blobContainer);
                blobs.push(miniBlob);

                card.addEventListener('mouseenter', () => {
                    miniBlob.jolt();
                });
            }
        });
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        blobs.forEach(blob => {
            if (blob.destroy) {
                blob.destroy();
            }
        });
    });
});
