import './styles/main.css';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

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

/* -------------------------------------------------------------------------- */
/*  Landing Page Intro Choreography                                           */
/* -------------------------------------------------------------------------- */
const portalEl = document.getElementById('media-portal');
const promptEl = document.getElementById('terminal-prompt');
const promptTextEl = document.getElementById('prompt-text');

// Calculate the vertical offset to place the prompt at the exact center of the screen
function calculateCenterOffset() {
  if (!portalEl || !promptEl) return -166;
  const section = portalEl.parentElement;
  if (!section) return -166;

  const sectionRect = section.getBoundingClientRect();
  const promptRect = promptEl.getBoundingClientRect();

  const sectionCenterY = sectionRect.top + sectionRect.height / 2;
  const promptCenterY = promptRect.top + promptRect.height / 2;

  return sectionCenterY - promptCenterY;
}

const promptInitialY = calculateCenterOffset();

// 1. Initial State
if (portalEl) {
  gsap.set(portalEl, {
    opacity: 0,
    y: -40, // drops from slightly above
  });
}

if (promptEl) {
  gsap.set(promptEl, {
    y: promptInitialY, // positioned at the exact vertical center
  });
}

// Master Intro Timeline
const introTl = gsap.timeline();

// Step 1: Wait 1.5s with blinking cursor at exact screen center, then type "click_to_enter" over 1.0s
if (promptTextEl) {
  introTl.to(promptTextEl, {
    text: {
      value: 'click_to_enter',
      delimiter: '',
    },
    duration: 1.0,
    delay: 1.5, // 0.5s shorter than previous 2.0s
    ease: 'none',
  });
}

// Step 2: 0.5s after typing ends:
// - Move the prompt down to its resting position
// - Fade in and drop the circular portal into place
introTl.addLabel('reveal', '+=0.5');

if (promptEl) {
  introTl.to(
    promptEl,
    {
      y: 0,
      duration: 1.0,
      ease: 'power2.inOut',
    },
    'reveal'
  );
}

if (portalEl) {
  introTl.to(
    portalEl,
    {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'power2.inOut',
    },
    'reveal'
  );
}
