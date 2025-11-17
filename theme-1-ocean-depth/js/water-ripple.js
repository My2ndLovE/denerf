// WATER RIPPLE EFFECT - Canvas-based water simulation

class WaterRipple {
    constructor() {
        this.canvas = document.getElementById('water-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.ripples = [];
        this.maxRipples = 5;

        this.resize();
        this.init();
    }

    init() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => this.addRipple(e.clientX, e.clientY));
        window.addEventListener('click', (e) => this.addRipple(e.clientX, e.clientY, true));

        // Auto-generate ambient ripples
        setInterval(() => {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            this.addRipple(x, y, false, 0.3);
        }, 3000);

        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    addRipple(x, y, strong = false, opacity = 0.6) {
        if (this.ripples.length >= this.maxRipples) {
            this.ripples.shift();
        }

        this.ripples.push({
            x: x,
            y: y,
            radius: 0,
            maxRadius: strong ? 300 : 200,
            opacity: opacity,
            speed: strong ? 3 : 1.5,
            lineWidth: strong ? 3 : 2
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw gradient overlay
        const gradient = this.ctx.createRadialGradient(
            this.canvas.width / 2,
            this.canvas.height / 2,
            0,
            this.canvas.width / 2,
            this.canvas.height / 2,
            this.canvas.width / 2
        );
        gradient.addColorStop(0, 'rgba(77, 184, 168, 0.05)');
        gradient.addColorStop(1, 'transparent');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw ripples
        for (let i = this.ripples.length - 1; i >= 0; i--) {
            const ripple = this.ripples[i];

            ripple.radius += ripple.speed;
            ripple.opacity -= 0.01;

            if (ripple.opacity <= 0 || ripple.radius >= ripple.maxRadius) {
                this.ripples.splice(i, 1);
                continue;
            }

            // Draw ripple
            this.ctx.beginPath();
            this.ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
            this.ctx.strokeStyle = `rgba(77, 184, 168, ${ripple.opacity})`;
            this.ctx.lineWidth = ripple.lineWidth;
            this.ctx.stroke();

            // Draw inner glow
            this.ctx.beginPath();
            this.ctx.arc(ripple.x, ripple.y, ripple.radius * 0.8, 0, Math.PI * 2);
            this.ctx.strokeStyle = `rgba(113, 178, 128, ${ripple.opacity * 0.5})`;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }
    }

    createWavePattern() {
        const time = Date.now() * 0.001;

        for (let x = 0; x < this.canvas.width; x += 50) {
            const y = this.canvas.height / 2 + Math.sin(x * 0.01 + time) * 30;
            this.ctx.fillStyle = `rgba(77, 184, 168, 0.1)`;
            this.ctx.fillRect(x, y, 2, 100);
        }
    }
}

// Initialize
if (document.getElementById('water-canvas')) {
    new WaterRipple();
}
