// LIQUID MORPH - Main canvas liquid background

class LiquidMorph {
    constructor() {
        this.canvas = document.getElementById('liquid-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.blobs = [];
        this.blobCount = 5;
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

        this.createBlobs();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createBlobs() {
        const colors = [
            { r: 255, g: 107, b: 53, a: 0.2 },  // Orange primary
            { r: 255, g: 140, b: 66, a: 0.15 }, // Orange light
            { r: 255, g: 210, b: 63, a: 0.1 },  // Yellow accent
            { r: 255, g: 229, b: 93, a: 0.08 }, // Yellow light
            { r: 255, g: 150, b: 50, a: 0.12 }  // Orange mid
        ];

        for (let i = 0; i < this.blobCount; i++) {
            this.blobs.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: 100 + Math.random() * 200,
                points: [],
                pointCount: 8,
                morphSpeed: 0.01 + Math.random() * 0.01,
                color: colors[i % colors.length]
            });

            // Initialize morph points
            const blob = this.blobs[i];
            for (let j = 0; j < blob.pointCount; j++) {
                const angle = (j / blob.pointCount) * Math.PI * 2;
                blob.points.push({
                    angle: angle,
                    radius: blob.radius,
                    targetRadius: blob.radius,
                    variation: 20 + Math.random() * 40
                });
            }
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.ctx.fillStyle = 'rgba(26, 15, 10, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        const time = Date.now() * 0.001;

        for (const blob of this.blobs) {
            // Update position
            blob.x += blob.vx;
            blob.y += blob.vy;

            // Mouse attraction
            const dx = this.mouse.x - blob.x;
            const dy = this.mouse.y - blob.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 300) {
                const force = (300 - distance) / 300 * 0.02;
                blob.vx += (dx / distance) * force;
                blob.vy += (dy / distance) * force;
            }

            // Velocity damping
            blob.vx *= 0.99;
            blob.vy *= 0.99;

            // Boundaries
            if (blob.x < 0 || blob.x > this.canvas.width) blob.vx *= -1;
            if (blob.y < 0 || blob.y > this.canvas.height) blob.vy *= -1;

            // Update morph points
            for (let i = 0; i < blob.points.length; i++) {
                const point = blob.points[i];
                const variation = Math.sin(time * blob.morphSpeed * 10 + i) * point.variation;
                point.targetRadius = blob.radius + variation;
                point.radius += (point.targetRadius - point.radius) * 0.1;
            }

            // Draw blob
            this.ctx.beginPath();

            for (let i = 0; i < blob.points.length; i++) {
                const point = blob.points[i];
                const nextPoint = blob.points[(i + 1) % blob.points.length];

                const x = blob.x + Math.cos(point.angle) * point.radius;
                const y = blob.y + Math.sin(point.angle) * point.radius;
                const nextX = blob.x + Math.cos(nextPoint.angle) * nextPoint.radius;
                const nextY = blob.y + Math.sin(nextPoint.angle) * nextPoint.radius;

                // Control point for smooth curves
                const cpX = (x + nextX) / 2 + Math.sin(time + i) * 20;
                const cpY = (y + nextY) / 2 + Math.cos(time + i) * 20;

                if (i === 0) {
                    this.ctx.moveTo(x, y);
                }

                this.ctx.quadraticCurveTo(cpX, cpY, nextX, nextY);
            }

            this.ctx.closePath();

            // Gradient fill
            const gradient = this.ctx.createRadialGradient(
                blob.x, blob.y, 0,
                blob.x, blob.y, blob.radius
            );
            gradient.addColorStop(0, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${blob.color.a * 1.5})`);
            gradient.addColorStop(0.5, `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, ${blob.color.a})`);
            gradient.addColorStop(1, 'transparent');

            this.ctx.fillStyle = gradient;
            this.ctx.fill();

            // Glow effect
            this.ctx.shadowBlur = 50;
            this.ctx.shadowColor = `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0.5)`;
            this.ctx.strokeStyle = `rgba(${blob.color.r}, ${blob.color.g}, ${blob.color.b}, 0.3)`;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            this.ctx.shadowBlur = 0;
        }
    }

    explode() {
        for (const blob of this.blobs) {
            blob.vx = (Math.random() - 0.5) * 5;
            blob.vy = (Math.random() - 0.5) * 5;

            for (const point of blob.points) {
                point.variation = 50 + Math.random() * 100;
            }
        }
    }
}

// Initialize
if (document.getElementById('liquid-canvas')) {
    window.liquidMorph = new LiquidMorph();
}
