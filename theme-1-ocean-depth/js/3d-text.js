// 3D TEXT WITH THREE.JS - Morphing Typography

class Text3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.textMesh = null;
        this.particles = [];
        this.currentText = 'AI-POWERED\nCREATION';
        this.targetText = this.currentText;
        this.morphProgress = 0;

        this.init();
    }

    init() {
        // Create container
        const container = document.getElementById('hero-3d-text');
        if (!container) return;

        // Scene setup
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            1,
            1000
        );
        this.camera.position.z = 100;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setClearColor(0x000000, 0);
        container.appendChild(this.renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x4db8a8, 2);
        pointLight.position.set(0, 50, 50);
        this.scene.add(pointLight);

        // Create 3D text with particles
        this.createText3D();

        // Mouse interaction
        this.setupMouseInteraction(container);

        // Start animation loop
        this.animate();

        // Handle resize
        window.addEventListener('resize', () => this.onResize(container));
    }

    createText3D() {
        // Create particle-based 3D text
        const loader = new THREE.FontLoader();

        // Use a basic approach with particles for now
        // In production, load actual font and create text geometry
        this.createParticleText();
    }

    createParticleText() {
        // Create particles forming text shape
        const particleCount = 2000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        // Distribute particles in text-like formation
        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;

            // Create wave pattern for "AI-POWERED CREATION"
            const angle = (i / particleCount) * Math.PI * 4;
            const radius = 30 + Math.sin(angle * 2) * 10;

            positions[i3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 5;
            positions[i3 + 1] = Math.sin(angle * 2) * 10 + (Math.random() - 0.5) * 5;
            positions[i3 + 2] = Math.sin(angle) * 5;

            // Color gradient (teal to blue)
            const t = i / particleCount;
            colors[i3] = 0.3 + t * 0.2; // R
            colors[i3 + 1] = 0.7 + t * 0.1; // G
            colors[i3 + 2] = 0.6 + t * 0.2; // B

            sizes[i] = Math.random() * 2 + 1;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        this.textMesh = new THREE.Points(geometry, material);
        this.scene.add(this.textMesh);
    }

    setupMouseInteraction(container) {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            // Rotate text based on mouse position
            if (this.textMesh) {
                gsap.to(this.textMesh.rotation, {
                    y: x * 0.3,
                    x: y * 0.2,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });

        container.addEventListener('mouseleave', () => {
            if (this.textMesh) {
                gsap.to(this.textMesh.rotation, {
                    y: 0,
                    x: 0,
                    duration: 1,
                    ease: 'power2.out'
                });
            }
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        if (this.textMesh) {
            // Gentle floating animation
            this.textMesh.rotation.y += 0.001;

            // Pulse effect
            const time = Date.now() * 0.001;
            const positions = this.textMesh.geometry.attributes.position.array;

            for (let i = 0; i < positions.length; i += 3) {
                const originalY = positions[i + 1];
                positions[i + 1] = originalY + Math.sin(time + i) * 0.1;
            }

            this.textMesh.geometry.attributes.position.needsUpdate = true;
        }

        this.renderer.render(this.scene, this.camera);
    }

    morphToText(newText) {
        this.targetText = newText;

        // Explode current particles
        if (this.textMesh) {
            const positions = this.textMesh.geometry.attributes.position.array;

            for (let i = 0; i < positions.length; i += 3) {
                gsap.to(positions, {
                    [i]: positions[i] + (Math.random() - 0.5) * 100,
                    [i + 1]: positions[i + 1] + (Math.random() - 0.5) * 100,
                    [i + 2]: positions[i + 2] + (Math.random() - 0.5) * 50,
                    duration: 1,
                    ease: 'power2.out',
                    onUpdate: () => {
                        this.textMesh.geometry.attributes.position.needsUpdate = true;
                    },
                    onComplete: () => {
                        // Reform into new shape
                        this.reformParticles();
                    }
                });
            }
        }
    }

    reformParticles() {
        const positions = this.textMesh.geometry.attributes.position.array;

        for (let i = 0; i < positions.length; i += 3) {
            const angle = (i / positions.length) * Math.PI * 4;
            const radius = 30 + Math.sin(angle * 2) * 10;

            const targetX = Math.cos(angle) * radius;
            const targetY = Math.sin(angle * 2) * 10;
            const targetZ = Math.sin(angle) * 5;

            gsap.to(positions, {
                [i]: targetX,
                [i + 1]: targetY,
                [i + 2]: targetZ,
                duration: 1.5,
                delay: (i / positions.length) * 0.5,
                ease: 'elastic.out(1, 0.5)',
                onUpdate: () => {
                    this.textMesh.geometry.attributes.position.needsUpdate = true;
                }
            });
        }
    }

    onResize(container) {
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(container.clientWidth, container.clientHeight);
    }

    explodeAndReform(newPattern) {
        // Create explosion effect and reform into new pattern
        const positions = this.textMesh.geometry.attributes.position.array;

        // Store original positions
        const originalPositions = new Float32Array(positions);

        // Phase 1: Explode
        for (let i = 0; i < positions.length; i += 3) {
            const explosionForce = 50;
            const targetX = positions[i] + (Math.random() - 0.5) * explosionForce;
            const targetY = positions[i + 1] + (Math.random() - 0.5) * explosionForce;
            const targetZ = positions[i + 2] + (Math.random() - 0.5) * explosionForce;

            gsap.to(positions, {
                [i]: targetX,
                [i + 1]: targetY,
                [i + 2]: targetZ,
                duration: 0.6,
                ease: 'power2.out',
                onUpdate: () => {
                    this.textMesh.geometry.attributes.position.needsUpdate = true;
                }
            });
        }

        // Phase 2: Reform (after explosion)
        setTimeout(() => {
            for (let i = 0; i < positions.length; i += 3) {
                gsap.to(positions, {
                    [i]: originalPositions[i],
                    [i + 1]: originalPositions[i + 1],
                    [i + 2]: originalPositions[i + 2],
                    duration: 1,
                    delay: (i / positions.length) * 0.3,
                    ease: 'back.out(1.7)',
                    onUpdate: () => {
                        this.textMesh.geometry.attributes.position.needsUpdate = true;
                    }
                });
            }
        }, 600);
    }
}

// Initialize 3D text when DOM is ready
if (typeof THREE !== 'undefined') {
    window.text3D = new Text3D();
}
