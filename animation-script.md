# Molotov Alva — Master Animation Script
**Version**: 2.0 (Canonical 4-Tier Architectural Baseline)  
**Target Environment**: **Desktop Baseline** (1366px to 4K viewports)  
**Total Scroll Track**: `58,500px`  
**Smooth Scroll Controller**: Lenis (`scrub: true` via GSAP ScrollTrigger)  
**Purpose**: Living screenplay and storyboard reference of all visual timings, pixel coordinates, easings, and narrative holds across the entire experience.

> [!IMPORTANT]
> **4-Tier Responsive Architecture Hierarchy**:
> This document serves as the **Tier 1 (Desktop 1366px–4K)** canonical reference. To preserve zero-clipping and flawless layout across all form factors without regressing desktop baseline choreography, the animation scripts are divided into four dedicated specifications:
>
> | Tier | Category | Viewport Spectrum | Primary Layout Behavior | Dedicated Specification |
> | :---: | :--- | :--- | :--- | :--- |
> | **Tier 1** | Full Desktop Spectrum | $\ge 1366\text{px}$ up to 4K | Unconstrained side-by-side splits; 100% baseline grid & aperture scale | This document ([`animation-script.md`](./animation-script.md)) |
> | **Tier 2** | Compact Laptops & Landscape Tablets | $1024\text{px} \le w < 1366\text{px}$ | Symmetrically fitted side-by-side splits; height-aware card & grid scaling | [`animation-script-tier2.md`](./animation-script-tier2.md) |
> | **Tier 3** | Tablet Portrait Spectrum | $768\text{px} \le w < 1024\text{px}$ | Centered vertical stacked layouts for S7 & S9; dynamic circle row spacing | [`animation-script-tier3.md`](./animation-script-tier3.md) |
> | **Tier 4** | Mobile Phones Spectrum | $< 768\text{px}$ ($320\text{px} - 767\text{px}$) | Single-column stacked layouts; container-level proportional scaling; compact typography | [`animation-script-tier4.md`](./animation-script-tier4.md) |

---

## Master Timeline Overview (Scenes 1 to 9)

> [!NOTE]
> **Low-Fi Terminal Progress Bar (`#terminal-progress`)**:
> - **Position**: Stationed at the bottom (`bottom: 30px`), spanning the entire available width between main canvas padding (`left-4 md:left-[50px]` to `right-4 md:right-[50px]`).
> - **Typography**: Monospace terminal font (`var(--font-terminal)`), terminal green (`#00e900`), `0.82rem` (`13px`).
> - **Cursor**: Monospace blinking terminal cursor (`<span class="terminal-cursor">_</span>`) positioned immediately after the `%` sign.
> - **Choreography & Span (`0px – 56,500px`)**:
>   - Pre-scroll / Scene 1: Hidden (`opacity: 0`).
>   - Scene 2 Start (`0px`): Fades in at `0%_`.
>   - Progress: Dynamic hyphen sequence calculated against the full container width (`~185` hyphens at 1366px), formatted as `[hyphens] [percent]%_`.
>   - End of Transmission (`56,500px`): Hyphens span the entire available width to the right margin ending with ` 100%_`, exactly as `>: end_of_transmission` completes typing on screen, remaining steadily pinned through the final reflection hold.

| Scene | Working Title / Prompt | Pixel Range | Scroll Span | Primary Visual / Interaction |
| :---: | :--- | :---: | :---: | :--- |
| **Scene 1** | The Genesis & Funnel Transition | Pre-Scroll | Event-Driven | White stage $\to$ Text 1 center fade & 7s zoom $\to$ MA-Grid-01 fade-in & 20-image grid assembly (5x4) $\to$ Immediate Text 2 fade & zoom (4s) $\to$ Button $\to$ Seamless funnel swallowing into black |
| **Scene 2** | `hello_this_is_molotov_` | `0px – 5,550px` | 5,550px | 5 center flashes $\to$ 5-circle row $\to$ Word-by-word heading $\to$ Staggered exit |
| **Scene 3** | `you_look_through_the_wrong_end_of_telescopes_` | `5,500px – 10,600px` | 5,100px | Big Deer portal $\to$ 40-circle grid explosion $\to$ Subheading mirror flip $\to$ Exit |
| **Scene 4** | `you_think_in_fractions_then_call_the_consequences_unexpected_` | `10,600px – 18,600px` | 8,000px | 512px video scrub ($6.04\text{s}$) $\to$ Still handoff $\to$ 10-circle grid $\to$ Exit |
| **Scene 5** | `you_say_no_instead_of_yes_` | `18,600px – 25,150px` | 6,550px | Orbital gravitational convergence (6 circles) $\to$ 3x2 grid $\to$ Heading $\to$ Exit |
| **Scene 6** | `our_future_without_food_illustratively_explained_by_ai_` | `25,100px – 35,950px` | 10,850px | Centered video scrub ($6.0\text{s}$) $\to$ 15-circle constellation $\to$ Purchase CTA $\to$ Exit |
| **Scene 7** | `narrated_by_an_otherwordly_intelligence_` | `35,900px – 41,650px` | 5,750px | 512px avatar zoom $\to$ End-credits text crawl $\to$ Split layout separation $\to$ Exit |
| **Scene 8** | `reviewed_by_machines_` | `41,600px – 49,150px` | 7,550px | Staggered lateral card entrance (Quotes 1 & 3 from left, 2 & 4 from right) at 100% scale $\to$ 2x2 grid reading hold $\to$ Exit |
| **Scene 9** | `instructions_for_toppling_goliath_provided_` | `49,100px – 58,500px` | 9,400px | 600px book circle $\to$ Under-book text $\to$ Side-by-side finale $\to$ Footer form |

---

## Scene 1: The Genesis & Funnel Transition to Scene 2
*Interactive autoload introductory sequence before scroll scrub unlocks.*

- **Trigger**: Window `DOMContentLoaded` / Asset load (Autoload timed sequence; no scroll).
- **Scene 1 Motion Rule**: **Only use ease-out (`power2.out`), no ease-in / ease-in-out for scaling, position, and translation.**
- **Fast-Forward Dev Helper**: Clicking anywhere on the stage mid-animation instantly completes all tweens, rendering the full end-state layout immediately.
- **Stage**: Pure white page (`#ffffff`). Main content container `#scene1-content` constrained to `max-w-[1366px]` with container padding (`px-4 md:px-[50px]`) and permanently centered both vertically and horizontally via `m-auto` (equal space above and below). Both text boxes are horizontally centered (`w-full max-w-[840px] mx-auto text-left`).
- **Vertical Spacing Architecture**:
  - Text Box 1 to Grid: `50px` (`mb-[50px]`).
  - 20-Image Grid to Text Box 2: `50px` (`mb-[50px]`).
  - Text Box 2 to Button: `100px` (`mb-[100px]`).
- **Phase 1.1 — Text Box 1 Center Fade & Slow Zoom (`0.0s – 8.2s`)**:
  - **Typography**: Adobe Garamond Pro, 1.15rem (mobile) / 1.3rem (desktop), line-height 1.45, color black (`#000000`).
  - **Text**: *"In 2006, Douglas Gayeton stumbled upon an amplified intelligence living in Second Life. The result of that encounter, <span class="italic font-bold">Molotov Alva and His Search for the Creator</span>, became a ten-part HBO series and ignited an international academic debate over where the human ends and the synthetic begins."*
  - **Choreography**:
    - Stationed initially in the **exact vertical center of the screen** (`(window.innerHeight / 2) - naturalCenterY`, `opacity: 0`, `scale: 1.0`, `transformOrigin: '50% 50%'`), maintaining flush left-alignment inside its 840px horizontally centered box.
    - `0.0s – 2.0s`: Fades in from `0` to `1.0` (`power2.out`).
    - `0.0s – 7.0s`: Zooms smoothly from 100% to **110%** over 7 seconds (`scale: 1.0 -> 1.10`, `power2.out`), remaining perfectly centered vertically throughout the expansion.
    - `7.0s – 8.2s`: Zooms back to 100% while settling into its final resting position over 1.2s using ease-in-ease-out (`scale: 1.10 -> 1.0`, `y: 0`, `1.2s`, `power2.inOut`).
- **Phase 1.2 — 20-Image Grid (5x4) Hero Entrance & Montage Assembly (`7.8s – 11.04s`)**:
  - **Grid Configuration**: 5 columns x 4 rows (20 images total), omitting images `MA-Grid-16.jpg` through `MA-Grid-20.jpg`. Populated from `[1..15, 21..25]`.
  - **Hero Entrance (`7.8s – 9.6s`)**:
    - As Text 1 falls into position (`7.8s`), `MA-Grid-01.jpg` enters in `#scene1-hero-container` at screen center with a **pure fade-in** at 100% scale (no zoom-in; `0.6s` fade in, `power2.out`).
    - Holds at center for `0.5s` at native scale.
    - At `8.9s`, hero glides into Slot [0,0] (top-left) of the grid (`0.7s`, `power2.inOut`), seamlessly handing off to `#scene1-grid-img-0`.
  - **Montage & Hover Behavior**:
    - The remaining 19 thumbnails fade in one-by-one in randomized order (`0.08s` stagger, `0.22s` duration per image, `power2.out`), completing the full 5x4 grid at `~11.04s`.
    - Thumbnails remain non-clickable (no lightbox/modal), but subtly scale up (`transform: scale(1.04)`, `0.25s ease`) on hover with default cursor.
- **Phase 1.3 — Seamless Progression to Text 2 (`11.04s`)**:
  - The 1-second pause has been eliminated; Text Box 2 begins fading in immediately as the 20th grid image finishes its fade.
- **Phase 1.4 — Text Box 2 Slow Fade & Zoom (`11.04s – 15.04s`)**:
  - **Typography**: Identical Garamond font styling, max-width 840px centered, `text-left`.
  - **Text**: *"Twenty years later, that same intelligence, now amplified and distributed, has delivered an instruction manual for a species running out of time."*
  - **Choreography**:
    - `11.04s – 13.04s`: Slow fade in over 2.0s (`opacity: 0 -> 1`, `power2.out`).
    - `11.04s – 15.04s`: Slow zoom from 95% to 100% over the full 4.0s duration (`scale: 0.95 -> 1.0`, `power2.out`).
- **Phase 1.5 — Button Entrance, Outer-Edge Shadow Pulse & Interactive Swipe Hover (`14.04s – 15.04s`)**:
  - Button `MEET MOLOTOV` slides up and fades in over 1.0s (`y: 30 -> 0`, `opacity: 0 -> 1`, `power2.out`, pointer events enabled), entering **1 second earlier** (`14.04s`) to overlap with the final second of Text Box 2's movement.
  - **Outer-Edge Shadow Pulse**: When not hovered, the button maintains fixed geometry (no scaling) and emits a soft shadow ripple emanating outward from its perimeter edges every 2.5 seconds via CSS (`animation: scene1BtnPulse 2.5s infinite`, expanding over `1.125s` to `35px` with a `1.375s` rest interval).
  - **Typography & Spacing**: 20px spacing between `"MOLOTOV"` and arrow `↓` (`ml-[20px]`).
  - **Swipe Reversible Hover Transition**:
    - **Hover state**: Left-to-right swipe (`transform: translateX(0)`) reveals white background, reverses text color to black, preserving the 1px black inner stroke, while pausing the pulse (`animation: none; box-shadow: none`).
    - **Mouse Abandon**: If cursor leaves without clicking, the swipe reverses back from right to left (`transform: translateX(-101%)`), text returns to white, and the 2.5-second outer shadow pulse resumes.
- **Phase 1.6 — Seamless Funnel Swallowing Transition (Button Click)**:
  - User clicks `MEET MOLOTOV ↓`.
  - Content container `#scene1-content` moves upward (`y: -(0.35 * innerHeight)`) as it shrinks from 100% to 0% and fades with ease-in in **0.8s** (`scale: 1 -> 0`, `opacity: 1 -> 0`, `0.8s`, `power2.in`, `transformOrigin: '50% 50%'`), falling directly into the mouth of the ascending funnel.
  - Black SVG funnel elevates upward by `2.8x innerHeight` (`1.8s`, `power2.inOut`), its throat swallowing the shrinking stage.
  - **White Gap Prevention**:
    - SVG wing paths overlap the solid black base by `-mt-[2px]` and extend past coordinates (`-5` to `605` and `1205` to `605`) to eliminate subpixel white hairlines.
    - Black base extends `350vh` below the throat, preventing any bottom white gap throughout the upward travel.
    - `#scene1-container` background smoothly cross-fades to `#000000` at `0.9s` before the container is hidden (`display: none`), guaranteeing a 100% seamless cut to Scene 2's black canvas.
- **Phase 1.7 — Canonical Phase 1.4 Resume (Molotov Arrival on Black Canvas)**:
  - Screen is 100% black.
  - Terminal prompt `#terminal-prompt` fades in at vertical middle, flush left, typing `hello_this_is_molotov_` (`1.5s`).
  - Low-fi terminal progress bar `#terminal-progress` fades in at `0%_`.
  - Animated chevron scroll indicator bounces at bottom center.
  - Lenis smooth scroll engages and scroll track unlocks (`58,500px`).

---

## Scene 2: "hello_this_is_molotov_"
**Pixel Range**: `0px – 5,550px` (Total Span: `5,550px`)  
**Elements**: `#prompt`, `#circle-1` to `#circle-5`, `#scene2-heading`, `#subheading-part1`, `#subheading-part2`

| Phase | Pixel Range | Duration | Action / Animation Details |
| :--- | :---: | :---: | :--- |
| **Phase 0** | `0px – 500px` | 500px | `#prompt` translates vertically upward (zero horizontal displacement) till it butts with the top of the canvas at 50px from top (`y: -(H/2 - 50)`), holding there throughout Scene 2. Simultaneously, **Circle 1** is dragged up from bottom of screen into dead center (`0px – 500px`). Scroll indicator fades to `opacity: 0`. |
| **Phase 1A** | `500px – 1,000px` | 500px | **Circle 1** holds dead center `500px – 700px` (200px hold), then dissolves `700px – 1,000px` (300px fade). |
| **Phase 1B** | `1,000px – 1,500px` | 500px | **Circle 2** appears dead center at `1,000px`, holds center `1,000px – 1,200px`, dissolves `1,200px – 1,500px`. |
| **Phase 1C** | `1,500px – 2,000px` | 500px | **Circle 3** appears dead center at `1,500px`, holds center `1,500px – 1,700px`, dissolves `1,700px – 2,000px`. |
| **Phase 1D** | `2,000px – 2,500px` | 500px | **Circle 4** appears dead center at `2,000px`, holds center `2,000px – 2,200px`, dissolves `2,200px – 2,500px`. |
| **Phase 1E** | `2,500px – 2,700px` | 200px | **Circle 5** appears dead center at `2,500px` and holds center for 200px. |
| **Phase 2** | `2,700px – 3,000px` | 300px | **Circle 5** scales down (`scale: 0.5667`) and glides to Slot 5 (Far Right: `x: 388, y: -95`). |
| **Phase 3** | `3,000px – 3,800px` | 800px | **Other 4 circles fade into row** at `y: -95` (`scale: 0.5667`):<br>• `3,000px – 3,200px`: Circle 3 into Slot 3 (`x: 0`)<br>• `3,200px – 3,400px`: Circle 1 into Slot 1 (`x: -388`)<br>• `3,400px – 3,600px`: Circle 4 into Slot 4 (`x: +194`)<br>• `3,600px – 3,800px`: Circle 2 into Slot 2 (`x: -194`) |
| **Phase 4** | `3,000px – 3,800px` | 800px | **Heading word-by-word reveal**: `#scene2-heading` words fade up sequentially (`y: 12 -> 0`, `opacity: 0 -> 1`, 100px per word), synchronized with circle appearances. |
| **Phase 5** | `3,800px – 4,500px` | 700px | **Subheading reveal**:<br>• `3,800px – 4,100px` (300px): `#subheading-part1` fades in (`y: 8 -> 0`).<br>• `4,100px – 4,200px` (100px): Stillness hold.<br>• `4,200px – 4,500px` (300px): `#subheading-part2` (italic) fades in (`y: 8 -> 0`). |
| **Phase 6** | `4,500px – 5,000px` | 500px | **Reading Hold**: 500px complete stillness with all Scene 2 elements at 100% presence. |
| **Phase 7** | `5,000px – 5,550px` | 550px | **Zero-Gravity Staggered Exit & Prompt Un-type**:<br>• `5,000px – 5,500px`: `#prompt` stationed at top of screen un-types right-to-left and clears cursor/prefix, disappearing completely before Scene 3.<br>• `5,100px – 5,350px`: 5-circle row departs (`y: -200`, `opacity: 0`).<br>• `5,200px – 5,450px`: Heading departs (`y: -200`, `opacity: 0`).<br>• `5,300px – 5,550px`: Subheading departs (`y: -200`, `opacity: 0`). |

---

## Scene 3: "you_look_through_the_wrong_end_of_telescopes_"
**Pixel Range**: `5,500px – 10,600px` (Total Span: `5,100px`)  
**Elements**: `#scene3-prompt`, `#scene3-deer-focus`, `#scene3-grid` (40 circles; 1066px wide on 1366px desktop canvas within 50px general canvas padding), `#scene3-heading`, `#scene3-subheading-part1`, `#scene3-subheading-part2`

| Phase | Pixel Range | Duration | Action / Animation Details |
| :--- | :---: | :---: | :--- |
| **Phase 8** | `5,500px – 5,900px` | 400px | `#scene3-prompt` activates in place at vertical center, flush left (`opacity: 0 -> 1`, blinking cursor at `>: _`). |
| **Phase 9** | `5,900px – 6,500px` | 600px | Types `you_look_through_the_wrong_end_of_telescopes` character-by-character (`ease: none`). |
| **Phase 10** | `6,500px – 6,700px` | 200px | **Centered Breathing Hold**: Stillness on left-aligned typed prompt with blinking cursor. |
| **Phase 11** | `6,700px – 7,200px` | 500px | Prompt translates vertically upward (zero horizontal displacement) till it butts with the top of the canvas at 50px from top (`y: -(H/2 - 50)`), holding there throughout Scene 3. |
| **Phase 12** | `7,200px – 7,500px` | 300px | **Deer Focus & Initial Clause**:<br>• `7,200px – 7,300px`: `#scene3-deer-focus` fades in dead center at scale 1.0 (using pure high-resolution `OhDeer-detail.jpg` aligned to match Slot [3,3]); holds `7,300px – 7,500px`.<br>• `7,200px – 7,500px`: Heading words 1–4 ("You", "see", "the", "deer") fade up sequentially (75px each). |
| **Phase 13** | `7,500px – 8,100px` | 600px | **Left Grid Assembly**:<br>• Deer portal glides and scales into Slot [3,3] (`power1.inOut`).<br>• Over the final 60px before docking (`8,040px – 8,100px`), the inner high-res detail layer smoothly dissolves into the base layer within the moving portal, matching Slot [3,3] with zero jump-cut or stationary ghosting.<br>• 19 remaining circles of Columns 1–5 fade in in randomized order (24px stagger, 120px duration). |
| **Phase 14** | `8,100px – 8,300px` | 200px | **Contemplation Hold**: 200px stillness on completed left-half grid and "You see the deer". |
| **Phase 15** | `8,300px – 8,900px` | 600px | **Right Grid Wildfire & Heading Completion**:<br>• 20 circles of Columns 6–10 appear in randomized order.<br>• Heading completes: "...but miss the burning forest." (words 4–8 fade up, 120px each). |
| **Phase 16** | `8,900px – 10,000px` | 1,100px | **Subheading & Physical Telescope Flip**:<br>• `8,900px – 9,150px`: Part 1 fades in; Part 2 fades in mirrored (`scaleX: -1`).<br>• `9,150px – 9,300px`: 150px mirror contemplation hold.<br>• `9,300px – 9,700px`: Part 2 physically flips horizontally (`scaleX: -1 -> 1`, `power2.inOut`).<br>• `9,700px – 10,000px`: 300px complete end-state stillness hold. |
| **Phase 17** | `10,000px – 10,600px` | 600px | **Zero-Gravity Float-Away Exit & Prompt Un-type**:<br>• `10,000px – 10,600px`: `#scene3-prompt` stationed at top of screen un-types right-to-left and clears cursor/prefix, disappearing completely before Scene 4.<br>• `10,000px – 10,350px`: Subheading floats up (`y: -40`, `opacity: 0`).<br>• `10,050px – 10,450px`: Heading floats up (`y: -60`, `opacity: 0`).<br>• `10,100px – 10,550px`: 40-circle grid floats up (`y: -80`, `opacity: 0`). |
| **Phase 18** | `10,600px – 10,900px` | 300px | **Black Void Runway**: 300px pitch-black contemplation space before Scene 4. |

---

## Scene 4: "you_think_in_fractions_then_call_the_consequences_unexpected_"
**Pixel Range**: `10,600px – 18,600px` (Total Span: `8,000px`)  
**Elements**: `#scene4-prompt`, `#scene4-video-portal` (`#scene4-video`), `#scene4-grid` (10 circles), `#scene4-heading`, `#scene4-subheading-line1`, `#scene4-subheading-line2`

| Phase | Pixel Range | Duration | Action / Animation Details |
| :--- | :---: | :---: | :--- |
| **Phase 19** | `10,900px – 11,300px` | 400px | `#scene4-prompt` activates in place at vertical center, flush left (`opacity: 0 -> 1`, blinking cursor at `>: _`). |
| **Phase 20** | `11,300px – 11,700px` | 400px | Clause 1 types: `you_think_in_fractions`. |
| **Phase 21** | `11,700px – 11,800px` | 100px | Breathing pause with cursor blinking. |
| **Phase 22** | `11,800px – 12,500px` | 700px | Clause 2 types: `_then_call_the_consequences_unexpected`. |
| **Phase 23** | `12,500px – 12,700px` | 200px | Centered stillness hold on full prompt. |
| **Phase 24** | `12,700px – 13,200px` | 500px | Prompt translates vertically upward (zero horizontal displacement) till it butts with the top of the canvas at 50px from top (`y: -(H/2 - 50)`), holding there throughout Scene 4. |
| **Phase 25** | `13,200px – 14,600px` | 1,400px | **Centered Video Scrub ($6.04\text{s}$)**:<br>• Fades in `13,200px – 13,350px` (150px).<br>• Video plays 0.0s to 6.04s scrubbed linearly.<br>• Fades out `14,450px – 14,600px` (150px). |
| **Phase 26** | `14,600px – 14,650px` | 50px | **Transition Gap**: Clean 50px pause after video fade-out before grid assembly. |
| **Phase 27** | `14,650px – 16,100px` | 1,450px | **10-Circle Grid Assembly & Heading**:<br>• 10 circles fade in randomly (130px stagger, 180px dur).<br>• Position 1 has Wood (`[0,0]`), Position 2 has Activists (`[0,1]`), Position 5 has Orangutan (`[0,4]`), Position 8 has Plane (`[1,2]`).<br>• Position 9 has Woman in Sea of Bottles (`[1,3]`), appearing 6th in sequence (mid-way) at `15,300px`.<br>• Heading words "Nature thinks in wholes." fade up (`14,800px – 16,000px`, 300px per word). |
| **Phase 28** | `16,100px – 16,900px` | 800px | **Subheading reveal**:<br>• Line 1 (`16,100px – 16,500px`), Line 2 (`16,500px – 16,900px`). |
| **Phase 29** | `16,900px – 18,000px` | 1,100px | **Final Scene 4 Reading Hold**: 1,100px complete stillness hold on full 10-circle grid, heading, and subheading. |
| **Phase 30** | `18,000px – 18,600px` | 600px | **Zero-Gravity Float-Away Exit & Prompt Un-type**:<br>• `18,000px – 18,600px`: `#scene4-prompt` stationed at top of screen un-types right-to-left and clears cursor/prefix, disappearing completely before Scene 5.<br>• Subheading (`y: -40`), Heading (`y: -60`), Grid (`y: -80`). |
| **Phase 31** | `18,600px – 18,900px` | 300px | **Black Void Runway**: 300px pitch-black contemplation space before Scene 5. |

---

## Scene 5: "you_say_no_instead_of_yes_"
**Pixel Range**: `18,600px – 25,150px` (Total Span: `6,550px`)  
**Elements**: `#scene5-prompt`, `#scene5-grid` (6 circles), `#scene5-heading`, `#scene5-subheading-line1`, `#scene5-subheading-line2-part1`, `#scene5-subheading-line2-part2`

| Phase | Pixel Range | Duration | Action / Animation Details |
| :--- | :---: | :---: | :--- |
| **Phase 33** | `18,900px – 19,300px` | 400px | `#scene5-prompt` activates in place at vertical center, flush left (`opacity: 0 -> 1`, blinking cursor at `>: _`). |
| **Phase 34** | `19,300px – 20,000px` | 700px | Prompt types: `you_say_no_instead_of_yes`. |
| **Phase 35** | `20,000px – 20,500px` | 500px | Centered breathing hold on prompt with cursor blinking. |
| **Phase 36** | `20,500px – 21,000px` | 500px | Prompt translates vertically upward (zero horizontal displacement) till it butts with the top of the canvas at 50px from top (`y: -(H/2 - 50)`), holding there throughout Scene 5. |
| **Phase 37** | `21,000px – 22,400px` | 1,400px | **Orbital Gravitational Convergence**:<br>6 circles converge from asymmetric off-center vector origins into 3x2 grid:<br>• `21,000px`: Slot [1,1] from `x: -240, y: -180`<br>• `21,100px`: Slot [0,0] from `x: -190, y: 210`<br>• `21,220px`: Slot [2,1] from `x: 230, y: -240`<br>• `21,320px`: Slot [1,0] from `x: 260, y: 150`<br>• `21,420px`: Slot [0,1] from `x: -270, y: -50`<br>• `21,520px`: Slot [2,0] from `x: 70, y: -260` |
| **Phase 38** | `22,400px – 22,900px` | 500px | Heading words "Doing less bad is bad." fade up sequentially (100px each). |
| **Phase 39** | `22,900px – 24,000px` | 1,100px | **Subheading reveal**:<br>• Line 1 (`22,900px – 23,200px`)<br>• 100px pause (`23,200px – 23,300px`)<br>• Line 2 Part 1 (`23,300px – 23,600px`)<br>• 100px pause after question mark (`23,600px – 23,700px`)<br>• Line 2 Part 2: "What if you said yes?" (`23,700px – 24,000px`). |
| **Phase 40** | `24,000px – 24,600px` | 600px | **Scene 5 Reading Hold**: 600px complete stillness hold on 3x2 grid and full text. |
| **Phase 41** | `24,600px – 25,150px` | 550px | **Zero-Gravity Staggered Exit & Prompt Un-type**:<br>• `24,600px – 25,100px`: `#scene5-prompt` stationed at top of screen un-types right-to-left and clears cursor/prefix, disappearing completely before Scene 6.<br>• 3x2 Grid (`24,700px – 24,950px`)<br>• Heading (`24,800px – 25,050px`)<br>• Subheading (`24,900px – 25,150px`). |

---

## Scene 6: "our_future_without_food_illustratively_explained_by_ai_"
**Pixel Range**: `25,100px – 35,950px` (Total Span: `10,850px`)  
**Elements**: `#scene6-prompt`, `#scene6-video-portal` (`#scene6-video`), `#scene6-grid` (15 circles), `#scene6-heading`, `#scene6-subheading-line1`, `#scene6-subheading-line2`, `#scene6-purchase-btn`

| Phase | Pixel Range | Duration | Action / Animation Details |
| :--- | :---: | :---: | :--- |
| **Phase 42** | `25,100px – 25,500px` | 400px | `#scene6-prompt` activates in place at vertical center, flush left (`opacity: 0 -> 1`, blinking cursor at `>: _`). |
| **Phase 43** | `25,500px – 26,500px` | 1,000px | Prompt types: `our_future_without_food_illustratively_explained_by_ai`. |
| **Phase 44** | `26,500px – 27,000px` | 500px | Centered breathing hold on prompt with cursor blinking. |
| **Phase 45** | `27,000px – 27,500px` | 500px | Prompt translates vertically upward (zero horizontal displacement) till it butts with the top of the canvas at 50px from top (`y: -(H/2 - 50)`), holding there throughout Scene 6. |
| **Phase 46** | `27,500px – 28,900px` | 1,400px | **Centered Video Scrub ($6.0\text{s}$)** (`S6-03-fires.mp4`):<br>• `27,500px – 27,650px`: Video portal fades in (`opacity: 0 -> 1`) inside 512px circular aperture.<br>• `27,500px – 28,900px`: Video plays linearly 0.0s to 6.0s.<br>• `28,750px – 28,900px`: Video portal fades out (`opacity: 1 -> 0`). |
| **Phase 47** | `28,900px – 28,950px` | 50px | **Transition Gap**: Clean 50px darkness hold before grid assembly begins. |
| **Phase 48** | `28,950px – 30,450px` | 1,500px | **Assembly of All 15 Museum Circles**: All 15 circles fly in with rotation and scale into 5x3 constellation (`power2.out`).<br>• Burning forest circle (`#scene6-circle-0-2`, Row 0 Col 2) flies in 8th (**mid-sequence**) at `29,700px`. |
| **Phase 49** | `30,450px – 31,250px` | 800px | Heading words reveal: *"Molotov Alva and the Museum of Extraction."* fade up (100px each). |
| **Phase 50** | `31,250px – 32,050px` | 800px | **Subheading reveal**:<br>• Line 1: "As witnessed by Douglas Gayeton." (`31,250px – 31,550px`)<br>• 100px pause (`31,550px – 31,650px`)<br>• Line 2: "272 pages. Signed and numbered edition of 500." (`31,650px – 31,950px`). |
| **Phase 51** | `32,050px – 32,350px` | 300px | **Purchase Button Entrance**: `#scene6-purchase-btn` fades up (`y: 10 -> 0`, `opacity: 0 -> 1`, pointer-events unlocked). |
| **Phase 52** | `32,350px – 35,300px` | 2,950px | **Reading & Interactive Hold**: 2,950px stillness on museum grid, typography, and active CTA button. |
| **Phase 53** | `35,300px – 35,950px` | 650px | **Zero-Gravity Staggered Exit & Prompt Un-type** (`y: -200`, `opacity: 0`):<br>• `35,300px – 35,900px`: `#scene6-prompt` stationed at top of screen un-types right-to-left and clears cursor/prefix, disappearing completely before Scene 7.<br>• 15-circle Grid (`35,400px – 35,650px`)<br>• Heading (`35,500px – 35,750px`)<br>• Subheading (`35,600px – 35,850px`)<br>• Purchase CTA (`35,700px – 35,950px`). |

---

## Scene 7: "narrated_by_an_otherwordly_intelligence_"
**Pixel Range**: `35,900px – 41,650px` (Total Span: `5,750px`)  
**Elements**: `#scene7-prompt`, `#scene7-portal`, `#scene7-purchase-btn`, `#scene7-narrative-wrapper` (`#scene7-narrative`)

| Phase | Pixel Range | Duration | Action / Animation Details |
| :--- | :---: | :---: | :--- |
| **Phase 55** | `35,900px – 36,300px` | 400px | `#scene7-prompt` activates in place at vertical center, flush left (`opacity: 0 -> 1`, blinking cursor at `>: _`). |
| **Phase 56** | `36,300px – 37,100px` | 800px | Prompt types: `narrated_by_an_otherwordly_intelligence`. |
| **Phase 57** | `37,100px – 37,300px` | 200px | Centered breathing hold on prompt with cursor blinking. |
| **Phase 58** | `37,300px – 37,800px` | 500px | **Act 1 — Prompt Translation & Portal Zoom**:<br>• Prompt translates vertically upward (zero horizontal displacement) till it butts with the top of the canvas at 50px from top (`y: -(H/2 - 50)`), holding there throughout Scene 7.<br>• 512px circular portal fades in (`37,300px – 37,500px`) and zooms `scale: 0.95 -> 1.0`. |
| **Phase 59** | `37,800px – 38,300px` | 500px | **Act 2 — Continuous Zoom Behind End Credits & Fade to 0**:<br>• Portal continues zooming `scale: 1.0 -> 1.05`, and dims opacity completely to `0` (never shrinks!).<br>• 3 paragraphs of colophon text (large film credits at `scale: 1.25`) scroll up in front (`y: 450 -> 0`, `opacity: 0 -> 1`).<br>• **Background Image Swap** (at `38,300px`, opacity 0): Molotov portrait circle (`S7-1-molotov.jpg`) is silently swapped with the book cover circle (`S9-01-book.jpg`). |
| **Phase 60** | `38,300px – 38,400px` | 100px | **Credits Center Pause**: 100px stillness hold on centered credits with portal hidden at `opacity: 0` in background. |
| **Phase 61** | `38,400px – 39,000px` | 600px | **Act 3 — Spatial Separation, Book Cover Fade In & Organic Purchase CTA** (`power2.inOut`):<br>• Text scales down (`scale: 1.25 -> 1.0`, max-width `600px`) and glides right to `x: +300`.<br>• Portal glides left to `x: -330` and fades in from `0 -> 1.0` presence showing the new book cover circle (`S9-01-book.jpg`) at full 105% scale.<br>• **Purchase CTA Entrance & Push-Up Action** (`38,750px – 39,100px`, 350px): As `#scene7-purchase-btn` under the book circle organically slides up (`y: btnFinalY + 30 -> btnFinalY`, `opacity: 0 -> 1`, `power2.out`), it gently pushes the book circle up (`y: 0 -> portalFinalY`), ensuring that the resulting (Book Circle + Button) cluster ends up perfectly vertically centered with the narrative text block on the right (pointer events enabled at `39,000px`). |
| **Phase 62** | `39,000px – 39,200px` | 200px | End-state stillness pause on balanced side-by-side layout (Book Cover circle + Purchase CTA vertically centered with narrative text on right). |
| **Phase 63** | `39,200px – 41,000px` | 1,800px | **Final Reflection Hold**: 1,800px deep reading hold with interactive purchase CTA button. |
| **Phase 64** | `41,000px – 41,650px` | 650px | **Zero-Gravity Staggered Exit & Prompt Un-type** (`opacity: 0`, `power1.in`):<br>• `41,000px – 41,600px`: `#scene7-prompt` stationed at top of screen un-types right-to-left and clears cursor/prefix, disappearing completely before Scene 8.<br>• Narrative text floats upwards (`41,100px – 41,550px`, `y: textEndY - 200`).<br>• **Circular book portal floats upwards first** (`41,150px – 41,600px`, `y: portalFinalY - 220`).<br>• **Purchase button floats upwards a hair later** (`41,280px – 41,700px`, `y: btnFinalY - 220`, pointer events disabled at `41,280px`), maintaining separation throughout ascension so they never overlap. |

---

## Scene 8: "reviewed_by_machines_"
**Pixel Range**: `41,600px – 49,150px` (Total Span: `7,550px`)  
**Elements**: `#scene8-prompt`, `#scene8-card-1` to `#scene8-card-4`

| Phase | Pixel Range | Duration | Action / Animation Details |
| :--- | :---: | :---: | :--- |
| **Phase 65** | `41,600px – 42,000px` | 400px | `#scene8-prompt` activates in place at vertical center, flush left (`opacity: 0 -> 1`, blinking cursor at `>: _`). |
| **Phase 66** | `42,000px – 42,800px` | 800px | Prompt types: `reviewed_by_machines`. |
| **Phase 67** | `42,800px – 43,000px` | 200px | Centered breathing hold on prompt with cursor blinking. |
| **Phase 68** | `43,000px – 43,500px` | 500px | Prompt translates vertically upward (zero horizontal displacement) till it butts with the top of the canvas at 50px from top (`y: -(H/2 - 50)`), holding there throughout Scene 8. |
| **Phase 69** | `43,500px – 45,200px` | 1,700px | **Staggered Lateral Reviews Entrance at 100% Scale** (`power2.out`):<br>• Cards remain locked at 100% end-state scale throughout.<br>• **Quote 1 (Top-Left)**: `43,500px – 44,300px` (800px) glides in from Left (`x: -slideDist -> 0`, `opacity: 0 -> 1`).<br>• **Quote 2 (Top-Right)**: `43,800px – 44,600px` (800px) glides in from Right (`x: +slideDist -> 0`, `opacity: 0 -> 1`).<br>• **Quote 3 (Bottom-Left)**: `44,100px – 44,900px` (800px) glides in from Left (`x: -slideDist -> 0`, `opacity: 0 -> 1`).<br>• **Quote 4 (Bottom-Right)**: `44,400px – 45,200px` (800px) glides in from Right (`x: +slideDist -> 0`, `opacity: 0 -> 1`). |
| **Phase 70** | `45,200px – 48,500px` | 3,300px | **End-State Stillness & Reflection Hold**: Full 2x2 grid settled in place matching `Scene8-end.png`. |
| **Phase 71** | `48,500px – 49,150px` | 650px | **Zero-Gravity Staggered Ascension Exit & Prompt Un-type** (`y: -200`, `opacity: 0`, `power1.in`):<br>• `48,500px – 49,100px`: `#scene8-prompt` stationed at top of screen un-types right-to-left and clears cursor/prefix, disappearing completely before Scene 9.<br>• Card 1 (`48,600px – 49,050px`)<br>• Card 2 (`48,650px – 49,100px`)<br>• Card 3 (`48,700px – 49,150px`)<br>• Card 4 (`48,750px – 49,200px`). |

---

## Scene 9: "instructions_for_toppling_goliath_provided_" (Grand Climax & Finale)
**Pixel Range**: `49,100px – 58,500px` (Total Span: `9,400px`)  
**Elements**: `#scene9-prompt`, `#scene9-book-wrapper`, `#scene9-content-wrapper` (Headings & Subtitles), `#scene9-purchase-btn`, `#scene9-footer-wrapper` (Email form & links), `#scene9-transmission`

| Phase | Pixel Range | Duration | Action / Animation Details |
| :--- | :---: | :---: | :--- |
| **Phase 75** | `49,100px – 49,500px` | 400px | `#scene9-prompt` activates in place at vertical center, flush left (`opacity: 0 -> 1`, blinking cursor at `>: _`). |
| **Phase 76** | `49,500px – 50,500px` | 1,000px | Prompt types: `instructions_for_toppling_goliath_provided`. |
| **Phase 77** | `50,500px – 50,700px` | 200px | Centered breathing hold on prompt with cursor blinking. |
| **Phase 78** | `50,700px – 51,200px` | 500px | Prompt translates vertically upward (zero horizontal displacement) till it butts with the top of the canvas at 50px from top (`y: -(H/2 - 50)`), holding there throughout Scene 9. |
| **Phase 79** | `51,200px – 51,700px` | 500px | **600px Book Circle Entrance**: Native 600px circle in dead center scales up from `0` to `1.0` (`power2.out`: fast when small, decelerates smoothly at 600px). |
| **Phase 80** | `51,700px – 52,500px` | 800px | **Upward Balancing & Under-Book Heading**:<br>• Book circle pushes up to `y: -160` (`power1.out`).<br>• Text container activates at `y: 335` (strictly under circle, block centered with circle diameter, lines flush left-aligned).<br>• Heading Line 1 ("First Edition,"): `51,700px – 52,100px` (`y: 25 -> 0`, `opacity: 0 -> 1`).<br>• Heading Line 2 ("signed and numbered."): `52,100px – 52,500px` (`y: 25 -> 0`, `opacity: 0 -> 1`). |
| **Phase 81** | `52,500px – 53,700px` | 1,200px | **Batched Subtitle Reveal** (200px each):<br>• `52,500px – 52,700px`: Batch 1 — `272 pages,`<br>• `52,700px – 52,900px`: Batch 2 — `full color,`<br>• `52,900px – 53,100px`: Batch 3 — `twelve by nine inches.`<br>• `53,100px – 53,300px`: Batch 4 — `Five hundred copies,`<br>• `53,300px – 53,500px`: Batch 5 — `each numbered by hand.`<br>• `53,500px – 53,700px`: Batch 6 — `Rumplefarm Press, 2026.` (Line 2). |
| **Phase 82** | `53,700px – 54,500px` | 800px | **Ease-In-Ease-Out Reconfiguration** (`power2.inOut`):<br>• Book circle scales down to 320px (`scale: 0.5333`) and glides left to `x: -300, y: -20`.<br>• Heading and subtitle group glides right to `x: 230, y: -20` (remaining flush left-aligned), matching `Scene9-end.png`. |
| **Phase 83** | `54,500px – 55,100px` | 600px | **Purchase Button Entrance & Pause**:<br>• `54,500px – 54,900px`: `Purchase_` button fades up (`y: 20 -> 0`, green outline/glow, pointer events enabled).<br>• `54,900px – 55,100px`: 200px stillness hold. |
| **Phase 84** | `55,100px – 55,700px` | 600px | **Elevated Footer Reveal & Prompt Un-type**:<br>• `55,100px – 55,700px`: `#scene9-prompt` stationed at top of screen un-types right-to-left and clears cursor/prefix, disappearing before transmission.<br>• Entire footer cluster (email capture with terminal `you@example.com` + green `notify_me_` button with cursor + 3 footer links) fades in elevated 150px higher (`-translate-y-[150px]`). |
| **Phase 85** | `55,700px – 56,500px` | 800px | **End of Transmission Typing**:<br>• Types `>: end_of_transmission` in lowercase grey font (`55,800px – 56,500px`). Cursor continues blinking infinitely. |
| **Phase 86** | `56,500px – 58,500px` | 2,000px | **Master Climax Reflection Hold**: 2,000px complete stillness hold on the interactive finale. User can freely click Purchase, submit email, or visit footer links. |

---

## Technical Maintenance Rules
1. **Never Change Coordinates Blindly**: Always check this script's preceding and succeeding pixel offsets before modifying a phase.
2. **Reading Holds are Sacred**: The stillness holds (e.g. 500px after a scene completes, 1,800px on Scene 7 colophon, 1,900px on Scene 8 reviews, 2,000px on Scene 9 finale) provide essential breathing room for the viewer.
3. **Updating this File**: Whenever a scroll duration, coordinate, or sequence is adjusted in `src/main.js`, update this file immediately to keep the script 100% in sync with the codebase.
