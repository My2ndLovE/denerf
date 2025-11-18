/**
 * Scroll-based Animations
 * GSAP ScrollTrigger setup for narrative-driven scroll experiences
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function initScrollAnimations() {
  console.log('Scroll animations initialized');

  // Hero title animation
  animateHeroElements();

  // Section transitions
  animateSectionTransitions();

  // TODO: Implement scroll-driven animations
  // - Hero elements fade in and slide up
  // - Section transitions with different effects
  // - Process split-screen merge/separate on scroll
  // - Portfolio grid reorganization
  // - AI stack constellation parallax
}

function animateHeroElements() {
  const title = document.getElementById('hero-title');
  const tagline = document.getElementById('hero-tagline');
  const subtitle = document.getElementById('hero-subtitle');
  const indicator = document.getElementById('scroll-indicator');

  const elements = [title, tagline, subtitle, indicator].filter(Boolean);

  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.5,
    }
  );
}

function animateSectionTransitions() {
  const sections = document.querySelectorAll('section');

  sections.forEach((section, index) => {
    if (index === 0) return; // Skip hero

    gsap.fromTo(
      section,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}
