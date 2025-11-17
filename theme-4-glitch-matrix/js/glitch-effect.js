// GLITCH EFFECT - Random glitch distortions

class GlitchEffect {
    constructor() {
        this.canvas = document.getElementById('glitch-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.glitchActive = false;
        this.glitchIntensity = 0;

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Random glitch intervals
        setInterval(() => this.randomGlitch(), 3000);

        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    randomGlitch() {
        if (Math.random() > 0.7) {
            this.trigger(0.5 + Math.random() * 0.5);
        }
    }

    trigger(intensity = 1) {
        this.glitchActive = true;
        this.glitchIntensity = intensity;

        setTimeout(() => {
            this.glitchActive = false;
        }, 100 + Math.random() * 200);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (!this.glitchActive) return;

        const sliceCount = Math.floor(5 + Math.random() * 10);
        const sliceHeight = this.canvas.height / sliceCount;

        for (let i = 0; i < sliceCount; i++) {
            if (Math.random() > 0.5) {
                const offsetX = (Math.random() - 0.5) * 20 * this.glitchIntensity;
                const y = i * sliceHeight;

                // RGB split effect
                if (Math.random() > 0.8) {
                    // Red channel
                    this.ctx.fillStyle = `rgba(255, 0, 110, ${0.1 * this.glitchIntensity})`;
                    this.ctx.fillRect(offsetX, y, this.canvas.width, sliceHeight);

                    // Green channel
                    this.ctx.fillStyle = `rgba(0, 255, 65, ${0.1 * this.glitchIntensity})`;
                    this.ctx.fillRect(-offsetX, y, this.canvas.width, sliceHeight);

                    // Blue channel
                    this.ctx.fillStyle = `rgba(0, 217, 255, ${0.1 * this.glitchIntensity})`;
                    this.ctx.fillRect(offsetX * 0.5, y, this.canvas.width, sliceHeight);
                }

                // Random noise blocks
                if (Math.random() > 0.9) {
                    const blockWidth = Math.random() * 200 + 50;
                    const blockX = Math.random() * (this.canvas.width - blockWidth);

                    this.ctx.fillStyle = Math.random() > 0.5 ? '#00ff41' : '#ff006e';
                    this.ctx.globalAlpha = 0.1 * this.glitchIntensity;
                    this.ctx.fillRect(blockX, y, blockWidth, sliceHeight);
                    this.ctx.globalAlpha = 1;
                }

                // Horizontal lines
                if (Math.random() > 0.85) {
                    this.ctx.strokeStyle = Math.random() > 0.5 ? '#00ff41' : '#ff006e';
                    this.ctx.lineWidth = 1 + Math.random() * 2;
                    this.ctx.globalAlpha = 0.3 * this.glitchIntensity;
                    this.ctx.beginPath();
                    this.ctx.moveTo(0, y + sliceHeight / 2);
                    this.ctx.lineTo(this.canvas.width, y + sliceHeight / 2);
                    this.ctx.stroke();
                    this.ctx.globalAlpha = 1;
                }
            }
        }

        // Full screen flash
        if (Math.random() > 0.95) {
            this.ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0, 255, 65, 0.05)' : 'rgba(255, 0, 110, 0.05)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    explode() {
        // Intense glitch explosion
        this.trigger(1.5);

        setTimeout(() => this.trigger(1.2), 100);
        setTimeout(() => this.trigger(0.8), 200);
        setTimeout(() => this.trigger(0.5), 300);
    }
}

// Initialize
if (document.getElementById('glitch-canvas')) {
    window.glitchEffect = new GlitchEffect();
}
