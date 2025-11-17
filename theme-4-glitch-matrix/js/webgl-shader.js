// WEBGL SHADER - Custom shader effects for cyberpunk aesthetic

class WebGLShader {
    constructor() {
        this.canvas = document.getElementById('webgl-shader-canvas');
        if (!this.canvas || typeof THREE === 'undefined') return;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.mesh = null;
        this.time = 0;

        this.init();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();

        // Camera
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);

        // Create shader material
        this.createShaderMaterial();

        // Handle resize
        window.addEventListener('resize', () => this.onResize());

        // Start animation
        this.animate();
    }

    createShaderMaterial() {
        // Vertex shader
        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = vec4(position, 1.0);
            }
        `;

        // Fragment shader - Cyberpunk grid effect
        const fragmentShader = `
            uniform float time;
            uniform vec2 resolution;
            varying vec2 vUv;

            // Hash function for noise
            float hash(vec2 p) {
                return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
            }

            // Noise function
            float noise(vec2 p) {
                vec2 i = floor(p);
                vec2 f = fract(p);
                f = f * f * (3.0 - 2.0 * f);

                float a = hash(i);
                float b = hash(i + vec2(1.0, 0.0));
                float c = hash(i + vec2(0.0, 1.0));
                float d = hash(i + vec2(1.0, 1.0));

                return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
            }

            // Cyberpunk grid
            float grid(vec2 p, float size) {
                vec2 grid = fract(p * size);
                float line = step(0.95, max(grid.x, grid.y));
                return line;
            }

            void main() {
                vec2 uv = vUv;
                vec2 p = uv * 2.0 - 1.0;
                p.x *= resolution.x / resolution.y;

                // Animated grid
                float gridPattern = 0.0;
                gridPattern += grid(uv + vec2(time * 0.1, time * 0.05), 20.0) * 0.3;
                gridPattern += grid(uv + vec2(time * 0.05, -time * 0.08), 10.0) * 0.2;

                // Noise overlay
                float n = noise(uv * 10.0 + time * 0.5);

                // Scanning lines
                float scan = sin(uv.y * 100.0 + time * 2.0) * 0.05;

                // Pulsing glow
                float pulse = sin(time * 2.0) * 0.5 + 0.5;

                // Matrix green color
                vec3 color = vec3(0.0, 1.0, 0.25);

                // Combine effects
                float intensity = gridPattern + n * 0.1 + scan;
                intensity *= pulse * 0.3 + 0.1;

                // Add hot pink accents
                vec3 accentColor = vec3(1.0, 0.0, 0.43);
                color = mix(color, accentColor, n * 0.2);

                gl_FragColor = vec4(color * intensity, intensity * 0.3);
            }
        `;

        // Create plane geometry
        const geometry = new THREE.PlaneGeometry(2, 2);

        // Create shader material
        const material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                time: { value: 0 },
                resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
            },
            transparent: true
        });

        // Create mesh
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.time += 0.01;

        if (this.mesh && this.mesh.material.uniforms) {
            this.mesh.material.uniforms.time.value = this.time;
        }

        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        if (this.mesh && this.mesh.material.uniforms) {
            this.mesh.material.uniforms.resolution.value.set(
                window.innerWidth,
                window.innerHeight
            );
        }
    }
}

// Initialize
if (document.getElementById('webgl-shader-canvas') && typeof THREE !== 'undefined') {
    window.webglShader = new WebGLShader();
}
