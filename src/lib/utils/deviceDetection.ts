export type DeviceTier = 'high' | 'medium' | 'low';

export function getDeviceTier(): DeviceTier {
  if (typeof window === 'undefined') return 'medium';

  const cores = navigator.hardwareConcurrency || 2;
  const memory = (navigator as any).deviceMemory || 2; // GB

  // High-end: 8+ cores, 8+ GB RAM
  if (cores >= 8 && memory >= 8) return 'high';

  // Medium: 4+ cores, 4+ GB RAM
  if (cores >= 4 && memory >= 4) return 'medium';

  // Low-end: everything else
  return 'low';
}

export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
