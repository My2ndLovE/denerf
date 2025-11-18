/**
 * Adaptive Performance Intelligence
 * Detects device capabilities and adjusts visual complexity
 */

export interface DeviceCapability {
  level: 1 | 2 | 3 | 4 | 5;
  supportsWebGPU: boolean;
  supportsWebGL2: boolean;
  deviceMemory: number;
  hardwareConcurrency: number;
  fps: number;
}

export class AdaptivePerformance {
  private capability: DeviceCapability | null = null;
  private frameCount = 0;
  private lastFrameTime = performance.now();
  private fps = 60;

  async detectCapability(): Promise<DeviceCapability> {
    // Check for WebGPU support
    const supportsWebGPU = 'gpu' in navigator;

    // Check for WebGL2 support
    const canvas = document.createElement('canvas');
    const supportsWebGL2 = !!canvas.getContext('webgl2');

    // Get device memory (if available)
    const deviceMemory = (navigator as any).deviceMemory || 4;

    // Get hardware concurrency
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;

    // Measure initial FPS
    await this.measureFPS();

    // Calculate capability level
    let level: 1 | 2 | 3 | 4 | 5 = 3; // Default to medium

    if (supportsWebGPU && deviceMemory >= 8 && this.fps >= 60) {
      level = 5; // Full WebGPU effects
    } else if (supportsWebGL2 && deviceMemory >= 6 && this.fps >= 55) {
      level = 4; // WebGL fluid + particles
    } else if (supportsWebGL2 && this.fps >= 45) {
      level = 3; // Particles only
    } else if (this.fps >= 30) {
      level = 2; // Simple gradients + GSAP
    } else {
      level = 1; // Static design, fade-ins only
    }

    this.capability = {
      level,
      supportsWebGPU,
      supportsWebGL2,
      deviceMemory,
      hardwareConcurrency,
      fps: this.fps,
    };

    // Save to localStorage for future visits
    localStorage.setItem('deviceCapability', JSON.stringify(this.capability));

    return this.capability;
  }

  private async measureFPS(): Promise<number> {
    return new Promise((resolve) => {
      let frames = 0;
      const startTime = performance.now();
      const duration = 2000; // Measure for 2 seconds

      const measure = () => {
        frames++;
        const currentTime = performance.now();

        if (currentTime - startTime >= duration) {
          this.fps = Math.round((frames * 1000) / (currentTime - startTime));
          resolve(this.fps);
        } else {
          requestAnimationFrame(measure);
        }
      };

      requestAnimationFrame(measure);
    });
  }

  getCapability(): DeviceCapability | null {
    // Try to get from cache first
    const cached = localStorage.getItem('deviceCapability');
    if (cached && !this.capability) {
      this.capability = JSON.parse(cached);
    }
    return this.capability;
  }

  shouldEnableEffect(requiredLevel: number): boolean {
    const capability = this.getCapability();
    if (!capability) return requiredLevel <= 3; // Default to medium
    return capability.level >= requiredLevel;
  }

  getParticleCount(): number {
    const capability = this.getCapability();
    if (!capability) return 50;

    switch (capability.level) {
      case 5: return 200;
      case 4: return 150;
      case 3: return 100;
      case 2: return 50;
      case 1: return 0;
      default: return 50;
    }
  }

  getQualitySettings() {
    const capability = this.getCapability();
    if (!capability) {
      return {
        enableFluidSimulation: true,
        enableParticles: true,
        enable3D: false,
        enableMorphing: false,
        particleCount: 50,
      };
    }

    return {
      enableFluidSimulation: capability.level >= 4,
      enableParticles: capability.level >= 3,
      enable3D: capability.level >= 4,
      enableMorphing: capability.level >= 3,
      particleCount: this.getParticleCount(),
    };
  }
}

// Singleton instance
export const adaptivePerformance = new AdaptivePerformance();
