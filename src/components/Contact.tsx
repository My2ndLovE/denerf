import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

/**
 * Contact Section - Morphing CTA with Futuristic UI
 *
 * Signature move: Liquid blob animations and scan-line form inputs
 * Features:
 * - Morphing blob background
 * - Futuristic form inputs with scan-line effects
 * - Success animation with particles
 * - Magnetic submit button
 */

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!blobRef.current) return;

    // Morphing blob animation
    const tl = gsap.timeline({ repeat: -1, yoyo: true });

    tl.to(blobRef.current, {
      borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
      duration: 4,
      ease: 'sine.inOut',
    })
      .to(blobRef.current, {
        borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
        duration: 4,
        ease: 'sine.inOut',
      })
      .to(blobRef.current, {
        borderRadius: '50% 50% 50% 50%',
        duration: 4,
        ease: 'sine.inOut',
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset form after success animation
      setTimeout(() => {
        setIsSuccess(false);
        setFormState({ name: '', email: '', message: '' });
      }, 3000);
    }, 2000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Morphing blob background */}
      <motion.div
        ref={blobRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-quantum-cyan/20 via-quantum-purple/20 to-quantum-pink/20 blur-[100px] -z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1 }}
      />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Left: CTA Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="gradient-text">Let's Build</span>
            <br />
            <span className="text-white">Something Epic</span>
          </motion.h2>

          <motion.p
            className="text-lg text-white/70 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            Have a project in mind? We're ready to turn your vision into reality.
            No idea is too ambitious.
          </motion.p>

          {/* Contact Info */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <a
              href="mailto:hello@quantumlabs.dev"
              className="flex items-center gap-4 glass glass-hover px-6 py-4 rounded-2xl group"
            >
              <span className="text-2xl">📧</span>
              <div>
                <p className="text-sm text-white/50">Email</p>
                <p className="text-quantum-cyan font-semibold group-hover:translate-x-2 transition-transform">
                  hello@quantumlabs.dev
                </p>
              </div>
            </a>

            <a
              href="tel:+1234567890"
              className="flex items-center gap-4 glass glass-hover px-6 py-4 rounded-2xl group"
            >
              <span className="text-2xl">📞</span>
              <div>
                <p className="text-sm text-white/50">Phone</p>
                <p className="text-quantum-cyan font-semibold group-hover:translate-x-2 transition-transform">
                  +1 (234) 567-890
                </p>
              </div>
            </a>

            <div className="flex items-center gap-4 glass glass-hover px-6 py-4 rounded-2xl">
              <span className="text-2xl">📍</span>
              <div>
                <p className="text-sm text-white/50">Location</p>
                <p className="text-white font-semibold">San Francisco, CA</p>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex gap-4 mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
              <motion.a
                key={social}
                href="#"
                className="w-12 h-12 glass glass-hover rounded-full flex items-center justify-center text-quantum-cyan"
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {social[0]}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Futuristic Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="glass glass-hover p-8 rounded-3xl border-animate relative overflow-hidden">
            {/* Success overlay */}
            {isSuccess && (
              <motion.div
                className="absolute inset-0 bg-quantum-cyan/20 backdrop-blur-sm flex items-center justify-center z-20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <div className="text-center">
                  <motion.div
                    className="text-6xl mb-4"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    ✓
                  </motion.div>
                  <p className="text-2xl font-bold text-white">Message Sent!</p>
                  <p className="text-white/70">We'll get back to you soon.</p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div className="relative">
                <label className="block text-sm font-semibold text-quantum-cyan mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-quantum-cyan focus:outline-none transition-all duration-300 scan-line"
                  placeholder="John Doe"
                />
                {/* Scan line effect */}
                <div className="scan-line-effect" />
              </div>

              {/* Email Input */}
              <div className="relative">
                <label className="block text-sm font-semibold text-quantum-cyan mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-quantum-cyan focus:outline-none transition-all duration-300"
                  placeholder="john@example.com"
                />
              </div>

              {/* Message Textarea */}
              <div className="relative">
                <label className="block text-sm font-semibold text-quantum-cyan mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-quantum-cyan focus:outline-none transition-all duration-300 resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full btn-quantum relative overflow-hidden"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <motion.span
                    className="flex items-center justify-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    />
                    Sending...
                  </motion.span>
                ) : (
                  <span>Send Message</span>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>

      <style>{`
        .scan-line-effect {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00f0ff, transparent);
          animation: scan 3s linear infinite;
          opacity: 0.5;
          pointer-events: none;
        }

        @keyframes scan {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(100px);
          }
        }

        input:focus ~ .scan-line-effect,
        textarea:focus ~ .scan-line-effect {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
