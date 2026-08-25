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

### Typography
- **Terminal Font Family:** Platelet, monospace
- **Terminal Text Specs:**
  - Font Size: `2rem` (`32px`)
  - Font Weight: `600` (Semi-Bold)
  - Color: `#00E900`
- **Fallback Monospace:** 'Courier New', Courier, monospace
- **Narrative Heading Font Family:** 'Adobe Garamond Pro', Garamond, 'Times New Roman', serif
- **Narrative Heading Specs:**
  - Font Size: `3rem` (`48px`)
  - Font Weight: `400` (Regular)
  - Line Height: `1.25`
  - Color: `#B59E59`
  - Text Align: `center`
  - CSS Class: `.scene-heading`

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

#### Scene Narrative Headings
- **Style:** Serif narrative headline (`.scene-heading`)
- **Typography:** Adobe Garamond Pro Regular, `3rem`, `#B59E59`
- **Placement:** Centered horizontally, positioned directly below the 5-circle row

## Invariant Design Rules (Never Change Across Iterations)
1. Canvas MUST remain pure black (`#000000`). Never replace with slate, dark gray, or gradient fills.
2. Terminal text MUST remain `#00E900` using Platelet font at `2rem` / `600` weight.
3. Portal MUST remain a perfect `300px` circular mask during single-portal focus.
4. Scene headings MUST use Adobe Garamond Pro Regular at `3rem` with `#B59E59` fill.
5. Do NOT add animation timelines, scroll triggers, or keyframes until static layout phase is finalized.
