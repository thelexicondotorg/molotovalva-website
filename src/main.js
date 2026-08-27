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
/*  Staged Just-In-Time (JIT) Asset Loaders                                   */
/* -------------------------------------------------------------------------- */
let scene3AssetsLoaded = false;
export function loadScene3Assets() {
  if (scene3AssetsLoaded) return;
  scene3AssetsLoaded = true;

  // 1. Preload image into browser cache
  const img = new Image();
  img.src = '/images/OhDeer.jpg';

  // 2. Attach background to deer focus portal
  const deerFocusEl = document.querySelector('#scene3-deer-focus');
  if (deerFocusEl) {
    deerFocusEl.style.backgroundImage = "url('/images/OhDeer.jpg')";
    deerFocusEl.style.backgroundSize = '3525px 1397px';
    deerFocusEl.style.backgroundPosition = '-1075px -1096px';
    deerFocusEl.style.backgroundRepeat = 'no-repeat';
  }

  // 3. Attach backgrounds to 4x10 grid circles
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 10; c++) {
      const circle = document.querySelector(`#scene3-circle-${r}-${c}`);
      if (circle) {
        circle.style.backgroundImage = "url('/images/OhDeer.jpg')";
        circle.style.backgroundSize = '846px 335px';
        circle.style.backgroundPosition = `-${c * 86}px -${r * 87.67}px`;
        circle.style.backgroundRepeat = 'no-repeat';
      }
    }
  }
}

let scene4AssetsLoaded = false;
export function loadScene4Assets() {
  if (scene4AssetsLoaded) return;
  scene4AssetsLoaded = true;

  const s4Assets = [
    // Row 0
    { bg: "url('/images/S4-01-woman-in-sea-of-bottles.jpg')", size: 'cover', pos: 'center', url: '/images/S4-01-woman-in-sea-of-bottles.jpg' },
    { bg: "url('/images/S4-02-plane.jpg')", size: 'cover', pos: 'center', url: '/images/S4-02-plane.jpg' },
    { bg: "url('/images/S4-03-Water.jpg')", size: 'cover', pos: 'center', url: '/images/S4-03-Water.jpg' },
    { bg: "url('/images/S4-04-pumps.jpg')", size: 'cover', pos: 'center', url: '/images/S4-04-pumps.jpg' },
    { bg: "url('/images/S4-05-wood.jpg')", size: 'cover', pos: 'center', url: '/images/S4-05-wood.jpg' },
    // Row 1
    { bg: "url('/images/S4-06_07-desert.jpg')", size: '298px 140px', pos: '0px center', url: '/images/S4-06_07-desert.jpg' },
    { bg: "url('/images/S4-06_07-desert.jpg')", size: '298px 140px', pos: '-158px center' },
    { bg: "url('/images/S4-08-activists.jpg')", size: 'cover', pos: 'center', url: '/images/S4-08-activists.jpg' },
    { bg: "url('/images/S4-09-orangutan.jpg')", size: 'cover', pos: 'center', url: '/images/S4-09-orangutan.jpg' },
    { bg: "url('/images/S4-10-diggers.jpg')", size: 'cover', pos: 'center', url: '/images/S4-10-diggers.jpg' },
  ];

  // Preload images into browser memory
  s4Assets.forEach((item) => {
    if (item.url) {
      const img = new Image();
      img.src = item.url;
    }
  });

  // Attach background to Scene 4 still focus
  const stillFocusEl = document.querySelector('#scene4-still-focus');
  if (stillFocusEl) {
    stillFocusEl.style.backgroundImage = "url('/images/S4-01-woman-in-sea-of-bottles.jpg')";
  }

  // Attach backgrounds to Scene 4 2x5 grid
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 5; c++) {
      const idx = r * 5 + c;
      const circle = document.querySelector(`#scene4-circle-${r}-${c}`);
      if (circle && s4Assets[idx]) {
        circle.style.backgroundImage = s4Assets[idx].bg;
        circle.style.backgroundSize = s4Assets[idx].size;
        circle.style.backgroundPosition = s4Assets[idx].pos;
        circle.style.backgroundRepeat = 'no-repeat';
      }
    }
  }

  // Preload video
  const s4Video = document.querySelector('#scene4-video');
  if (s4Video) {
    s4Video.load();
  }
}

// Global expose for console inspection
window.loadScene3Assets = loadScene3Assets;
window.loadScene4Assets = loadScene4Assets;

// Build Scene 3 Grid Structure immediately (DOM-only, 0 bytes network)
const scene3GridEl = document.querySelector('#scene3-grid');
if (scene3GridEl && scene3GridEl.children.length === 0) {
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 10; c++) {
      const circle = document.createElement('div');
      circle.id = `scene3-circle-${r}-${c}`;
      circle.className = 'scene3-circle rounded-full overflow-hidden opacity-0 pointer-events-none select-none';
      circle.style.width = '72px';
      circle.style.height = '72px';
      circle.setAttribute('data-row', r);
      circle.setAttribute('data-col', c);
      scene3GridEl.appendChild(circle);
    }
  }
}

// Build Scene 4 Grid Structure immediately (DOM-only, 0 bytes network)
const scene4GridEl = document.querySelector('#scene4-grid');
if (scene4GridEl && scene4GridEl.children.length === 0) {
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 5; c++) {
      const circle = document.createElement('div');
      circle.id = `scene4-circle-${r}-${c}`;
      circle.className = 'scene4-circle rounded-full overflow-hidden opacity-0 pointer-events-none select-none';
      circle.style.width = '140px';
      circle.style.height = '140px';
      circle.setAttribute('data-row', r);
      circle.setAttribute('data-col', c);
      scene4GridEl.appendChild(circle);
    }
  }
}

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

// Step 1: Blinking cursor at center, then type "click_to_enter" (tight 0.4s initial breath + 0.8s typing)
if (promptTextEl) {
  introTl.to(promptTextEl, {
    text: {
      value: 'click_to_enter',
      delimiter: '',
    },
    duration: 0.8,
    delay: 0.4,
    ease: 'none',
  });
}

// Step 2: 0.3s after typing ends:
// - Move the prompt down to its resting position
// - Fade in and drop the circular portal into place
introTl.addLabel('reveal', '+=0.3');

if (promptEl) {
  introTl.to(
    promptEl,
    {
      y: 0,
      duration: 0.8,
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
      duration: 0.8,
      ease: 'power2.inOut',
    },
    'reveal'
  );
}

// 3. Click-to-Enter Exit Animation & Transition to Scene 2
let isEntering = false;
function handleEnter() {
  if (isEntering) return;
  isEntering = true;

  // Just-In-Time: Trigger prefetch for Scene 3 assets as soon as Scene 1 is exited
  loadScene3Assets();

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

              // Scene 3 Prompt delta to top-left
              const scene3PromptEl = document.querySelector('#scene3-prompt');
              const scene3Rect = scene3PromptEl ? scene3PromptEl.getBoundingClientRect() : { left: canvasRect.left + canvasRect.width / 2, top: canvasRect.top + canvasRect.height / 2 };
              const scene3DeltaX = targetLeft - scene3Rect.left;
              const scene3DeltaY = targetTop - scene3Rect.top;

              // Scene 4 Prompt delta to top-left
              const scene4PromptEl = document.querySelector('#scene4-prompt');
              const scene4Rect = scene4PromptEl ? scene4PromptEl.getBoundingClientRect() : { left: canvasRect.left + canvasRect.width / 2, top: canvasRect.top + canvasRect.height / 2 };
              const scene4DeltaX = targetLeft - scene4Rect.left;
              const scene4DeltaY = targetTop - scene4Rect.top;

              // Scene 3 Deer Portal Delta calculation
              const deerFocusEl = document.querySelector('#scene3-deer-focus');
              const deerSlotEl = document.querySelector('#scene3-circle-3-3');
              let deerDeltaX = -129;
              let deerDeltaY = 109;
              let deerScale = 0.24;

              if (deerFocusEl && deerSlotEl) {
                const focusRect = deerFocusEl.getBoundingClientRect();
                const slotRect = deerSlotEl.getBoundingClientRect();
                if (focusRect.width > 0 && slotRect.width > 0) {
                  deerDeltaX = (slotRect.left + slotRect.width / 2) - (focusRect.left + focusRect.width / 2);
                  deerDeltaY = (slotRect.top + slotRect.height / 2) - (focusRect.top + focusRect.height / 2);
                  deerScale = slotRect.width / focusRect.width;
                }
              }

              // Scene 4 Still Portal Delta calculation (512px -> 140px into Slot 0,0)
              const s4StillFocusEl = document.querySelector('#scene4-still-focus');
              const s4StillSlotEl = document.querySelector('#scene4-circle-0-0');
              let s4DeltaX = -328;
              let s4DeltaY = -82;
              let s4Scale = 140 / 512;

              if (s4StillFocusEl && s4StillSlotEl) {
                const focusRect = s4StillFocusEl.getBoundingClientRect();
                const slotRect = s4StillSlotEl.getBoundingClientRect();
                if (focusRect.width > 0 && slotRect.width > 0) {
                  s4DeltaX = (slotRect.left + slotRect.width / 2) - (focusRect.left + focusRect.width / 2);
                  s4DeltaY = (slotRect.top + slotRect.height / 2) - (focusRect.top + focusRect.height / 2);
                  s4Scale = slotRect.width / focusRect.width;
                }
              }

              // 4. Bind GSAP ScrollTrigger for the 0 -> 18000px scroll scrub
              const scrollTl = gsap.timeline({
                scrollTrigger: {
                  trigger: '#scroll-track',
                  start: 'top top',
                  end: '18000px top',
                  scrub: true,
                  invalidateOnRefresh: true,
                  onUpdate: (self) => {
                    const scrollPos = self.progress * 18000;
                    if (scrollPos >= 1500 && !scene3AssetsLoaded) {
                      loadScene3Assets();
                    }
                    if (scrollPos >= 7000 && !scene4AssetsLoaded) {
                      loadScene4Assets();
                    }
                  }
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

              // Phase 5: Subheading Part 1 & Part 2 sequential fade-in (3800px -> 4500px)
              // Part 1: Fades in over 300px (3800-4100), holds for 100px (4100-4200)
              scrollTl.fromTo('#subheading-part1',
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 300, ease: 'none', immediateRender: false },
                3800
              );

              // Part 2 (italic): Starts 100px earlier at 4200px, fades in over 300px (4200-4500)
              scrollTl.fromTo('#subheading-part2',
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 300, ease: 'none', immediateRender: false },
                4200
              );

              // Phase 6: Scene 2 Hold (4500px -> 5000px)
              // 500px stillness hold with all Scene 2 elements at 100% opacity.

              // Phase 7: Staggered "Zero Gravity" Rise & Fade Out of Scene 2 Elements (5000px -> 5550px)
              // 1st to go: "hello_this_is_molotov_" prompt (5000px -> 5250px)
              scrollTl.to(promptEl, {
                y: promptInitialY + deltaY - 200,
                opacity: 0,
                duration: 250,
                ease: 'power1.in',
              }, 5000);

              // 2nd to go: 5 Circles row (5100px -> 5350px)
              scrollTl.to('#scene2-portals', {
                y: -200,
                opacity: 0,
                duration: 250,
                ease: 'power1.in',
              }, 5100);

              // 3rd to go: Heading (5200px -> 5450px)
              scrollTl.to('#scene2-heading', {
                y: -200,
                opacity: 0,
                duration: 250,
                ease: 'power1.in',
              }, 5200);

              // 4th to go: Sub-heading (5300px -> 5550px)
              scrollTl.to('#scene2-subheading', {
                y: -200,
                opacity: 0,
                duration: 250,
                ease: 'power1.in',
              }, 5300);

              // Phase 8: Scene 3 Prompt Rises cleanly to the Center (5500px -> 5900px)
              scrollTl.fromTo('#scene3-prompt',
                { y: 180, opacity: 0 },
                { y: 0, opacity: 1, duration: 400, ease: 'power1.out', immediateRender: false },
                5500
              );

              // Phase 9: Scene 3 Prompt Typing Sequence (5900px -> 6500px)
              scrollTl.to('#scene3-prompt-text', {
                text: { value: 'you_look_through_the_wrong_end_of_telescopes', delimiter: '' },
                duration: 600,
                ease: 'none',
              }, 5900);

              // Phase 10: Scene 3 Prompt Centered Hold (6500px -> 6700px)
              // 200px stillness hold at screen center before migrating to corner

              // Phase 11: Scene 3 Prompt Shrinks & Moves to Upper-Left Corner (6700px -> 7200px)
              scrollTl.to('#scene3-prompt', {
                scale: 0.5,
                transformOrigin: 'left top',
                x: scene3DeltaX,
                y: scene3DeltaY,
                duration: 500,
                ease: 'none',
              }, 6700);

              // Phase 12: Scene 3 Step 1 — Large Deer Focus & Initial Clause "You see the deer" (7200px -> 7500px)
              // 1. Deer Portal fades in centered over 100px (7200 -> 7300), holds for 200px (7300 -> 7500)
              scrollTl.fromTo('#scene3-deer-focus',
                { opacity: 0, scale: 1, x: 0, y: 0 },
                { opacity: 1, scale: 1, x: 0, y: 0, duration: 100, ease: 'none', immediateRender: false },
                7200
              );

              // 2. Heading words 1-4 ("You", "see", "the", "deer") fade in sequentially
              const scene3HeadingWords = document.querySelectorAll('#scene3-heading .heading-word');
              if (scene3HeadingWords.length >= 9) {
                // Word 0: "You" (7200 -> 7275)
                scrollTl.fromTo(scene3HeadingWords[0],
                  { opacity: 0, y: 12 },
                  { opacity: 1, y: 0, duration: 75, ease: 'none', immediateRender: false },
                  7200
                );
                // Word 1: "see" (7275 -> 7350)
                scrollTl.fromTo(scene3HeadingWords[1],
                  { opacity: 0, y: 12 },
                  { opacity: 1, y: 0, duration: 75, ease: 'none', immediateRender: false },
                  7275
                );
                // Word 2: "the" (7350 -> 7425)
                scrollTl.fromTo(scene3HeadingWords[2],
                  { opacity: 0, y: 12 },
                  { opacity: 1, y: 0, duration: 75, ease: 'none', immediateRender: false },
                  7350
                );
                // Word 3: "deer" (7425 -> 7500)
                scrollTl.fromTo(scene3HeadingWords[3],
                  { opacity: 0, y: 12 },
                  { opacity: 1, y: 0, duration: 75, ease: 'none', immediateRender: false },
                  7425
                );

                // Phase 13: Scene 3 Step 2 — Left Half Grid Assembles (7500px -> 8100px)
                // [HEADING IS PAUSED ON "You see the deer"]
                // 1. Deer Portal glides and scales down into Slot (Row 4, Column 4)
                scrollTl.to('#scene3-deer-focus', {
                  x: deerDeltaX,
                  y: deerDeltaY,
                  scale: deerScale,
                  duration: 600,
                  ease: 'power1.inOut',
                }, 7500);

                // Seamless switch to grid circle at 8100px
                scrollTl.fromTo('#scene3-circle-3-3',
                  { opacity: 0 },
                  { opacity: 1, duration: 20, ease: 'none', immediateRender: false },
                  8080
                );
                scrollTl.to('#scene3-deer-focus', {
                  opacity: 0,
                  duration: 20,
                  ease: 'none',
                }, 8080);

                // 2. Randomized reveal of remaining 19 circles of Columns 1-5 (Left Half)
                const leftHalfCoords = [
                  [1, 2], [0, 0], [2, 4], [3, 1], [0, 3],
                  [1, 0], [2, 1], [3, 4], [0, 1], [2, 0],
                  [1, 4], [3, 0], [0, 4], [2, 3], [1, 1],
                  [3, 2], [0, 2], [2, 2], [1, 3]
                ];

                leftHalfCoords.forEach(([r, c], index) => {
                  const circleId = `#scene3-circle-${r}-${c}`;
                  const startTime = 7500 + index * 24;
                  scrollTl.fromTo(circleId,
                    { opacity: 0 },
                    { opacity: 1, duration: 120, ease: 'none', immediateRender: false },
                    startTime
                  );
                });

                // Phase 14: Contemplation Hold (8100px -> 8300px)
                // [200px stillness hold on completed pristine left half + "You see the deer"]

                // Phase 15: Scene 3 Step 3 — Right Half (Cols 6-10) Wildfire Reveal & Heading Completion (8300px -> 8900px)
                // 1. Randomized reveal of 20 circles of Columns 6-10 (Right Half)
                const rightHalfCoords = [
                  [1, 7], [0, 5], [2, 9], [3, 6], [0, 8],
                  [1, 5], [2, 6], [3, 9], [0, 6], [2, 5],
                  [1, 9], [3, 5], [0, 9], [2, 8], [1, 6],
                  [3, 7], [0, 7], [2, 7], [1, 8], [3, 8]
                ];

                rightHalfCoords.forEach(([r, c], index) => {
                  const circleId = `#scene3-circle-${r}-${c}`;
                  const startTime = 8300 + index * 24;
                  scrollTl.fromTo(circleId,
                    { opacity: 0 },
                    { opacity: 1, duration: 120, ease: 'none', immediateRender: false },
                    startTime
                  );
                });

                // 2. Heading resumes to complete sentence: "...but miss the burning forest."
                // Word 4: "but" (8300 -> 8420)
                scrollTl.fromTo(scene3HeadingWords[4],
                  { opacity: 0, y: 12 },
                  { opacity: 1, y: 0, duration: 120, ease: 'none', immediateRender: false },
                  8300
                );
                // Word 5: "miss" (8420 -> 8540)
                scrollTl.fromTo(scene3HeadingWords[5],
                  { opacity: 0, y: 12 },
                  { opacity: 1, y: 0, duration: 120, ease: 'none', immediateRender: false },
                  8420
                );
                // Word 6: "the" (8540 -> 8660)
                scrollTl.fromTo(scene3HeadingWords[6],
                  { opacity: 0, y: 12 },
                  { opacity: 1, y: 0, duration: 120, ease: 'none', immediateRender: false },
                  8540
                );
                // Word 7: "burning" (8660 -> 8780)
                scrollTl.fromTo(scene3HeadingWords[7],
                  { opacity: 0, y: 12 },
                  { opacity: 1, y: 0, duration: 120, ease: 'none', immediateRender: false },
                  8660
                );
                // Word 8: "forest." (8780 -> 8900)
                scrollTl.fromTo(scene3HeadingWords[8],
                  { opacity: 0, y: 12 },
                  { opacity: 1, y: 0, duration: 120, ease: 'none', immediateRender: false },
                  8780
                );

                // Phase 16: Scene 3 Step 4 — Subheading Reveal & Horizontal Telescope Flip (8900px -> 10000px)
                // 1. Part 1 fades in normally (8900 -> 9150)
                scrollTl.fromTo('#scene3-subheading-part1',
                  { opacity: 0, y: 8 },
                  { opacity: 1, y: 0, duration: 250, ease: 'none', immediateRender: false },
                  8900
                );
                // 2. Part 2 fades in simultaneously HORIZONTALLY MIRRORED (scaleX: -1) (8900 -> 9150)
                scrollTl.fromTo('#scene3-subheading-part2',
                  { opacity: 0, scaleX: -1, transformOrigin: 'center center' },
                  { opacity: 1, scaleX: -1, transformOrigin: 'center center', duration: 250, ease: 'none', immediateRender: false },
                  8900
                );

                // 3. Mirror Contemplation Hold (9150 -> 9300)

                // 4. Physical horizontal flip: "Turns the telescope around" (scaleX: -1 -> 1) (9300 -> 9700)
                scrollTl.to('#scene3-subheading-part2', {
                  scaleX: 1,
                  transformOrigin: 'center center',
                  duration: 400,
                  ease: 'power2.inOut',
                }, 9300);

                // 5. Final Scene 3 End-State Hold (9700 -> 10000)
              }

              // Phase 17: Scene 3 Zero-Gravity Float-Away Exit (10000px -> 10600px)
              // 1. Subheading floats up & fades
              scrollTl.to('#scene3-subheading', {
                y: -40,
                opacity: 0,
                duration: 350,
                ease: 'power1.in',
              }, 10000);

              // 2. Heading floats up & fades
              scrollTl.to('#scene3-heading', {
                y: -60,
                opacity: 0,
                duration: 400,
                ease: 'power1.in',
              }, 10050);

              // 3. 40-Circle Grid floats up & fades
              scrollTl.to('#scene3-grid', {
                y: -80,
                opacity: 0,
                duration: 450,
                ease: 'power1.in',
              }, 10100);

              // 4. Scene 3 Pinned Prompt floats up & dissolves
              scrollTl.to('#scene3-prompt', {
                y: scene3DeltaY - 50,
                opacity: 0,
                duration: 350,
                ease: 'power1.in',
              }, 10150);

              // Phase 18: Pure Black Space (10600px -> 10900px)
              // [300px pitch-black contemplation runway before Scene 4]

              // Phase 19: Scene 4 Prompt Rises to Screen Center (10900px -> 11300px)
              scrollTl.fromTo('#scene4-prompt',
                { y: 180, opacity: 0 },
                { y: 0, opacity: 1, duration: 400, ease: 'power1.out', immediateRender: false },
                10900
              );

              // Phase 20: Scene 4 Prompt Clause 1 Typing (11300px -> 11700px)
              scrollTl.to('#scene4-prompt-text', {
                text: { value: 'you_think_in_fractions', delimiter: '' },
                duration: 400,
                ease: 'none',
              }, 11300);

              // Phase 21: Breathing Moment (11700px -> 11800px)
              // [100px pause on "you_think_in_fractions_" with cursor blinking]

              // Phase 22: Scene 4 Prompt Clause 2 Typing (11800px -> 12500px)
              scrollTl.to('#scene4-prompt-text', {
                text: { value: 'you_think_in_fractions_then_call_the_consequences_unexpected', delimiter: '' },
                duration: 700,
                ease: 'none',
              }, 11800);

              // Phase 23: Scene 4 Prompt Centered Hold (12500px -> 12700px)
              // [200px stillness hold at screen center before migrating to corner]

              // Phase 24: Scene 4 Prompt Shrinks & Moves to Upper-Left Corner (12700px -> 13200px)
              scrollTl.to('#scene4-prompt', {
                scale: 0.5,
                transformOrigin: 'left top',
                x: scene4DeltaX,
                y: scene4DeltaY,
                duration: 500,
                ease: 'none',
              }, 12700);

              // Phase 25: 512x512 Centered Video Scrub (13200px -> 14600px)
              const s4Video = document.querySelector('#scene4-video');
              if (s4Video) {
                s4Video.load();
              }
              const s4VideoState = { time: 0 };
              scrollTl.to(s4VideoState, {
                time: 6.04,
                duration: 1400,
                ease: 'none',
                onUpdate: () => {
                  if (s4Video && s4Video.readyState >= 1) {
                    s4Video.currentTime = s4VideoState.time;
                  }
                }
              }, 13200);

              // 0.5s equivalent fade-in (13200 -> 13350)
              scrollTl.fromTo('#scene4-video-portal',
                { opacity: 0 },
                { opacity: 1, duration: 150, ease: 'none', immediateRender: false },
                13200
              );

              // 0.5s equivalent fade-out (14450 -> 14600)
              scrollTl.to('#scene4-video-portal', {
                opacity: 0,
                duration: 150,
                ease: 'none',
              }, 14450);

              // Phase 26: Large Still Frame Substitution & 100px Hold (14600px -> 14800px)
              // 1. Still frame fades in at center
              scrollTl.fromTo('#scene4-still-focus',
                { opacity: 0, scale: 1, x: 0, y: 0 },
                { opacity: 1, scale: 1, x: 0, y: 0, duration: 100, ease: 'none', immediateRender: false },
                14600
              );
              // [100px stillness hold at center from 14700px -> 14800px]

              // Phase 27: Still Frame Glide & Scale to Grid Slot 1 (14800px -> 15400px)
              scrollTl.to('#scene4-still-focus', {
                x: s4DeltaX,
                y: s4DeltaY,
                scale: s4Scale,
                duration: 600,
                ease: 'power1.inOut',
              }, 14800);

              // Seamless switch to grid circle at 15400px
              scrollTl.fromTo('#scene4-circle-0-0',
                { opacity: 0 },
                { opacity: 1, duration: 20, ease: 'none', immediateRender: false },
                15380
              );
              scrollTl.to('#scene4-still-focus', {
                opacity: 0,
                duration: 20,
                ease: 'none',
              }, 15380);

              // Phase 28: Grid Random Population & Word-by-Word Heading (15400px -> 16600px)
              const remainingS4Coords = [
                [0, 2], [1, 3], [0, 4], [1, 0], [0, 1],
                [1, 4], [1, 1], [0, 3], [1, 2]
              ];

              remainingS4Coords.forEach(([r, c], index) => {
                const circleId = `#scene4-circle-${r}-${c}`;
                const startTime = 15400 + index * 110;
                scrollTl.fromTo(circleId,
                  { opacity: 0 },
                  { opacity: 1, duration: 180, ease: 'none', immediateRender: false },
                  startTime
                );
              });

              // Heading words: "Nature thinks in wholes."
              const scene4HeadingWords = document.querySelectorAll('#scene4-heading .heading-word');
              if (scene4HeadingWords.length >= 4) {
                // Word 0: "Nature" (15400 -> 15700)
                scrollTl.fromTo(scene4HeadingWords[0],
                  { opacity: 0, y: 12 },
                  { opacity: 1, y: 0, duration: 300, ease: 'none', immediateRender: false },
                  15400
                );
                // Word 1: "thinks" (15700 -> 16000)
                scrollTl.fromTo(scene4HeadingWords[1],
                  { opacity: 0, y: 12 },
                  { opacity: 1, y: 0, duration: 300, ease: 'none', immediateRender: false },
                  15700
                );
                // Word 2: "in" (16000 -> 16300)
                scrollTl.fromTo(scene4HeadingWords[2],
                  { opacity: 0, y: 12 },
                  { opacity: 1, y: 0, duration: 300, ease: 'none', immediateRender: false },
                  16000
                );
                // Word 3: "wholes." (16300 -> 16600)
                scrollTl.fromTo(scene4HeadingWords[3],
                  { opacity: 0, y: 12 },
                  { opacity: 1, y: 0, duration: 300, ease: 'none', immediateRender: false },
                  16300
                );
              }

              // Phase 29: Two-Line Subheading Reveal (16600px -> 17400px)
              // Line 1: (16600 -> 17000)
              scrollTl.fromTo('#scene4-subheading-line1',
                { opacity: 0, y: 6 },
                { opacity: 1, y: 0, duration: 400, ease: 'none', immediateRender: false },
                16600
              );
              // Line 2: (17000 -> 17400)
              scrollTl.fromTo('#scene4-subheading-line2',
                { opacity: 0, y: 6 },
                { opacity: 1, y: 0, duration: 400, ease: 'none', immediateRender: false },
                17000
              );

              // Phase 30: Final Stillness Hold (17400px -> 18000px)
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
}

if (promptEl) {
  promptEl.addEventListener('click', handleEnter);
}
if (portalEl) {
  portalEl.addEventListener('click', handleEnter);
  portalEl.style.cursor = 'pointer';
}


