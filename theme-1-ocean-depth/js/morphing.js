// BLOB MORPHING - Canvas-based morphing blobs for portfolio

class BlobMorph {
    constructor(element) {
        this.element = element;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.element.appendChild(this.canvas);

        this.points = [];
        this.pointCount = 8;
        this.radius = 100;
        this.centerX = 0;
        this.centerY = 0;

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Create initial blob points
        for (let i = 0; i < this.pointCount; i++) {
            const angle = (i / this.pointCount) * Math.PI * 2;
            this.points.push({
                angle: angle,
                radius: this.radius,
                targetRadius: this.radius,
                speed: 0.02 + Math.random() * 0.02
            });
        }

        this.animate();
    }

    resize() {
        this.canvas.width = this.element.clientWidth;
        this.canvas.height = this.element.clientHeight;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.radius = Math.min(this.canvas.width, this.canvas.height) * 0.3;
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update points
        const time = Date.now() * 0.001;
        for (let i = 0; i < this.points.length; i++) {
            const point = this.points[i];
            const variation = Math.sin(time * point.speed + i) * 20;
            point.targetRadius = this.radius + variation;
            point.radius += (point.targetRadius - point.radius) * 0.1;
        }

        // Draw blob
        this.ctx.beginPath();

        for (let i = 0; i < this.points.length; i++) {
            const point = this.points[i];
            const nextPoint = this.points[(i + 1) % this.points.length];

            const x = this.centerX + Math.cos(point.angle) * point.radius;
            const y = this.centerY + Math.sin(point.angle) * point.radius;
            const nextX = this.centerX + Math.cos(nextPoint.angle) * nextPoint.radius;
            const nextY = this.centerY + Math.sin(nextPoint.angle) * nextPoint.radius;

            const cpX = (x + nextX) / 2 + Math.sin(time + i) * 10;
            const cpY = (y + nextY) / 2 + Math.cos(time + i) * 10;

            if (i === 0) {
                this.ctx.moveTo(x, y);
            }

            this.ctx.quadraticCurveTo(cpX, cpY, nextX, nextY);
        }

        this.ctx.closePath();

        // Gradient fill
        const gradient = this.ctx.createRadialGradient(
            this.centerX, this.centerY, 0,
            this.centerX, this.centerY, this.radius
        );
        gradient.addColorStop(0, 'rgba(77, 184, 168, 0.3)');
        gradient.addColorStop(1, 'rgba(52, 152, 219, 0.1)');

        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        // Stroke
        this.ctx.strokeStyle = 'rgba(77, 184, 168, 0.5)';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    morph(newShape) {
        // Change blob shape dramatically
        for (const point of this.points) {
            point.targetRadius = this.radius * (0.5 + Math.random());
            point.speed = 0.05 + Math.random() * 0.05;
        }
    }
}

// Initialize blobs for all project mockups
document.querySelectorAll('[data-morph]').forEach(el => {
    new BlobMorph(el);
});
