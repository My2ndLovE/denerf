// LIQUID TEXT - Liquid morphing text effect for hero

class LiquidText {
    constructor() {
        this.container = document.getElementById('liquid-text-container');
        if (!this.container) return;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);

        this.drops = [];
        this.text = 'DENERF';
        this.fontSize = 180;
        this.mouse = { x: 0, y: 0 };

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });

        this.createLiquidText();
        this.animate();
    }

    resize() {
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
        this.createLiquidText();
    }

    createLiquidText() {
        this.drops = [];

        // Create temporary canvas for text
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = this.canvas.width;
        tempCanvas.height = this.canvas.height;

        tempCtx.font = `bold ${this.fontSize}px 'Playfair Display', serif`;
        tempCtx.textAlign = 'center';
        tempCtx.textBaseline = 'middle';
        tempCtx.fillStyle = 'white';
        tempCtx.fillText(this.text, tempCanvas.width / 2, tempCanvas.height / 2);

        // Sample pixels to create liquid drops
        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const spacing = 6;

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
                        color: this.getRandomColor()
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

    animate() {
        requestAnimationFrame(() => this.animate());

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const time = Date.now() * 0.001;

        // Update drops
        for (let i = 0; i < this.drops.length; i++) {
            const drop = this.drops[i];

            // Mouse interaction
            const dx = this.mouse.x - drop.x;
            const dy = this.mouse.y - drop.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                const force = (120 - distance) / 120 * 0.8;
                drop.vx -= (dx / distance) * force / drop.mass;
                drop.vy -= (dy / distance) * force / drop.mass;
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

            // Update position
            drop.x += drop.vx;
            drop.y += drop.vy;

            // Damping
            drop.vx *= drop.damping;
            drop.vy *= drop.damping;

            // Inter-drop attraction/repulsion
            for (let j = i + 1; j < this.drops.length; j++) {
                const other = this.drops[j];
                const dx = other.x - drop.x;
                const dy = other.y - drop.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 15 && distance > 0) {
                    // Repulsion
                    const force = (15 - distance) / 15 * 0.1;
                    const fx = (dx / distance) * force;
                    const fy = (dy / distance) * force;

                    drop.vx -= fx / drop.mass;
                    drop.vy -= fy / drop.mass;
                    other.vx += fx / other.mass;
                    other.vy += fy / other.mass;
                }
            }

            // Draw drop
            const opacity = 0.7 + Math.sin(time * 2 + i * 0.5) * 0.3;

            // Main drop
            this.ctx.beginPath();
            this.ctx.arc(drop.x, drop.y, drop.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${drop.color.r}, ${drop.color.g}, ${drop.color.b}, ${opacity})`;
            this.ctx.fill();

            // Glow effect
            const gradient = this.ctx.createRadialGradient(
                drop.x, drop.y, 0,
                drop.x, drop.y, drop.size * 3
            );
            gradient.addColorStop(0, `rgba(${drop.color.r}, ${drop.color.g}, ${drop.color.b}, ${opacity * 0.5})`);
            gradient.addColorStop(1, 'transparent');
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(
                drop.x - drop.size * 3,
                drop.y - drop.size * 3,
                drop.size * 6,
                drop.size * 6
            );

            // Draw connections between nearby drops
            for (let j = i + 1; j < this.drops.length; j++) {
                const other = this.drops[j];
                const dx = other.x - drop.x;
                const dy = other.y - drop.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 25) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(drop.x, drop.y);
                    this.ctx.lineTo(other.x, other.y);
                    const lineOpacity = (1 - distance / 25) * 0.2;
                    this.ctx.strokeStyle = `rgba(255, 107, 53, ${lineOpacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
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
}

// Initialize
if (document.getElementById('liquid-text-container')) {
    window.liquidText = new LiquidText();
}
