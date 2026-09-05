# DESIGN.md - Molotov Alva Design System

## Core Aesthetic & Philosophy
Industrial, high-contrast, minimalist terminal aesthetic. Deep black canvas with high-impact, precise neon accents.

## Design Tokens

### Colors
- **Canvas / Background:** `#000000` (Pure Black)
- **Terminal Accent:** `#00E900` (Vibrant Neon Green)
- **Text Primary:** `#FFFFFF` (Pure White)
- **Text Muted:** `#888888` (Mid Gray)
- **Heading Gold / Ochre:** `#B59E59` (Antique Gold narrative heading tone)
- **Subheading Gray:** `#A3A3A3` (Muted Silver narrative subheading tone)

### Typography
- **Terminal Font Family:** Platelet, monospace
- **Terminal Text Specs:**
  - Font Size: `2rem` (`32px`)
  - Font Weight: `600` (Semi-Bold)
  - Color: `#00E900`
- **Fallback Monospace:** 'Courier New', Courier, monospace
- **Narrative Font Family:** 'Adobe Garamond Pro', Garamond, 'Times New Roman', serif
- **Narrative Heading Specs:**
  - Font Size: `3rem` (`48px`)
  - Font Weight: `400` (Regular)
  - Line Height: `1.25`
  - Color: `#B59E59`
  - Text Align: `center`
  - CSS Class: `.scene-heading`
- **Narrative Subheading Specs:**
  - Font Size: `1.3rem` (`20.8px`)
  - Font Weight: `400` (Regular / Italic)
  - Line Height: `1.4`
  - Color: `#A3A3A3`
  - Text Align: `center`
  - CSS Class: `.scene-subheading`

### Component Specs

#### Central Media Portal
- **Shape:** Perfect circle (`border-radius: 50%`)
- **Dimensions:** `300px` x `300px` (fixed desktop, responsive scale on small screens)
- **Overflow:** `hidden` (masked image container)
- **Asset Type:** Static image centered inside container

#### Interactive Terminal Prompts (`>: click_to_enter`)
- **Style:** Monospace, `#00E900` fill
- **Spacing:** `2rem` top margin below the circular portal
- **Cursor:** `pointer`

#### Interactive Terminal Buttons (`.purchase-btn`)
- **Typeface:** Platelet, monospace (`var(--font-terminal)`)
- **Content Structure:** Text followed by standard terminal blinking cursor (`Purchase<span class="terminal-cursor">_</span>`)
- **Specs:**
  - Font Size: `1.25rem` (`20px`)
  - Font Weight: `500`
  - Letter Spacing: `0.05em`
  - Text & Cursor Color: `#00E900` (`var(--color-terminal)`)
  - Blinking Animation: Inherits standard terminal `0.8s` step blink (`.terminal-cursor`)
  - Border: `1px solid rgba(0, 233, 0, 0.6)`
  - Shape: Pill (`border-radius: 9999px`)
  - Padding: `0.65rem 2.4rem`
  - Background: `transparent`
  - Box Shadow: `0 0 15px rgba(0, 233, 0, 0.12)`
- **Hover State:**
  - Background: `#00E900`
  - Text & Cursor Color: `#000000` (Pure Black)
  - Border Color: `#00E900`
  - Box Shadow: `0 0 25px rgba(0, 233, 0, 0.5)`
  - Transform: `translateY(-2px)`
  - Transition: `all 0.35s cubic-bezier(0.16, 1, 0.3, 1)`

#### Scene Narrative Headings & Subheadings
- **Heading Style:** Serif narrative headline (`.scene-heading`), Adobe Garamond Pro Regular, `3rem`, `#B59E59`
- **Subheading Style:** Serif narrative subtitle (`.scene-subheading`), Adobe Garamond Pro Regular/Italic, `1.3rem`, `#A3A3A3`
- **Placement:** Centered horizontally, stacked directly below the visual grid with standardized `mt-6` (`24px`) top margin

## Responsive Viewport Architecture (The 4 Tiers)

To preserve the cinematic fidelity and prevent visual clipping, overlapping, or horizontal scrolling across all screen sizes, the layout and animation system is partitioned into four mathematically isolated tiers:

| Tier | Category | Viewport Range | Primary Layout Paradigm | Reference Script |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1** | Full Desktop Spectrum | $\ge 1366\text{px}$ up to 4K | Unconstrained side-by-side splits; 100% baseline grid & aperture scale | [`animation-script.md`](./animation-script.md) |
| **Tier 2** | Compact Laptops & Landscape Tablets | $1024\text{px} \le w < 1366\text{px}$ | Symmetrically fitted side-by-side splits; height-aware card & grid scaling | [`animation-script-tier2.md`](./animation-script-tier2.md) |
| **Tier 3** | Tablet Portrait Spectrum | $768\text{px} \le w < 1024\text{px}$ | Centered vertical stacked layouts for Scene 7 & 9; dynamic circle row spacing | [`animation-script-tier3.md`](./animation-script-tier3.md) |
| **Tier 4** | Mobile Phones Spectrum | $< 768\text{px}$ ($320\text{px} - 767\text{px}$) | Single-column stacked layouts; container-level proportional scaling; compact typography | [`animation-script-tier4.md`](./animation-script-tier4.md) |

### Strict Non-Regression & Isolation Principles
1. **Mathematical Isolation**: Code or media query modifications for lower tiers (e.g. Tier 4 or Tier 3) must be strictly guarded by max-width media queries (`@media (max-width: 767px)`) or JavaScript bounds (`window.innerWidth < 768`) to guarantee zero regression on higher tiers.
2. **Canonical Baseline Integrity**: Tier 1 Desktop coordinates and timings remain the primary cinematic reference baseline.
3. **Height-Aware Layouts**: For compact heights ($h < 850\text{px}$), vertical positions and scales are calculated dynamically relative to `window.innerHeight`.

## Invariant Design Rules (Never Change Across Iterations)
1. Canvas MUST remain pure black (`#000000`). Never replace with slate, dark gray, or gradient fills.
2. Terminal text and interactive CTA buttons MUST use Platelet font and `#00E900` neon green accent.
3. Portal MUST remain a perfect `300px` circular mask during single-portal focus.
4. Scene headings MUST use Adobe Garamond Pro Regular at `3rem` with `#B59E59` fill.
5. Scene subheadings MUST use Adobe Garamond Pro Regular/Italic at `1.3rem` with `#A3A3A3` fill.
6. Narrative typography MUST always sit in natural vertical flow below visual elements with standardized top padding/margin (`mt-6`), never overlapping visual circles.
7. Do NOT add animation timelines, scroll triggers, or keyframes until static layout phase is finalized.
8. Inter-scene transitions MUST follow the standardized Zero-Gravity Staggered Exit protocol documented in [animation.md](./animation.md).

