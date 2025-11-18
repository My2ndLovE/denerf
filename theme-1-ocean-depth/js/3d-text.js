// 3D TEXT WITH THREE.JS - Optimized Morphing Typography

class Text3D {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.textMesh = null;
        this.originalPositions = null; // Store original positions
        this.currentText = 'AI-POWERED\nCREATION';
        this.targetText = this.currentText;
        this.rafId = null;
        this.lastTime = 0;
        this.container = null;

        // Mobile optimization
        this.isMobile = window.innerWidth < 768;
        this.fps = this.isMobile ? 30 : 60;
        this.frameInterval = 1000 / this.fps;
        this.particleCount = this.isMobile ? 1000 : 2000;

        this.init();
    }

    init() {
        // Create container
        this.container = document.getElementById('hero-3d-text');
        if (!this.container) return;

        // Check if THREE.js is loaded
        if (typeof THREE === 'undefined') {
            console.warn('THREE.js not loaded');
            return;
        }

        // Scene setup
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            45,
            this.container.clientWidth / this.container.clientHeight,
            1,
            1000
        );
        this.camera.position.z = 100;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: !this.isMobile // Disable antialiasing on mobile
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.setPixelRatio(this.isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x4db8a8, 2);
        pointLight.position.set(0, 50, 50);
        this.scene.add(pointLight);

        // Create 3D text with particles
        this.createParticleText();

        // Mouse interaction (desktop only)
        if (!this.isMobile) {
            this.setupMouseInteraction();
        }

        // Handle resize
        this.resizeHandler = () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => this.onResize(), 250);
        };
        window.addEventListener('resize', this.resizeHandler);

        // Start animation loop
        this.animate();
    }

    createParticleText() {
        // Create particles forming text shape
        const positions = new Float32Array(this.particleCount * 3);
        const colors = new Float32Array(this.particleCount * 3);
        const sizes = new Float32Array(this.particleCount);

        // Distribute particles in text-like formation
        for (let i = 0; i < this.particleCount; i++) {
            const i3 = i * 3;

            // Create wave pattern for "AI-POWERED CREATION"
            const angle = (i / this.particleCount) * Math.PI * 4;
            const radius = 30 + Math.sin(angle * 2) * 10;

            positions[i3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 5;
            positions[i3 + 1] = Math.sin(angle * 2) * 10 + (Math.random() - 0.5) * 5;
            positions[i3 + 2] = Math.sin(angle) * 5;

            // Color gradient (teal to blue)
            const t = i / this.particleCount;
            colors[i3] = 0.3 + t * 0.2; // R
            colors[i3 + 1] = 0.7 + t * 0.1; // G
            colors[i3 + 2] = 0.6 + t * 0.2; // B

            sizes[i] = Math.random() * 2 + 1;
        }

        // Store original positions for wave animation
        this.originalPositions = new Float32Array(positions);

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

    setupMouseInteraction() {
        this.mouseMoveHandler = (e) => {
            const rect = this.container.getBoundingClientRect();
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
        };

        this.mouseLeaveHandler = () => {
            if (this.textMesh) {
                gsap.to(this.textMesh.rotation, {
                    y: 0,
                    x: 0,
                    duration: 1,
                    ease: 'power2.out'
                });
            }
        };

        this.container.addEventListener('mousemove', this.mouseMoveHandler);
        this.container.addEventListener('mouseleave', this.mouseLeaveHandler);
    }

    animate(currentTime = 0) {
        this.rafId = requestAnimationFrame((time) => this.animate(time));

        // FPS throttling
        const deltaTime = currentTime - this.lastTime;
        if (deltaTime < this.frameInterval) return;

        this.lastTime = currentTime - (deltaTime % this.frameInterval);

        if (this.textMesh && this.originalPositions) {
            // Gentle floating animation
            this.textMesh.rotation.y += 0.001;

            // Pulse effect based on ORIGINAL positions (fix for drift bug)
            const time = currentTime * 0.001;
            const positions = this.textMesh.geometry.attributes.position.array;

            for (let i = 0; i < positions.length; i += 3) {
                // Always calculate from original position to prevent drift
                positions[i] = this.originalPositions[i] + Math.sin(time * 0.5 + i * 0.1) * 0.3;
                positions[i + 1] = this.originalPositions[i + 1] + Math.sin(time + i * 0.1) * 0.5;
                positions[i + 2] = this.originalPositions[i + 2] + Math.cos(time * 0.3 + i * 0.1) * 0.3;
            }

            this.textMesh.geometry.attributes.position.needsUpdate = true;
        }

        this.renderer.render(this.scene, this.camera);
    }

    morphToText(newText) {
        if (!this.textMesh) return;

        this.targetText = newText;

        // Simple scale animation instead of per-particle GSAP (performance fix)
        gsap.to(this.textMesh.scale, {
            x: 0.1,
            y: 0.1,
            z: 0.1,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
                // Reform
                gsap.to(this.textMesh.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.5)'
                });
            }
        });
    }

    onResize() {
        if (!this.container || !this.camera || !this.renderer) return;

        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    destroy() {
        // Cancel animation frame
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }

        // Remove event listeners
        if (this.resizeHandler) {
            window.removeEventListener('resize', this.resizeHandler);
        }

        if (!this.isMobile) {
            if (this.mouseMoveHandler) {
                this.container.removeEventListener('mousemove', this.mouseMoveHandler);
            }
            if (this.mouseLeaveHandler) {
                this.container.removeEventListener('mouseleave', this.mouseLeaveHandler);
            }
        }

        clearTimeout(this.resizeTimeout);

        // Dispose Three.js resources
        if (this.textMesh) {
            if (this.textMesh.geometry) {
                this.textMesh.geometry.dispose();
            }
            if (this.textMesh.material) {
                this.textMesh.material.dispose();
            }
            this.scene.remove(this.textMesh);
        }

        if (this.renderer) {
            this.renderer.dispose();
            if (this.renderer.domElement && this.renderer.domElement.parentNode) {
                this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
            }
        }

        // Clear references
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.textMesh = null;
        this.originalPositions = null;
    }
}

// Initialize 3D text when DOM is ready
try {
    if (typeof THREE !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                window.text3D = new Text3D();
            });
        } else {
            window.text3D = new Text3D();
        }
    }
} catch (error) {
    console.error('3D text initialization failed:', error);
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.text3D && window.text3D.destroy) {
        window.text3D.destroy();
    }
});
