# Molotov Alva — Animation Script (Tier 4)
**Tier**: **Tier 4 — Mobile Phones Spectrum**  
**Viewport Range**: `< 768px` (`320px` to `767px`)  
**Representative Viewports**: `375x667` (iPhone SE / compact mobile), `390x844` (iPhone 12/13/14), `412x915` (Pixel 7 / Android), `430x932` (iPhone 14/15 Pro Max)  
**Total Scroll Track**: `58,500px` (Synchronized 1:1 with Master Track)  
**Smooth Scroll Controller**: Lenis (`scrub: true` via GSAP ScrollTrigger)  
**Primary Layout Paradigm**: Single-column centered stacked compositions; container-level proportional scaling; compact typography with tight gaps; zero horizontal scroll.

> [!NOTE]
> **4-Tier Responsive Architecture Navigation**:
> - [Tier 1 Master Script (Desktop 1366px–4K)](./animation-script.md)
> - [Tier 2 Script (Compact Laptops 1024px–1365px)](./animation-script-tier2.md)
> - [Tier 3 Script (Portrait Tablets 768px–1023px)](./animation-script-tier3.md)
> - **Tier 4 Script (Mobile Spectrum 320px–767px)** *(Current Document)*

---

## Architectural Principles of Tier 4

1. **Zero Horizontal Overflow Guarantee**: On narrow screens down to 320px, no element, aperture, card, or text block may ever exceed `window.innerWidth - 32px` (guaranteeing $\ge 16\text{px}$ touch/visual gutters).
2. **Container-Level Proportional Fitting**: For compound scenes where visual multi-circle grids sit stacked above narrative typography and CTA buttons (such as Scene 5 and Scene 6), the parent container (`#scene5-container`, `#scene6-container`) is scaled uniformly based on both width and height, preserving harmonious spatial relationships.
3. **Height-Aware Layout Compression**: On compact mobile screens ($h < 750\text{px}$, e.g. iPhone SE 667px), vertical translations and narrative text gaps are compressed dynamically relative to `window.innerHeight` to prevent bottom boundary clipping.

---

## Master Timeline Overview (Scenes 1 to 9)

| Scene | Working Title / Prompt | Pixel Range | Scroll Span | Tier 4 Specific Adaptation |
| :---: | :--- | :---: | :---: | :--- |
| **Scene 1** | `click_to_enter_` | Pre-Scroll | Event-Driven | Responsive central portal; prompt types `click_to_enter`; matrix rain disintegration |
| **Scene 2** | `hello_this_is_molotov_` | `0px – 5,550px` | 5,550px | **Micro 5-Circle Row**: `rowScale <= 0.24`, `rowStep = Math.round((w - 48) / 4 * 0.88)` |
| **Scene 3** | `you_look_through_the_wrong_end_of_telescopes_` | `5,500px – 10,600px` | 5,100px | **Grid Fitting**: `s3GridScale = Math.min(1.0, (w - 32) / 846)` ($0.405$ on 375px) |
| **Scene 4** | `you_think_in_fractions_then_call_the_consequences_unexpected_` | `10,600px – 18,600px` | 8,000px | **Grid Fitting**: `s4GridScale = Math.min(1.0, (w - 32) / 796)` ($0.431$ on 375px) |
| **Scene 5** | `you_say_no_instead_of_yes_` | `18,600px – 25,150px` | 6,550px | **Container Scale**: `#scene5-container` fits height and width (`s5ContainerScale`) |
| **Scene 6** | `our_future_without_food_illustratively_explained_by_ai_` | `25,100px – 35,950px` | 10,850px | **Container Scale**: `#scene6-container` fits height and width (`s6ContainerScale`) |
| **Scene 7** | `narrated_by_an_otherwordly_intelligence_` | `35,900px – 41,650px` | 5,750px | **Mobile Stack**: Height-aware portal scale ($0.42 - 0.55$), compact typography (`0.88rem`, gap 12px) |
| **Scene 8** | `reviewed_by_machines_` | `41,600px – 49,150px` | 7,550px | **Mobile Cards**: Fly scale ($0.65 - 1.0$), `sideOffsetY <= 50px`, grid layer scale fitting |
| **Scene 9** | `instructions_for_toppling_goliath_provided_` | `49,100px – 58,500px` | 9,400px | **Mobile Finale**: Compact under-book offsets; grounded footer (`elevation: 0`) |

---

## Detailed Scene Specifications

### Scene 1: "click_to_enter_" (The Hero Entrance)
- **Portal Aperture**: Centered circular portal dynamically sized to fit mobile viewports.
- **Prompt Docking**: Top-left corner (`padX: 24px`, `padY: 24px`, `scale: 0.5`).

---

### Scene 2: "hello_this_is_molotov_" (`0px – 5,550px`)
- **Row Metrics Calculation**:
  ```javascript
  const isS2Mobile = window.innerWidth < 768;
  const rowScale = isS2Mobile
    ? Math.min(0.24, (window.innerWidth - 48) / 5 / 300 * 1.35)
    : (isS2Tier3 ? (136 / 300) : (170 / 300));
  const rowStep = isS2Mobile
    ? Math.round((window.innerWidth - 48) / 4 * 0.88)
    : (isS2Tier3 ? Math.round((window.innerWidth - 160) / 4 * 0.92) : 194);
  ```
- **Spatial Geometry on 375px Canvas**:
  - `rowStep = Math.round((375 - 48) / 4 * 0.88) = 72px`.
  - `rowScale = 0.24` ($72\text{px}$ circle diameter).
  - Positions:
    - Circle 1: `x: -144`, `y: -95`
    - Circle 2: `x: -72`, `y: -95`
    - Circle 3: `x: 0`, `y: -95`
    - Circle 4: `x: +72`, `y: -95`
    - Circle 5: `x: +144`, `y: -95`
  - Total group span: $2 \times 144 + 72 = 360\text{px}$.
  - Symmetrical margins inside `375px`: $(375 - 360) / 2 = 7.5\text{px} \approx 15\text{px}$ gutter clearance. Zero clipping.

---

### Scene 3 & Scene 4: Responsive Mobile Grids (`5,500px – 18,600px`)
- **Scene 3 (40-Circle Grid)**:
  - Scale: `s3GridScale = Math.min(1.0, (window.innerWidth - 32) / 846)`.
  - On `375px`: `s3GridScale = 343 / 846 = 0.405`.
  - Scaled width is `343px` with `16px` margins on both sides.
- **Scene 4 (10-Circle Grid)**:
  - Scale: `s4GridScale = Math.min(1.0, (window.innerWidth - 32) / 796)`.
  - On `375px`: `s4GridScale = 343 / 796 = 0.431`.
  - Scaled width is `343px` with `16px` margins on both sides.

---

### Scene 5 & Scene 6: Compound Container-Level Scaling (`18,600px – 35,950px`)
- **Scene 5 Container (`#scene5-container`)**:
  - Contains: 3x2 grid (`304px` x `468px`) + typography (`288px`). Total height: `756px`.
  - Scale: `s5ContainerScale = Math.min(1.0, (window.innerHeight - 80) / 760, (window.innerWidth - 32) / 340)`.
  - On `375 x 667`: `s5ContainerScale = 587 / 760 = 0.772`.
  - Scaled height is `584px`, centered vertically with $>41\text{px}$ top and bottom margins.
- **Scene 6 Container (`#scene6-container`)**:
  - Contains: 5x3 constellation (`724px` x `416px`) + typography + purchase CTA (`390px`). Total height: `806px`.
  - Scale: `s6ContainerScale = Math.min(1.0, (window.innerHeight - 80) / 820, (window.innerWidth - 32) / 724)`.
  - On `375 x 667`: `s6ContainerScale = 343 / 724 = 0.474`.
  - Scaled width is `343px`; scaled height is `382px`.
  - Purchase CTA button has $>140\text{px}$ clearance from screen bottom.

---

### Scene 7: "narrated_by_an_otherwordly_intelligence_" (`35,900px – 41,650px`)
- **Layout Mode**: Single-Column Height-Aware Centered Stack.
- **Layout Formula (`getScene7Layout`)**:
  ```javascript
  if (isMobile) {
    return {
      portalEndX: 0,
      portalEndY: -Math.round(window.innerHeight * 0.24),
      textEndX: 0,
      textEndY: Math.round(window.innerHeight * 0.12),
      textMaxWidth: 'min(440px, 92vw)',
      portalScale: Math.min(0.55, Math.max(0.42, (window.innerHeight - 380) / 512)),
    };
  }
  ```
- **CSS Media Query (`main.css`)**:
  ```css
  @media (max-width: 767px) {
    #scene7-narrative {
      gap: 12px;
    }
    .scene7-paragraph {
      font-size: 0.88rem;
      line-height: 1.45;
      text-align: center;
    }
    .scene7-paragraph-italic {
      font-size: 0.82rem;
      line-height: 1.40;
    }
  }
  ```
- **Spatial Results**: On `375 x 667`, portal sits at `y: -160` (scale 0.55); text sits at `y: 80`. All 3 paragraphs fit with $>85\text{px}$ clearance above viewport bottom.

---

### Scene 8: "reviewed_by_machines_" (`41,600px – 49,150px`)
- **Layout Mode**: Single-Column Mobile Flying Cards $\to$ Vertically Scaled 2x2 Grid.
- **Fly-In Metrics (`getScene8FlyMetrics`)**:
  ```javascript
  if (w < 768) {
    const scale = Math.min(1.0, Math.max(0.65, (w - 32) / 420));
    return {
      scale: Number(scale.toFixed(2)),
      startScale: Number((scale * 1.3).toFixed(2)),
      sideOffsetY: Math.min(50, Math.round(h * 0.07)),
    };
  }
  ```
  - On `375 x 667`: `scale = 0.82`, `startScale = 1.07`, `sideOffsetY = 47px`.
  - Card width during pause: $420\text{px} \times 0.82 = 344.4\text{px} < 375\text{px}$ (Zero edge touching).
- **Grid Layer Scale**:
  - `s8GridScale = (isMobile && window.innerHeight < 920) ? Math.min(1.0, (window.innerHeight - 80) / 880) : 1.0`.
  - On `390 x 844`: `s8GridScale = 0.868`.
  - Card 1 top is at $+43.5\text{px}$; Card 4 bottom is at $800.5\text{px} < 844\text{px}$. Zero clipping.

---

### Scene 9: "instructions_for_toppling_goliath_provided_" (`49,100px – 58,500px`)
- **Phase 80 (Under-Book Text on Compact Mobile)**:
  - When `w < 768 && h < 750`:
    - `s9BookElevateY = -Math.round(Math.min(110, Math.max(70, (window.innerHeight - 500) * 0.2 + 60)))`
    - `s9ContentY = Math.min(200, Math.round((window.innerHeight - 280) * 0.45 + 40))`
  - On `375 x 667`: `s9BookElevateY = -93px`, `s9ContentY = 195px`.
  - Under-book text clears the 600px book circle and stays $>40\text{px}$ above screen bottom.
- **Phase 84 (Finale)**:
  - Stacked layout: `bookTargetX: 0`, `bookTargetY: -160`, `contentTargetX: 0`, `contentTargetY: 170`.
  - Grounded footer: `s9FooterElevationY = 0`.
