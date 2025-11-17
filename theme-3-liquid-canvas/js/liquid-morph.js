// LIQUID MORPH - Optimized liquid background

class LiquidMorph {
    constructor() {
        this.canvas = document.getElementById('liquid-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.blobs = [];
        this.mouse = { x: 0, y: 0 };
        this.rafId = null;
        this.lastTime = 0;

        // Mobile optimization
        this.isMobile = window.innerWidth < 768;
        this.blobCount = this.isMobile ? 2 : 3; // Reduced from 5
        this.fps = this.isMobile ? 24 : 60; // Lower FPS on mobile
        this.frameInterval = 1000 / this.fps;

        this.init();
    }

    init() {
        this.resize();

        this.resizeHandler = () => {
            this.resize();
            this.isMobile = window.innerWidth < 768;
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

        this.createBlobs();
        this.animate();
    }

    resize() {
        const rect = this.canvas.getBoundingClientRect();

        // Lower resolution on mobile for better performance
        const scale = this.isMobile ? 0.75 : 1;
        this.canvas.width = rect.width * scale;
        this.canvas.height = rect.height * scale;

        this.width = rect.width;
        this.height = rect.height;

        if (scale !== 1) {
            this.ctx.scale(scale, scale);
        }
    }

    createBlobs() {
        const colors = [
            { r: 255, g: 107, b: 53, a: 0.15 },  // Orange primary
            { r: 255, g: 210, b: 63, a: 0.1 },   // Yellow accent
            { r: 255, g: 150, b: 50, a: 0.12 }   // Orange mid
        ];

        this.blobs = [];

        for (let i = 0; i < this.blobCount; i++) {
            const blob = {
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: this.isMobile ? 80 + Math.random() * 100 : 100 + Math.random() * 150,
                points: [],
                pointCount: 6, // Reduced from 8
                morphSpeed: 0.005 + Math.random() * 0.005,
                color: colors[i % colors.length]
            };

            // Initialize morph points
            for (let j = 0; j < blob.pointCount; j++) {
                const angle = (j / blob.pointCount) * Math.PI * 2;
                blob.points.push({
                    angle: angle,
                    radius: blob.radius,
                    targetRadius: blob.radius,
                    variation: 15 + Math.random() * 25
                });
            }

            this.blobs.push(blob);
        }
    }

    animate(currentTime = 0) {
        this.rafId = requestAnimationFrame((time) => this.animate(time));

        // FPS throttling
        const deltaTime = currentTime - this.lastTime;
        if (deltaTime < this.frameInterval) return;

        this.lastTime = currentTime - (deltaTime % this.frameInterval);

        // Fade background instead of full clear (better performance)
        this.ctx.fillStyle = 'rgba(26, 15, 10, 0.05)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        const time = currentTime * 0.001;

        for (const blob of this.blobs) {
            // Update position
            blob.x += blob.vx;
            blob.y += blob.vy;

            // Mouse attraction (desktop only)
            if (!this.isMobile) {
                const dx = this.mouse.x - blob.x;
                const dy = this.mouse.y - blob.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    const force = (200 - distance) / 200 * 0.015;
                    blob.vx += (dx / distance) * force;
                    blob.vy += (dy / distance) * force;
                }
            }

            // Velocity damping
            blob.vx *= 0.99;
            blob.vy *= 0.99;

            // Boundaries with bounce
            if (blob.x < 0 || blob.x > this.width) {
                blob.vx *= -1;
                blob.x = Math.max(0, Math.min(this.width, blob.x));
            }
            if (blob.y < 0 || blob.y > this.height) {
                blob.vy *= -1;
                blob.y = Math.max(0, Math.min(this.height, blob.y));
            }

            // Update morph points
            for (let i = 0; i < blob.points.length; i++) {
                const point = blob.points[i];
                const variation = Math.sin(time * blob.morphSpeed * 10 + i) * point.variation;
                point.targetRadius = blob.radius + variation;
                point.radius += (point.targetRadius - point.radius) * 0.08;
            }

            // Draw blob (simplified rendering)
            this.ctx.beginPath();

            for (let i = 0; i < blob.points.length; i++) {
                const point = blob.points[i];
                const nextPoint = blob.points[(i + 1) % blob.points.length];

                const x = blob.x + Math.cos(point.angle) * point.radius;
                const y = blob.y + Math.sin(point.angle) * point.radius;
                const nextX = blob.x + Math.cos(nextPoint.angle) * nextPoint.radius;
                const nextY = blob.y + Math.sin(nextPoint.angle) * nextPoint.radius;

                // Simplified control point
                const cpX = (x + nextX) / 2;
                const cpY = (y + nextY) / 2;

                if (i === 0) {
                    this.ctx.moveTo(x, y);
                }

                this.ctx.quadraticCurveTo(cpX, cpY, nextX, nextY);
            }

            this.ctx.closePath();

            // Simplified fill (no gradient for better performance)
            const alpha = blob.color.a;
            this.ctx.fillStyle = `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${alpha})`;
            this.ctx.fill();

            // Simplified stroke (no shadow blur)
            if (!this.isMobile) {
                this.ctx.strokeStyle = `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${alpha * 0.5})`;
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
            }
        }
    }

    explode() {
        for (const blob of this.blobs) {
            blob.vx = (Math.random() - 0.5) * 3;
            blob.vy = (Math.random() - 0.5) * 3;

            for (const point of blob.points) {
                point.variation = 40 + Math.random() * 60;
            }
        }
    }

    destroy() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }

        window.removeEventListener('resize', this.resizeHandler);
        window.removeEventListener('mousemove', this.mouseMoveHandler);

        this.blobs = [];
    }
}

// Initialize with error handling
try {
    if (document.getElementById('liquid-canvas')) {
        window.liquidMorph = new LiquidMorph();
    }
} catch (error) {
    console.error('Liquid morph initialization failed:', error);
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.liquidMorph && window.liquidMorph.destroy) {
        window.liquidMorph.destroy();
    }
});
