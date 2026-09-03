# Molotov Alva Animation Design System

## Overview
This document outlines the canonical animation choreography, timing conventions, and standard inter-scene transition rules across the Molotov Alva website. All animations are scrubbed via GSAP ScrollTrigger and Lenis smooth scrolling.

---

## 1. Core Principles
1. **Physical Weightlessness ("Zero Gravity")**: Elements float upward rather than sliding horizontally or bouncing.
2. **Scroll-Driven Continuity**: Every motion is tied to user scroll progression (`scrub: true`) and is 100% reversible when scrolling upwards.
3. **Pacing & Reflection Holds**: Every scene includes a dedicated stillness hold before triggering an exit transition, giving the user ample time to read and reflect.
4. **Non-Overlapping Choreography**: Outgoing scenes must clear the stage before the incoming scene's primary focal points take focus.

---

## 2. Standard Scene Lifecycle

Each narrative scene follows a standardized 4-phase lifecycle:

```
┌─────────────────┐    ┌─────────────────┐    ┌───────────────────────────┐    ┌──────────────────────────┐
│  Phase 1        │    │  Phase 2        │    │  Phase 3                  │    │  Phase 4                 │
│  Scene Entry    │───>│  Scene Assembly │───>│  Reading Hold             │───>│  Standard Staggered Exit │
│  & Prompt Typing│    │  & Typography   │    │  (500px stillness)        │    │  (Zero-Gravity Ascend)   │
└─────────────────┘    └─────────────────┘    └───────────────────────────┘    └──────────────────────────┘
```

---

## 3. Standard Inter-Scene Transition Protocol

When transitioning from Scene $N$ to Scene $N+1$, the following exact sequence and timing parameters must be used:

### A. The Reading Hold (`500px` window)
- Once all elements of Scene $N$ (prompt, visuals, heading, subheading) reach 100% opacity, the timeline holds still for **`500px`** of scroll distance.
- No transformations or opacity shifts occur during this window.

### B. The Staggered "Zero-Gravity" Exit (`550px` window)
Each element ascends by `-200px` on the Y-axis while fading to `opacity: 0`.
- **Duration per element**: `250px` scroll scrub.
- **Easing**: `power1.in` (subtle upward acceleration feeling like losing gravitational hold).
- **Stagger Interval**: `100px` start delay between consecutive elements.
- **Strict Order of Departure**:
  1. **Top-Left Terminal Prompt**: Starts at $T_0$ (duration `250px`, ends at $T_0 + 250\text{px}$)
  2. **Central Visuals / Portals**: Starts at $T_0 + 100\text{px}$ (ends at $T_0 + 350\text{px}$)
  3. **Narrative Heading**: Starts at $T_0 + 200\text{px}$ (ends at $T_0 + 450\text{px}$)
  4. **Narrative Subheading**: Starts at $T_0 + 300\text{px}$ (ends at $T_0 + 550\text{px}$)

### C. Incoming Scene Prompt Rise (`400px` window)
- **Start Time**: $T_0 + 500\text{px}$ (overlapping only the final 50px of the fading subheading).
- **Duration**: `400px` scroll scrub ($T_0 + 500\text{px} \to T_0 + 900\text{px}$).
- **Motion**: `fromTo` `{ y: 180, opacity: 0 }` to `{ y: 0, opacity: 1 }` directly into the vertical center of the 1366px canvas.
- **Easing**: `power1.out`.

### D. Incoming Prompt Typing (`600px` window)
- **Start Time**: $T_0 + 900\text{px}$.
- **Duration**: `600px` scroll scrub ($T_0 + 900\text{px} \to T_0 + 1500\text{px}$).
- **Action**: Types out next narrative prompt via GSAP `TextPlugin` with blinking green cursor.
- **Easing**: `none` (linear character-by-character scrub).

---

## 4. Typography Choreography & Layout Hierarchy Specs

### Vertical Spacing & Layout Hierarchy
- **Standard Layout Flow:** Narrative typography containers (`.scene-typography`) must ALWAYS sit in the natural vertical flex flow directly beneath visual grids/elements with a standardized top margin (`mt-6` / `24px`).
- **No Overlapping Coordinates:** Headings and subheadings must never use unanchored absolute coordinates or collide with visual aperture rows/grids.
- **Internal Typography Spacing:** 
  - Margin between Heading and Subheading: `mt-4` (`16px`).
  - Margin between Subheading and CTA Button: `mt-6` (`24px`).

### Narrative Heading (`.scene-heading`)
- **Typeface**: Adobe Garamond Pro Regular (`3rem`, `#B59E59`).
- **Reveal**: Sequential word-by-word fade-in from left to right.
- **Word Duration**: `100px` per word.
- **Initial State**: `opacity: 0`, `y: 12px`.
- **Final State**: `opacity: 1`, `y: 0px`.

### Narrative Subheading (`.scene-subheading`)
- **Typeface**: Adobe Garamond Pro Regular / Italic (`1.3rem`, `#A3A3A3`).
- **Reveal**: Two-part sequence:
  - **Part 1 (Regular)**: `300px` fade-in (`opacity: 0 → 1`, `y: 8px → 0px`), followed by a `100px` hold.
  - **Part 2 (Italic)**: `300px` fade-in (`opacity: 0 → 1`, `y: 8px → 0px`).

### Terminal CTA Button (`.purchase-btn`)
- **Typeface**: Platelet monospace (`1.25rem`, `#00E900`).
- **Reveal**: `300px` fade-in (`opacity: 0 → 1`, `y: 10px → 0px`, `power1.out`).
- **Pointer Events**: Switched to `auto` upon reveal completion.

---

## 5. Summary Timing Reference Table

| Transition Phase | Scroll Distance | Easing | Start / End Offset |
|---|---|---|---|
| Scene Complete Hold | 500px | None | $T_0 - 500\text{px} \to T_0$ |
| 1st Exit: Prompt | 250px | `power1.in` | $T_0 \to T_0 + 250\text{px}$ |
| 2nd Exit: Portals | 250px | `power1.in` | $T_0 + 100\text{px} \to T_0 + 350\text{px}$ |
| 3rd Exit: Heading | 250px | `power1.in` | $T_0 + 200\text{px} \to T_0 + 450\text{px}$ |
| Next Prompt Rise | 400px | `power1.out` | $T_0 + 500\text{px} \to T_0 + 900\text{px}$ |
| Next Prompt Typing | 600px | `none` | $T_0 + 900\text{px} \to T_0 + 1500\text{px}$ |

---

## 6. Responsive Prompt Docking System

To ensure all terminal prompts dock to the upper-left corner across all viewports (desktop, tablet, mobile) regardless of string length or viewport aspect ratios, prompts use a normalized origin-center architecture:

1. **Initial Centered Baseline**:
   - `position: absolute; left: 50%; top: 50%;`
   - `xPercent: -50; yPercent: -50; x: 0; y: 0;`
   - Centering is purely mathematical and invariant to dynamically typed text width.

2. **Corner Migration Formula**:
   - When migrating to the top-left corner, GSAP transitions:
     - `xPercent: 0; yPercent: 0;`
     - `x: -(canvasWidth / 2 - padX)`
     - `y: -(canvasHeight / 2 - padY)`
     - `transformOrigin: '0% 0%'`
     - `scale: 0.5` (Desktop) / `0.65` (Mobile)
   - The top-left corner of the element lands on `(padX, padY)` (`24px, 24px` on desktop, `16px, 16px` on mobile/tablet) with zero coordinate drift.

3. **Zero-Gravity Exit**:
   - `y: -(canvasHeight / 2 - padY) - 200`
   - `opacity: 0`
   - `duration: 250px`, `ease: 'power1.in'`.

---

## 7. Scene 6 Exit & Scene 7 Lifecycle Specs

### Scene 6 Zero-Gravity Staggered Exit (35,300px – 35,950px)
- **Reading Hold**: `34,800px` -> `35,300px` (500px stillness hold on completed Museum grid and Purchase CTA).
- **Staggered Upward Ascension** (`-200px` on Y-axis with `power1.in`, `250px` scrub per element):
  1. `#scene6-prompt`: starts at `35,300px` (ends at `35,550px`)
  2. `#scene6-grid` (15 circles): starts at `35,400px` (ends at `35,650px`)
  3. `#scene6-heading`: starts at `35,500px` (ends at `35,750px`)
  4. `#scene6-subheading`: starts at `35,600px` (ends at `35,850px`)
  5. `#scene6-purchase-btn-wrapper`: starts at `35,700px` (ends at `35,950px`)

### Scene 7 Prompt Entrance & Typing (35,900px – 37,300px)
- **Prompt Rise**: `35,900px` -> `36,300px` (400px scrub, `fromTo` `{ y: 180, opacity: 0 }` to `{ y: 0, opacity: 1 }`, `power1.out`).
- **Prompt Typing**: `36,300px` -> `37,100px` (800px scrub, types `narrated_by_an_otherwordly_intelligence` via `TextPlugin`).
- **Centered Breathing Hold**: `37,100px` -> `37,300px` (200px stillness hold on typed prompt at center with blinking cursor).

### Scene 7 Multi-Act Cinematic Choreography: The Spatial Continuum (37,300px – 39,200px)
- **Act 1: Prompt Docking & Portal Zoom-In** (`37,300px` -> `37,800px` | 500px):
  - Prompt shrinks and migrates to top-left corner (`scale: 0.5` / `0.65`, `dockX`, `dockY`).
  - Unified 512px circular portal (`#scene7-portal`, native resolution, zero upscaling):
    - Fades in over 200px (`37,300px` -> `37,500px`, `opacity: 0 -> 1`).
    - Slowly zooms from 95% to 100% over the full 500px (`scale: 0.95 -> 1.0`).
- **Act 2: Circle Continues Zooming In Behind End-Credits Crawl** (`37,800px` -> `38,300px` | 500px):
  - The portal **never shrinks down or zooms out**: it continues zooming in smoothly (`scale: 1.0 -> 1.05`) while behind the text at low ambient opacity (`opacity: 1.0 -> 0.18`).
  - 3 paragraphs of text (100% wide, large film credits styling at `scale: 1.25`) slowly scroll up in front of the portal (`y: 450 -> 0`, `opacity: 0 -> 1`).
- **Credits Center Pause** (`38,300px` -> `38,400px` | 100px):
  - 100px stillness hold with all three paragraphs visible, large, and centered in the viewport with the dim avatar watermark hovering behind them at 105% scale.
- **Act 3: Spatial Separation & Return to Full Presence** (`38,400px` -> `39,000px` | 600px):
  - Text zooms down from credit scale (`scale: 1.25 -> 1.0`, max-width to `600px`) and glides right (`x: 0 -> +300px`, `power2.inOut`).
  - Portal glides smoothly from center to the left column (`x: 0 -> -330px`, `power2.inOut`) while brightening to 100% presence (`opacity: 0.18 -> 1.0`) at full 105% size, perfectly balanced in the desktop spread.
- **End-State Pause** (`39,000px` -> `39,200px` | 200px):
  - 200px stillness pause on the final layout matching `Scene7-end.png`.
- **Final Reflection Hold** (`39,200px` -> `41,000px` | 1,800px):
  - Deep reading hold on the final composition.

