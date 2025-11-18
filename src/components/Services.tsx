import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import gsap from 'gsap';

/**
 * Services Section - Interactive Orbital System
 *
 * Signature move: Services as "orbiting planets" that users can interact with
 * Features:
 * - Physics-based orbital animation
 * - Interactive hover states with magnetic pull
 * - Reveal animation on scroll
 * - 3D transform effects
 */

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const services: Service[] = [
  {
    id: 1,
    title: 'Web Applications',
    description: 'Lightning-fast, scalable web apps built with cutting-edge frameworks',
    icon: '⚡',
    color: 'from-quantum-cyan to-blue-500',
  },
  {
    id: 2,
    title: 'Mobile Development',
    description: 'Native & cross-platform mobile experiences that users love',
    icon: '📱',
    color: 'from-quantum-purple to-purple-600',
  },
  {
    id: 3,
    title: 'AI & Machine Learning',
    description: 'Intelligent systems that learn, adapt, and evolve with your business',
    icon: '🧠',
    color: 'from-quantum-pink to-pink-600',
  },
  {
    id: 4,
    title: 'Cloud Architecture',
    description: 'Scalable infrastructure designed for growth and resilience',
    icon: '☁️',
    color: 'from-cyan-500 to-quantum-cyan',
  },
  {
    id: 5,
    title: 'DevOps & CI/CD',
    description: 'Automated pipelines that ship code faster and safer',
    icon: '🚀',
    color: 'from-purple-500 to-quantum-purple',
  },
  {
    id: 6,
    title: 'UI/UX Design',
    description: 'Interfaces so intuitive, they feel like magic',
    icon: '✨',
    color: 'from-pink-500 to-quantum-pink',
  },
];

function ServiceOrbit({ service, index, total }: { service: Service; index: number; total: number }) {
  const orbitRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!orbitRef.current) return;

    // Calculate orbital position
    const angle = (index / total) * Math.PI * 2;
    const radius = 250; // Orbit radius

    // Orbital animation with GSAP
    const tl = gsap.timeline({ repeat: -1 });

    tl.to(orbitRef.current, {
      motionPath: {
        path: [
          { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius },
          {
            x: Math.cos(angle + Math.PI * 2) * radius,
            y: Math.sin(angle + Math.PI * 2) * radius,
          },
        ],
        curviness: 1.5,
      },
      duration: 20 + index * 2, // Stagger orbital speeds
      ease: 'none',
    });
  }, [index, total]);

  return (
    <motion.div
      ref={orbitRef}
      className="absolute top-1/2 left-1/2"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.2, zIndex: 50 }}
    >
      <motion.div
        className={`glass glass-hover p-6 rounded-2xl w-64 cursor-pointer border-animate`}
        animate={{
          rotateY: isHovered ? 15 : 0,
          rotateX: isHovered ? -10 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* Icon */}
        <motion.div
          className={`text-5xl mb-4 bg-gradient-to-br ${service.color} bg-clip-text`}
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {service.icon}
        </motion.div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-2 gradient-text">{service.title}</h3>

        {/* Description */}
        <p className="text-sm text-white/70">{service.description}</p>

        {/* Hover indicator */}
        <motion.div
          className="mt-4 text-quantum-cyan text-sm font-semibold"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
        >
          Learn more →
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-padding relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-quantum-purple/5 via-transparent to-transparent -z-10" />

      {/* Section Title */}
      <motion.div
        className="text-center mb-20 max-w-3xl"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
      >
        <motion.h2
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="gradient-text">Our Capabilities</span>
        </motion.h2>
        <p className="text-lg text-white/70">
          Full-stack expertise that orbits around your vision
        </p>
      </motion.div>

      {/* Orbital System Container */}
      <div className="relative w-full max-w-6xl h-[600px] perspective-1000">
        {/* Central Hub */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1, type: 'spring' }}
        >
          <div className="glass p-8 rounded-full border-4 border-quantum-cyan/30">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-quantum-cyan via-quantum-purple to-quantum-pink flex items-center justify-center animate-glow">
              <span className="text-4xl">⚛️</span>
            </div>
          </div>
        </motion.div>

        {/* Orbit Rings (decorative) */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-white/5 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        />

        {/* Service Orbits */}
        {isInView &&
          services.map((service, index) => (
            <ServiceOrbit
              key={service.id}
              service={service}
              index={index}
              total={services.length}
            />
          ))}
      </div>

      {/* Mobile Fallback (Grid) */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-4xl">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className="glass glass-hover p-6 rounded-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`text-4xl mb-4 bg-gradient-to-br ${service.color} bg-clip-text`}>
              {service.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 gradient-text">{service.title}</h3>
            <p className="text-sm text-white/70">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
