# Molotov Alva — Animation Script (Tier 2)
**Tier**: **Tier 2 — Compact Laptops & Landscape Tablets**  
**Viewport Range**: `1024px` to `1365px`  
**Representative Viewports**: `1024x768` (iPad Landscape), `1160x730` (Compact Laptop Viewport), `1280x800` (MacBook 13")  
**Total Scroll Track**: `58,500px` (Synchronized 1:1 with Master Track)  
**Smooth Scroll Controller**: Lenis (`scrub: true` via GSAP ScrollTrigger)  
**Primary Layout Paradigm**: Symmetrically fitted side-by-side splits with height-aware aperture & card scaling.

> [!NOTE]
> **4-Tier Responsive Architecture Navigation**:
> - [Tier 1 Master Script (Desktop 1366px–4K)](./animation-script.md)
> - **Tier 2 Script (Compact Laptops 1024px–1365px)** *(Current Document)*
> - [Tier 3 Script (Portrait Tablets 768px–1023px)](./animation-script-tier3.md)
> - [Tier 4 Script (Mobile Spectrum 320px–767px)](./animation-script-tier4.md)

---

## Architectural Principles of Tier 2

1. **Side-by-Side Preservation**: Unlike portrait tablets (Tier 3) or mobile phones (Tier 4), Tier 2 maintains the cinematic horizontal split layout in Scene 7 (Colophon) and Scene 9 (Book & Finale).
2. **Symmetrical Margin Compression**: Elements are compressed inward so that total group widths never exceed the usable screen canvas (e.g. 976px canvas on 1024px width, leaving 24px–57px margins).
3. **Dynamic Height-Aware Fitting**: For screens with vertical height under 850px (e.g. 730px or 768px), review cards in Scene 8 and book offsets in Scene 9 are scaled down dynamically relative to `window.innerHeight`.

---

## Master Timeline Overview (Scenes 1 to 9)

| Scene | Working Title / Prompt | Pixel Range | Scroll Span | Tier 2 Specific Adaptation |
| :---: | :--- | :---: | :---: | :--- |
| **Scene 1** | `click_to_enter_` | Pre-Scroll | Event-Driven | Standard 300px aperture; terminal prompt stationary at vertical middle flush left; un-typing click transition |
| **Scene 2** | `hello_this_is_molotov_` | `0px – 5,550px` | 5,550px | Standard 5-circle row (`rowStep: 194px`, `rowScale: 0.5667`); fits inside 1024px with 126px margins |
| **Scene 3** | `you_look_through_the_wrong_end_of_telescopes_` | `5,500px – 10,600px` | 5,100px | 40-circle grid (846px width) fits unscaled inside 1024px (89px margins) |
| **Scene 4** | `you_think_in_fractions_then_call_the_consequences_unexpected_` | `10,600px – 18,600px` | 8,000px | 10-circle grid (796px width) fits unscaled inside 1024px (114px margins) |
| **Scene 5** | `you_say_no_instead_of_yes_` | `18,600px – 25,150px` | 6,550px | 3x2 grid (304px x 468px) centered comfortably |
| **Scene 6** | `our_future_without_food_illustratively_explained_by_ai_` | `25,100px – 35,950px` | 10,850px | 15-circle constellation (724px width) fits; height-scaled when $h < 820\text{px}$ |
| **Scene 7** | `narrated_by_an_otherwordly_intelligence_` | `35,900px – 41,650px` | 5,750px | **Fitted Split**: Portal `x: -250` (scale 0.80), text `x: 225` (max-width 460px) |
| **Scene 8** | `reviewed_by_machines_` | `41,600px – 49,150px` | 7,550px | **Dynamic Fly Scale**: `scale` dynamically fitted between 1.2 and 2.0; `sideOffsetY <= 140px` |
| **Scene 9** | `instructions_for_toppling_goliath_provided_` | `49,100px – 58,500px` | 9,400px | **Fitted Finale**: Book `x: -260`, content `x: 235`; height-scaled elevation |

---

## Detailed Scene Specifications

### Scene 1: "click_to_enter_" (The Hero Entrance)
- **Portal Aperture**: `300px` x `300px` circle centered at `(0, 0)`.
- **Prompt Docking**: Docked to top-left corner (`padX: 24px`, `padY: 24px`, `scale: 0.5`).

---

### Scene 2: "hello_this_is_molotov_" (`0px – 5,550px`)
- **Row Metrics**:
  - `rowStep = 194px`
  - `rowScale = 170 / 300` ($0.5667$)
  - Total row width: $4 \times 194 + 170 = 946\text{px}$.
  - Usable canvas margin: On `1024px`, $(1024 - 946) / 2 = 39\text{px}$ margin on each side. On `1160px`, $107\text{px}$ margin. Zero clipping.
- **Phase 2 & 3 Positioning**:
  - Circle 1: `x: -388`, `y: -95`
  - Circle 2: `x: -194`, `y: -95`
  - Circle 3: `x: 0`, `y: -95`
  - Circle 4: `x: +194`, `y: -95`
  - Circle 5: `x: +388`, `y: -95`

---

### Scene 3 & Scene 4: Grids (`5,500px – 18,600px`)
- **Scene 3 (40-Circle Grid)**:
  - Width: `846px`, Height: `336px`.
  - Grid Scale: `s3GridScale = 1.0` (Fits within all Tier 2 widths $\ge 1024\text{px}$).
- **Scene 4 (10-Circle Grid)**:
  - Width: `796px`, Height: `308px`.
  - Grid Scale: `s4GridScale = 1.0`.

---

### Scene 5 & Scene 6: Gravitational Convergence & Constellation (`18,600px – 35,950px`)
- **Scene 5**: 3x2 grid (`304px` x `468px`) fits comfortably in center.
- **Scene 6**: 5x3 constellation (`724px` x `416px`).
  - Height Guard: When `window.innerHeight < 820px`, `s6GridScale = Math.min(1.0, Math.max(0.80, (window.innerHeight - 80) / 720))`.
  - Guarantees the purchase CTA button `#scene6-purchase-btn` has at least 30px clearance above the viewport bottom.

---

### Scene 7: "narrated_by_an_otherwordly_intelligence_" (`35,900px – 41,650px`)
- **Layout Mode**: Symmetrically Compressed Horizontal Split.
- **Formula (`getScene7Layout`)**:
  ```javascript
  if (window.innerWidth < 1366) {
    return {
      portalEndX: -250,
      portalEndY: 0,
      textEndX: 225,
      textEndY: 0,
      textMaxWidth: '460px',
      portalScale: 0.80,
    };
  }
  ```
- **Spatial Geometry**:
  - Portal visual diameter: $512\text{px} \times 0.80 = 409.6\text{px}$.
  - Total group span: $409.6 + 40\text{px (gap)} + 460\text{px (text)} = 909.6\text{px}$.
  - Symmetrical margins inside `1024px`: $(1024 - 909.6) / 2 = 57.2\text{px}$ on left and right.

---

### Scene 8: "reviewed_by_machines_" (`41,600px – 49,150px`)
- **Layout Mode**: Dynamic Height-Aware Flying Cards $\to$ Symmetrical 2x2 Grid.
- **Fly-In Metrics (`getScene8FlyMetrics`)**:
  ```javascript
  const maxScaleByWidth = Math.max(1.2, (w - 120) / 640);
  const maxScaleByHeight = Math.max(1.2, (h - 220) / 280);
  const scale = Math.min(2.0, Math.min(maxScaleByWidth, maxScaleByHeight));
  const sideOffsetY = Math.min(140, Math.round(h * 0.13));
  ```
  - On `1160 x 730`: `scale = 1.62`, `startScale = 2.43`, `sideOffsetY = 95px`.
  - Quote card width during hold: $640\text{px} \times 1.62 = 1036.8\text{px} < 1160\text{px}$ (61px margin on both sides).
  - Quote card height during hold: $190\text{px} \times 1.62 = 307.8\text{px} < 730\text{px}$ (Zero vertical clipping).
- **Final 2x2 Grid (`45,550px – 47,500px`)**:
  - Card 4 glide vector measures `card4.getBoundingClientRect()` dynamically:
    `s8DeltaX = (slotRect.left + slotRect.width / 2) - (flyRect.left + flyRect.width / 2)`
    `s8DeltaY = (slotRect.top + slotRect.height / 2) - (flyRect.top + flyRect.height / 2)`
  - Seamlessly bridges from center hold to grid slot with zero jump or snap.

---

### Scene 9: "instructions_for_toppling_goliath_provided_" (`49,100px – 58,500px`)
- **Phase 80 (Under-Book Text)**:
  - `desktopHeightScale = Math.min(1.0, Math.max(0.70, (window.innerHeight - 100) / 750))`
  - `s9BookElevateY = window.innerHeight >= 850 ? -160 * desktopHeightScale : -Math.round(Math.min(85, Math.max(50, (window.innerHeight - 600) * 0.15 + 60)))`
  - `s9ContentY = 335 * desktopHeightScale`
- **Phase 84 (Finale Side-by-Side Split)**:
  - Book coordinates: `x: -260`, `y: 0`, `scale: 0.60` ($360\text{px}$ diameter).
  - Content coordinates: `x: 235`, `y: 0`, `width: 480px`.
  - Total span: $360 + 40 + 480 = 880\text{px} < 1024\text{px}$.
  - Footer Elevation: `s9FooterElevationY = window.innerHeight >= 1050 ? -150 : -Math.max(0, Math.min(150, (window.innerHeight - 800) * 0.5))`.
