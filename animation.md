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

## 4. Typography Choreography Specs

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

---

## 5. Summary Timing Reference Table

| Transition Phase | Scroll Distance | Easing | Start / End Offset |
|---|---|---|---|
| Scene Complete Hold | 500px | None | $T_0 - 500\text{px} \to T_0$ |
| 1st Exit: Prompt | 250px | `power1.in` | $T_0 \to T_0 + 250\text{px}$ |
| 2nd Exit: Portals | 250px | `power1.in` | $T_0 + 100\text{px} \to T_0 + 350\text{px}$ |
| 3rd Exit: Heading | 250px | `power1.in` | $T_0 + 200\text{px} \to T_0 + 450\text{px}$ |
| 4th Exit: Subheading | 250px | `power1.in` | $T_0 + 300\text{px} \to T_0 + 550\text{px}$ |
| Next Prompt Rise | 400px | `power1.out` | $T_0 + 500\text{px} \to T_0 + 900\text{px}$ |
| Next Prompt Typing | 600px | `none` | $T_0 + 900\text{px} \to T_0 + 1500\text{px}$ |
