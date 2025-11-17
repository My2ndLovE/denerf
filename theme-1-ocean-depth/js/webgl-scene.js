// WEBGL SCENE - Main 3D scene setup

class WebGLScene {
    constructor() {
        this.canvas = document.getElementById('webgl-canvas');
        if (!this.canvas) return;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.objects = [];

        this.init();
    }

    init() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x0a1929, 50, 200);

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 50;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);

        // Create ambient geometry
        this.createAmbientGeometry();

        // Handle resize
        window.addEventListener('resize', () => this.onResize());

        // Start animation
        this.animate();
    }

    createAmbientGeometry() {
        // Create floating geometric shapes
        const geometries = [
            new THREE.IcosahedronGeometry(5, 0),
            new THREE.OctahedronGeometry(4),
            new THREE.TetrahedronGeometry(6)
        ];

        for (let i = 0; i < 10; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = new THREE.MeshPhongMaterial({
                color: 0x4db8a8,
                transparent: true,
                opacity: 0.1,
                wireframe: true
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = (Math.random() - 0.5) * 100;
            mesh.position.y = (Math.random() - 0.5) * 100;
            mesh.position.z = (Math.random() - 0.5) * 50;

            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;

            mesh.userData.rotationSpeed = {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01
            };

            this.scene.add(mesh);
            this.objects.push(mesh);
        }

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0x4db8a8, 1);
        pointLight.position.set(0, 0, 50);
        this.scene.add(pointLight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Rotate objects
        for (const obj of this.objects) {
            obj.rotation.x += obj.userData.rotationSpeed.x;
            obj.rotation.y += obj.userData.rotationSpeed.y;

            // Floating animation
            obj.position.y += Math.sin(Date.now() * 0.001 + obj.position.x) * 0.02;
        }

        // Parallax camera movement
        const scrollY = window.scrollY || window.pageYOffset;
        this.camera.position.y = -scrollY * 0.01;

        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Initialize
if (typeof THREE !== 'undefined' && document.getElementById('webgl-canvas')) {
    window.webglScene = new WebGLScene();
}
