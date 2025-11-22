/**
 * GSAP Page Animations
 * Handles reveal animations for navigation, hero, and scroll-triggered sections
 */

import { gsap, ScrollTrigger } from './animations.js';

// Initial setup for all reveal elements
gsap.utils.toArray('.reveal-text').forEach(element => {
    gsap.set(element, {
        autoAlpha: 0,
        y: 30,
        filter: "blur(10px)",
        scale: 0.95
    });
});

// Nav items staggered reveal
export function animateNav() {
    gsap.to(".nav-item", {
        duration: 1,
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2
    });
}

// Hero items staggered reveal
export function animateHero() {
    gsap.to(".hero-item", {
        duration: 1.2,
        autoAlpha: 1,
        y: 0,
        filter: "blur(0px)",
        scale: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.6
    });
}

// Scroll-triggered animations for sections
export function animateScrollSections() {
    const sections = document.querySelectorAll("section:not(:first-child), div[class*='h-[50vh]'], footer");

    sections.forEach((section) => {
        const items = section.querySelectorAll(".scroll-item");

        if (items.length > 0) {
            ScrollTrigger.create({
                trigger: section,
                start: "top 80%",
                onEnter: () => {
                    gsap.to(items, {
                        duration: 1,
                        autoAlpha: 1,
                        y: 0,
                        filter: "blur(0px)",
                        scale: 1,
                        stagger: 0.1,
                        ease: "power3.out",
                        overwrite: "auto"
                    });
                }
            });
        }
    });
}

// Initialize all animations
export function initAnimations() {
    // Mark that animations have loaded
    document.body.classList.add('animations-loaded');

    animateNav();
    animateHero();
    animateScrollSections();
}
