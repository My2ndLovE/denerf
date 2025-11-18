import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Tech Stack Section - DNA Helix Visualization
 *
 * Signature move: Technologies arranged in a rotating DNA helix structure
 * Features:
 * - 3D rotating helix that responds to scroll
 * - Each technology is a "molecule" in the helix
 * - Interactive hover states with info tooltips
 * - Smooth rotation animations with GSAP
 */

interface Technology {
  name: string;
  category: 'frontend' | 'backend' | 'cloud' | 'tools';
  icon: string;
  color: string;
}

const technologies: Technology[] = [
  // Frontend
  { name: 'React', category: 'frontend', icon: '⚛️', color: '#61DAFB' },
  { name: 'TypeScript', category: 'frontend', icon: '📘', color: '#3178C6' },
  { name: 'Next.js', category: 'frontend', icon: '▲', color: '#000000' },
  { name: 'Astro', category: 'frontend', icon: '🚀', color: '#FF5D01' },
  { name: 'Tailwind', category: 'frontend', icon: '🎨', color: '#06B6D4' },
  { name: 'Three.js', category: 'frontend', icon: '🎮', color: '#049EF4' },

  // Backend
  { name: 'Node.js', category: 'backend', icon: '🟢', color: '#339933' },
  { name: 'Python', category: 'backend', icon: '🐍', color: '#3776AB' },
  { name: 'GraphQL', category: 'backend', icon: '◆', color: '#E10098' },
  { name: 'PostgreSQL', category: 'backend', icon: '🐘', color: '#4169E1' },
  { name: 'Redis', category: 'backend', icon: '⚡', color: '#DC382D' },

  // Cloud
  { name: 'AWS', category: 'cloud', icon: '☁️', color: '#FF9900' },
  { name: 'Docker', category: 'cloud', icon: '🐳', color: '#2496ED' },
  { name: 'Kubernetes', category: 'cloud', icon: '⚓', color: '#326CE5' },
  { name: 'Terraform', category: 'cloud', icon: '🏗️', color: '#7B42BC' },

  // Tools
  { name: 'Git', category: 'tools', icon: '🔧', color: '#F05032' },
  { name: 'VS Code', category: 'tools', icon: '💻', color: '#007ACC' },
  { name: 'Figma', category: 'tools', icon: '🎯', color: '#F24E1E' },
];

function TechMolecule({
  tech,
  position,
  strand,
}: {
  tech: Technology;
  position: number;
  strand: 'left' | 'right';
}) {
  const moleculeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!moleculeRef.current) return;

    // Calculate helix position
    const angle = position * 40; // Degrees between molecules
    const radius = 200; // Helix radius
    const height = position * 80; // Vertical spacing

    const x = strand === 'left' ? -radius : radius;
    const z = Math.sin((angle * Math.PI) / 180) * 100;

    gsap.set(moleculeRef.current, {
      x,
      y: height,
      z,
      rotateY: angle,
    });

    // Continuous rotation animation
    gsap.to(moleculeRef.current, {
      rotateY: `+=${360}`,
      scrollTrigger: {
        trigger: moleculeRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
    });
  }, [position, strand]);

  return (
    <motion.div
      ref={moleculeRef}
      className="absolute transform-3d"
      whileHover={{ scale: 1.3, z: 150 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="relative group cursor-pointer">
        {/* Molecule */}
        <div
          className="w-20 h-20 rounded-full glass glass-hover flex items-center justify-center text-3xl border-2 transition-all duration-300"
          style={{
            borderColor: tech.color,
            boxShadow: `0 0 20px ${tech.color}40`,
          }}
        >
          {tech.icon}
        </div>

        {/* Tooltip */}
        <motion.div
          className="absolute -top-12 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          initial={{ y: 10 }}
          whileHover={{ y: 0 }}
        >
          <span className="text-sm font-semibold" style={{ color: tech.color }}>
            {tech.name}
          </span>
        </motion.div>

        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-50 blur-xl transition-opacity"
          style={{ backgroundColor: tech.color }}
        />
      </div>
    </motion.div>
  );
}

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const helixRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!helixRef.current) return;

    // Helix container rotation on scroll
    gsap.to(helixRef.current, {
      rotateY: 360,
      scrollTrigger: {
        trigger: helixRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
      },
    });
  }, []);

  // Split technologies into two strands
  const leftStrand = technologies.filter((_, i) => i % 2 === 0);
  const rightStrand = technologies.filter((_, i) => i % 2 !== 0);

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="section-padding relative overflow-hidden min-h-screen flex flex-col items-center justify-center"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-quantum-purple/5 to-transparent -z-10" />

      {/* Section Title */}
      <motion.div
        className="text-center mb-20 max-w-3xl z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="gradient-text">Our Tech DNA</span>
        </h2>
        <p className="text-lg text-white/70">
          Cutting-edge technologies woven into our development process
        </p>
      </motion.div>

      {/* DNA Helix Container */}
      <div className="relative w-full max-w-6xl h-[800px] perspective-1000 overflow-visible">
        <motion.div
          ref={helixRef}
          className="relative w-full h-full transform-3d"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
        >
          {/* Helix Strands (connecting lines) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
            style={{ transform: 'translateZ(-50px)' }}
          >
            <defs>
              <linearGradient id="helix-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00f0ff" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            {leftStrand.map((_, i) => {
              if (i < leftStrand.length - 1) {
                return (
                  <line
                    key={`line-${i}`}
                    x1="30%"
                    y1={`${(i * 100) / leftStrand.length}%`}
                    x2="30%"
                    y2={`${((i + 1) * 100) / leftStrand.length}%`}
                    stroke="url(#helix-gradient)"
                    strokeWidth="2"
                  />
                );
              }
              return null;
            })}
          </svg>

          {/* Molecules */}
          <div className="absolute inset-0 flex justify-center items-start">
            {/* Left Strand */}
            {leftStrand.map((tech, i) => (
              <TechMolecule key={`left-${tech.name}`} tech={tech} position={i} strand="left" />
            ))}

            {/* Right Strand */}
            {rightStrand.map((tech, i) => (
              <TechMolecule key={`right-${tech.name}`} tech={tech} position={i} strand="right" />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Tech Categories Legend */}
      <motion.div
        className="flex flex-wrap justify-center gap-6 mt-12 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5 }}
      >
        {['Frontend', 'Backend', 'Cloud', 'Tools'].map((category) => (
          <div key={category} className="flex items-center gap-2 glass px-4 py-2 rounded-full">
            <div
              className="w-3 h-3 rounded-full"
              style={{
                background:
                  category === 'Frontend'
                    ? '#00f0ff'
                    : category === 'Backend'
                    ? '#a855f7'
                    : category === 'Cloud'
                    ? '#ec4899'
                    : '#06B6D4',
              }}
            />
            <span className="text-sm font-semibold text-white/80">{category}</span>
          </div>
        ))}
      </motion.div>

      {/* Interactive hint */}
      <motion.p
        className="text-center text-white/50 text-sm mt-8"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
      >
        Scroll to rotate • Hover to explore
      </motion.p>
    </section>
  );
}
