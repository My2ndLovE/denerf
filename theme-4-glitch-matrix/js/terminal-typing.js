// TERMINAL TYPING - Typing effect for terminal text

class TerminalTyping {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        // Find all typing elements
        const typingElements = document.querySelectorAll('.typing-text');

        typingElements.forEach(el => {
            const text = el.textContent;
            el.textContent = '';
            el.dataset.fullText = text;

            this.elements.push({
                element: el,
                text: text,
                index: 0,
                speed: 50 + Math.random() * 50,
                lastUpdate: 0
            });
        });

        // Start typing when elements come into view
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const typingEl = this.elements.find(el => el.element === entry.target);
                    if (typingEl && typingEl.index === 0) {
                        this.typeElement(typingEl);
                    }
                }
            });
        }, { threshold: 0.5 });

        this.elements.forEach(el => {
            observer.observe(el.element);
        });
    }

    typeElement(typingEl) {
        const type = () => {
            if (typingEl.index < typingEl.text.length) {
                typingEl.element.textContent += typingEl.text[typingEl.index];
                typingEl.index++;

                setTimeout(type, typingEl.speed);
            }
        };

        type();
    }

    typeText(element, text, speed = 50) {
        let index = 0;
        element.textContent = '';

        const type = () => {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
                setTimeout(type, speed);
            }
        };

        type();
    }
}

// Glitch text effect for hero
class GlitchText {
    constructor() {
        this.container = document.getElementById('glitch-text-container');
        if (!this.container) return;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);

        this.text = 'DENERF';
        this.particles = [];

        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.createTextParticles();
        this.animate();
    }

    resize() {
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
    }

    createTextParticles() {
        this.particles = [];

        // Create temporary canvas for text
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = this.canvas.width;
        tempCanvas.height = this.canvas.height;

        tempCtx.font = 'bold 200px Orbitron';
        tempCtx.textAlign = 'center';
        tempCtx.textBaseline = 'middle';
        tempCtx.fillStyle = 'white';
        tempCtx.fillText(this.text, tempCanvas.width / 2, tempCanvas.height / 2);

        // Sample pixels
        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const spacing = 8;

        for (let y = 0; y < tempCanvas.height; y += spacing) {
            for (let x = 0; x < tempCanvas.width; x += spacing) {
                const index = (y * tempCanvas.width + x) * 4;
                const alpha = imageData.data[index + 3];

                if (alpha > 128) {
                    this.particles.push({
                        x: x,
                        y: y,
                        targetX: x,
                        targetY: y,
                        vx: 0,
                        vy: 0,
                        size: 2 + Math.random() * 2,
                        glitchOffset: Math.random() * 10,
                        glitchSpeed: Math.random() * 0.1
                    });
                }
            }
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const time = Date.now() * 0.001;

        for (const particle of this.particles) {
            // Glitch effect
            const glitchX = Math.sin(time * particle.glitchSpeed + particle.glitchOffset) * 5;
            const glitchY = Math.cos(time * particle.glitchSpeed + particle.glitchOffset) * 2;

            const x = particle.x + glitchX;
            const y = particle.y + glitchY;

            // Draw particle with RGB split
            if (Math.random() > 0.97) {
                // Green
                this.ctx.fillStyle = '#00ff41';
                this.ctx.fillRect(x, y, particle.size, particle.size);

                // Pink offset
                this.ctx.fillStyle = '#ff006e';
                this.ctx.fillRect(x + 2, y, particle.size, particle.size);

                // Cyan offset
                this.ctx.fillStyle = '#00d9ff';
                this.ctx.fillRect(x - 2, y, particle.size, particle.size);
            } else {
                this.ctx.fillStyle = '#00ff41';
                this.ctx.fillRect(x, y, particle.size, particle.size);
            }
        }
    }

    scramble() {
        for (const particle of this.particles) {
            particle.glitchOffset = Math.random() * 10;
            particle.glitchSpeed = Math.random() * 0.2;
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.terminalTyping = new TerminalTyping();

    if (document.getElementById('glitch-text-container')) {
        window.glitchText = new GlitchText();
    }
});
