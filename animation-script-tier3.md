# Molotov Alva — Animation Script (Tier 3)
**Tier**: **Tier 3 — Tablet Portrait Spectrum**  
**Viewport Range**: `768px` to `1023px`  
**Representative Viewports**: `768x1024` (iPad Mini / 9.7" Portrait), `800x1280` (Android Tablet), `810x1080` (iPad 10.2"), `820x1180` (iPad Air), `834x1194` (iPad Pro 11"), `912x1368` (Surface Pro Portrait)  
**Total Scroll Track**: `58,500px` (Synchronized 1:1 with Master Track)  
**Smooth Scroll Controller**: Lenis (`scrub: true` via GSAP ScrollTrigger)  
**Primary Layout Paradigm**: Centered vertical stacked layouts for Scene 7 & 9, dynamic circle row step for Scene 2, and responsive grid scale fitting for Scene 3 & 4.

> [!NOTE]
> **4-Tier Responsive Architecture Navigation**:
> - [Tier 1 Master Script (Desktop 1366px–4K)](./animation-script.md)
> - [Tier 2 Script (Compact Laptops 1024px–1365px)](./animation-script-tier2.md)
> - **Tier 3 Script (Portrait Tablets 768px–1023px)** *(Current Document)*
> - [Tier 4 Script (Mobile Spectrum 320px–767px)](./animation-script-tier4.md)

---

## Architectural Principles of Tier 3

1. **Vertical Stacking Transition**: Because screen aspect ratios invert from landscape ($\sim 16:10$) to tall portrait ($\sim 3:4$ or $2:3$), horizontal split layouts in Scene 7 and Scene 9 would cause severe horizontal text squeezing or border clipping. Tier 3 transitions these scenes into elegant, centered vertical stacked compositions.
2. **Dynamic Circle Row Stepping**: Scene 2's 5-circle row cannot fit at the fixed desktop 946px width on 768px–912px viewports. Tier 3 computes `rowStep` dynamically as a function of `window.innerWidth`, ensuring proportional circle spacing and comfortable edge margins.
3. **Responsive Grid Scaling**: Scene 3 (846px) and Scene 4 (796px) utilize responsive CSS transforms to scale down proportionally to the available portrait canvas width.

---

## Master Timeline Overview (Scenes 1 to 9)

| Scene | Working Title / Prompt | Pixel Range | Scroll Span | Tier 3 Specific Adaptation |
| :---: | :--- | :---: | :---: | :--- |
| **Scene 1** | `click_to_enter_` | Pre-Scroll | Event-Driven | Standard 300px aperture; terminal prompt stationary at vertical middle flush left; un-typing click transition |
| **Scene 2** | `hello_this_is_molotov_` | `0px – 5,550px` | 5,550px | **Dynamic Row Spacing**: `rowScale: 136/300`, `rowStep = Math.round((w - 160) / 4 * 0.92)` |
| **Scene 3** | `you_look_through_the_wrong_end_of_telescopes_` | `5,500px – 10,600px` | 5,100px | **Grid Fitting**: `s3GridScale = Math.min(1.0, (w - 64) / 846)` ($0.832$ on 768px) |
| **Scene 4** | `you_think_in_fractions_then_call_the_consequences_unexpected_` | `10,600px – 18,600px` | 8,000px | **Grid Fitting**: `s4GridScale = Math.min(1.0, (w - 64) / 796)` ($0.884$ on 768px) |
| **Scene 5** | `you_say_no_instead_of_yes_` | `18,600px – 25,150px` | 6,550px | 3x2 grid (304px x 468px) centered comfortably |
| **Scene 6** | `our_future_without_food_illustratively_explained_by_ai_` | `25,100px – 35,950px` | 10,850px | 15-circle constellation (724px width) fits unscaled inside 768px (22px margins) |
| **Scene 7** | `narrated_by_an_otherwordly_intelligence_` | `35,900px – 41,650px` | 5,750px | **Centered Stack**: Portal `y: -190` (scale 0.85), text `y: 160` (max-width 600px) |
| **Scene 8** | `reviewed_by_machines_` | `41,600px – 49,150px` | 7,550px | **Dynamic Fly Scale**: `scale` dynamically fitted; 2x2 grid settle |
| **Scene 9** | `instructions_for_toppling_goliath_provided_` | `49,100px – 58,500px` | 9,400px | **Centered Stack Finale**: Book `y: -160`, content `y: 170`; grounded footer (`elevation: 0`) |

---

## Detailed Scene Specifications

### Scene 1: "click_to_enter_" (The Hero Entrance)
- **Portal Aperture**: `300px` x `300px` circle centered at `(0, 0)`.
- **Prompt Docking**: Docked to top-left corner (`padX: 24px`, `padY: 24px`, `scale: 0.5`).

---

### Scene 2: "hello_this_is_molotov_" (`0px – 5,550px`)
- **Row Metrics Calculation**:
  ```javascript
  const isS2Tier3 = window.innerWidth >= 768 && window.innerWidth < 1024;
  const rowScale = isS2Tier3 ? (136 / 300) : (170 / 300); // 0.4533 (136px circle diameter)
  const rowStep = isS2Tier3 ? Math.round((window.innerWidth - 160) / 4 * 0.92) : 194;
  ```
- **Spatial Geometry on 768px Canvas**:
  - `rowStep = Math.round((768 - 160) / 4 * 0.92) = 140px`.
  - Positions:
    - Circle 1: `x: -280`, `y: -95`
    - Circle 2: `x: -140`, `y: -95`
    - Circle 3: `x: 0`, `y: -95`
    - Circle 4: `x: +140`, `y: -95`
    - Circle 5: `x: +280`, `y: -95`
  - Total group width: $2 \times 280 + 136 = 696\text{px}$.
  - Symmetrical margins inside `768px`: $(768 - 696) / 2 = 36\text{px}$ on left and right. Zero clipping.

---

### Scene 3 & Scene 4: Responsive Grid Fitting (`5,500px – 18,600px`)
- **Scene 3 (40-Circle Grid)**:
  - Unscaled Dimensions: `846px` x `336px`.
  - Scale Formula: `s3GridScale = Math.min(1.0, (window.innerWidth - 64) / 846)`.
  - On `768px`: `s3GridScale = 704 / 846 = 0.832`. Scaled width is `704px` with `32px` margins.
- **Scene 4 (10-Circle Grid)**:
  - Unscaled Dimensions: `796px` x `308px`.
  - Scale Formula: `s4GridScale = Math.min(1.0, (window.innerWidth - 64) / 796)`.
  - On `768px`: `s4GridScale = 704 / 796 = 0.884`. Scaled width is `704px` with `32px` margins.

---

### Scene 5 & Scene 6: Gravitational Convergence & Constellation (`18,600px – 35,950px`)
- **Scene 5**: 3x2 grid (`304px` x `468px`) fits comfortably in center with ample margins.
- **Scene 6**: 5x3 constellation (`724px` x `416px`).
  - Width `724px` fits inside `768px` leaving $(768 - 724) / 2 = 22\text{px}$ margins.
  - Vertical canvas has $\ge 1024\text{px}$ height, ensuring generous clearance above and below the purchase CTA button.

---

### Scene 7: "narrated_by_an_otherwordly_intelligence_" (`35,900px – 41,650px`)
- **Layout Mode**: Centered Vertical Stack.
- **Formula (`getScene7Layout`)**:
  ```javascript
  if (window.innerWidth < 1024) {
    return {
      portalEndX: 0,
      portalEndY: -190,
      textEndX: 0,
      textEndY: 160,
      textMaxWidth: '600px',
      portalScale: 0.85,
    };
  }
  ```
- **Spatial Geometry**:
  - Portal is positioned above center at `y: -190` scaled to `0.85` ($435.2\text{px}$ diameter).
  - Narrative text block sits centered below at `y: 160` with a max-width of `600px`.
  - Full reading width and vertical clearance are preserved without any horizontal split distortion.

---

### Scene 8: "reviewed_by_machines_" (`41,600px – 49,150px`)
- **Layout Mode**: Dynamic Height-Aware Flying Cards $\to$ Symmetrical 2x2 Grid.
- **Fly-In Metrics (`getScene8FlyMetrics`)**:
  - `scale = Math.min(2.0, Math.min((w - 120) / 640, (h - 220) / 280))`.
  - On `768 x 1024`: `scale = 1.01`, `startScale = 1.52`, `sideOffsetY = 133px`.
  - Cards glide seamlessly into the 2x2 grid using dynamic DOM-measured deltas (`s8DeltaX`, `s8DeltaY`).

---

### Scene 9: "instructions_for_toppling_goliath_provided_" (`49,100px – 58,500px`)
- **Layout Mode**: Centered Vertical Stack Finale.
- **Formula (`getScene9FinaleLayout`)**:
  ```javascript
  if (window.innerWidth < 1024) {
    return {
      bookTargetX: 0,
      bookTargetY: -160,
      contentTargetX: 0,
      contentTargetY: 170,
      bookScale: 0.50,
      contentMaxWidth: '560px',
    };
  }
  ```
- **Footer Elevation**:
  - Grounded Baseline: `s9FooterElevationY = 0` when `window.innerWidth < 1024`.
  - Guarantees the email signup form `#scene9-footer-wrapper` sits naturally at the bottom without floating up or overlapping the purchase CTA.
