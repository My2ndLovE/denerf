// GLITCH EFFECT - Enhanced realistic glitch distortions

class GlitchEffect {
    constructor() {
        this.canvas = document.getElementById('glitch-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.glitchActive = false;
        this.glitchIntensity = 0;
        this.rafId = null;
        this.lastTime = 0;

        // Mobile optimization
        this.isMobile = window.innerWidth < 768;
        this.fps = this.isMobile ? 24 : 60;
        this.frameInterval = 1000 / this.fps;

        // Scan line effect
        this.scanlineY = 0;
        this.scanlineSpeed = 2;

        this.init();
    }

    init() {
        this.resize();

        this.resizeHandler = () => {
            this.resize();
            this.isMobile = window.innerWidth < 768;
            this.fps = this.isMobile ? 24 : 60;
            this.frameInterval = 1000 / this.fps;
        };

        window.addEventListener('resize', this.resizeHandler);

        // Random glitch intervals (less frequent on mobile)
        this.glitchInterval = setInterval(() => this.randomGlitch(), this.isMobile ? 5000 : 3000);

        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    randomGlitch() {
        if (Math.random() > 0.6) {
            this.trigger(0.4 + Math.random() * 0.6);
        }
    }

    trigger(intensity = 1) {
        this.glitchActive = true;
        this.glitchIntensity = intensity;

        setTimeout(() => {
            this.glitchActive = false;
        }, 80 + Math.random() * 150);
    }

    animate(currentTime = 0) {
        this.rafId = requestAnimationFrame((time) => this.animate(time));

        // FPS throttling
        const deltaTime = currentTime - this.lastTime;
        if (deltaTime < this.frameInterval) return;

        this.lastTime = currentTime - (deltaTime % this.frameInterval);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // CRT scan line effect (always visible)
        if (!this.isMobile) {
            this.drawScanline();
        }

        // Subtle horizontal scan lines
        if (!this.isMobile && Math.random() > 0.97) {
            this.drawCRTLines();
        }

        if (!this.glitchActive) return;

        const sliceCount = Math.floor(4 + Math.random() * 8);
        const sliceHeight = this.canvas.height / sliceCount;

        for (let i = 0; i < sliceCount; i++) {
            if (Math.random() > 0.4) {
                const y = i * sliceHeight;

                // Horizontal displacement (VHS-style)
                if (Math.random() > 0.6) {
                    const offsetX = (Math.random() - 0.5) * 30 * this.glitchIntensity;

                    // RGB chromatic aberration
                    if (Math.random() > 0.7) {
                        // Red channel
                        this.ctx.fillStyle = `rgba(255, 0, 110, ${0.15 * this.glitchIntensity})`;
                        this.ctx.fillRect(offsetX + 2, y, this.canvas.width, sliceHeight);

                        // Green channel
                        this.ctx.fillStyle = `rgba(0, 255, 65, ${0.15 * this.glitchIntensity})`;
                        this.ctx.fillRect(offsetX - 2, y, this.canvas.width, sliceHeight);

                        // Blue channel
                        this.ctx.fillStyle = `rgba(0, 217, 255, ${0.1 * this.glitchIntensity})`;
                        this.ctx.fillRect(offsetX, y, this.canvas.width, sliceHeight);
                    }

                    // Digital block artifacts
                    if (Math.random() > 0.85) {
                        const blockCount = Math.floor(2 + Math.random() * 4);
                        for (let b = 0; b < blockCount; b++) {
                            const blockWidth = Math.random() * 150 + 30;
                            const blockX = Math.random() * (this.canvas.width - blockWidth);
                            const blockHeight = Math.random() * sliceHeight;

                            this.ctx.fillStyle = Math.random() > 0.5 ? '#00ff41' : '#ff006e';
                            this.ctx.globalAlpha = (0.08 + Math.random() * 0.12) * this.glitchIntensity;
                            this.ctx.fillRect(blockX + offsetX, y, blockWidth, blockHeight);
                        }
                        this.ctx.globalAlpha = 1;
                    }
                }

                // Horizontal glitch lines
                if (Math.random() > 0.8) {
                    const lineCount = Math.floor(1 + Math.random() * 3);
                    for (let l = 0; l < lineCount; l++) {
                        const lineY = y + Math.random() * sliceHeight;
                        const lineWidth = Math.random() * 3 + 1;

                        this.ctx.strokeStyle = Math.random() > 0.5 ? '#00ff41' : '#ff006e';
                        this.ctx.lineWidth = lineWidth;
                        this.ctx.globalAlpha = (0.2 + Math.random() * 0.3) * this.glitchIntensity;

                        this.ctx.beginPath();
                        this.ctx.moveTo(0, lineY);
                        this.ctx.lineTo(this.canvas.width, lineY);
                        this.ctx.stroke();
                    }
                    this.ctx.globalAlpha = 1;
                }

                // Pixelated blocks
                if (Math.random() > 0.9 && !this.isMobile) {
                    const pixelSize = 4 + Math.random() * 6;
                    const pixelBlockWidth = Math.random() * 100 + 50;
                    const pixelX = Math.random() * (this.canvas.width - pixelBlockWidth);

                    for (let px = 0; px < pixelBlockWidth; px += pixelSize) {
                        for (let py = 0; py < sliceHeight; py += pixelSize) {
                            if (Math.random() > 0.7) {
                                this.ctx.fillStyle = Math.random() > 0.5 ? '#00ff41' : '#ff006e';
                                this.ctx.globalAlpha = (0.1 + Math.random() * 0.2) * this.glitchIntensity;
                                this.ctx.fillRect(pixelX + px, y + py, pixelSize, pixelSize);
                            }
                        }
                    }
                    this.ctx.globalAlpha = 1;
                }
            }
        }

        // Full screen flash (intense glitches)
        if (this.glitchIntensity > 0.8 && Math.random() > 0.93) {
            this.ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0, 255, 65, 0.08)' : 'rgba(255, 0, 110, 0.08)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }

        // Vertical displacement bars
        if (Math.random() > 0.92) {
            const barWidth = 20 + Math.random() * 100;
            const barX = Math.random() * (this.canvas.width - barWidth);

            this.ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '0, 255, 65' : '255, 0, 110'}, ${0.1 * this.glitchIntensity})`;
            this.ctx.fillRect(barX, 0, barWidth, this.canvas.height);
        }
    }

    drawScanline() {
        // Moving CRT scan line
        this.scanlineY += this.scanlineSpeed;
        if (this.scanlineY > this.canvas.height) {
            this.scanlineY = 0;
        }

        // Bright scan line
        const gradient = this.ctx.createLinearGradient(0, this.scanlineY - 2, 0, this.scanlineY + 2);
        gradient.addColorStop(0, 'rgba(0, 255, 65, 0)');
        gradient.addColorStop(0.5, 'rgba(0, 255, 65, 0.05)');
        gradient.addColorStop(1, 'rgba(0, 255, 65, 0)');

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, this.scanlineY - 2, this.canvas.width, 4);
    }

    drawCRTLines() {
        // Horizontal CRT lines
        const lineSpacing = 3;
        this.ctx.globalAlpha = 0.03;
        this.ctx.fillStyle = '#000000';

        for (let y = 0; y < this.canvas.height; y += lineSpacing * 2) {
            this.ctx.fillRect(0, y, this.canvas.width, lineSpacing);
        }

        this.ctx.globalAlpha = 1;
    }

    explode() {
        // Intense glitch explosion sequence
        this.trigger(1.5);

        setTimeout(() => this.trigger(1.3), 80);
        setTimeout(() => this.trigger(1.1), 160);
        setTimeout(() => this.trigger(0.9), 240);
        setTimeout(() => this.trigger(0.6), 320);
    }

    destroy() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }

        if (this.glitchInterval) {
            clearInterval(this.glitchInterval);
        }

        window.removeEventListener('resize', this.resizeHandler);
    }
}

// Initialize with error handling
try {
    if (document.getElementById('glitch-canvas')) {
        window.glitchEffect = new GlitchEffect();
    }
} catch (error) {
    console.error('Glitch effect initialization failed:', error);
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.glitchEffect && window.glitchEffect.destroy) {
        window.glitchEffect.destroy();
    }
});
