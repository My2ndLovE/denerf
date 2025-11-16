// ========================================
// 3D Hero Background with Three.js
// ========================================

class Hero3D {
  constructor() {
    this.canvas = document.getElementById('hero-canvas');
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.particles = null;
    this.mouse = { x: 0, y: 0 };
    this.targetMouse = { x: 0, y: 0 };

    this.init();
    this.addEventListeners();
    this.animate();
  }

  init() {
    // Scene setup
    this.scene = new THREE.Scene();

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 5;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particle system
    this.createParticles();

    // Add ambient lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    // Add point light
    const pointLight = new THREE.PointLight(0x00f0ff, 1, 100);
    pointLight.position.set(5, 5, 5);
    this.scene.add(pointLight);
  }

  createParticles() {
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Primary colors for gradient
    const color1 = new THREE.Color(0x00f0ff); // cyan
    const color2 = new THREE.Color(0xff00ff); // magenta
    const color3 = new THREE.Color(0xffff00); // yellow

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Positions - create a sphere-like distribution
      const radius = 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Colors - blend between the three colors
      const mixFactor = Math.random();
      let particleColor;

      if (mixFactor < 0.33) {
        particleColor = color1.clone().lerp(color2, mixFactor * 3);
      } else if (mixFactor < 0.66) {
        particleColor = color2.clone().lerp(color3, (mixFactor - 0.33) * 3);
      } else {
        particleColor = color3.clone().lerp(color1, (mixFactor - 0.66) * 3);
      }

      colors[i3] = particleColor.r;
      colors[i3 + 1] = particleColor.g;
      colors[i3 + 2] = particleColor.b;
    }

    // Geometry
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Material
    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    // Create particle system
    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  addEventListeners() {
    // Mouse move
    window.addEventListener('mousemove', (e) => {
      this.targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Window resize
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Smooth mouse following
    this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
    this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

    // Rotate particles
    if (this.particles) {
      this.particles.rotation.x += 0.0005;
      this.particles.rotation.y += 0.001;

      // Add mouse interaction
      this.particles.rotation.x += this.mouse.y * 0.0005;
      this.particles.rotation.y += this.mouse.x * 0.0005;
    }

    // Render
    this.renderer.render(this.scene, this.camera);
  }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new Hero3D();
  });
} else {
  new Hero3D();
}
