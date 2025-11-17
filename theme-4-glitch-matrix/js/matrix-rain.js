// MATRIX RAIN - Classic matrix falling code effect

class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-rain-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.columns = [];
        this.fontSize = 14;
        this.columnCount = 0;

        // Matrix characters
        this.chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.columnCount = Math.floor(this.canvas.width / this.fontSize);
        this.columns = [];

        // Initialize columns
        for (let i = 0; i < this.columnCount; i++) {
            this.columns[i] = {
                y: Math.random() * this.canvas.height,
                speed: 0.5 + Math.random() * 1.5,
                length: 10 + Math.random() * 20,
                chars: []
            };

            // Initialize characters for this column
            for (let j = 0; j < this.columns[i].length; j++) {
                this.columns[i].chars[j] = this.chars[Math.floor(Math.random() * this.chars.length)];
            }
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Fade effect
        this.ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.font = `${this.fontSize}px 'Share Tech Mono', monospace`;

        // Draw and update columns
        for (let i = 0; i < this.columns.length; i++) {
            const column = this.columns[i];

            // Update column position
            column.y += column.speed;

            // Reset if column goes off screen
            if (column.y > this.canvas.height + column.length * this.fontSize) {
                column.y = -column.length * this.fontSize;
                column.speed = 0.5 + Math.random() * 1.5;
            }

            // Randomly change characters
            if (Math.random() > 0.95) {
                const charIndex = Math.floor(Math.random() * column.chars.length);
                column.chars[charIndex] = this.chars[Math.floor(Math.random() * this.chars.length)];
            }

            // Draw characters
            for (let j = 0; j < column.chars.length; j++) {
                const char = column.chars[j];
                const x = i * this.fontSize;
                const y = column.y - j * this.fontSize;

                if (y < 0 || y > this.canvas.height) continue;

                // Brightest character at the head
                if (j === 0) {
                    // Hot pink highlight for head
                    if (Math.random() > 0.95) {
                        this.ctx.fillStyle = '#ff006e';
                        this.ctx.shadowBlur = 10;
                        this.ctx.shadowColor = '#ff006e';
                    } else {
                        this.ctx.fillStyle = '#00ff41';
                        this.ctx.shadowBlur = 15;
                        this.ctx.shadowColor = '#00ff41';
                    }
                } else {
                    // Fade out for tail
                    const opacity = 1 - (j / column.chars.length);
                    this.ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;
                    this.ctx.shadowBlur = 5;
                    this.ctx.shadowColor = `rgba(0, 255, 65, ${opacity})`;
                }

                this.ctx.fillText(char, x, y);
            }

            this.ctx.shadowBlur = 0;
        }
    }

    burst(x, y) {
        // Create burst of new columns at position
        const columnIndex = Math.floor(x / this.fontSize);

        for (let i = -2; i <= 2; i++) {
            const index = columnIndex + i;
            if (index >= 0 && index < this.columns.length) {
                this.columns[index].y = y;
                this.columns[index].speed = 2 + Math.random() * 3;
            }
        }
    }
}

// Initialize
if (document.getElementById('matrix-rain-canvas')) {
    window.matrixRain = new MatrixRain();
}
