import './styles/main.css';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis Smooth Scroll
export const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
});

// Synchronize Lenis scroll updates with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

// Drive Lenis RAF loop through GSAP Ticker for unified frame synchronization
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Disable GSAP lag smoothing to ensure smooth scroll lockstep
gsap.ticker.lagSmoothing(0);

// Global export for convenience during development
window.lenis = lenis;
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;

console.log('⚡ Molotovalva Website initialized: Lenis & GSAP ready.');

/* -------------------------------------------------------------------------- */
/*  Animation Logic Placeholder (Ready for future animation implementation)  */
/* -------------------------------------------------------------------------- */
