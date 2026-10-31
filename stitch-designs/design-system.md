---
name: Classroom Smartboard 1st Grade
colors:
  surface: '#fdf9ee'
  surface-dim: '#dddacf'
  surface-bright: '#fdf9ee'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3e8'
  surface-container: '#f1eee3'
  surface-container-high: '#ece8dd'
  surface-container-highest: '#e6e2d8'
  on-surface: '#1c1c15'
  on-surface-variant: '#404753'
  inverse-surface: '#31312a'
  inverse-on-surface: '#f4f1e6'
  outline: '#707784'
  outline-variant: '#c0c7d5'
  surface-tint: '#0060ab'
  primary: '#005da7'
  on-primary: '#ffffff'
  primary-container: '#0076d1'
  on-primary-container: '#fdfcff'
  inverse-primary: '#a3c9ff'
  secondary: '#b22200'
  on-secondary: '#ffffff'
  secondary-container: '#d73b19'
  on-secondary-container: '#fffbff'
  tertiary: '#006b17'
  on-tertiary: '#ffffff'
  tertiary-container: '#008820'
  on-tertiary-container: '#f7fff1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d3e3ff'
  primary-fixed-dim: '#a3c9ff'
  on-primary-fixed: '#001c39'
  on-primary-fixed-variant: '#004883'
  secondary-fixed: '#ffdad3'
  secondary-fixed-dim: '#ffb4a4'
  on-secondary-fixed: '#3d0600'
  on-secondary-fixed-variant: '#8c1800'
  tertiary-fixed: '#78fe77'
  tertiary-fixed-dim: '#5ae15e'
  on-tertiary-fixed: '#002203'
  on-tertiary-fixed-variant: '#005310'
  background: '#fdf9ee'
  on-background: '#1c1c15'
  surface-variant: '#e6e2d8'
typography:
  display-xl:
    fontFamily: Quicksand
    fontSize: 72px
    fontWeight: '800'
    lineHeight: 84px
    letterSpacing: -0.01em
  display-lg:
    fontFamily: Quicksand
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 68px
    letterSpacing: 0em
  headline-xl:
    fontFamily: Quicksand
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 54px
    letterSpacing: 0em
  headline-lg:
    fontFamily: Quicksand
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 46px
    letterSpacing: 0.01em
  headline-md:
    fontFamily: Quicksand
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: 0.01em
  body-xl:
    fontFamily: Nunito Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Nunito Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Nunito Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: 0.02em
  label-lg:
    fontFamily: Quicksand
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Quicksand
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: 0.03em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 2rem
  gutter-sm: 1.25rem
  margin: 3rem
  margin-sm: 1.5rem
  space-xs: 0.5rem
  space-sm: 1rem
  space-md: 1.5rem
  space-lg: 2.25rem
  space-xl: 3.5rem
---

## Brand & Style

This design system is engineered specifically for early elementary learners (ages 6–7) interacting directly with large-format front-of-classroom interactive displays (16:9 smartboards, touch panels, and projection boards) as well as distant viewing from the back of a classroom.

### Core Character & Atmosphere
- **Tactile & Inviting:** Elements mimic playful physical building blocks, plush sticker badges, and chunky mechanical buttons that beg to be pressed.
- **Warm & Joyful:** Moves away from sterile white educational tech toward an energetic, comforting, sunny learning environment.
- **Cognitively Clear:** Visual noise is minimized; interactions rely on explicit affordances, bold color-coding, and immediate positive feedback.

### Visual Style Movement
The design language is **Tactile Neobrutalist-Playful**: hyper-legible geometry, generous touch surfaces, pillowy depth via saturated directional drop-shadows, and high-contrast outlines that maintain razor-sharp legibility from 25 feet away under fluorescent classroom lighting.

## Colors

The palette balances energetic saturation with soothing baseline surfaces to prevent sensory overload over multi-hour classroom use.

### Canvas & Surfaces
- **Canvas Base (`#FFFBF0`):** Warm milk/cream tone. Avoids optical glare and blue-light strain typical of pure `#FFFFFF` smartboard projections.
- **Surface Elevation (`#FFFFFF`):** Crisp pure white applied to interactive card containers and input surfaces to pop against the cream canvas.
- **Dark Neutral (`#1E2238`):** Deep blueberry navy for text, borders, and hard shadows. Avoids pure black (`#000000`) for a friendlier, softer optical profile while maintaining WCAG AAA contrast compliance.

### Functional Brand Primaries
- **Sky Blue (`#0D87EC`):** Primary action color, system chrome, navigation, and instructions.
- **Apple Red (`#FF3838`):** Urgent alerts, resets, and high-energy interactive hubs.
- **Playful Orange (`#FF8A00`):** Secondary prompts, streak counters, and reward callouts.
- **Fresh Leaf Green (`#2BB83B`):** Affirmation, correctness, success counters, and submit targets.
- **Sunny Yellow (`#FFD214`):** Stars, focus rings, highlights, and trophy rewards. Always paired with `#1E2238` text.

## Typography

Typography prioritizes open letterforms, clear ascenders/descenders, and generous tracking suitable for early decoders and emerging readers.

### Font Pairings
- **Headlines & Display:** **Quicksand** brings natural geometric warmth with rounded terminal endings, preventing visual harshness while providing bouncy authority.
- **Body & Paragraphs:** **Nunito Sans** provides structured proportions, balanced x-heights, and distinct character shapes (notably single-story 'a' and distinguishable 'l'/'1'/'I' glyphs) critical for literacy development.

### Display Scaling Guidelines
- Minimum text size displayed anywhere on the primary UI is `18px`, reserved strictly for metadata or teacher utilities.
- Core reading prompts and student-facing activity text must never fall below `24px` (`body-lg`) to guarantee legibility from the back row (approx. 20–30 feet).

## Layout & Spacing

### 16:9 Canvas Structure
The default layout targets a 1920x1080 fixed-aspect smartboard canvas. Spacing values accommodate coarse motor skills and fingertip/fist touch accuracy.

- **Grid:** 12-column layout with 32px (`gutter`) separation.
- **Display Margins:** A mandatory 48px (`margin`) outer border prevents controls from sitting too close to the physical bezel where optical sensors may fail or young students cannot comfortably reach.
- **Ergonomic Reach Zones:** Interactive task components are anchored within the lower 65% of the vertical display area so 6-year-old students can reach them without stools. Teacher navigation controls and high-level prompts sit in the top 35%.
- **Touch Target Dimensions:** All primary buttons and interactive drag-and-drop targets enforce an absolute minimum footprint of 72x72px (ideally 88px+ height), well beyond standard mobile touch guidelines.

## Elevation & Depth

This system intentionally rejects blurry glassmorphism and subtle diffuse drop shadows in favor of **Crisp 3D Offset Blocks** with high-contrast structural borders.

### The "Chunky Toy" Depth Principle
- **Outlines:** All interactive cards, buttons, badges, and counters possess a solid `3px` or `4px` border set to `#1E2238`.
- **Directional Grounding:** Elements achieve depth via hard, non-blurred offset shadows shifted directly downward (`0px 6px 0px #1E2238` or `0px 8px 0px rgba(30, 34, 56, 0.25)` on surfaces).
- **Physical "Pressed" States:** When tapped, active interactive components displace downwards by `4px` or `6px`, while reducing the offset shadow to `0px 2px 0px`. This mechanical feedback confirms touches immediately without requiring auditory reinforcement.
- **Layer Stacking:** Floating modulatory dialogues and reward celebrations utilize an additional ambient ring glow (e.g., `#FFD214` at `0px 0px 0px 8px`) to detach from background educational material.

## Shapes

The design uses ultra-soft contours to establish a friendly, harmless, and touch-encouraging vocabulary.

### Corner Radii Guidelines
- **Level 3 (Pill-shaped):** Interactive action triggers, input tags, pill-shaped counters, and status badges utilize complete pill radii (`9999px` / `rounded-full`).
- **Cards & Modals:** Large surface containers use `rounded-xl` (`2.5rem` / `40px`) to soften screen boundaries and eliminate sharp edges.
- **Activity Chips & Tiles:** Letter/word blocks and multiple-choice cards use `1.5rem` (`24px`) radii, providing clear graspable silhouettes for drag-and-drop mechanics.

## Components

### Buttons
- **Primary Pill:** Minimum height of `80px`. Bold color fill (Sky Blue or Leaf Green), `4px` border (`#1E2238`), and a matching solid `6px` bottom offset shadow. Centered `Quicksand Bold` typography accompanied by an oversized icon (minimum 36px).
- **Active State:** Displaces `+4px` on the Y-axis; bottom offset shadow shrinks from `6px` to `2px`.
- **Secondary / Utility Button:** Warm cream background with thick outline and deep navy text.

### Multiple-Choice / Answer Cards
- **Dimensions:** Min-height `120px` to allow large imagery and readable phrases.
- **States:**
  - *Default:* Solid white surface, `3px` dark border, `6px` offset.
  - *Selected:* Sunny Yellow background (`#FFD214`), `4px` dark border, `8px` offset.
  - *Correct:* Fresh Leaf Green fill (`#2BB83B`) with white text and a celebratory star burst animation.
  - *Try Again:* Gentle horizontal wiggle, soft orange outline, returning smoothly to resting state.

### Chips & Badges
- Pill-shaped badges (`rounded-full`) with a `3px` outline.
- Used for team tags, category cues (e.g., "Math", "Phonics"), and star counts.
- Padding: `12px 24px` with min-height of `48px`.

### Inputs & Number Steppers
- Digital text entry is minimized in favor of big mechanical steppers, slider knobs, and token-dropper fields.
- Where input fields exist, they feature a pure white backdrop, an inset `4px` pill border, and `32px` typed glyphs.

### Star Rewards & Progress Bars
- **Progress Track:** Chunky horizontal pill (height `36px`) filled with `#E6E0D0` featuring an inset shadow.
- **Progress Fill:** Vibrant Apple Red or Leaf Green segmented bar with a glossy specular highlight line across the top edge.
- **Reward Particles:** Exploding multi-colored star bursts and bouncing coin badges using bouncy elastic physics (`spring(damping: 12, stiffness: 180)`).