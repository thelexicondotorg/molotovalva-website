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

// Stop Lenis during Scene 1 initial load
lenis.stop();
window.scrollTo(0, 0);

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
const mainCanvasEl = document.getElementById('main-canvas');
const scrollIndicator = document.getElementById('scroll-indicator');

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
    delay: 1.5,
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

// 3. Click-to-Enter Exit Animation & Transition to Scene 2
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
      gsap.set(portalEl, { clipPath: 'circle(50% at 50% 50%)' });
      exitTl.to(portalEl, {
        clipPath: 'circle(0% at 50% 50%)',
        duration: 1.0,
        ease: 'power1.in',
      }, 0);
    }

    // Letters, prefix, and cursor fall down and fade out (Matrix rain)
    exitTl.to(allElements, {
      y: () => gsap.utils.random(200, 500),
      opacity: 0,
      duration: () => gsap.utils.random(0.5, 1.5),
      stagger: {
        amount: 0.8,
        from: 'random',
      },
      ease: 'power1.in',
    }, 0);

    // Reset cursor position and move to center for Scene 2
    exitTl.call(() => {
      promptTextEl.innerHTML = '';
      gsap.set(allElements, { clearProps: 'all' });
      
      gsap.to(promptEl, {
        y: promptInitialY,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          // Scene 2: Type "hello_this_is_molotov"
          const scene2Tl = gsap.timeline({
            onComplete: () => {
              promptEl.classList.add('static-prompt');

              // 1. Fade in scroll indicator
              if (scrollIndicator) {
                gsap.to(scrollIndicator, {
                  opacity: 1,
                  duration: 1.0,
                  ease: 'power2.inOut',
                });

                // Subtle vertical bounce for scroll indicator container
                gsap.to(scrollIndicator, {
                  y: -10,
                  duration: 1.5,
                  repeat: -1,
                  yoyo: true,
                  ease: 'power1.inOut'
                });

                // Animate child elements (line and chevrons)
                const elements = scrollIndicator.querySelectorAll('.scroll-anim');
                const chevronTl = gsap.timeline({ repeat: -1 });
                
                chevronTl.fromTo(elements,
                  { opacity: 0, y: -5 },
                  { opacity: 1, y: 5, duration: 0.75, stagger: 0.2, ease: "power1.in" }
                )
                .to(elements,
                  { opacity: 0, y: 15, duration: 0.75, stagger: 0.2, ease: "power1.out" }
                );
              }

              // 2. Enable Lenis smooth scroll now that Scene 2 is active
              lenis.start();
              window.scrollTo(0, 0);
              ScrollTrigger.refresh();

              // 3. Compute delta to top-left of the 1366px canvas
              const canvasRect = mainCanvasEl ? mainCanvasEl.getBoundingClientRect() : { left: 24, top: 24 };
              const promptRect = promptEl.getBoundingClientRect();
              
              const targetLeft = canvasRect.left + 24;
              const targetTop = canvasRect.top + 24;
              const deltaX = targetLeft - promptRect.left;
              const deltaY = targetTop - promptRect.top;

              // 4. Bind GSAP ScrollTrigger for the 0 -> 3800px scroll scrub
              const scrollTl = gsap.timeline({
                scrollTrigger: {
                  trigger: '#scroll-track',
                  start: 'top top',
                  end: '3800px top',
                  scrub: true,
                  invalidateOnRefresh: true,
                }
              });

              // Phase 0 (0px -> 500px): Prompt shrinks & moves to top-left, scroll indicator fades out
              scrollTl.to(promptEl, {
                scale: 0.5,
                transformOrigin: 'left top',
                x: deltaX,
                y: promptInitialY + deltaY,
                duration: 500,
                ease: 'none',
              }, 0);

              if (scrollIndicator) {
                scrollTl.to(scrollIndicator, {
                  opacity: 0,
                  duration: 500,
                  ease: 'none',
                }, 0);
              }

              // Phase 1: Sequential Center Flashes (500px -> 2500px)
              // Circle 1: Appears at 500px, holds 200px (500-700), fades out in 300px (700-1000)
              scrollTl.fromTo('#circle-1', { opacity: 0, x: 0, y: 0, scale: 1 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.001, ease: 'none' }, 500);
              scrollTl.to('#circle-1', { opacity: 0, duration: 300, ease: 'none' }, 700);

              // Circle 2: Appears at 1000px, holds 200px (1000-1200), fades out in 300px (1200-1500)
              scrollTl.fromTo('#circle-2', { opacity: 0, x: 0, y: 0, scale: 1 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.001, ease: 'none' }, 1000);
              scrollTl.to('#circle-2', { opacity: 0, duration: 300, ease: 'none' }, 1200);

              // Circle 3: Appears at 1500px, holds 200px (1500-1700), fades out in 300px (1700-2000)
              scrollTl.fromTo('#circle-3', { opacity: 0, x: 0, y: 0, scale: 1 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.001, ease: 'none' }, 1500);
              scrollTl.to('#circle-3', { opacity: 0, duration: 300, ease: 'none' }, 1700);

              // Circle 4: Appears at 2000px, holds 200px (2000-2200), fades out in 300px (2200-2500)
              scrollTl.fromTo('#circle-4', { opacity: 0, x: 0, y: 0, scale: 1 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.001, ease: 'none' }, 2000);
              scrollTl.to('#circle-4', { opacity: 0, duration: 300, ease: 'none' }, 2200);

              // Circle 5: Appears at 2500px, holds center for 200px (2500-2700)
              scrollTl.fromTo('#circle-5', { opacity: 0, x: 0, y: 0, scale: 1 }, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.001, ease: 'none' }, 2500);

              // Phase 2: Circle 5 glides to Slot 5 (Far Right) & lifts upward to y: -95 (2700px -> 3000px)
              const rowScale = 170 / 300; // 0.5667
              scrollTl.to('#circle-5', {
                x: 388,
                y: -95,
                scale: rowScale,
                duration: 300,
                ease: 'none',
              }, 2700);

              // Phase 3: Other 4 circles fade into their row positions at y: -95 (3000px -> 3800px)
              // 1st: Circle 3 into Slot 3 (Center: x = 0, y = -95) from 3000px -> 3200px
              scrollTl.fromTo('#circle-3',
                { x: 0, y: -95, scale: rowScale, opacity: 0 },
                { x: 0, y: -95, scale: rowScale, opacity: 1, duration: 200, ease: 'none', immediateRender: false },
                3000
              );

              // 2nd: Circle 1 into Slot 1 (Far Left: x = -388, y = -95) from 3200px -> 3400px
              scrollTl.fromTo('#circle-1',
                { x: -388, y: -95, scale: rowScale, opacity: 0 },
                { x: -388, y: -95, scale: rowScale, opacity: 1, duration: 200, ease: 'none', immediateRender: false },
                3200
              );

              // 3rd: Circle 4 into Slot 4 (Right Center: x = +194, y = -95) from 3400px -> 3600px
              scrollTl.fromTo('#circle-4',
                { x: 194, y: -95, scale: rowScale, opacity: 0 },
                { x: 194, y: -95, scale: rowScale, opacity: 1, duration: 200, ease: 'none', immediateRender: false },
                3400
              );

              // 4th: Circle 2 into Slot 2 (Left Center: x = -194, y = -95) from 3600px -> 3800px
              scrollTl.fromTo('#circle-2',
                { x: -194, y: -95, scale: rowScale, opacity: 0 },
                { x: -194, y: -95, scale: rowScale, opacity: 1, duration: 200, ease: 'none', immediateRender: false },
                3600
              );

              // Phase 4: Heading word-by-word sequential fade-in (3000px -> 3800px)
              // Synchronized directly with the 4 random circles appearing
              const headingWords = document.querySelectorAll('#scene2-heading .heading-word');
              headingWords.forEach((word, index) => {
                const startTime = 3000 + index * 100;
                scrollTl.fromTo(word,
                  { opacity: 0, y: 12 },
                  { opacity: 1, y: 0, duration: 100, ease: 'none', immediateRender: false },
                  startTime
                );
              });
            }
          });

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

