# MOLOTOVALVA Website

A lightweight Vite + Tailwind CSS project integrated with GSAP (GreenSock) and Lenis Smooth Scroll.

## Tech Stack
- **Vite**: Ultra-fast frontend build tool and dev server
- **Tailwind CSS v4**: Modern, zero-config utility-first CSS framework
- **GSAP + ScrollTrigger**: High-performance animation engine and scroll trigger plugin
- **Lenis**: Smooth scrolling engine synchronized to GSAP's Ticker

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

## Responsive Architecture (The 4 Tiers)

The layout, typography, and animation choreographies are mathematically partitioned into four isolated tiers to ensure zero clipping, no horizontal overflow, and strict non-regression:

- **[Tier 1: Full Desktop Spectrum (`≥ 1366px` up to 4K)](./animation-script.md)**: Baseline canonical screenplay; unconstrained side-by-side splits and full-scale apertures.
- **[Tier 2: Compact Laptops & Landscape Tablets (`1024px – 1365px`)](./animation-script-tier2.md)**: Symmetrically compressed horizontal splits; dynamic height-aware card fitting.
- **[Tier 3: Tablet Portrait Spectrum (`768px – 1023px`)](./animation-script-tier3.md)**: Centered vertical stacked layouts; dynamic circle row stepping.
- **[Tier 4: Mobile Spectrum (`320px – 767px`)](./animation-script-tier4.md)**: Single-column vertical stacks; container-level proportional scaling; compact typography.

Design system tokens and invariant guidelines are documented in [`design.md`](./design.md).

