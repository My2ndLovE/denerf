'use client';

import { useRef, useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import ContentSections from '@/components/ContentSections';

export default function ShaderMorphing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const uniformsRef = useRef<any>(null);

  // Use STATE for scroll progress so React knows when to re-render
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollTargetRef = useRef(0);

  // Track current section for background styling
  const [currentSection, setCurrentSection] = useState(0);

  // Initialize Three.js shader with morphing
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const THREE = require('three');

    let scene: any, camera: any, renderer: any, uniforms: any, mesh: any;
    let animationId: number;
    let texture: any;

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');

    loader.load(
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/noise.png',
      (tex: any) => {
        texture = tex;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.minFilter = THREE.LinearFilter;
        init();
        animate();
      }
    );

    function init() {
      camera = new THREE.Camera();
      camera.position.z = 1;

      scene = new THREE.Scene();
      const geometry = new THREE.PlaneGeometry(2, 2);

      uniforms = {
        u_time: { type: 'f', value: 1.0 },
        u_resolution: { type: 'v2', value: new THREE.Vector2() },
        u_noise: { type: 't', value: texture },
        u_mouse: { type: 'v2', value: new THREE.Vector2() },
        u_scroll: { type: 'f', value: 0.0 },
      };

      uniformsRef.current = uniforms;

      // Enhanced fragment shader with dramatic section variations
      const fragmentShader = `
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        uniform float u_time;
        uniform sampler2D u_noise;
        uniform float u_scroll;

        #define PI 3.141592653589793
        #define TAU 6.283185307179586

        const float multiplier = 15.5;
        const float zoomSpeed = 10.;
        const int layers = 10;
        const int octaves = 5;

        vec2 hash2(vec2 p) {
          vec2 o = texture2D(u_noise, (p+0.5)/256.0, -100.0).xy;
          return o;
        }

        mat2 rotate2d(float _angle){
          return mat2(cos(_angle), sin(_angle), -sin(_angle), cos(_angle));
        }

        vec3 hsb2rgb(in vec3 c){
          vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0);
          rgb = rgb*rgb*(3.0-2.0*rgb);
          return c.z * mix(vec3(1.0), rgb, c.y);
        }

        float hash(vec2 p) {
          float o = texture2D(u_noise, (p+0.5)/256.0, -100.0).x;
          return o;
        }

        float noise(vec2 uv) {
          vec2 id = floor(uv);
          vec2 subuv = fract(uv);
          vec2 u = subuv * subuv * (3. - 2. * subuv);
          float a = hash(id);
          float b = hash(id + vec2(1., 0.));
          float c = hash(id + vec2(0., 1.));
          float d = hash(id + vec2(1., 1.));
          return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
        }

        float fbm(in vec2 uv) {
          float s = 0.0;
          float m = 0.0;
          float a = 0.5;
          for(int i = 0; i < octaves; i++) {
            s += a * noise(uv);
            m += a;
            a *= 0.5;
            uv *= 2.0;
          }
          return s / m;
        }

        vec3 render(vec2 uv, float scale, vec3 colour, float section) {
          vec2 id = floor(uv);
          vec2 subuv = fract(uv);
          vec2 rand = hash2(id);
          float bokeh = abs(scale) * 1.0;

          float particle = 0.0;

          // Vary particle density per section
          float densityThreshold = 1.3;
          if(section >= 2.0) densityThreshold = 1.1;
          if(section >= 4.0) densityThreshold = 1.5;

          if(length(rand) > densityThreshold) {
            vec2 pos = subuv - 0.5;
            float field = length(pos);
            float angle = atan(pos.y, pos.x);

            // Different particle shapes per section
            float shape = 1.0;

            // Section 0: Simple circles
            if(section < 1.0) {
              shape = 1.0;
            }
            // Section 1: Flower petals
            else if(section < 2.0) {
              shape = 1.0 + sin(angle * 5.0 + u_time * 0.5) * 0.4;
            }
            // Section 2: Ice crystals
            else if(section < 3.0) {
              shape = 1.0 + abs(sin(angle * 6.0)) * 0.5;
            }
            // Section 3: Organic blobs
            else if(section < 4.0) {
              shape = 1.0 + sin(angle * 3.0 + u_time * 0.3) * 0.3;
            }
            // Section 4: Sharp stars
            else if(section < 5.0) {
              shape = 1.0 + abs(sin(angle * 8.0)) * 0.6;
            }
            // Section 5: Chaotic swirls
            else {
              shape = 1.0 + sin(angle * 4.0 + u_time) * 0.5 * (1.0 + sin(u_time * 2.0) * 0.3);
            }

            float modifiedField = field / shape;
            particle = smoothstep(0.35, 0.0, modifiedField);
            particle += smoothstep(0.45 * bokeh, 0.38 * bokeh, modifiedField);

            // Sparkle intensity varies by section
            float sparkleSpeed = 5.0 + section * 2.0;
            float sparkle = sin(u_time * sparkleSpeed + rand.x * 100.0) * 0.5 + 0.5;
            particle *= 0.6 + sparkle * 0.4;
          }
          return vec3(particle * 3.5);
        }

        vec3 renderLayer(int layer, int layers, vec2 uv, inout float opacity, vec3 colour, float n) {
          vec2 _uv = uv;

          float section = floor(u_scroll * 6.0);
          float sectionProgress = fract(u_scroll * 6.0);

          // Dramatic zoom speed changes per section
          float baseZoom = zoomSpeed;
          if(section == 1.0) baseZoom *= 1.5; // Faster
          if(section == 2.0) baseZoom *= 0.6; // Slower
          if(section == 3.0) baseZoom *= 2.0; // Very fast
          if(section == 4.0) baseZoom *= 0.4; // Very slow
          if(section == 5.0) baseZoom *= 2.5; // Intense

          float scale = mod((u_time + baseZoom / float(layers) * float(layer)) / baseZoom, -1.0);
          uv *= 20.0;
          uv *= scale * scale;

          // Rotation direction changes dramatically
          float rotationSpeed = u_time / 10.0;
          if(section == 1.0) rotationSpeed *= -2.0;
          if(section == 2.0) rotationSpeed *= 0.3;
          if(section == 3.0) rotationSpeed *= -3.0;
          if(section == 4.0) rotationSpeed *= 1.5;
          if(section == 5.0) rotationSpeed *= -4.0;

          uv = rotate2d(rotationSpeed) * uv;

          uv += vec2(25.0 + sin(u_time * 0.1 + section * 2.0)) * float(layer);

          // Dramatic distortions per section
          if(section >= 2.0) {
            float waveIntensity = 0.8;
            uv.x += sin(uv.y * 2.0 + u_time * 0.5) * waveIntensity;
          }

          if(section >= 3.0) {
            float spiralAmount = 0.4;
            float angle = length(uv) * spiralAmount;
            uv = rotate2d(angle) * uv;
          }

          if(section >= 4.0) {
            uv.y += cos(length(uv) * 3.0 + u_time) * 0.8;
          }

          if(section >= 5.0) {
            float chaosX = sin(uv.y * 5.0 + u_time * 2.0) * 0.6;
            float chaosY = cos(uv.x * 5.0 + u_time * 2.0) * 0.6;
            uv += vec2(chaosX, chaosY);
          }

          vec3 pass = render(uv * multiplier, scale, colour, section) * 0.2;

          opacity = 1.0 + scale;
          float _opacity = opacity;

          float endOpacity = smoothstep(0.0, 0.4, scale * -1.0);
          opacity += endOpacity;

          return pass * _opacity * endOpacity;
        }

        void main() {
          vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy);

          if(u_resolution.y < u_resolution.x) {
            uv /= u_resolution.y;
          } else {
            uv /= u_resolution.x;
          }

          float section = floor(u_scroll * 6.0);
          float sectionProgress = fract(u_scroll * 6.0);

          // Dramatic distortion that varies per section
          float waveAmount = section * 0.1;
          if(section == 3.0) waveAmount *= 2.0;
          if(section == 5.0) waveAmount *= 3.0;

          uv.x += sin(uv.y * 3.0 + u_time * 0.3) * waveAmount;
          uv.y += cos(uv.x * 3.0 + u_time * 0.3) * waveAmount;

          float n = fbm((uv + vec2(sin(u_time * 0.1), u_time * 0.1)) * (2.0 + u_scroll * 0.5) - 2.0);

          vec3 colour = vec3(0.0);

          // 6 DRAMATICALLY different color palettes
          vec3 colors[6];
          vec3 colors2[6];

          // Section 0: Deep Blue & Cyan (Ocean)
          colors[0] = vec3(0.05, 0.15, 0.35);
          colors2[0] = vec3(0.15, 0.35, 0.55);

          // Section 1: Purple & Magenta (Twilight)
          colors[1] = vec3(0.3, 0.1, 0.4);
          colors2[1] = vec3(0.5, 0.2, 0.6);

          // Section 2: Orange & Red (Fire)
          colors[2] = vec3(0.4, 0.15, 0.05);
          colors2[2] = vec3(0.6, 0.3, 0.1);

          // Section 3: Green & Teal (Forest)
          colors[3] = vec3(0.1, 0.3, 0.2);
          colors2[3] = vec3(0.2, 0.5, 0.4);

          // Section 4: Pink & Rose (Sunset)
          colors[4] = vec3(0.4, 0.15, 0.25);
          colors2[4] = vec3(0.6, 0.25, 0.4);

          // Section 5: Gold & Amber (Cosmic)
          colors[5] = vec3(0.35, 0.25, 0.1);
          colors2[5] = vec3(0.55, 0.4, 0.2);

          int currentSection = int(section);
          int nextSection = min(currentSection + 1, 5);

          vec3 color1 = mix(colors[currentSection], colors[nextSection], sectionProgress);
          vec3 color2 = mix(colors2[currentSection], colors2[nextSection], sectionProgress);

          colour = n * mix(color1, color2, n);

          float opacity = 1.0;
          float opacity_sum = 1.0;

          for(int i = 1; i <= layers; i++) {
            colour -= renderLayer(i, layers, uv, opacity, colour, n);
            opacity_sum += opacity;
          }

          colour /= opacity_sum;

          // Brightness varies per section
          float brightness = 35.0;
          if(section == 1.0) brightness = 40.0;
          if(section == 2.0) brightness = 45.0;
          if(section == 3.0) brightness = 38.0;
          if(section == 4.0) brightness = 42.0;
          if(section == 5.0) brightness = 50.0;

          gl_FragColor = vec4(clamp(colour * brightness, 0.0, 1.0), 1.0);
        }
      `;

      const vertexShader = `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `;

      const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
      });

      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);

      onWindowResize();
      window.addEventListener('resize', onWindowResize);

      const handleMouseMove = (e: any) => {
        if (e.detail && uniforms) {
          uniforms.u_mouse.value.x = e.detail.x;
          uniforms.u_mouse.value.y = e.detail.y;
        }
      };
      window.addEventListener('shaderMouseMove', handleMouseMove);
    }

    function onWindowResize() {
      if (!renderer || !uniforms || !canvas) return;
      renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
      uniforms.u_resolution.value.x = renderer.domElement.width;
      uniforms.u_resolution.value.y = renderer.domElement.height;
    }

    let startTime = Date.now();

    function animate() {
      if (!scene || !camera || !renderer || !uniforms) return;

      animationId = requestAnimationFrame(animate);

      const delta = Date.now() - startTime;
      uniforms.u_time.value = -10000 + delta * 0.0005;

      renderer.render(scene, camera);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) renderer.dispose();
      if (texture) texture.dispose();
      window.removeEventListener('resize', onWindowResize);
    };
  }, []);

  // Smooth scroll handling with STATE updates
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      scrollTargetRef.current = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    };

    // Smooth animation loop - updates BOTH uniforms AND React state
    let rafId: number;
    const smoothLoop = () => {
      if (uniformsRef.current) {
        const current = uniformsRef.current.u_scroll.value;
        const target = scrollTargetRef.current;
        const lerped = current + (target - current) * 0.08;

        uniformsRef.current.u_scroll.value = lerped;

        // Update React state so components re-render!
        setScrollProgress(lerped);

        // Update current section
        const section = Math.floor(lerped * 6);
        setCurrentSection(Math.min(section, 5));
      }

      rafId = requestAnimationFrame(smoothLoop);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    smoothLoop();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Get background style based on current section
  const getSectionBackground = () => {
    const section = currentSection;
    const progress = (scrollProgress * 6) - section;

    const backgrounds = [
      // Section 0: Deep blue gradient
      'linear-gradient(135deg, #0a1628 0%, #162a4a 100%)',
      // Section 1: Purple gradient
      'linear-gradient(135deg, #1a0a2e 0%, #3d1e5c 100%)',
      // Section 2: Orange/red gradient
      'linear-gradient(135deg, #2d1308 0%, #4a2612 100%)',
      // Section 3: Green gradient
      'linear-gradient(135deg, #0d1f1a 0%, #1a3a2e 100%)',
      // Section 4: Pink/rose gradient
      'linear-gradient(135deg, #2d1020 0%, #4a1f36 100%)',
      // Section 5: Gold gradient
      'linear-gradient(135deg, #2d2010 0%, #4a3a1f 100%)',
    ];

    return backgrounds[section] || backgrounds[0];
  };

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{
        background: getSectionBackground(),
        transition: 'background 0.5s ease-out'
      }}
    >
      {/* Canvas that fills screen */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.9 }}
      />

      {/* Navigation */}
      <Navigation scrollProgress={scrollProgress} />

      {/* Scrollable container with SNAP scrolling */}
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-y-scroll overflow-x-hidden z-10"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollSnapType: 'y mandatory',
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Each section as a full-height snap point */}
        <div className="relative">
          {[0, 1, 2, 3, 4, 5].map((sectionIndex) => (
            <div
              key={sectionIndex}
              className="h-screen flex items-center justify-center"
              style={{
                scrollSnapAlign: 'start',
                scrollSnapStop: 'always',
              }}
            >
              <ContentSections scrollProgress={scrollProgress} sectionIndex={sectionIndex} />
            </div>
          ))}
        </div>
      </div>

      {/* Mouse interaction layer */}
      <div
        className="fixed inset-0 z-20"
        onMouseMove={(e) => {
          if (!canvasRef.current) return;
          const ratio = window.innerHeight / window.innerWidth;
          const event = new CustomEvent('shaderMouseMove', {
            detail: {
              x: (e.clientX - window.innerWidth / 2) / window.innerWidth / ratio,
              y: (e.clientY - window.innerHeight / 2) / window.innerHeight * -1
            }
          });
          window.dispatchEvent(event);
        }}
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
}
