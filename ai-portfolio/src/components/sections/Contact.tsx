'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, Mail, Github, Linkedin, Twitter } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      message: '',
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return !newErrors.name && !newErrors.email && !newErrors.message
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulate form submission
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSubmitStatus('success')

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' })
        setErrors({ name: '', email: '', message: '' })
        setSubmitStatus('idle')
      }, 3000)
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const socialLinks = [
    { icon: Github, href: SITE_CONFIG.github, label: 'GitHub' },
    { icon: Linkedin, href: SITE_CONFIG.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: SITE_CONFIG.twitter, label: 'Twitter' },
  ]

  return (
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen bg-cyber-darker px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-5xl font-bold text-gradient md:text-6xl">
            Get In Touch
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-cyber-cyan via-cyber-purple to-cyber-pink" />
          <p className="mt-6 text-lg text-gray-400">
            Let's build something amazing together
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full rounded-lg border bg-cyber-dark/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
                      : 'border-cyber-cyan/20 focus:border-cyber-cyan focus:ring-cyber-cyan/50'
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full rounded-lg border bg-cyber-dark/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
                      : 'border-cyber-cyan/20 focus:border-cyber-cyan focus:ring-cyber-cyan/50'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Message Textarea */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-gray-300"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={`w-full resize-none rounded-lg border bg-cyber-dark/50 px-4 py-3 text-white placeholder-gray-500 backdrop-blur-sm transition-all focus:outline-none focus:ring-2 ${
                    errors.message
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50'
                      : 'border-cyber-cyan/20 focus:border-cyber-cyan focus:ring-cyber-cyan/50'
                  }`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`group relative w-full overflow-hidden rounded-lg px-8 py-4 text-lg font-semibold text-white transition-all ${
                  submitStatus === 'success'
                    ? 'bg-green-500'
                    : 'bg-gradient-to-r from-cyber-cyan to-cyber-purple hover:from-cyber-purple hover:to-cyber-pink'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {submitStatus === 'success' ? (
                    'Message Sent!'
                  ) : isSubmitting ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={20} />
                    </>
                  )}
                </span>

                {/* Hover effect */}
                {!isSubmitting && submitStatus !== 'success' && (
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-cyber-purple to-cyber-pink opacity-0 transition-opacity group-hover:opacity-100" />
                )}
              </motion.button>

              {/* Status message */}
              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm text-green-400"
                >
                  Thanks for reaching out! I'll get back to you soon.
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm text-red-400"
                >
                  Oops! Something went wrong. Please try again later.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Email */}
            <div className="group relative overflow-hidden rounded-2xl border border-cyber-cyan/20 bg-gradient-to-br from-cyber-dark/80 to-cyber-darker/80 p-6 backdrop-blur-sm transition-all hover:border-cyber-cyan/50">
              <div className="relative z-10 flex items-start gap-4">
                <div className="rounded-lg bg-cyber-cyan/10 p-3">
                  <Mail className="text-cyber-cyan" size={28} />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-cyber-cyan">
                    Email
                  </h3>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-gray-300 transition-colors hover:text-cyber-cyan"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-cyber-cyan/5 to-cyber-purple/5 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            {/* Social Links */}
            <div className="rounded-2xl border border-cyber-cyan/20 bg-gradient-to-br from-cyber-dark/80 to-cyber-darker/80 p-6 backdrop-blur-sm">
              <h3 className="mb-4 text-lg font-semibold text-cyber-cyan">
                Connect with me
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative rounded-lg border border-cyber-cyan/20 bg-cyber-dark/50 p-4 transition-all hover:border-cyber-cyan hover:bg-cyber-cyan/10"
                    aria-label={social.label}
                  >
                    <social.icon className="text-gray-400 transition-colors group-hover:text-cyber-cyan" size={24} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="rounded-2xl border border-cyber-cyan/20 bg-gradient-to-br from-cyber-dark/80 to-cyber-darker/80 p-6 backdrop-blur-sm">
              <h3 className="mb-3 text-lg font-semibold text-cyber-cyan">
                Let's Collaborate
              </h3>
              <p className="leading-relaxed text-gray-300">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision. Whether you need AI expertise,
                full-stack development, or just want to chat about technology, feel free
                to reach out!
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyber-cyan/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyber-purple/5 blur-3xl" />
      </div>
    </section>
  )
}
