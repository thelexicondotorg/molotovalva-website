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

  // Lazy load video only when Scene 4 assets are requested
  const s4Video = document.querySelector('#scene4-video');
  if (s4Video && !s4Video.getAttribute('src')) {
    s4Video.src = '/images/Woman_in_sea_of_bottles-squared-v1.mp4';
    s4Video.load();
  }
}

// Lazy load Scene 5 assets
let scene5AssetsLoaded = false;
export function loadScene5Assets() {
  if (scene5AssetsLoaded) return;
  scene5AssetsLoaded = true;

  const s5Assets = [
    // Row 0
    { bg: "url('/images/S5-01-lungs.jpg')", size: 'cover', pos: 'center', url: '/images/S5-01-lungs.jpg' },
    { bg: "url('/images/S5-02-cow.jpg')", size: 'cover', pos: 'center', url: '/images/S5-02-cow.jpg' },
    // Row 1
    { bg: "url('/images/S5-03-steakhealth.jpg')", size: 'cover', pos: 'center', url: '/images/S5-03-steakhealth.jpg' },
    { bg: "url('/images/S5-04-comenothere.jpg')", size: 'cover', pos: 'center', url: '/images/S5-04-comenothere.jpg' },
    // Row 2
    { bg: "url('/images/S5-05-skull.jpg')", size: 'cover', pos: 'center', url: '/images/S5-05-skull.jpg' },
    { bg: "url('/images/S5-06-dude.jpg')", size: 'cover', pos: 'center', url: '/images/S5-06-dude.jpg' },
  ];

  // Preload images into browser memory
  s5Assets.forEach((item) => {
    if (item.url) {
      const img = new Image();
      img.src = item.url;
    }
  });

  // Attach backgrounds to Scene 5 3x2 grid
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 2; c++) {
      const idx = r * 2 + c;
      const circle = document.querySelector(`#scene5-circle-${r}-${c}`);
      if (circle && s5Assets[idx]) {
        circle.style.backgroundImage = s5Assets[idx].bg;
        circle.style.backgroundSize = s5Assets[idx].size;
        circle.style.backgroundPosition = s5Assets[idx].pos;
        circle.style.backgroundRepeat = 'no-repeat';
      }
    }
  }
}

// Lazy load Scene 6 assets
let scene6AssetsLoaded = false;
export function loadScene6Assets() {
  if (scene6AssetsLoaded) return;
  scene6AssetsLoaded = true;

  // 1. Inject video sources
  const s6Video1 = document.querySelector('#scene6-video-1');
  const s6Video2 = document.querySelector('#scene6-video-2');
  if (s6Video1 && !s6Video1.getAttribute('src')) {
    s6Video1.src = '/images/Museum_Plastic_Ocean-squared-v2.mp4';
    s6Video1.load();
  }
  if (s6Video2 && !s6Video2.getAttribute('src')) {
    s6Video2.src = '/images/Museum_Plastic_Ocean-squared-v2.mp4';
    s6Video2.load();
  }

  // 2. Dual Still Portals
  const stillLeft = document.querySelector('#scene6-still-portal-left');
  const stillRight = document.querySelector('#scene6-still-portal-right');
  if (stillLeft) stillLeft.style.backgroundImage = "url('/images/S6-11_12-plasticocean.jpg')";
  if (stillRight) stillRight.style.backgroundImage = "url('/images/S6-11_12-plasticocean.jpg')";

  // 3. 5x3 Grid 15 Circle Assets
  const s6GridAssets = [
    // Row 0
    { id: 'scene6-circle-0-0', bg: "url('/images/S6-01-mining.jpg')", size: 'cover', pos: 'center', url: '/images/S6-01-mining.jpg' },
    { id: 'scene6-circle-0-1', bg: "url('/images/S6-02-cigarettebutt.jpg')", size: 'cover', pos: 'center', url: '/images/S6-02-cigarettebutt.jpg' },
    { id: 'scene6-circle-0-2', bg: "url('/images/S6-03-fires.jpg')", size: 'cover', pos: 'center', url: '/images/S6-03-fires.jpg' },
    { id: 'scene6-circle-0-3', bg: "url('/images/S6-04-motherdaughter.jpg')", size: 'cover', pos: 'center', url: '/images/S6-04-motherdaughter.jpg' },
    { id: 'scene6-circle-0-4', bg: "url('/images/S6-05-bins.jpg')", size: 'cover', pos: 'center', url: '/images/S6-05-bins.jpg' },
    // Row 1
    { id: 'scene6-circle-1-0', bg: "url('/images/S6-06-fishingnet.jpg')", size: 'cover', pos: 'center', url: '/images/S6-06-fishingnet.jpg' },
    { id: 'scene6-circle-1-1', bg: "url('/images/S6-07-scientists.jpg')", size: 'cover', pos: 'center', url: '/images/S6-07-scientists.jpg' },
    { id: 'scene6-circle-1-2', bg: "url('/images/S6-08-diggers.jpg')", size: 'cover', pos: 'center', url: '/images/S6-08-diggers.jpg' },
    { id: 'scene6-circle-1-3', bg: "url('/images/S6-09_14-microplastics.jpg')", size: '100% 200%', pos: 'center top', url: '/images/S6-09_14-microplastics.jpg' },
    { id: 'scene6-circle-1-4', bg: "url('/images/S6-10-projectedwhale.jpg')", size: 'cover', pos: 'center', url: '/images/S6-10-projectedwhale.jpg' },
    // Row 2
    { id: 'scene6-circle-2-0', bg: "url('/images/S6-11_12-plasticocean.jpg')", size: '200% 100%', pos: 'left center', url: '/images/S6-11_12-plasticocean.jpg' },
    { id: 'scene6-circle-2-1', bg: "url('/images/S6-11_12-plasticocean.jpg')", size: '200% 100%', pos: 'right center', url: '/images/S6-11_12-plasticocean.jpg' },
    { id: 'scene6-circle-2-2', bg: "url('/images/S6-13-landfill.jpg')", size: 'cover', pos: 'center', url: '/images/S6-13-landfill.jpg' },
    { id: 'scene6-circle-2-3', bg: "url('/images/S6-09_14-microplastics.jpg')", size: '100% 200%', pos: 'center bottom', url: '/images/S6-09_14-microplastics.jpg' },
    { id: 'scene6-circle-2-4', bg: "url('/images/S6-15-dam.jpg')", size: 'cover', pos: 'center', url: '/images/S6-15-dam.jpg' },
  ];

  s6GridAssets.forEach((item) => {
    if (item.url) {
      const img = new Image();
      img.src = item.url;
    }
    const el = document.querySelector(`#${item.id}`);
    if (el) {
      el.style.backgroundImage = item.bg;
      el.style.backgroundSize = item.size;
      el.style.backgroundPosition = item.pos;
      el.style.backgroundRepeat = 'no-repeat';
    }
  });
}

// Lazy load Scene 7 assets
let scene7AssetsLoaded = false;
export function loadScene7Assets() {
  if (scene7AssetsLoaded) return;
  scene7AssetsLoaded = true;

  const s7Img = document.querySelector('#scene7-image');
  if (s7Img && !s7Img.getAttribute('src')) {
    s7Img.src = '/images/S7-1-molotov.jpg';
  }
  const img = new Image();
  img.src = '/images/S7-1-molotov.jpg';
}

// Global expose for console inspection
window.loadScene3Assets = loadScene3Assets;
window.loadScene4Assets = loadScene4Assets;
window.loadScene5Assets = loadScene5Assets;
window.loadScene6Assets = loadScene6Assets;
window.loadScene7Assets = loadScene7Assets;

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

// Build Scene 5 Grid Structure immediately (DOM-only, 0 bytes network)
const scene5GridEl = document.querySelector('#scene5-grid');
if (scene5GridEl && scene5GridEl.children.length === 0) {
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 2; c++) {
      const circle = document.createElement('div');
      circle.id = `scene5-circle-${r}-${c}`;
      circle.className = 'scene5-circle rounded-full overflow-hidden opacity-0 pointer-events-none select-none';
      circle.style.width = '140px';
      circle.style.height = '140px';
      circle.setAttribute('data-row', r);
      circle.setAttribute('data-col', c);
      scene5GridEl.appendChild(circle);
    }
  }
}

/* -------------------------------------------------------------------------- */
/*  Landing Page Intro Choreography & Dual-Video Crossfade Loop              */
/* -------------------------------------------------------------------------- */
const portalEl = document.getElementById('media-portal');
const promptEl = document.getElementById('terminal-prompt');
const promptTextEl = document.getElementById('prompt-text');
const mainCanvasEl = document.getElementById('main-canvas');
const scrollIndicator = document.getElementById('scroll-indicator');

let cancelIntroVideoLoop = null;

function initIntroVideoCrossfadeLoop() {
  const videoA = document.getElementById('intro-video-a');
  const videoB = document.getElementById('intro-video-b');
  if (!videoA || !videoB) return;

  const CROSSFADE_DURATION = 0.85; // seconds
  const END_MARGIN = 1.5; // Cut-off margin before file end
  const PRE_ROLL_ADVANCE = -2.2; // Seconds to play incoming video in background before starting the crossfade
  let activeVideo = videoA;
  let nextVideo = videoB;
  let isPreRolling = false;
  let isCrossfading = false;
  let isLoopRunning = true;

  // Initial z-index & playback
  videoA.style.zIndex = '1';
  videoB.style.zIndex = '2';
  videoA.style.opacity = '1';
  videoB.style.opacity = '0';
  videoA.currentTime = 0;
  videoA.play().catch(() => {});

  function checkLoop() {
    if (!isLoopRunning) return;

    if (activeVideo && activeVideo.duration && activeVideo.duration > 0) {
      const remainingTime = activeVideo.duration - activeVideo.currentTime;

      // Phase 1: Start incoming video playing silently in the background (Pre-roll)
      if (remainingTime <= (CROSSFADE_DURATION + END_MARGIN + PRE_ROLL_ADVANCE) && !isPreRolling) {
        isPreRolling = true;
        nextVideo.currentTime = 0;
        nextVideo.style.zIndex = '2';
        nextVideo.style.opacity = '0';
        nextVideo.play().catch(() => {});
      }

      // Phase 2: Trigger crossfade once pre-roll advance has elapsed
      if (remainingTime <= (CROSSFADE_DURATION + END_MARGIN) && !isCrossfading && isPreRolling) {
        isCrossfading = true;

        activeVideo.style.zIndex = '1';
        activeVideo.style.opacity = '1';

        // Fade next video IN on top of active video
        gsap.to(nextVideo, {
          opacity: 1,
          duration: CROSSFADE_DURATION,
          ease: 'power1.inOut',
          onComplete: () => {
            activeVideo.pause();
            activeVideo.currentTime = 0;
            activeVideo.style.opacity = '0';

            // Swap roles
            const temp = activeVideo;
            activeVideo = nextVideo;
            nextVideo = temp;

            activeVideo.style.zIndex = '1';
            nextVideo.style.zIndex = '2';
            nextVideo.style.opacity = '0';
            isPreRolling = false;
            isCrossfading = false;
          },
        });
      }
    }

    requestAnimationFrame(checkLoop);
  }

  requestAnimationFrame(checkLoop);

  cancelIntroVideoLoop = () => {
    isLoopRunning = false;
    videoA.pause();
    videoB.pause();
  };
}

initIntroVideoCrossfadeLoop();

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

  // Stop intro video looping
  if (cancelIntroVideoLoop) {
    cancelIntroVideoLoop();
  }

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

              // 3. Compute dynamic responsive docking coordinates for top-left pinned prompts
              function getPromptDockCoordinates() {
                const canvasRect = mainCanvasEl ? mainCanvasEl.getBoundingClientRect() : { width: 1366, height: window.innerHeight, left: 0, top: 0 };
                const isMobile = window.innerWidth <= 768;
                const padX = isMobile ? 16 : 24;
                const padY = isMobile ? 16 : 24;
                const scale = isMobile ? 0.65 : 0.5;

                return {
                  dockX: -(canvasRect.width / 2 - padX),
                  dockY: -(canvasRect.height / 2 - padY),
                  scale: scale,
                  padX: padX,
                  padY: padY,
                  canvasRect: canvasRect,
                };
              }

              const promptCoords = getPromptDockCoordinates();
              const promptRect = promptEl.getBoundingClientRect();
              const targetLeft = promptCoords.canvasRect.left + promptCoords.padX;
              const targetTop = promptCoords.canvasRect.top + promptCoords.padY;
              const s1DeltaX = targetLeft - promptRect.left;
              const s1DeltaY = targetTop - promptRect.top;

              // Ensure initial centering baseline for Scene 3, 4, 5, 6, 7, 8 prompt elements
              gsap.set(['#scene3-prompt', '#scene4-prompt', '#scene5-prompt', '#scene6-prompt', '#scene7-prompt', '#scene8-prompt'], {
                position: 'absolute',
                left: '50%',
                top: '50%',
                xPercent: -50,
                yPercent: -50,
                x: 0,
                y: 0,
              });

              // Ensure Scene 7 visual initial states
              gsap.set('#scene7-portal', { opacity: 0, scale: 0.95 });
              gsap.set('#scene7-narrative-wrapper', { opacity: 0, y: 450 });
              gsap.set('#scene7-narrative', { opacity: 0 });

              // Ensure Scene 8 visual initial states
              gsap.set('#scene8-prompt', { opacity: 0 });
              gsap.set(['#scene8-fly-1', '#scene8-fly-2', '#scene8-fly-3', '#scene8-fly-4'], { opacity: 0 });
              gsap.set(['#scene8-card-1', '#scene8-card-2', '#scene8-card-3', '#scene8-card-4'], { opacity: 0 });

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

              // Scene 6 Still Portals Delta calculation (400px -> 124px into Slot 2,0 and Slot 2,1)
              const s6StillLeftEl = document.querySelector('#scene6-still-portal-left');
              const s6SlotLeftEl = document.querySelector('#scene6-circle-2-0');
              let s6LeftDeltaX = -300;
              let s6LeftDeltaY = 148;
              let s6Scale = 124 / 400;

              if (s6StillLeftEl && s6SlotLeftEl) {
                const focusRect = s6StillLeftEl.getBoundingClientRect();
                const slotRect = s6SlotLeftEl.getBoundingClientRect();
                if (focusRect.width > 0 && slotRect.width > 0) {
                  s6LeftDeltaX = (slotRect.left + slotRect.width / 2) - (focusRect.left + focusRect.width / 2);
                  s6LeftDeltaY = (slotRect.top + slotRect.height / 2) - (focusRect.top + focusRect.height / 2);
                  s6Scale = slotRect.width / focusRect.width;
                }
              }

              const s6StillRightEl = document.querySelector('#scene6-still-portal-right');
              const s6SlotRightEl = document.querySelector('#scene6-circle-2-1');
              let s6RightDeltaX = -150;
              let s6RightDeltaY = 148;

              if (s6StillRightEl && s6SlotRightEl) {
                const focusRect = s6StillRightEl.getBoundingClientRect();
                const slotRect = s6SlotRightEl.getBoundingClientRect();
                if (focusRect.width > 0 && slotRect.width > 0) {
                  s6RightDeltaX = (slotRect.left + slotRect.width / 2) - (focusRect.left + focusRect.width / 2);
                  s6RightDeltaY = (slotRect.top + slotRect.height / 2) - (focusRect.top + focusRect.height / 2);
                }
              }

              // 4. Bind GSAP ScrollTrigger for 1:1 pixel-to-timeline scroll scrub
              const TOTAL_SCROLL_TRACK = 48500;
              const scrollTrackEl = document.querySelector('#scroll-track');
              if (scrollTrackEl) {
                scrollTrackEl.style.height = `${TOTAL_SCROLL_TRACK + window.innerHeight}px`;
              }

              const scrollTl = gsap.timeline({
                scrollTrigger: {
                  trigger: '#scroll-track',
                  start: 'top top',
                  end: 'bottom bottom',
                  scrub: true,
                  invalidateOnRefresh: true,
                  onUpdate: (self) => {
                    const scrollPos = self.progress * TOTAL_SCROLL_TRACK;
                    if (scrollPos >= 1500 && !scene3AssetsLoaded) {
                      loadScene3Assets();
                    }
                    if (scrollPos >= 7000 && !scene4AssetsLoaded) {
                      loadScene4Assets();
                    }
                    if (scrollPos >= 14000 && !scene5AssetsLoaded) {
                      loadScene5Assets();
                    }
                    if (scrollPos >= 22000 && !scene6AssetsLoaded) {
                      loadScene6Assets();
                    }
                    if (scrollPos >= 30000 && !scene7AssetsLoaded) {
                      loadScene7Assets();
                    }
                  }
                }
              });

              // Phase 0 (0px -> 500px): Prompt shrinks & moves to top-left, scroll indicator fades out
              scrollTl.to(promptEl, {
                scale: promptCoords.scale,
                transformOrigin: '0% 0%',
                x: s1DeltaX,
                y: promptInitialY + s1DeltaY,
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
                y: promptInitialY + s1DeltaY - 200,
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
                { y: 180, opacity: 0, xPercent: -50, yPercent: -50, x: 0 },
                { y: 0, opacity: 1, xPercent: -50, yPercent: -50, x: 0, duration: 400, ease: 'power1.out', immediateRender: false },
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
                scale: promptCoords.scale,
                transformOrigin: '0% 0%',
                xPercent: 0,
                yPercent: 0,
                x: promptCoords.dockX,
                y: promptCoords.dockY,
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
                y: promptCoords.dockY - 200,
                opacity: 0,
                duration: 250,
                ease: 'power1.in',
              }, 10150);

              // Phase 18: Pure Black Space (10600px -> 10900px)
              // [300px pitch-black contemplation runway before Scene 4]

              // Phase 19: Scene 4 Prompt Rises to Screen Center (10900px -> 11300px)
              scrollTl.fromTo('#scene4-prompt',
                { y: 180, opacity: 0, xPercent: -50, yPercent: -50, x: 0 },
                { y: 0, opacity: 1, xPercent: -50, yPercent: -50, x: 0, duration: 400, ease: 'power1.out', immediateRender: false },
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
                scale: promptCoords.scale,
                transformOrigin: '0% 0%',
                xPercent: 0,
                yPercent: 0,
                x: promptCoords.dockX,
                y: promptCoords.dockY,
                duration: 500,
                ease: 'none',
              }, 12700);

              // Phase 25: 512x512 Centered Video Scrub (13200px -> 14600px)
              const s4Video = document.querySelector('#scene4-video');
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

              // Phase 30: Final Scene 4 Stillness Hold (17400px -> 18000px)
              // [600px hold with complete grid, heading, and subheading visible]

              // Phase 31: Scene 4 Zero-Gravity Float-Away Exit (18000px -> 18600px)
              // 1. Subheading floats up & fades
              scrollTl.to('#scene4-subheading', {
                y: -40,
                opacity: 0,
                duration: 350,
                ease: 'power1.in',
              }, 18000);

              // 2. Heading floats up & fades
              scrollTl.to('#scene4-heading', {
                y: -60,
                opacity: 0,
                duration: 400,
                ease: 'power1.in',
              }, 18050);

              // 3. 10-Circle Grid floats up & fades
              scrollTl.to('#scene4-grid', {
                y: -80,
                opacity: 0,
                duration: 450,
                ease: 'power1.in',
              }, 18100);

              // 4. Docked Still aperture floats up & fades synchronously with grid
              scrollTl.to('#scene4-still-focus', {
                y: s4DeltaY - 80,
                opacity: 0,
                duration: 450,
                ease: 'power1.in',
              }, 18100);

              // 5. Scene 4 Pinned Prompt floats up & dissolves
              scrollTl.to('#scene4-prompt', {
                y: promptCoords.dockY - 200,
                opacity: 0,
                duration: 250,
                ease: 'power1.in',
              }, 18150);

              // Phase 32: Pure Black Space (18600px -> 18900px)
              // [300px pitch-black contemplation runway before Scene 5]

              // Phase 33: Scene 5 Prompt Rises to Screen Center (18900px -> 19300px)
              scrollTl.fromTo('#scene5-prompt',
                { y: 180, opacity: 0, xPercent: -50, yPercent: -50, x: 0 },
                { y: 0, opacity: 1, xPercent: -50, yPercent: -50, x: 0, duration: 400, ease: 'power1.out', immediateRender: false },
                18900
              );

              // Phase 34: Scene 5 Prompt Typing (19300px -> 20000px)
              scrollTl.to('#scene5-prompt-text', {
                text: { value: 'you_say_no_instead_of_yes', delimiter: '' },
                duration: 700,
                ease: 'none',
              }, 19300);

              // Phase 35: Breathing Moment & Centered Hold (20000px -> 20500px)
              // [500px stillness hold on centered "you_say_no_instead_of_yes_" with cursor blinking]

              // Phase 36: Scene 5 Prompt Migration to Top-Left Corner (20500px -> 21000px)
              scrollTl.to('#scene5-prompt', {
                scale: promptCoords.scale,
                transformOrigin: '0% 0%',
                xPercent: 0,
                yPercent: 0,
                x: promptCoords.dockX,
                y: promptCoords.dockY,
                duration: 500,
                ease: 'none',
              }, 20500);

              // Phase 37: Option 2 - Randomized Orbital Gravitational Convergence (21000px -> 22400px)
              // 6 circles start from asymmetric randomized vectors across space and converge into 3x2 grid slots

              // 1. Slot [1, 1] (Spiders emblem) - converges from upper-left diagonal
              scrollTl.fromTo('#scene5-circle-1-1',
                { x: -240, y: -180, scale: 0.45, opacity: 0 },
                { x: 0, y: 0, scale: 1, opacity: 1, duration: 800, ease: 'power2.out', immediateRender: false },
                21000
              );

              // 2. Slot [0, 0] (Lungs) - converges from lower-left
              scrollTl.fromTo('#scene5-circle-0-0',
                { x: -190, y: 210, scale: 0.5, opacity: 0 },
                { x: 0, y: 0, scale: 1, opacity: 1, duration: 850, ease: 'power2.out', immediateRender: false },
                21100
              );

              // 3. Slot [2, 1] (Gentleman) - converges from high upper-right
              scrollTl.fromTo('#scene5-circle-2-1',
                { x: 230, y: -240, scale: 0.4, opacity: 0 },
                { x: 0, y: 0, scale: 1, opacity: 1, duration: 750, ease: 'power2.out', immediateRender: false },
                21220
              );

              // 4. Slot [1, 0] (Steak) - converges from wide lower-right
              scrollTl.fromTo('#scene5-circle-1-0',
                { x: 260, y: 150, scale: 0.55, opacity: 0 },
                { x: 0, y: 0, scale: 1, opacity: 1, duration: 850, ease: 'power2.out', immediateRender: false },
                21320
              );

              // 5. Slot [0, 1] (Cow) - converges from wide left-center
              scrollTl.fromTo('#scene5-circle-0-1',
                { x: -270, y: -50, scale: 0.45, opacity: 0 },
                { x: 0, y: 0, scale: 1, opacity: 1, duration: 750, ease: 'power2.out', immediateRender: false },
                21420
              );

              // 6. Slot [2, 0] (Skull) - converges from high north
              scrollTl.fromTo('#scene5-circle-2-0',
                { x: 70, y: -260, scale: 0.5, opacity: 0 },
                { x: 0, y: 0, scale: 1, opacity: 1, duration: 800, ease: 'power2.out', immediateRender: false },
                21520
              );

              // Phase 38: Narrative Heading Word-by-Word Reveal (22400px -> 22900px)
              // "Doing" (22400 -> 22500)
              // "less"  (22500 -> 22600)
              // "bad"   (22600 -> 22700)
              // "is"    (22700 -> 22800)
              // "bad."  (22800 -> 22900)
              const s5HeadingWords = document.querySelectorAll('#scene5-heading .heading-word');
              s5HeadingWords.forEach((word, idx) => {
                const wordStart = 22400 + idx * 100;
                scrollTl.fromTo(word,
                  { opacity: 0, y: 12 },
                  { opacity: 1, y: 0, duration: 100, ease: 'none', immediateRender: false },
                  wordStart
                );
              });

              // Phase 39: Two-Line Narrative Subheading Reveal (22900px -> 24000px)
              // Line 1: (22900 -> 23200)
              scrollTl.fromTo('#scene5-subheading-line1',
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 300, ease: 'none', immediateRender: false },
                22900
              );
              // 100px pause between Line 1 and Line 2
              // Line 2, Part 1: "What if you stopped mitigating risks and started building what you want?" (23300 -> 23600)
              scrollTl.fromTo('#scene5-subheading-line2-part1',
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 300, ease: 'none', immediateRender: false },
                23300
              );
              // 100px pause after question mark (23600 -> 23700)
              // Line 2, Part 2: "What if you said yes?" (23700 -> 24000)
              scrollTl.fromTo('#scene5-subheading-line2-part2',
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 300, ease: 'none', immediateRender: false },
                23700
              );

              // Phase 40: Scene 5 Complete Reading & Reflection Hold (24000px -> 24600px)
              // [600px stillness hold on complete 3x2 grid, heading, and full subheading]

              // Phase 41: Scene 5 Standard Zero-Gravity Staggered Exit (24600px -> 25150px)
              // 1. Top-Left Terminal Prompt departs (24600 -> 24850)
              scrollTl.to('#scene5-prompt', {
                y: promptCoords.dockY - 200,
                opacity: 0,
                duration: 250,
                ease: 'power1.in',
              }, 24600);

              // 2. Scene 5 3x2 Visuals / Grid departs (24700 -> 24950)
              scrollTl.to('#scene5-grid', {
                y: '-=200',
                opacity: 0,
                duration: 250,
                ease: 'power1.in',
              }, 24700);

              // 3. Narrative Heading departs (24800 -> 25050)
              scrollTl.to('#scene5-heading', {
                y: '-=200',
                opacity: 0,
                duration: 250,
                ease: 'power1.in',
              }, 24800);

              // 4. Narrative Subheading departs (24900 -> 25150)
              scrollTl.to('#scene5-subheading', {
                y: '-=200',
                opacity: 0,
                duration: 250,
                ease: 'power1.in',
              }, 24900);

              // Phase 42: Scene 6 Prompt Rises to Screen Center (25100px -> 25500px)
              // [Starts at T0 + 500px, overlapping final 50px of fading subheading]
              scrollTl.fromTo('#scene6-prompt',
                { y: 180, opacity: 0, xPercent: -50, yPercent: -50, x: 0 },
                { y: 0, opacity: 1, xPercent: -50, yPercent: -50, x: 0, duration: 400, ease: 'power1.out', immediateRender: false },
                25100
              );

              // Phase 43: Scene 6 Prompt Typing (25500px -> 26500px)
              scrollTl.to('#scene6-prompt-text', {
                text: { value: 'our_future_without_food_illustratively_explained_by_ai', delimiter: '' },
                duration: 1000,
                ease: 'none',
              }, 25500);

              // Phase 44: Centered Breathing Hold on Prompt (26500px -> 27000px)
              // [500px stillness hold on "our_future_without_food_illustratively_explained_by_ai_" with cursor blinking]

              // Phase 45: Scene 6 Prompt Migration to Top-Left Corner (27000px -> 27500px)
              scrollTl.to('#scene6-prompt', {
                scale: promptCoords.scale,
                transformOrigin: '0% 0%',
                xPercent: 0,
                yPercent: 0,
                x: promptCoords.dockX,
                y: promptCoords.dockY,
                duration: 500,
                ease: 'none',
              }, 27000);

              // Phase 46: Scene 6 Video Playback & Mitosis Choreography (27500px -> 30500px)
              const s6Video1 = document.querySelector('#scene6-video-1');
              const s6Video2 = document.querySelector('#scene6-video-2');
              const s6VideoState = { time: 0 };

              scrollTl.to(s6VideoState, {
                time: 6.5,
                duration: 3000,
                ease: 'none',
                onUpdate: () => {
                  if (s6Video1 && s6Video1.readyState >= 1) {
                    s6Video1.currentTime = s6VideoState.time;
                  }
                  if (s6Video2 && s6Video2.readyState >= 1) {
                    s6Video2.currentTime = s6VideoState.time;
                  }
                }
              }, 27500);

              // Shot 1 (0.0s -> 1.8s | 27500 -> 28400): 400px Central Aperture
              scrollTl.fromTo('#scene6-video-portal-left',
                { opacity: 0, x: 0, y: 0 },
                { opacity: 1, x: 0, y: 0, duration: 150, ease: 'none', immediateRender: false },
                27500
              );
              // Video 1 starts centered inside the 400px aperture (x: -200)
              scrollTl.fromTo('#scene6-video-1',
                { x: -200 },
                { x: -200, duration: 2300, ease: 'none', immediateRender: false },
                27500
              );

              // Shot 2 (2.0s -> 3.8s | 28400 -> 29300): Single central circle continues

              // Shot 3a (4.0s -> 5.0s | 29300 -> 29800): Single central circle holds for 1s equivalent

              // Shot 3b & Mitosis Split (5.0s -> 6.5s | 29800 -> 30300):
              // Primary circle shifts left (-200px) while right cloned circle emerges and shifts right (+200px)
              // Inner video 1 transitions from center (-200px) to left half (0px)
              // Inner video 2 transitions from center (-200px) to right half (-400px)
              scrollTl.to('#scene6-video-portal-left', {
                x: -200,
                duration: 500,
                ease: 'power2.inOut',
              }, 29800);

              scrollTl.to('#scene6-video-1', {
                x: 0,
                duration: 500,
                ease: 'power2.inOut',
              }, 29800);

              scrollTl.fromTo('#scene6-video-portal-right',
                { opacity: 0, x: 0, y: 0 },
                { opacity: 1, x: 200, y: 0, duration: 500, ease: 'power2.inOut', immediateRender: false },
                29800
              );

              scrollTl.fromTo('#scene6-video-2',
                { x: -200 },
                { x: -400, duration: 500, ease: 'power2.inOut', immediateRender: false },
                29800
              );

              // Video Fade-Out at end of scrub (30350 -> 30500)
              scrollTl.to('#scene6-video-portal-left', {
                opacity: 0,
                duration: 150,
                ease: 'none',
              }, 30350);
              scrollTl.to('#scene6-video-portal-right', {
                opacity: 0,
                duration: 150,
                ease: 'none',
              }, 30350);

              // Phase 47: Large Still Dual Focus Handoff & Hold (30400px -> 30800px)
              scrollTl.fromTo('#scene6-still-portal-left',
                { opacity: 0, x: -200, y: 0, scale: 1 },
                { opacity: 1, x: -200, y: 0, scale: 1, duration: 100, ease: 'none', immediateRender: false },
                30450
              );
              scrollTl.fromTo('#scene6-still-portal-right',
                { opacity: 0, x: 200, y: 0, scale: 1 },
                { opacity: 1, x: 200, y: 0, scale: 1, duration: 100, ease: 'none', immediateRender: false },
                30450
              );

              // Phase 48: Dual Portals Migrate to Grid Slots 11 & 12 (30800px -> 31500px)
              scrollTl.to('#scene6-still-portal-left', {
                x: s6LeftDeltaX,
                y: s6LeftDeltaY,
                scale: s6Scale,
                duration: 700,
                ease: 'power2.inOut',
              }, 30800);

              scrollTl.to('#scene6-still-portal-right', {
                x: s6RightDeltaX,
                y: s6RightDeltaY,
                scale: s6Scale,
                duration: 700,
                ease: 'power2.inOut',
              }, 30800);

              // Seamless swap to 5x3 Grid at 31500px
              scrollTl.set('#scene6-circle-2-0', { opacity: 1 }, 31500);
              scrollTl.set('#scene6-circle-2-1', { opacity: 1 }, 31500);
              scrollTl.set(['#scene6-still-portal-left', '#scene6-still-portal-right'], { opacity: 0 }, 31500);

              // Phase 49: Assembly of Remaining 13 Museum Circles (31500px -> 33000px)
              const s6RemainingCircles = [
                // Row 0
                { id: '#scene6-circle-0-0', x: -380, y: -240, rot: -45, scale: 0.35, dur: 850, start: 31500 },
                { id: '#scene6-circle-0-1', x: -120, y: -320, rot: 30,  scale: 0.40, dur: 900, start: 31650 },
                { id: '#scene6-circle-0-2', x: 80,   y: -360, rot: -20, scale: 0.30, dur: 950, start: 31550 },
                { id: '#scene6-circle-0-3', x: 280,  y: -290, rot: 50,  scale: 0.45, dur: 800, start: 31750 },
                { id: '#scene6-circle-0-4', x: 420,  y: -190, rot: -35, scale: 0.35, dur: 900, start: 31600 },
                // Row 1
                { id: '#scene6-circle-1-0', x: -440, y: 40,   rot: 40,  scale: 0.40, dur: 900, start: 31700 },
                { id: '#scene6-circle-1-1', x: -260, y: 90,   rot: -30, scale: 0.35, dur: 850, start: 31800 },
                { id: '#scene6-circle-1-2', x: -90,  y: 120,  rot: 25,  scale: 0.45, dur: 950, start: 31600 },
                { id: '#scene6-circle-1-3', x: 140,  y: 150,  rot: -40, scale: 0.35, dur: 850, start: 31750 },
                { id: '#scene6-circle-1-4', x: 460,  y: 80,   rot: 35,  scale: 0.40, dur: 900, start: 31650 },
                // Row 2
                { id: '#scene6-circle-2-2', x: 20,   y: 320,  rot: -35, scale: 0.35, dur: 850, start: 31700 },
                { id: '#scene6-circle-2-3', x: 220,  y: 350,  rot: 45,  scale: 0.40, dur: 900, start: 31800 },
                { id: '#scene6-circle-2-4', x: 410,  y: 280,  rot: -50, scale: 0.30, dur: 950, start: 31600 },
              ];

              s6RemainingCircles.forEach((item) => {
                scrollTl.fromTo(item.id,
                  {
                    opacity: 0,
                    x: item.x,
                    y: item.y,
                    scale: item.scale,
                    rotation: item.rot,
                  },
                  {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotation: 0,
                    duration: item.dur,
                    ease: 'power2.out',
                    immediateRender: false,
                  },
                  item.start
                );
              });

              // Phase 50: Narrative Heading Word-by-Word Reveal (33000px -> 33800px)
              const s6HeadingWords = document.querySelectorAll('#scene6-heading .heading-word');
              s6HeadingWords.forEach((wordEl, idx) => {
                scrollTl.fromTo(wordEl,
                  { opacity: 0, y: 12 },
                  { opacity: 1, y: 0, duration: 100, ease: 'power1.out', immediateRender: false },
                  33000 + idx * 100
                );
              });

              // Phase 51: Narrative Subheading Reveal (33800px -> 34600px)
              // Line 1: "As witnessed by Douglas Gayeton." (33800 -> 34100)
              scrollTl.fromTo('#scene6-subheading-line1',
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 300, ease: 'none', immediateRender: false },
                33800
              );
              // 100px pause (34100 -> 34200)
              // Line 2: "272 pages. Signed and numbered edition of 500." (34200 -> 34500)
              scrollTl.fromTo('#scene6-subheading-line2',
                { opacity: 0, y: 8 },
                { opacity: 1, y: 0, duration: 300, ease: 'none', immediateRender: false },
                34200
              );

              // Phase 52: Purchase Button Fade-In (34500px -> 34800px)
              scrollTl.fromTo('#scene6-purchase-btn',
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 300, ease: 'power1.out', immediateRender: false },
                34500
              );

              // Phase 53: Scene 6 Reading Hold (34800px -> 35300px)
              // [500px stillness hold on the complete Scene 6 masterpiece]

              // Phase 54: Scene 6 Zero-Gravity Staggered Exit (35300px -> 35950px)
              // Outgoing elements ascend by -200px on Y while fading to opacity: 0
              // 1. Scene 6 Prompt
              scrollTl.to('#scene6-prompt', {
                y: promptCoords.dockY - 200,
                opacity: 0,
                duration: 250,
                ease: 'power1.in',
              }, 35300);

              // 2. Scene 6 Grid (5x3 museum circles)
              scrollTl.to('#scene6-grid', {
                y: -200,
                opacity: 0,
                duration: 250,
                ease: 'power1.in',
              }, 35400);

              // 3. Scene 6 Heading
              scrollTl.to('#scene6-heading', {
                y: -200,
                opacity: 0,
                duration: 250,
                ease: 'power1.in',
              }, 35500);

              // 4. Scene 6 Subheading
              scrollTl.to('#scene6-subheading', {
                y: -200,
                opacity: 0,
                duration: 250,
                ease: 'power1.in',
              }, 35600);

              // 5. Scene 6 Purchase Button
              scrollTl.to('#scene6-purchase-btn-wrapper', {
                y: -200,
                opacity: 0,
                duration: 250,
                ease: 'power1.in',
              }, 35700);
              scrollTl.set('#scene6-purchase-btn', { pointerEvents: 'none' }, 35700);

              // Phase 55: Scene 7 Prompt Rises to Screen Center (35900px -> 36300px)
              // [Starts at T0 + 600px, overlapping final 50px of fading purchase button]
              scrollTl.fromTo('#scene7-prompt',
                { y: 180, opacity: 0, xPercent: -50, yPercent: -50, x: 0 },
                { y: 0, opacity: 1, xPercent: -50, yPercent: -50, x: 0, duration: 400, ease: 'power1.out', immediateRender: false },
                35900
              );

              // Phase 56: Scene 7 Prompt Typing (36300px -> 37100px)
              scrollTl.to('#scene7-prompt-text', {
                text: { value: 'narrated_by_an_otherwordly_intelligence', delimiter: '' },
                duration: 800,
                ease: 'none',
              }, 36300);

              // Phase 57: Centered Breathing Hold on Prompt (37100px -> 37300px)
              // [200px stillness hold on fully typed prompt with blinking cursor at screen center]

              // Helper to compute responsive Scene 7 coordinates
              function getScene7Layout() {
                const isMobile = window.innerWidth <= 768;
                
                if (isMobile) {
                  return {
                    portalEndX: 0,
                    portalEndY: -170,
                    textEndX: 0,
                    textEndY: 120,
                    textMaxWidth: '100%',
                  };
                }
                
                // Desktop: 2-column layout matching Scene7-end.png
                // Total group width ~ 538px (portal @ 105%) + 60px (gap) + 600px (text) = 1198px
                // Symmetrically centered within 1366px canvas (84px left & right margins)
                return {
                  portalEndX: -330,
                  portalEndY: 0,
                  textEndX: 300,
                  textEndY: 0,
                  textMaxWidth: '600px',
                };
              }
              const s7Layout = getScene7Layout();

              // Phase 58: Act 1 — Prompt Docking & Big Circle Zoom-In (37300px -> 37800px | 500px)
              // 1. Prompt shrinks and positions itself to the top-left of the screen
              scrollTl.to('#scene7-prompt', {
                scale: promptCoords.scale,
                transformOrigin: '0% 0%',
                xPercent: 0,
                yPercent: 0,
                x: promptCoords.dockX,
                y: promptCoords.dockY,
                duration: 500,
                ease: 'none',
              }, 37300);

              // 2. 512px circular portal fades in (200px fade-in) while slowly zooming from 95% to 100% over 500px
              scrollTl.fromTo('#scene7-portal',
                { opacity: 0, scale: 0.95 },
                { opacity: 1, duration: 200, ease: 'power1.out', immediateRender: false },
                37300
              );
              scrollTl.to('#scene7-portal', {
                scale: 1.0,
                duration: 500,
                ease: 'none',
              }, 37300);

              // Phase 59: Act 2 — Circle Continues Zooming In Behind End-Credits Crawl (37800px -> 38300px | 500px)
              // 1. Circle keeps zooming in (100% -> 105%) while behind the text at low opacity (never shrinks down or zooms out!)
              scrollTl.to('#scene7-portal', {
                scale: 1.05,
                opacity: 0.18,
                duration: 500,
                ease: 'none',
              }, 37800);

              // 2. Three paragraphs of text (100% wide) slowly scroll up like film end credits in front of portal
              scrollTl.set('#scene7-narrative-wrapper', { pointerEvents: 'auto' }, 37800);
              scrollTl.fromTo('#scene7-narrative-wrapper',
                { y: 450, opacity: 0 },
                { y: 0, opacity: 1, duration: 500, ease: 'none', immediateRender: false },
                37800
              );
              scrollTl.fromTo('#scene7-narrative',
                { scale: 1.25, maxWidth: '960px', opacity: 0 },
                { scale: 1.25, maxWidth: '960px', opacity: 1, duration: 500, ease: 'none', immediateRender: false },
                37800
              );

              // Phase 60: Pause for 100px with all three paragraphs visible and big in the center (38300px -> 38400px)
              // [100px stillness hold on centered end credits with ambient background portal at 105% scale and 18% opacity]

              // Phase 61: Act 3 — Spatial Separation & Return to Full Presence (38400px -> 39000px | 600px)
              // 1. Paragraphs zoom down and glide right to reach exact position of end state
              scrollTl.to('#scene7-narrative-wrapper', {
                x: s7Layout.textEndX,
                y: s7Layout.textEndY,
                duration: 600,
                ease: 'power2.inOut',
              }, 38400);
              scrollTl.to('#scene7-narrative', {
                scale: 1.0,
                maxWidth: s7Layout.textMaxWidth,
                duration: 600,
                ease: 'power2.inOut',
              }, 38400);

              // 2. Portal glides smoothly from center to the left column and brightens to 100% presence (never shrinking down!)
              scrollTl.to('#scene7-portal-wrapper', {
                x: s7Layout.portalEndX,
                y: s7Layout.portalEndY,
                duration: 600,
                ease: 'power2.inOut',
              }, 38400);
              scrollTl.to('#scene7-portal', {
                opacity: 1.0,
                duration: 600,
                ease: 'power2.inOut',
              }, 38400);

              // Phase 62: Pause like that for 200px (39000px -> 39200px)
              // [200px stillness pause on final Scene 7 end state]

              // Phase 63: Final Reflection Hold on Scene 7 (39200px -> 41000px)
              scrollTl.to({}, { duration: 1 }, 41000);

              // =========================================================================
              // SCENE 7 ZERO-GRAVITY EXIT (41000px -> 41650px)
              // =========================================================================
              // Phase 64: Staggered Zero-Gravity Ascension Exit
              // 1. Prompt floats upwards into the void
              scrollTl.to('#scene7-prompt', {
                y: promptCoords.dockY - 200,
                opacity: 0,
                duration: 450,
                ease: 'power1.in',
              }, 41000);

              // 2. Colophon text floats upwards into the void
              scrollTl.to('#scene7-narrative-wrapper', {
                y: s7Layout.textEndY - 200,
                opacity: 0,
                duration: 450,
                ease: 'power1.in',
              }, 41100);

              // 3. Circular portal floats upwards into the void
              scrollTl.to('#scene7-portal-wrapper', {
                y: s7Layout.portalEndY - 200,
                opacity: 0,
                duration: 450,
                ease: 'power1.in',
              }, 41200);

              // =========================================================================
              // SCENE 8: REVIEWED BY MACHINES (41600px -> 48500px)
              // =========================================================================
              // Phase 65: Scene 8 Prompt Rises to Screen Center (41600px -> 42000px | 400px)
              scrollTl.fromTo('#scene8-prompt',
                { y: 180, opacity: 0 },
                { y: 0, opacity: 1, duration: 400, ease: 'power1.out', immediateRender: false },
                41600
              );

              // Phase 66: Computer Prompt Typing (42000px -> 42800px | 800px)
              scrollTl.to('#scene8-prompt-text', {
                text: { value: 'reviewed_by_machines', delimiter: '' },
                duration: 800,
                ease: 'none',
              }, 42000);

              // Phase 67: Centered Breathing Hold on Prompt (42800px -> 43000px | 200px)
              // [200px stillness hold on fully typed prompt with blinking cursor at screen center]

              // Phase 68: Scene 8 Prompt Docking to Top-Left Corner (43000px -> 43500px | 500px)
              scrollTl.to('#scene8-prompt', {
                scale: promptCoords.scale,
                transformOrigin: '0% 0%',
                xPercent: 0,
                yPercent: 0,
                x: promptCoords.dockX,
                y: promptCoords.dockY,
                duration: 500,
                ease: 'none',
              }, 43000);

              // Phase 69: The Dreamy Cinematic Fly-In of Quotes (43500px -> 45550px)
              const flyW = window.innerWidth || 1400;
              const flyH = window.innerHeight || 900;
              const sideOffsetY = window.innerHeight ? Math.min(160, Math.round(window.innerHeight * 0.18)) : 150;

              // Quote 1: Fly in from Left at higher vertical track (43500px -> 44500px | 1000px)
              // Flies from offscreen left at higher vertical position (y: -sideOffsetY), scales 300% -> 200%, fades in
              scrollTl.fromTo('#scene8-fly-1',
                { x: -flyW, y: -sideOffsetY, scale: 3.0, opacity: 0 },
                { x: 0, y: -sideOffsetY, scale: 2.0, opacity: 1, duration: 1000, ease: 'power1.out', immediateRender: false },
                43500
              );
              // Fade out Quote 1 smoothly as Quote 2 arrives
              scrollTl.to('#scene8-fly-1', {
                opacity: 0,
                duration: 400,
                ease: 'power1.in',
              }, 44100);

              // Quote 2: Fly in from Right at lower vertical track (43833px -> 44833px | 1000px)
              // Starts at 1/3 progress of Quote 1, flies at lower vertical position (y: +sideOffsetY), scales 300% -> 200%
              scrollTl.fromTo('#scene8-fly-2',
                { x: flyW, y: sideOffsetY, scale: 3.0, opacity: 0 },
                { x: 0, y: sideOffsetY, scale: 2.0, opacity: 1, duration: 1000, ease: 'power1.out', immediateRender: false },
                43833
              );
              // Fade out Quote 2 smoothly as Quote 3 arrives and superimposes
              scrollTl.to('#scene8-fly-2', {
                opacity: 0,
                duration: 400,
                ease: 'power1.in',
              }, 44433);

              // Quote 3: Fly in from Top (44167px -> 45167px | 1000px)
              // Starts at 1/3 progress of Quote 2, superimposes over Quote 2
              scrollTl.fromTo('#scene8-fly-3',
                { x: 0, y: -flyH, scale: 3.0, opacity: 0 },
                { x: 0, y: 0, scale: 2.0, opacity: 1, duration: 1000, ease: 'power1.out', immediateRender: false },
                44167
              );
              // Fade out Quote 3 smoothly as Quote 4 arrives and superimposes
              scrollTl.to('#scene8-fly-3', {
                opacity: 0,
                duration: 400,
                ease: 'power1.in',
              }, 44767);

              // Quote 4: Fly in from Bottom (44500px -> 45500px | 1000px)
              // Starts at 1/3 progress of Quote 3, reaches center at scale 2.0
              scrollTl.fromTo('#scene8-fly-4',
                { x: 0, y: flyH, scale: 3.0, opacity: 0 },
                { x: 0, y: 0, scale: 2.0, opacity: 1, duration: 1000, ease: 'power1.out', immediateRender: false },
                44500
              );

              // Phase 70: Quote 4 Center Stillness Pause (45500px -> 45600px | 100px)
              // [100px pause with Quote 4 centered and prominent at 200% scale]

              // Phase 71: Settle into 2x2 Grid (45600px -> 46400px | 800px)
              // Helper to compute Card 4 delta relative to fly-layer center
              function getScene8Card4Delta() {
                const card4 = document.querySelector('#scene8-card-4');
                const flyLayer = document.querySelector('#scene8-fly-layer');
                if (card4 && flyLayer) {
                  const cardRect = card4.getBoundingClientRect();
                  const flyRect = flyLayer.getBoundingClientRect();
                  const flyCenterX = flyRect.left + flyRect.width / 2;
                  const flyCenterY = flyRect.top + flyRect.height / 2;
                  const cardCenterX = cardRect.left + cardRect.width / 2;
                  const cardCenterY = cardRect.top + cardRect.height / 2;
                  return {
                    deltaX: cardCenterX - flyCenterX,
                    deltaY: cardCenterY - flyCenterY,
                  };
                }
                const isMobile = window.innerWidth <= 768;
                return isMobile ? { deltaX: 0, deltaY: 280 } : { deltaX: 300, deltaY: 180 };
              }
              const s8Delta = getScene8Card4Delta();

              // 1. Quote 4 moves and scales to reach final position in grid (scale 2.0 -> 1.0)
              scrollTl.to('#scene8-fly-4', {
                x: s8Delta.deltaX,
                y: s8Delta.deltaY,
                scale: 1.0,
                duration: 800,
                ease: 'power2.inOut',
              }, 45600);

              // Cross-fade seamlessly into final card 4 at its exact slot
              scrollTl.fromTo('#scene8-card-4',
                { opacity: 0 },
                { opacity: 1, duration: 200, ease: 'power1.out', immediateRender: false },
                46200
              );
              scrollTl.to('#scene8-fly-4', {
                opacity: 0,
                duration: 200,
                ease: 'power1.in',
              }, 46200);

              // 2. The other three quotes randomly fade in at their end positions (scale 1.0)
              // Card 2 (Top-Right): fades in first
              scrollTl.fromTo('#scene8-card-2',
                { opacity: 0 },
                { opacity: 1, duration: 400, ease: 'power1.out', immediateRender: false },
                45750
              );

              // Card 1 (Top-Left): fades in next
              scrollTl.fromTo('#scene8-card-1',
                { opacity: 0 },
                { opacity: 1, duration: 400, ease: 'power1.out', immediateRender: false },
                45900
              );

              // Card 3 (Bottom-Left): fades in last
              scrollTl.fromTo('#scene8-card-3',
                { opacity: 0 },
                { opacity: 1, duration: 400, ease: 'power1.out', immediateRender: false },
                46050
              );

              // Phase 72: End-State Stillness Pause (46400px -> 46600px | 200px)
              // [200px stillness pause on final Scene 8 end-state matching Scene8-end.png]

              // Phase 73: Scene 8 Final Reading Hold (46600px -> 48500px | 1900px)
              scrollTl.to({}, { duration: 1 }, 48500);
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
