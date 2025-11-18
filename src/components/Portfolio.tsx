import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Portfolio Section - Bento Grid with Stacked Cards
 *
 * Signature move: Adaptive bento grid with 3D card reveal animations
 * Features:
 * - Stacked card reveal on scroll
 * - 3D flip animations on hover
 * - Dynamic bento grid layout (breaking traditional grids)
 * - Image reveal with parallax effect
 */

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  size: 'small' | 'medium' | 'large';
  gradient: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Neural Commerce Platform',
    category: 'E-commerce + AI',
    description: 'AI-powered shopping experience with predictive analytics and personalized recommendations',
    tech: ['Next.js', 'TensorFlow', 'AWS'],
    size: 'large',
    gradient: 'from-cyan-500 via-quantum-cyan to-blue-600',
  },
  {
    id: 2,
    title: 'QuantumPay',
    category: 'FinTech',
    description: 'Real-time payment processing with blockchain verification',
    tech: ['React', 'Solidity', 'Node.js'],
    size: 'medium',
    gradient: 'from-purple-500 via-quantum-purple to-pink-500',
  },
  {
    id: 3,
    title: 'HealthSync',
    category: 'Healthcare',
    description: 'HIPAA-compliant telemedicine platform with AR diagnostics',
    tech: ['Vue', 'Three.js', 'Firebase'],
    size: 'medium',
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
  },
  {
    id: 4,
    title: 'CodeMorph AI',
    category: 'Developer Tools',
    description: 'AI code review and refactoring assistant',
    tech: ['TypeScript', 'OpenAI', 'Astro'],
    size: 'small',
    gradient: 'from-orange-500 via-red-500 to-pink-500',
  },
  {
    id: 5,
    title: 'MetaVerse Spaces',
    category: 'Web3 + VR',
    description: 'Immersive virtual collaboration spaces with NFT integration',
    tech: ['WebGL', 'Ethereum', 'Unity'],
    size: 'large',
    gradient: 'from-quantum-purple via-quantum-pink to-red-500',
  },
  {
    id: 6,
    title: 'EcoTrack',
    category: 'Sustainability',
    description: 'Carbon footprint tracking with IoT sensor integration',
    tech: ['React Native', 'IoT', 'GraphQL'],
    size: 'small',
    gradient: 'from-lime-500 via-green-500 to-emerald-600',
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (!cardRef.current) return;

    // Stacked card reveal animation on scroll
    gsap.fromTo(
      cardRef.current,
      {
        y: 100 + index * 20,
        opacity: 0,
        rotateX: -15,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
      }
    );
  }, [index]);

  const getSizeClasses = () => {
    switch (project.size) {
      case 'large':
        return 'col-span-2 row-span-2 md:col-span-2 md:row-span-2';
      case 'medium':
        return 'col-span-1 row-span-2 md:col-span-1 md:row-span-2';
      case 'small':
        return 'col-span-1 row-span-1';
      default:
        return 'col-span-1 row-span-1';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`${getSizeClasses()} perspective-1000`}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full min-h-[300px] transform-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring' }}
      >
        {/* Front of card */}
        <div
          className={`absolute inset-0 glass glass-hover p-8 rounded-3xl overflow-hidden backface-hidden`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Gradient background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10`}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <span className="text-xs text-quantum-cyan font-mono mb-2 block">
                {project.category}
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">
                {project.title}
              </h3>
              <p className="text-white/70 text-sm md:text-base mb-6">
                {project.description}
              </p>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-quantum-cyan"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Hover indicator */}
          <motion.div
            className="absolute bottom-4 right-4 text-quantum-cyan"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <span className="text-sm font-semibold">Flip to see more →</span>
          </motion.div>
        </div>

        {/* Back of card */}
        <div
          className={`absolute inset-0 glass p-8 rounded-3xl overflow-hidden`}
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`}
          />

          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h4 className="text-xl font-bold mb-4 text-white">Project Highlights</h4>
              <ul className="space-y-3 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-quantum-cyan">✓</span>
                  <span>300% increase in user engagement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-quantum-cyan">✓</span>
                  <span>99.9% uptime with auto-scaling infrastructure</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-quantum-cyan">✓</span>
                  <span>Award-winning UI/UX design</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-quantum-cyan">✓</span>
                  <span>Built in 8 weeks with agile methodology</span>
                </li>
              </ul>
            </div>

            <motion.button
              className="btn-quantum mt-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View Case Study</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-quantum-cyan/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-quantum-purple/5 rounded-full blur-[100px]" />

      {/* Section Title */}
      <motion.div
        className="text-center mb-20 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="gradient-text">Featured Work</span>
        </h2>
        <p className="text-lg text-white/70">
          Projects that pushed boundaries and delivered results
        </p>
      </motion.div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-auto gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      {/* View All CTA */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
      >
        <a
          href="#"
          className="inline-flex items-center gap-2 text-quantum-cyan font-semibold text-lg hover:gap-4 transition-all duration-300"
        >
          <span>View All Projects</span>
          <span>→</span>
        </a>
      </motion.div>
    </section>
  );
}
