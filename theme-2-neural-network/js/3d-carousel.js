// 3D CAROUSEL - Three.js rotating project showcase

class Carousel3D {
    constructor() {
        this.canvas = document.getElementById('carousel-canvas');
        if (!this.canvas || typeof THREE === 'undefined') return;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.projects = [];
        this.currentIndex = 0;
        this.targetRotation = 0;
        this.currentRotation = 0;

        this.projectData = [
            {
                title: 'NeuralCommerce',
                category: 'E-Commerce Platform',
                description: 'AI-powered e-commerce with intelligent recommendations and automated inventory.',
                results: [
                    { value: '40%', label: 'conversion' },
                    { value: '60%', label: 'faster' },
                    { value: '10K+', label: 'users' }
                ]
            },
            {
                title: 'DataVision Analytics',
                category: 'SaaS Dashboard',
                description: 'Real-time analytics with predictive insights and anomaly detection.',
                results: [
                    { value: '3x', label: 'faster decisions' },
                    { value: '95%', label: 'accuracy' },
                    { value: '50M+', label: 'events daily' }
                ]
            },
            {
                title: 'VoiceFlow Assistant',
                category: 'Mobile App',
                description: 'Voice-controlled productivity app. Featured in App Store\'s "Apps We Love".',
                results: [
                    { value: '95%', label: 'satisfaction' },
                    { value: '50K+', label: 'downloads' },
                    { value: '4.7★', label: 'rating' }
                ]
            }
        ];

        this.init();
    }

    init() {
        // Scene
        this.scene = new THREE.Scene();

        // Camera
        const container = document.getElementById('carousel-3d');
        this.camera = new THREE.PerspectiveCamera(
            60,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.z = 15;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, 500);
        this.renderer.setClearColor(0x000000, 0);

        // Create project cards in 3D space
        this.createProjectCards();

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const spotLight = new THREE.SpotLight(0xe63946, 1);
        spotLight.position.set(0, 10, 10);
        this.scene.add(spotLight);

        // Handle resize
        window.addEventListener('resize', () => this.onResize());

        // Start animation
        this.animate();

        // Update initial info
        this.updateProjectInfo();
    }

    createProjectCards() {
        const radius = 10;
        const angleStep = (Math.PI * 2) / this.projectData.length;

        for (let i = 0; i < this.projectData.length; i++) {
            const angle = i * angleStep;

            // Create card geometry
            const geometry = new THREE.PlaneGeometry(6, 4);
            const material = new THREE.MeshPhongMaterial({
                color: 0x1a1a1a,
                emissive: 0xe63946,
                emissiveIntensity: 0.1,
                side: THREE.DoubleSide
            });

            const card = new THREE.Mesh(geometry, material);
            card.position.x = Math.sin(angle) * radius;
            card.position.z = Math.cos(angle) * radius;
            card.rotation.y = -angle;
            card.userData.index = i;
            card.userData.angle = angle;

            this.scene.add(card);
            this.projects.push(card);

            // Add frame
            const edges = new THREE.EdgesGeometry(geometry);
            const lineMaterial = new THREE.LineBasicMaterial({
                color: 0xe63946,
                linewidth: 2
            });
            const frame = new THREE.LineSegments(edges, lineMaterial);
            card.add(frame);

            // Add glow particles around card
            this.addCardParticles(card);
        }
    }

    addCardParticles(card) {
        const particleCount = 50;
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 7;
            positions[i3 + 1] = (Math.random() - 0.5) * 5;
            positions[i3 + 2] = (Math.random() - 0.5) * 2;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0xe63946,
            size: 0.05,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        card.add(particles);

        // Animate particles
        card.userData.particles = particles;
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Smooth rotation
        this.currentRotation += (this.targetRotation - this.currentRotation) * 0.1;

        // Rotate all cards
        for (const project of this.projects) {
            project.rotation.y = project.userData.angle + this.currentRotation;

            // Scale active card
            const targetScale = project.userData.index === this.currentIndex ? 1.2 : 1;
            project.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

            // Update material
            project.material.emissiveIntensity = project.userData.index === this.currentIndex ? 0.3 : 0.1;

            // Animate particles
            if (project.userData.particles) {
                project.userData.particles.rotation.y += 0.01;
            }
        }

        this.renderer.render(this.scene, this.camera);
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.projectData.length;
        this.targetRotation += (Math.PI * 2) / this.projectData.length;
        this.updateProjectInfo();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.projectData.length) % this.projectData.length;
        this.targetRotation -= (Math.PI * 2) / this.projectData.length;
        this.updateProjectInfo();
    }

    updateProjectInfo() {
        const project = this.projectData[this.currentIndex];

        // Update text with animations
        gsap.to('#project-title', {
            opacity: 0,
            y: -20,
            duration: 0.3,
            onComplete: () => {
                document.getElementById('project-title').textContent = project.title;
                gsap.to('#project-title', { opacity: 1, y: 0, duration: 0.3 });
            }
        });

        gsap.to('#project-category', {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                document.getElementById('project-category').textContent = project.category;
                gsap.to('#project-category', { opacity: 1, duration: 0.3 });
            }
        });

        gsap.to('#project-description', {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                document.getElementById('project-description').textContent = project.description;
                gsap.to('#project-description', { opacity: 1, duration: 0.3 });
            }
        });

        // Update results
        const resultsEl = document.getElementById('project-results');
        gsap.to(resultsEl, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            onComplete: () => {
                resultsEl.innerHTML = project.results.map(r =>
                    `<div class="result"><strong>${r.value}</strong> ${r.label}</div>`
                ).join('');
                gsap.to(resultsEl, { opacity: 1, y: 0, duration: 0.3 });
            }
        });

        // Update counter
        document.getElementById('carousel-current').textContent = this.currentIndex + 1;
    }

    onResize() {
        const container = document.getElementById('carousel-3d');
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, 500);
    }
}

// Initialize and expose functions
if (typeof THREE !== 'undefined' && document.getElementById('carousel-canvas')) {
    window.carousel3D = new Carousel3D();

    window.nextCarouselProject = () => {
        if (window.carousel3D) window.carousel3D.next();
    };

    window.prevCarouselProject = () => {
        if (window.carousel3D) window.carousel3D.prev();
    };
}

// Show carousel canvas when portfolio section is visible
if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.create({
        trigger: '.portfolio',
        start: 'top center',
        end: 'bottom center',
        onEnter: () => document.getElementById('carousel-canvas').classList.add('active'),
        onLeave: () => document.getElementById('carousel-canvas').classList.remove('active'),
        onEnterBack: () => document.getElementById('carousel-canvas').classList.add('active'),
        onLeaveBack: () => document.getElementById('carousel-canvas').classList.remove('active')
    });
}
