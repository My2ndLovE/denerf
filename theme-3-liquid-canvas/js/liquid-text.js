// LIQUID TEXT - Optimized liquid morphing text effect

class LiquidText {
    constructor() {
        this.container = document.getElementById('liquid-text-container');
        if (!this.container) return;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);

        this.drops = [];
        this.text = 'DENERF';
        this.mouse = { x: 0, y: 0 };
        this.rafId = null;
        this.lastTime = 0;

        // Mobile optimization
        this.isMobile = window.innerWidth < 768;
        this.fontSize = this.isMobile ? 100 : 180;
        this.fps = this.isMobile ? 24 : 60;
        this.frameInterval = 1000 / this.fps;

        this.init();
    }

    init() {
        this.resize();

        this.resizeHandler = () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                this.resize();
                this.isMobile = window.innerWidth < 768;
                this.fontSize = this.isMobile ? 100 : 180;
            }, 250);
        };

        window.addEventListener('resize', this.resizeHandler);

        // Only track mouse on desktop
        if (!this.isMobile) {
            this.mouseMoveHandler = (e) => {
                const rect = this.canvas.getBoundingClientRect();
                this.mouse.x = e.clientX - rect.left;
                this.mouse.y = e.clientY - rect.top;
            };
            window.addEventListener('mousemove', this.mouseMoveHandler);
        }

        this.createLiquidText();
        this.animate();
    }

    resize() {
        const rect = this.container.getBoundingClientRect();

        // Lower resolution on mobile
        const scale = this.isMobile ? 0.7 : 1;
        this.canvas.width = rect.width * scale;
        this.canvas.height = rect.height * scale;

        if (scale !== 1) {
            this.ctx.scale(scale, scale);
        }

        this.width = rect.width;
        this.height = rect.height;

        this.createLiquidText();
    }

    createLiquidText() {
        this.drops = [];

        // Create temporary canvas for text
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = this.width;
        tempCanvas.height = this.height;

        tempCtx.font = `bold ${this.fontSize}px 'Playfair Display', serif`;
        tempCtx.textAlign = 'center';
        tempCtx.textBaseline = 'middle';
        tempCtx.fillStyle = 'white';
        tempCtx.fillText(this.text, tempCanvas.width / 2, tempCanvas.height / 2);

        // Sample pixels to create liquid drops (reduced spacing)
        const spacing = this.isMobile ? 15 : 10; // Reduced from 6

        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);

        for (let y = 0; y < tempCanvas.height; y += spacing) {
            for (let x = 0; x < tempCanvas.width; x += spacing) {
                const index = (y * tempCanvas.width + x) * 4;
                const alpha = imageData.data[index + 3];

                if (alpha > 128) {
                    this.drops.push({
                        x: x,
                        y: y,
                        targetX: x,
                        targetY: y,
                        vx: 0,
                        vy: 0,
                        size: 3 + Math.random() * 2,
                        mass: 0.8 + Math.random() * 0.4,
                        damping: 0.85 + Math.random() * 0.1,
                        springStrength: 0.03 + Math.random() * 0.02,
                        color: this.getRandomColor(),
                        connections: 0 // Track connections
                    });
                }
            }
        }
    }

    getRandomColor() {
        const colors = [
            { r: 255, g: 107, b: 53 },  // Orange primary
            { r: 255, g: 140, b: 66 },  // Orange light
            { r: 255, g: 210, b: 63 },  // Yellow accent
            { r: 255, g: 229, b: 93 }   // Yellow light
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate(currentTime = 0) {
        this.rafId = requestAnimationFrame((time) => this.animate(time));

        // FPS throttling
        const deltaTime = currentTime - this.lastTime;
        if (deltaTime < this.frameInterval) return;

        this.lastTime = currentTime - (deltaTime % this.frameInterval);

        this.ctx.clearRect(0, 0, this.width, this.height);

        const time = currentTime * 0.001;

        // Reset connection counts
        for (const drop of this.drops) {
            drop.connections = 0;
        }

        // Update drops
        const maxInteractions = this.isMobile ? 1 : 2; // Limit inter-drop physics

        for (let i = 0; i < this.drops.length; i++) {
            const drop = this.drops[i];

            // Mouse interaction (desktop only)
            if (!this.isMobile) {
                const dx = this.mouse.x - drop.x;
                const dy = this.mouse.y - drop.y;
                const distSq = dx * dx + dy * dy;

                if (distSq < 14400) { // 120^2
                    const distance = Math.sqrt(distSq);
                    const force = (120 - distance) / 120 * 0.8;
                    drop.vx -= (dx / distance) * force / drop.mass;
                    drop.vy -= (dy / distance) * force / drop.mass;
                }
            }

            // Spring back to target position
            const tdx = drop.targetX - drop.x;
            const tdy = drop.targetY - drop.y;
            drop.vx += tdx * drop.springStrength;
            drop.vy += tdy * drop.springStrength;

            // Organic wave motion
            const waveX = Math.sin(time + i * 0.1) * 0.5;
            const waveY = Math.cos(time + i * 0.15) * 0.5;
            drop.vx += waveX;
            drop.vy += waveY;

            // Gravity simulation
            drop.vy += 0.05;

            // Inter-drop repulsion (limited for performance)
            let interactions = 0;
            for (let j = i + 1; j < this.drops.length; j++) {
                if (interactions >= maxInteractions) break;

                const other = this.drops[j];
                const dx = other.x - drop.x;
                const dy = other.y - drop.y;
                const distSq = dx * dx + dy * dy;

                if (distSq < 225 && distSq > 0) { // 15^2
                    const distance = Math.sqrt(distSq);
                    const force = (15 - distance) / 15 * 0.1;
                    const fx = (dx / distance) * force;
                    const fy = (dy / distance) * force;

                    drop.vx -= fx / drop.mass;
                    drop.vy -= fy / drop.mass;
                    other.vx += fx / other.mass;
                    other.vy += fy / other.mass;

                    interactions++;
                }
            }

            // Update position
            drop.x += drop.vx;
            drop.y += drop.vy;

            // Damping
            drop.vx *= drop.damping;
            drop.vy *= drop.damping;

            // Draw drop (simplified, no gradient)
            const opacity = 0.7 + Math.sin(time * 2 + i * 0.5) * 0.3;

            this.ctx.beginPath();
            this.ctx.arc(drop.x, drop.y, drop.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${drop.color.r}, ${drop.color.g}, ${drop.color.b}, ${opacity})`;
            this.ctx.fill();

            // Draw connections between nearby drops (limited)
            const maxConnections = this.isMobile ? 0 : 2; // No connections on mobile

            if (drop.connections < maxConnections) {
                for (let j = i + 1; j < this.drops.length; j++) {
                    if (drop.connections >= maxConnections) break;

                    const other = this.drops[j];
                    if (other.connections >= maxConnections) continue;

                    const dx = other.x - drop.x;
                    const dy = other.y - drop.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < 625) { // 25^2
                        const distance = Math.sqrt(distSq);
                        this.ctx.beginPath();
                        this.ctx.moveTo(drop.x, drop.y);
                        this.ctx.lineTo(other.x, other.y);
                        const lineOpacity = (1 - distance / 25) * 0.2;
                        this.ctx.strokeStyle = `rgba(255, 107, 53, ${lineOpacity})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.stroke();

                        drop.connections++;
                        other.connections++;
                    }
                }
            }
        }
    }

    explode() {
        // Create explosion effect
        for (const drop of this.drops) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 5 + Math.random() * 10;
            drop.vx = Math.cos(angle) * speed;
            drop.vy = Math.sin(angle) * speed;
        }
    }

    reset() {
        // Reset all drops to original positions
        for (const drop of this.drops) {
            drop.x = drop.targetX;
            drop.y = drop.targetY;
            drop.vx = 0;
            drop.vy = 0;
        }
    }

    destroy() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }

        window.removeEventListener('resize', this.resizeHandler);

        if (!this.isMobile) {
            window.removeEventListener('mousemove', this.mouseMoveHandler);
        }

        clearTimeout(this.resizeTimeout);
        this.drops = [];
    }
}

// Initialize with error handling
try {
    if (document.getElementById('liquid-text-container')) {
        window.liquidText = new LiquidText();
    }
} catch (error) {
    console.error('Liquid text initialization failed:', error);
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.liquidText && window.liquidText.destroy) {
        window.liquidText.destroy();
    }
});
