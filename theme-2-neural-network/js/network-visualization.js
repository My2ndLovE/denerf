// NEURAL NETWORK VISUALIZATION - Connected nodes with physics

class NeuralNetwork {
    constructor() {
        this.canvas = document.getElementById('network-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.nodeCount = 60;
        this.mouse = { x: 0, y: 0 };

        this.resize();
        this.createNetwork();
        this.init();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createNetwork() {
        // Create nodes
        for (let i = 0; i < this.nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 3 + 2,
                active: false,
                pulsePhase: Math.random() * Math.PI * 2
            });
        }

        // Create initial connections
        this.updateConnections();
    }

    updateConnections() {
        this.connections = [];
        const maxDistance = 150;

        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    this.connections.push({
                        from: this.nodes[i],
                        to: this.nodes[j],
                        distance: distance,
                        strength: 1 - (distance / maxDistance)
                    });
                }
            }
        }
    }

    init() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

            // Activate nearby nodes
            for (const node of this.nodes) {
                const dx = this.mouse.x - node.x;
                const dy = this.mouse.y - node.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                node.active = distance < 100;
            }
        });

        this.animate();

        // Periodic connection updates
        setInterval(() => this.updateConnections(), 2000);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update nodes
        for (const node of this.nodes) {
            // Mouse repulsion
            const dx = this.mouse.x - node.x;
            const dy = this.mouse.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const force = (150 - distance) / 150;
                node.vx -= (dx / distance) * force * 0.2;
                node.vy -= (dy / distance) * force * 0.2;
            }

            // Update position
            node.x += node.vx;
            node.y += node.vy;

            // Damping
            node.vx *= 0.98;
            node.vy *= 0.98;

            // Boundaries
            if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;

            // Keep in bounds
            node.x = Math.max(0, Math.min(this.canvas.width, node.x));
            node.y = Math.max(0, Math.min(this.canvas.height, node.y));

            // Update pulse
            node.pulsePhase += 0.05;
        }

        // Draw connections
        for (const conn of this.connections) {
            const gradient = this.ctx.createLinearGradient(
                conn.from.x, conn.from.y,
                conn.to.x, conn.to.y
            );

            const alpha = conn.strength * (conn.from.active || conn.to.active ? 0.6 : 0.2);
            gradient.addColorStop(0, `rgba(230, 57, 70, ${alpha})`);
            gradient.addColorStop(1, `rgba(230, 57, 70, ${alpha * 0.5})`);

            this.ctx.beginPath();
            this.ctx.moveTo(conn.from.x, conn.from.y);
            this.ctx.lineTo(conn.to.x, conn.to.y);
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = conn.strength * 2;
            this.ctx.stroke();

            // Draw data packets moving along connections
            if (Math.random() < 0.01) {
                const t = Math.random();
                const x = conn.from.x + (conn.to.x - conn.from.x) * t;
                const y = conn.from.y + (conn.to.y - conn.from.y) * t;

                this.ctx.beginPath();
                this.ctx.arc(x, y, 3, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(230, 57, 70, 0.8)`;
                this.ctx.fill();
            }
        }

        // Draw nodes
        for (const node of this.nodes) {
            const pulse = Math.sin(node.pulsePhase) * 0.5 + 0.5;
            const radius = node.radius + (node.active ? 3 : pulse * 2);

            // Outer glow
            if (node.active) {
                const gradient = this.ctx.createRadialGradient(
                    node.x, node.y, 0,
                    node.x, node.y, radius * 3
                );
                gradient.addColorStop(0, 'rgba(230, 57, 70, 0.3)');
                gradient.addColorStop(1, 'transparent');

                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, radius * 3, 0, Math.PI * 2);
                this.ctx.fillStyle = gradient;
                this.ctx.fill();
            }

            // Node
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
            this.ctx.fillStyle = node.active ? '#e63946' : '#666666';
            this.ctx.fill();

            // Inner core
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, radius * 0.5, 0, Math.PI * 2);
            this.ctx.fillStyle = node.active ? '#ffffff' : '#999999';
            this.ctx.fill();
        }
    }

    createBurst(x, y) {
        // Create explosion of nodes at position
        for (let i = 0; i < 10; i++) {
            const angle = (i / 10) * Math.PI * 2;
            const speed = 3 + Math.random() * 2;
            this.nodes.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: 3,
                active: true,
                pulsePhase: 0,
                lifetime: 60
            });
        }

        // Remove old nodes
        setTimeout(() => {
            this.nodes = this.nodes.filter(n => !n.lifetime || n.lifetime-- > 0);
            this.updateConnections();
        }, 2000);
    }
}

// Initialize
if (document.getElementById('network-canvas')) {
    window.neuralNetwork = new NeuralNetwork();
}
