// WEBGL SHADER - Realistic CRT/Phosphor effect for cyberpunk aesthetic

class WebGLShader {
    constructor() {
        this.canvas = document.getElementById('webgl-shader-canvas');
        if (!this.canvas || typeof THREE === 'undefined') return;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.mesh = null;
        this.time = 0;
        this.rafId = null;
        this.lastTime = 0;

        // Mobile optimization
        this.isMobile = window.innerWidth < 768;
        this.fps = this.isMobile ? 24 : 60;
        this.frameInterval = 1000 / this.fps;

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
            antialias: false // Disable for authentic CRT look
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(this.isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);

        // Create shader material
        this.createShaderMaterial();

        // Handle resize
        this.resizeHandler = () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => this.onResize(), 250);
        };
        window.addEventListener('resize', this.resizeHandler);

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

        // Fragment shader - Realistic CRT effect
        const fragmentShader = `
            uniform float time;
            uniform vec2 resolution;
            varying vec2 vUv;

            // Noise functions
            float hash(vec2 p) {
                return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
            }

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

            // CRT screen curvature
            vec2 curveScreen(vec2 uv) {
                uv = uv * 2.0 - 1.0;
                vec2 offset = abs(uv.yx) / vec2(6.0, 4.0);
                uv = uv + uv * offset * offset;
                uv = uv * 0.5 + 0.5;
                return uv;
            }

            // Scanlines
            float scanline(vec2 uv, float density) {
                return sin(uv.y * density + time * 2.0) * 0.5 + 0.5;
            }

            // Phosphor glow
            float phosphor(vec2 uv, float size) {
                vec2 pos = mod(uv * resolution / size, 1.0);
                float d = length(pos - 0.5);
                return smoothstep(0.5, 0.0, d);
            }

            // Film grain
            float grain(vec2 uv, float strength) {
                float x = (uv.x + 4.0) * (uv.y + 4.0) * (time * 10.0);
                return mod((mod(x, 13.0) + 1.0) * (mod(x, 123.0) + 1.0), 0.01) * strength;
            }

            // Chromatic aberration
            vec3 chromaticAberration(vec2 uv, float amount) {
                float r = noise(uv + vec2(time * 0.03, 0.0)) * amount;
                float g = noise(uv + vec2(0.0, time * 0.03)) * amount;
                float b = noise(uv + vec2(time * 0.02, time * 0.02)) * amount;

                vec3 col;
                col.r = noise(uv + vec2(r, 0.0));
                col.g = noise(uv + vec2(0.0, g));
                col.b = noise(uv + vec2(-b, 0.0));

                return col;
            }

            // Vignette
            float vignette(vec2 uv) {
                uv *= 1.0 - uv.yx;
                float vig = uv.x * uv.y * 15.0;
                return pow(vig, 0.3);
            }

            void main() {
                vec2 uv = vUv;

                // Apply CRT curvature
                vec2 curvedUv = curveScreen(uv);

                // Edge fade (screen boundaries)
                if (curvedUv.x < 0.0 || curvedUv.x > 1.0 || curvedUv.y < 0.0 || curvedUv.y > 1.0) {
                    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
                    return;
                }

                // Base color - Matrix green with variations
                vec3 baseColor = vec3(0.0, 1.0, 0.25);

                // Noise texture
                float n = noise(curvedUv * 20.0 + time * 0.5);

                // Scanlines (authentic CRT lines)
                float scan = scanline(curvedUv, 800.0);
                scan = mix(1.0, scan, 0.15); // Subtle scanlines

                // Phosphor dots (RGB subpixels)
                float phosphorR = phosphor(curvedUv + vec2(0.0, 0.0), 4.0);
                float phosphorG = phosphor(curvedUv + vec2(0.33, 0.0), 4.0);
                float phosphorB = phosphor(curvedUv + vec2(0.66, 0.0), 4.0);

                // Combine phosphor with base color
                vec3 phosphorColor = vec3(phosphorR, phosphorG, phosphorB) * baseColor;

                // Film grain
                float grainAmount = grain(curvedUv, 0.1);

                // Chromatic aberration (very subtle)
                vec3 aberration = chromaticAberration(curvedUv, 0.002);

                // Flicker effect (very subtle, like old CRT)
                float flicker = sin(time * 60.0) * 0.03 + 0.97;

                // Vignette
                float vig = vignette(curvedUv);

                // Moving scan beam (like electron gun)
                float beam = smoothstep(0.0, 0.02, mod(curvedUv.y - time * 0.3, 1.0));
                beam = mix(1.0, beam, 0.05);

                // Hot pink accent areas (data streams)
                vec3 accentColor = vec3(1.0, 0.0, 0.43);
                float accent = noise(curvedUv * 5.0 + time);
                vec3 color = mix(phosphorColor, accentColor, accent * 0.15);

                // Apply all effects
                color *= scan;
                color *= flicker;
                color *= beam;
                color *= vig;
                color += aberration * 0.1;
                color += grainAmount;

                // Bloom/glow effect
                float bloom = n * 0.3;
                color += baseColor * bloom * 0.2;

                // Overall intensity
                float intensity = (n * 0.5 + 0.3) * scan;

                // Add subtle pulsing
                float pulse = sin(time * 1.5) * 0.1 + 0.9;
                intensity *= pulse;

                // Final color with alpha
                gl_FragColor = vec4(color * intensity, intensity * 0.15);
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
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        // Create mesh
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);
    }

    animate(currentTime = 0) {
        this.rafId = requestAnimationFrame((time) => this.animate(time));

        // FPS throttling
        const deltaTime = currentTime - this.lastTime;
        if (deltaTime < this.frameInterval) return;

        this.lastTime = currentTime - (deltaTime % this.frameInterval);

        this.time += 0.016; // ~60fps time increment

        if (this.mesh && this.mesh.material.uniforms) {
            this.mesh.material.uniforms.time.value = this.time;
        }

        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        this.isMobile = window.innerWidth < 768;
        this.fps = this.isMobile ? 24 : 60;
        this.frameInterval = 1000 / this.fps;

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(this.isMobile ? 1 : Math.min(window.devicePixelRatio, 2));

        if (this.mesh && this.mesh.material.uniforms) {
            this.mesh.material.uniforms.resolution.value.set(
                window.innerWidth,
                window.innerHeight
            );
        }
    }

    destroy() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }

        window.removeEventListener('resize', this.resizeHandler);
        clearTimeout(this.resizeTimeout);

        if (this.mesh) {
            if (this.mesh.geometry) {
                this.mesh.geometry.dispose();
            }
            if (this.mesh.material) {
                this.mesh.material.dispose();
            }
            this.scene.remove(this.mesh);
        }

        if (this.renderer) {
            this.renderer.dispose();
        }

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.mesh = null;
    }
}

// Initialize with error handling
try {
    if (document.getElementById('webgl-shader-canvas') && typeof THREE !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                window.webglShader = new WebGLShader();
            });
        } else {
            window.webglShader = new WebGLShader();
        }
    }
} catch (error) {
    console.error('WebGL shader initialization failed:', error);
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.webglShader && window.webglShader.destroy) {
        window.webglShader.destroy();
    }
});
