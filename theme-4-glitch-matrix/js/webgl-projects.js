// WEBGL PROJECTS - 3D visualization for project cards

class WebGLProject {
    constructor(element) {
        this.element = element;

        if (typeof THREE === 'undefined') {
            // Fallback to canvas if Three.js not loaded
            this.createCanvasFallback();
            return;
        }

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.mesh = null;
        this.particles = [];

        this.init();
    }

    init() {
        // Scene
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.element.clientWidth / this.element.clientHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(this.element.clientWidth, this.element.clientHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.element.appendChild(this.renderer.domElement);

        // Create scene objects
        this.createScene();

        // Handle resize
        window.addEventListener('resize', () => this.onResize());

        // Animate
        this.animate();
    }

    createScene() {
        // Create wireframe geometry
        const geometries = [
            new THREE.IcosahedronGeometry(1.5, 0),
            new THREE.OctahedronGeometry(1.5, 0),
            new THREE.TorusKnotGeometry(1, 0.3, 100, 16)
        ];

        const geometry = geometries[Math.floor(Math.random() * geometries.length)];

        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff41,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);

        // Add particles
        this.createParticles();
    }

    createParticles() {
        const particleCount = 100;
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 10;
        }

        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particleMaterial = new THREE.PointsMaterial({
            color: Math.random() > 0.5 ? 0x00ff41 : 0xff006e,
            size: 0.05,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
        this.scene.add(particleSystem);
        this.particles.push(particleSystem);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.mesh) {
            this.mesh.rotation.x += 0.01;
            this.mesh.rotation.y += 0.01;
        }

        // Rotate particles
        for (const particle of this.particles) {
            particle.rotation.y += 0.005;
        }

        if (this.renderer && this.scene && this.camera) {
            this.renderer.render(this.scene, this.camera);
        }
    }

    onResize() {
        if (!this.renderer || !this.camera) return;

        const width = this.element.clientWidth;
        const height = this.element.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    createCanvasFallback() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = this.element.clientWidth;
        canvas.height = this.element.clientHeight;
        this.element.appendChild(canvas);

        // Simple animated pattern
        const animate = () => {
            requestAnimationFrame(animate);

            ctx.fillStyle = 'rgba(10, 14, 39, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const time = Date.now() * 0.001;

            // Draw rotating hexagon
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(time * 0.5);

            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (i / 6) * Math.PI * 2;
                const x = Math.cos(angle) * 60;
                const y = Math.sin(angle) * 60;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();

            ctx.strokeStyle = Math.random() > 0.5 ? '#00ff41' : '#ff006e';
            ctx.lineWidth = 2;
            ctx.shadowBlur = 10;
            ctx.shadowColor = ctx.strokeStyle;
            ctx.stroke();

            ctx.restore();
        };

        animate();
    }
}

// Initialize all project visuals
document.addEventListener('DOMContentLoaded', () => {
    const projectElements = document.querySelectorAll('[data-webgl-project]');

    projectElements.forEach(el => {
        new WebGLProject(el);
    });
});
