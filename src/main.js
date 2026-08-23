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
    y: -800, // starts from outside the screen above
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

// 3. Click-to-Enter Exit Animation
if (promptEl) {
  promptEl.addEventListener('click', () => {
    // Prepare prompt letters, prefix, and cursor for animation
    const prefix = promptEl.querySelector('.prompt-prefix');
    const cursor = promptEl.querySelector('.terminal-cursor');
    const letters = Array.from(promptTextEl.querySelectorAll('.letter'));
    const elementsToFall = [prefix, ...letters, cursor];

    promptTextEl.innerHTML = promptTextEl.innerText
      .split('')
      .map((char) => `<span class="letter">${char}</span>`)
      .join('');
    
    // Refresh letters after innerHTML change
    const newLetters = Array.from(promptTextEl.querySelectorAll('.letter'));
    const allElements = [prefix, ...newLetters, cursor];

    const exitTl = gsap.timeline();

    // Shrink mask (Iris-out transition)
    if (portalEl) {
      // Initialize clip-path
      gsap.set(portalEl, { clipPath: 'circle(50% at 50% 50%)' });
      exitTl.to(portalEl, {
        clipPath: 'circle(0% at 50% 50%)',
        duration: 1.0,
        ease: 'power1.in',
      }, 0);
    }

    // Letters, prefix, and cursor fall down and fade out (Matrix rain)
    exitTl.to(allElements, {
      y: () => gsap.utils.random(200, 500), // Random fall distance
      opacity: 0,
      duration: () => gsap.utils.random(0.5, 1.5), // Random falling speed
      stagger: {
        amount: 0.8, // More spread out
        from: 'random',
      },
      ease: 'power1.in',
    }, 0);

    // Reset cursor position and move to center
    exitTl.call(() => {
      promptTextEl.innerHTML = '';
      // Reset all elements that fell
      gsap.set(allElements, { clearProps: 'all' });
      
      gsap.to(promptEl, {
        y: promptInitialY,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          // Scene 2: Type "hello_this_is_molotov"
          const scene2Tl = gsap.timeline();
          scene2Tl.to(promptTextEl, {
            text: { value: "hello", delimiter: "" },
            duration: 0.5,
            ease: "none"
          })
          .to(promptTextEl, {
            text: { value: "hello_this_is_molotov", delimiter: "" },
            duration: 1.0,
            ease: "none"
          }, "+=0.2");
        }
      });
    });
  });
}
