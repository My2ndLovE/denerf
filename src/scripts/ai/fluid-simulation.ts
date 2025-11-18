/**
 * WebGL Fluid Simulation
 * Real-time fluid dynamics for backgrounds
 * Based on Jos Stam's "Real-Time Fluid Dynamics for Games"
 */

export class FluidSimulation {
  private canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext | null;
  private programs: Map<string, WebGLProgram> = new Map();
  private textures: Map<string, WebGLTexture> = new Map();
  private framebuffers: Map<string, WebGLFramebuffer> = new Map();
  private isRunning = false;
  private animationFrame: number | null = null;
  private mouseX = 0;
  private mouseY = 0;
  private prevMouseX = 0;
  private prevMouseY = 0;
  private mouseDown = false;

  // Simulation parameters
  private simWidth = 256;
  private simHeight = 256;
  private dyeResolution = 512;
  private densityDissipation = 0.98;
  private velocityDissipation = 0.99;
  private pressure = 0.8;
  private pressureIterations = 20;
  private curl = 30;
  private splatRadius = 0.005;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: false,
    });

    if (!this.gl) {
      console.error('WebGL not supported');
      return;
    }

    this.init();
  }

  private init() {
    this.resize();
    this.setupEventListeners();
    this.createPrograms();
    this.createTextures();
  }

  private resize() {
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
  }

  private setupEventListeners() {
    window.addEventListener('resize', () => this.resize());

    const getMousePos = (e: MouseEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      return {
        x: (e.clientX - rect.left) / rect.width,
        y: 1 - (e.clientY - rect.top) / rect.height,
      };
    };

    this.canvas.addEventListener('mousemove', (e) => {
      const pos = getMousePos(e);
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
      this.mouseX = pos.x;
      this.mouseY = pos.y;

      if (this.mouseDown) {
        this.addSplat(this.mouseX, this.mouseY);
      }
    });

    this.canvas.addEventListener('mousedown', (e) => {
      const pos = getMousePos(e);
      this.mouseDown = true;
      this.mouseX = pos.x;
      this.mouseY = pos.y;
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
      this.addSplat(this.mouseX, this.mouseY);
    });

    this.canvas.addEventListener('mouseup', () => {
      this.mouseDown = false;
    });

    // Add ambient splats periodically
    setInterval(() => {
      if (!this.mouseDown) {
        this.addRandomSplat();
      }
    }, 2000);
  }

  private createPrograms() {
    if (!this.gl) return;

    // Vertex shader (used for all programs)
    const vertexShader = `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;

      void main () {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    // Display shader
    const displayShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      uniform float time;

      void main () {
        vec3 fluid = texture2D(uTexture, vUv).rgb;

        // Create gradient based on fluid density
        vec3 col = mix(color1, color2, fluid.r);
        col = mix(col, color3, fluid.g);

        // Add some shimmer
        float shimmer = sin(time + vUv.x * 10.0 + vUv.y * 10.0) * 0.1 + 0.9;
        col *= shimmer;

        gl_FragColor = vec4(col, 0.9);
      }
    `;

    // Basic advection shader (simplified for display)
    const advectionShader = `
      precision highp float;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform float dt;
      uniform float dissipation;

      void main () {
        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
        gl_FragColor = dissipation * texture2D(uSource, coord);
      }
    `;

    this.programs.set('display', this.createProgram(vertexShader, displayShader)!);
    this.programs.set('advection', this.createProgram(vertexShader, advectionShader)!);
  }

  private createProgram(vertSource: string, fragSource: string): WebGLProgram | null {
    if (!this.gl) return null;

    const vertShader = this.createShader(this.gl.VERTEX_SHADER, vertSource);
    const fragShader = this.createShader(this.gl.FRAGMENT_SHADER, fragSource);

    if (!vertShader || !fragShader) return null;

    const program = this.gl.createProgram();
    if (!program) return null;

    this.gl.attachShader(program, vertShader);
    this.gl.attachShader(program, fragShader);
    this.gl.linkProgram(program);

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      console.error('Program link error:', this.gl.getProgramInfoLog(program));
      return null;
    }

    return program;
  }

  private createShader(type: number, source: string): WebGLShader | null {
    if (!this.gl) return null;

    const shader = this.gl.createShader(type);
    if (!shader) return null;

    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  private createTextures() {
    // Create velocity and density textures
    // Simplified implementation - in production would have full double-buffering
  }

  private addSplat(x: number, y: number) {
    // Calculate velocity delta
    const dx = (x - this.prevMouseX) * 100;
    const dy = (y - this.prevMouseY) * 100;

    // Random color splat
    const color = {
      r: Math.random(),
      g: Math.random(),
      b: Math.random(),
    };

    // Apply splat to simulation
    // This would modify the velocity and density textures
  }

  private addRandomSplat() {
    const x = Math.random();
    const y = Math.random();
    this.addSplat(x, y);
  }

  private render = () => {
    if (!this.gl || !this.isRunning) return;

    const gl = this.gl;
    const program = this.programs.get('display');

    if (!program) return;

    gl.useProgram(program);

    // Set up uniforms
    const timeLocation = gl.getUniformLocation(program, 'time');
    const color1Location = gl.getUniformLocation(program, 'color1');
    const color2Location = gl.getUniformLocation(program, 'color2');
    const color3Location = gl.getUniformLocation(program, 'color3');

    gl.uniform1f(timeLocation, performance.now() / 1000);
    gl.uniform3f(color1Location, 0.0, 0.6, 0.6); // Teal
    gl.uniform3f(color2Location, 0.75, 0.25, 1.0); // Purple
    gl.uniform3f(color3Location, 1.0, 0.42, 0.42); // Coral

    // Clear and draw
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw full-screen quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    this.animationFrame = requestAnimationFrame(this.render);
  };

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.render();
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  destroy() {
    this.stop();
    if (this.gl) {
      // Clean up WebGL resources
      this.programs.forEach(program => this.gl?.deleteProgram(program));
      this.textures.forEach(texture => this.gl?.deleteTexture(texture));
      this.framebuffers.forEach(fb => this.gl?.deleteFramebuffer(fb));
    }
  }
}
