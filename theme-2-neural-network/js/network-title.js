// NETWORK TITLE - Animated title formed by network nodes

class NetworkTitle {
    constructor() {
        this.container = document.getElementById('hero-3d-text');
        if (!this.container) return;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);

        this.nodes = [];
        this.connections = [];
        this.text = 'DENERF';
        this.fontSize = 120;
        this.nodeSpacing = 8;
        this.mouse = { x: 0, y: 0 };
        this.targetNodes = [];

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

        this.createTextNodes();
        this.animate();
    }

    resize() {
        this.canvas.width = this.container.clientWidth;
        this.canvas.height = this.container.clientHeight;
        this.createTextNodes();
    }

    createTextNodes() {
        this.targetNodes = [];

        // Create temporary canvas to get text shape
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = this.canvas.width;
        tempCanvas.height = this.canvas.height;

        tempCtx.font = `bold ${this.fontSize}px 'Orbitron', monospace`;
        tempCtx.textAlign = 'center';
        tempCtx.textBaseline = 'middle';
        tempCtx.fillStyle = 'white';
        tempCtx.fillText(this.text, tempCanvas.width / 2, tempCanvas.height / 2);

        // Sample pixels to create nodes
        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);

        for (let y = 0; y < tempCanvas.height; y += this.nodeSpacing) {
            for (let x = 0; x < tempCanvas.width; x += this.nodeSpacing) {
                const index = (y * tempCanvas.width + x) * 4;
                const alpha = imageData.data[index + 3];

                if (alpha > 128) {
                    this.targetNodes.push({
                        x: x,
                        y: y
                    });
                }
            }
        }

        // Initialize nodes if first time
        if (this.nodes.length === 0) {
            this.nodes = this.targetNodes.map(target => ({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                targetX: target.x,
                targetY: target.y,
                vx: 0,
                vy: 0,
                size: 2,
                active: false
            }));
        } else {
            // Update targets for existing nodes
            this.nodes.forEach((node, i) => {
                if (this.targetNodes[i]) {
                    node.targetX = this.targetNodes[i].x;
                    node.targetY = this.targetNodes[i].y;
                }
            });
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update nodes
        for (const node of this.nodes) {
            // Mouse interaction
            const dx = this.mouse.x - node.x;
            const dy = this.mouse.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            node.active = distance < 100;

            if (distance < 80) {
                const force = (80 - distance) / 80;
                node.vx += (dx / distance) * force * 0.5;
                node.vy += (dy / distance) * force * 0.5;
            }

            // Spring force to target
            const tdx = node.targetX - node.x;
            const tdy = node.targetY - node.y;
            node.vx += tdx * 0.02;
            node.vy += tdy * 0.02;

            // Update position
            node.x += node.vx;
            node.y += node.vy;

            // Damping
            node.vx *= 0.85;
            node.vy *= 0.85;
        }

        // Draw connections
        this.ctx.strokeStyle = 'rgba(230, 57, 70, 0.15)';
        this.ctx.lineWidth = 1;

        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const nodeA = this.nodes[i];
                const nodeB = this.nodes[j];

                const dx = nodeA.x - nodeB.x;
                const dy = nodeA.y - nodeB.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 50) {
                    const opacity = (1 - distance / 50) * 0.3;
                    this.ctx.beginPath();
                    this.ctx.moveTo(nodeA.x, nodeA.y);
                    this.ctx.lineTo(nodeB.x, nodeB.y);
                    this.ctx.strokeStyle = `rgba(230, 57, 70, ${opacity})`;
                    this.ctx.stroke();
                }
            }
        }

        // Draw nodes
        for (const node of this.nodes) {
            // Node core
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.active ? node.size * 2 : node.size, 0, Math.PI * 2);
            this.ctx.fillStyle = node.active ? '#e63946' : '#ffffff';
            this.ctx.fill();

            // Glow for active nodes
            if (node.active) {
                const gradient = this.ctx.createRadialGradient(
                    node.x, node.y, 0,
                    node.x, node.y, node.size * 4
                );
                gradient.addColorStop(0, 'rgba(230, 57, 70, 0.5)');
                gradient.addColorStop(1, 'transparent');
                this.ctx.fillStyle = gradient;
                this.ctx.fillRect(
                    node.x - node.size * 4,
                    node.y - node.size * 4,
                    node.size * 8,
                    node.size * 8
                );
            }
        }
    }

    scramble() {
        // Scramble all nodes
        for (const node of this.nodes) {
            node.vx = (Math.random() - 0.5) * 10;
            node.vy = (Math.random() - 0.5) * 10;
        }
    }

    changeText(newText) {
        this.text = newText;
        this.createTextNodes();
    }
}

// Initialize
if (document.getElementById('hero-3d-text')) {
    window.networkTitle = new NetworkTitle();
}
