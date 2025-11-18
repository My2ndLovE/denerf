/**
 * Particle System
 * Canvas-based particle effects for backgrounds and interactions
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
}

export class ParticleSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private maxParticles: number;
  private animationFrame: number | null = null;
  private mouseX = 0;
  private mouseY = 0;
  private isRunning = false;

  constructor(canvas: HTMLCanvasElement, maxParticles = 100) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.maxParticles = maxParticles;

    this.resize();
    this.setupEventListeners();
  }

  private resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private setupEventListeners() {
    window.addEventListener('resize', () => this.resize());

    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.spawnParticles(e.clientX, e.clientY, 2);
    });
  }

  private createParticle(x: number, y: number): Particle {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2 + 0.5;

    return {
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size: Math.random() * 3 + 1,
      life: 1,
      maxLife: Math.random() * 60 + 30,
      color: this.getRandomColor(),
    };
  }

  private getRandomColor(): string {
    const colors = [
      'rgba(0, 245, 255, 0.8)',     // Primary
      'rgba(191, 64, 255, 0.8)',    // Accent
      'rgba(255, 107, 107, 0.8)',   // Coral
      'rgba(255, 215, 0, 0.8)',     // Golden
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  spawnParticles(x: number, y: number, count: number) {
    for (let i = 0; i < count; i++) {
      if (this.particles.length < this.maxParticles) {
        this.particles.push(this.createParticle(x, y));
      }
    }
  }

  private updateParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Apply gravity
      p.vy += 0.05;

      // Apply friction
      p.vx *= 0.99;
      p.vy *= 0.99;

      // Mouse interaction
      const dx = this.mouseX - p.x;
      const dy = this.mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        const force = (100 - dist) / 100;
        p.vx -= (dx / dist) * force * 0.5;
        p.vy -= (dy / dist) * force * 0.5;
      }

      // Update life
      p.life -= 1 / p.maxLife;

      // Remove dead particles
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  private drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const p of this.particles) {
      this.ctx.save();
      this.ctx.globalAlpha = p.life;
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = p.color;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();

      this.ctx.restore();
    }

    // Draw connections between nearby particles
    this.ctx.save();
    this.ctx.strokeStyle = 'rgba(0, 245, 255, 0.1)';
    this.ctx.lineWidth = 1;

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          const alpha = (1 - dist / 150) * Math.min(p1.life, p2.life);
          this.ctx.globalAlpha = alpha;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }
    this.ctx.restore();
  }

  private animate = () => {
    if (!this.isRunning) return;

    this.updateParticles();
    this.drawParticles();

    this.animationFrame = requestAnimationFrame(this.animate);
  };

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.animate();
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
    this.particles = [];
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
