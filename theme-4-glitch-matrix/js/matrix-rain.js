// MATRIX RAIN - Enhanced realistic matrix falling code effect

class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-rain-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.columns = [];
        this.fontSize = 14;
        this.columnCount = 0;
        this.rafId = null;
        this.lastTime = 0;

        // Mobile optimization
        this.isMobile = window.innerWidth < 768;
        this.fps = this.isMobile ? 24 : 60;
        this.frameInterval = 1000 / this.fps;

        // Authentic Matrix characters - katakana, Latin, numbers, symbols
        this.chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%^&*()_+-=[]{}|;:,.<>?/~`';

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

        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Reduce column count on mobile
        const columnSpacing = this.isMobile ? this.fontSize * 1.5 : this.fontSize;
        this.columnCount = Math.floor(this.canvas.width / columnSpacing);
        this.columns = [];

        // Initialize columns with variation
        for (let i = 0; i < this.columnCount; i++) {
            this.columns[i] = {
                y: Math.random() * this.canvas.height - this.canvas.height,
                speed: 0.5 + Math.random() * 2,
                length: 8 + Math.random() * 15, // Variable lengths
                chars: [],
                active: Math.random() > 0.3, // Random gaps in columns
                flicker: Math.random() > 0.8, // Some columns flicker
                brightness: 0.7 + Math.random() * 0.3 // Variable brightness
            };

            // Initialize characters for this column
            for (let j = 0; j < this.columns[i].length; j++) {
                this.columns[i].chars[j] = {
                    char: this.chars[Math.floor(Math.random() * this.chars.length)],
                    changeRate: Math.random() * 0.1 // Individual char change rate
                };
            }
        }
    }

    animate(currentTime = 0) {
        this.rafId = requestAnimationFrame((time) => this.animate(time));

        // FPS throttling
        const deltaTime = currentTime - this.lastTime;
        if (deltaTime < this.frameInterval) return;

        this.lastTime = currentTime - (deltaTime % this.frameInterval);

        // Fade effect for trail
        this.ctx.fillStyle = 'rgba(10, 14, 39, 0.08)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.font = `${this.fontSize}px 'Share Tech Mono', monospace`;

        const time = currentTime * 0.001;

        // Draw and update columns
        for (let i = 0; i < this.columns.length; i++) {
            const column = this.columns[i];

            // Skip inactive columns (creates gaps)
            if (!column.active) {
                if (Math.random() > 0.99) {
                    column.active = true;
                    column.y = -column.length * this.fontSize;
                }
                continue;
            }

            // Update column position
            column.y += column.speed;

            // Reset if column goes off screen
            if (column.y > this.canvas.height + column.length * this.fontSize) {
                column.y = -column.length * this.fontSize;
                column.speed = 0.5 + Math.random() * 2;
                column.active = Math.random() > 0.2; // Sometimes go inactive
                column.brightness = 0.7 + Math.random() * 0.3;

                // Reassign characters
                for (let j = 0; j < column.chars.length; j++) {
                    column.chars[j].char = this.chars[Math.floor(Math.random() * this.chars.length)];
                    column.chars[j].changeRate = Math.random() * 0.1;
                }
            }

            // Flicker effect
            if (column.flicker && Math.random() > 0.97) {
                continue; // Skip frame for flicker
            }

            // Draw characters
            for (let j = 0; j < column.chars.length; j++) {
                const charData = column.chars[j];
                const x = i * (this.isMobile ? this.fontSize * 1.5 : this.fontSize);
                const y = column.y - j * this.fontSize;

                if (y < 0 || y > this.canvas.height) continue;

                // Randomly change characters
                if (Math.random() < charData.changeRate) {
                    charData.char = this.chars[Math.floor(Math.random() * this.chars.length)];
                }

                // Variable brightness and glow
                if (j === 0) {
                    // Head - brightest with occasional hot pink
                    if (Math.random() > 0.97) {
                        this.ctx.fillStyle = '#ff006e';
                        this.ctx.shadowBlur = this.isMobile ? 5 : 12;
                        this.ctx.shadowColor = '#ff006e';
                    } else {
                        this.ctx.fillStyle = '#ffffff';
                        this.ctx.shadowBlur = this.isMobile ? 8 : 18;
                        this.ctx.shadowColor = '#00ff41';
                    }
                } else if (j === 1) {
                    // Second brightest
                    this.ctx.fillStyle = '#d0ffd6';
                    this.ctx.shadowBlur = this.isMobile ? 5 : 12;
                    this.ctx.shadowColor = '#00ff41';
                } else {
                    // Fade out tail with variable brightness
                    const baseFade = 1 - (j / column.chars.length);
                    const opacity = baseFade * column.brightness;
                    const green = Math.floor(255 * opacity);
                    this.ctx.fillStyle = `rgba(0, ${green}, 65, ${opacity})`;
                    this.ctx.shadowBlur = this.isMobile ? 2 : (5 * opacity);
                    this.ctx.shadowColor = `rgba(0, 255, 65, ${opacity * 0.8})`;
                }

                this.ctx.fillText(charData.char, x, y);

                // Occasional bright flashes on random characters
                if (Math.random() > 0.998) {
                    this.ctx.fillStyle = '#ffffff';
                    this.ctx.shadowBlur = this.isMobile ? 10 : 20;
                    this.ctx.shadowColor = '#00ff41';
                    this.ctx.fillText(charData.char, x, y);
                }
            }

            this.ctx.shadowBlur = 0;
        }
    }

    burst(x, y) {
        // Create burst of new columns at position
        const columnSpacing = this.isMobile ? this.fontSize * 1.5 : this.fontSize;
        const columnIndex = Math.floor(x / columnSpacing);

        for (let i = -3; i <= 3; i++) {
            const index = columnIndex + i;
            if (index >= 0 && index < this.columns.length) {
                this.columns[index].y = y;
                this.columns[index].speed = 3 + Math.random() * 4;
                this.columns[index].active = true;
                this.columns[index].brightness = 1;
            }
        }
    }

    destroy() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }

        window.removeEventListener('resize', this.resizeHandler);
        this.columns = [];
    }
}

// Initialize with error handling
try {
    if (document.getElementById('matrix-rain-canvas')) {
        window.matrixRain = new MatrixRain();
    }
} catch (error) {
    console.error('Matrix rain initialization failed:', error);
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.matrixRain && window.matrixRain.destroy) {
        window.matrixRain.destroy();
    }
});
