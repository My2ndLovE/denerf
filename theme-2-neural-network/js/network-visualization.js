// NEURAL NETWORK VISUALIZATION - Optimized connected nodes with physics

class NeuralNetwork {
    constructor() {
        this.canvas = document.getElementById('network-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.mouse = { x: 0, y: 0 };
        this.rafId = null;
        this.lastTime = 0;
        this.connectionUpdateInterval = null;

        // Mobile optimization
        this.isMobile = window.innerWidth < 768;
        this.nodeCount = this.isMobile ? 30 : 60;
        this.fps = this.isMobile ? 24 : 60;
        this.frameInterval = 1000 / this.fps;

        this.resize();
        this.createNetwork();
        this.init();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createNetwork() {
        this.nodes = [];

        // Create nodes
        for (let i = 0; i < this.nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 2 + 2,
                active: false,
                pulsePhase: Math.random() * Math.PI * 2,
                brightness: 0.6 + Math.random() * 0.4
            });
        }

        // Create initial connections
        this.updateConnections();
    }

    updateConnections() {
        this.connections = [];
        const maxDistance = this.isMobile ? 120 : 150;
        const maxConnectionsPerNode = this.isMobile ? 3 : 5;

        for (let i = 0; i < this.nodes.length; i++) {
            let connections = 0;

            for (let j = i + 1; j < this.nodes.length && connections < maxConnectionsPerNode; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distSq = dx * dx + dy * dy;
                const maxDistSq = maxDistance * maxDistance;

                if (distSq < maxDistSq) {
                    const distance = Math.sqrt(distSq);
                    this.connections.push({
                        from: this.nodes[i],
                        to: this.nodes[j],
                        distance: distance,
                        strength: 1 - (distance / maxDistance),
                        packetProgress: Math.random()
                    });
                    connections++;
                }
            }
        }
    }

    init() {
        this.resizeHandler = () => {
            this.resize();
            this.isMobile = window.innerWidth < 768;
            this.nodeCount = this.isMobile ? 30 : 60;
            this.fps = this.isMobile ? 24 : 60;
            this.frameInterval = 1000 / this.fps;
        };

        window.addEventListener('resize', this.resizeHandler);

        // Only track mouse on desktop
        if (!this.isMobile) {
            this.mouseMoveHandler = (e) => {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;

                // Activate nearby nodes
                for (const node of this.nodes) {
                    const dx = this.mouse.x - node.x;
                    const dy = this.mouse.y - node.y;
                    const distSq = dx * dx + dy * dy;
                    node.active = distSq < 10000; // 100^2
                }
            };
            window.addEventListener('mousemove', this.mouseMoveHandler);
        }

        this.animate();

        // Periodic connection updates (less frequent on mobile)
        this.connectionUpdateInterval = setInterval(
            () => this.updateConnections(),
            this.isMobile ? 4000 : 2000
        );
    }

    animate(currentTime = 0) {
        this.rafId = requestAnimationFrame((time) => this.animate(time));

        // FPS throttling
        const deltaTime = currentTime - this.lastTime;
        if (deltaTime < this.frameInterval) return;

        this.lastTime = currentTime - (deltaTime % this.frameInterval);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const time = currentTime * 0.001;

        // Update nodes
        for (const node of this.nodes) {
            // Mouse repulsion (desktop only)
            if (!this.isMobile) {
                const dx = this.mouse.x - node.x;
                const dy = this.mouse.y - node.y;
                const distSq = dx * dx + dy * dy;

                if (distSq < 22500) { // 150^2
                    const distance = Math.sqrt(distSq);
                    const force = (150 - distance) / 150;
                    node.vx -= (dx / distance) * force * 0.2;
                    node.vy -= (dy / distance) * force * 0.2;
                }
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

        // Draw connections (simplified rendering)
        for (const conn of this.connections) {
            const alpha = conn.strength * (conn.from.active || conn.to.active ? 0.6 : 0.2) * conn.from.brightness;

            this.ctx.beginPath();
            this.ctx.moveTo(conn.from.x, conn.from.y);
            this.ctx.lineTo(conn.to.x, conn.to.y);
            this.ctx.strokeStyle = `rgba(230, 57, 70, ${alpha})`;
            this.ctx.lineWidth = conn.strength * 2;
            this.ctx.stroke();

            // Draw data packets moving along connections (reduced frequency)
            if (!this.isMobile && Math.random() < 0.005) {
                conn.packetProgress += 0.05;
                if (conn.packetProgress > 1) conn.packetProgress = 0;

                const x = conn.from.x + (conn.to.x - conn.from.x) * conn.packetProgress;
                const y = conn.from.y + (conn.to.y - conn.from.y) * conn.packetProgress;

                this.ctx.beginPath();
                this.ctx.arc(x, y, 3, 0, Math.PI * 2);
                this.ctx.fillStyle = 'rgba(230, 57, 70, 0.8)';
                this.ctx.fill();
            }
        }

        // Draw nodes
        for (const node of this.nodes) {
            const pulse = Math.sin(node.pulsePhase) * 0.5 + 0.5;
            const radius = node.radius + (node.active ? 3 : pulse * 2);

            // Outer glow (only when active, no gradient)
            if (node.active && !this.isMobile) {
                this.ctx.beginPath();
                this.ctx.arc(node.x, node.y, radius * 3, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(230, 57, 70, ${0.1 * node.brightness})`;
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

    pulse() {
        // Pulse all nodes
        for (const node of this.nodes) {
            node.pulsePhase = 0;
        }
    }

    createBurst(x, y) {
        // Create explosion of nodes at position
        const burstCount = this.isMobile ? 5 : 10;

        for (let i = 0; i < burstCount; i++) {
            const angle = (i / burstCount) * Math.PI * 2;
            const speed = 2 + Math.random() * 2;
            this.nodes.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: 3,
                active: true,
                pulsePhase: 0,
                lifetime: 60,
                brightness: 1
            });
        }

        // Remove old nodes
        setTimeout(() => {
            this.nodes = this.nodes.filter(n => !n.lifetime || n.lifetime-- > 0);
            this.updateConnections();
        }, 2000);
    }

    destroy() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }

        if (this.connectionUpdateInterval) {
            clearInterval(this.connectionUpdateInterval);
        }

        window.removeEventListener('resize', this.resizeHandler);

        if (!this.isMobile) {
            window.removeEventListener('mousemove', this.mouseMoveHandler);
        }

        this.nodes = [];
        this.connections = [];
    }
}

// Initialize with error handling
try {
    if (document.getElementById('network-canvas')) {
        window.neuralNetwork = new NeuralNetwork();
    }
} catch (error) {
    console.error('Neural network initialization failed:', error);
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.neuralNetwork && window.neuralNetwork.destroy) {
        window.neuralNetwork.destroy();
    }
});
