import { motion } from 'framer-motion';

/**
 * Footer Component - Minimal footer with gradient divider
 */

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 md:px-12 overflow-hidden">
      {/* Gradient divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-quantum-cyan to-transparent mb-12" />

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-4">
              Quantum Labs
            </h3>
            <p className="text-white/60 max-w-sm">
              Building the future of software, one quantum leap at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-quantum-cyan mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Services', 'Portfolio', 'Blog', 'Careers'].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-white/60 hover:text-quantum-cyan transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-quantum-cyan mb-4">Connect</h4>
            <ul className="space-y-2">
              {['GitHub', 'LinkedIn', 'Twitter', 'Dribbble'].map((social) => (
                <li key={social}>
                  <a
                    href="#"
                    className="text-white/60 hover:text-quantum-cyan transition-colors text-sm"
                  >
                    {social}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Quantum Labs. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-quantum-cyan transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-quantum-cyan transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-quantum-purple/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-quantum-cyan/5 rounded-full blur-[100px] -z-10" />
    </footer>
  );
}
