---
version: alpha
name: Onthi
description: |
  ÔnThi's design system embodies a playful, educational, and energetic aesthetic
  specifically crafted for young learners (grades 1–5). The visual language
  combines vibrant, optimistic colours with generous whitespace and soft,
  rounded corners to create an inviting, non-threatening learning environment.
  Typography is bold and confident, with heavy weights on headings to draw
  attention and guide focus. The system leverages bright accent
  colours—particularly lime green and purple—to reinforce game-like engagement
  and progress feedback. Depth is created through subtle, barely-visible shadows
  and colour-blocking rather than dramatic layering, keeping the interface clean
  and accessible. The overall impression is modern, friendly, and deliberately
  designed to make learning feel like play.
source:
  url: "https://onthi.app/"
  pagesAnalyzed: 6
  extractedAt: 2026-10-31
  tokensMeasured: true
colors:
  primary: "#6366F1"
  link: "#6D28D9"
  canvas: "#F7F7FD"
  ink: "#1E293B"
  body: "#64748B"
  muted: "#94A3B8"
  faint: "#CBD5E1"
  hairline: "#E2E8F0"
  accent-1: "#0369A1"
  accent-2: "#7C3AED"
  accent-3: "#4F46E5"
  accent-4: "#C2410C"
  accent-5: "#FDE68A"
  accent-6: "#FED7AA"
  neutral-1: "#0A0A0A"
  neutral-2: "#EDE9FE"
typography:
  display-xxl:
    fontFamily: "Be Vietnam Pro"
    fontSize: 110px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0px
  display-xl:
    fontFamily: "Be Vietnam Pro"
    fontSize: 54px
    fontWeight: 900
    lineHeight: 1
    letterSpacing: -1.35px
  heading-lg:
    fontFamily: "Be Vietnam Pro"
    fontSize: 30px
    fontWeight: 900
    lineHeight: 1.2
    letterSpacing: 0px
  heading-md:
    fontFamily: "Be Vietnam Pro"
    fontSize: 24px
    fontWeight: 900
    lineHeight: 1.33
    letterSpacing: 0px
  heading-sm:
    fontFamily: "Be Vietnam Pro"
    fontSize: 20px
    fontWeight: 900
    lineHeight: 1.4
    letterSpacing: 0px
  heading-xs:
    fontFamily: "Be Vietnam Pro"
    fontSize: 15px
    fontWeight: 900
    lineHeight: 1.33
    letterSpacing: 0px
  body-xl:
    fontFamily: "Be Vietnam Pro"
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: 0px
  body-lg:
    fontFamily: "Be Vietnam Pro"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0px
  body-lg-strong:
    fontFamily: "Be Vietnam Pro"
    fontSize: 16px
    fontWeight: 900
    lineHeight: 1.5
    letterSpacing: 0px
  body-md:
    fontFamily: "Be Vietnam Pro"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: 0px
  body-sm:
    fontFamily: "Be Vietnam Pro"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0px
  body-sm-strong:
    fontFamily: "Be Vietnam Pro"
    fontSize: 13px
    fontWeight: 700
    lineHeight: 1.38
    letterSpacing: 0px
  button-sm:
    fontFamily: "Be Vietnam Pro"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.43
    letterSpacing: 0px
  button-sm-strong:
    fontFamily: "Be Vietnam Pro"
    fontSize: 14px
    fontWeight: 900
    lineHeight: 1.43
    letterSpacing: 0.35px
  caption-md:
    fontFamily: "Be Vietnam Pro"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.33
    letterSpacing: 0px
  caption-md-strong:
    fontFamily: "Be Vietnam Pro"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: 0px
  caption-md-2:
    fontFamily: "Be Vietnam Pro"
    fontSize: 12px
    fontWeight: 900
    lineHeight: 1.33
    letterSpacing: 0px
  caption-sm:
    fontFamily: "Be Vietnam Pro"
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0px
  caption-sm-strong:
    fontFamily: "Be Vietnam Pro"
    fontSize: 11px
    fontWeight: 900
    lineHeight: 1.5
    letterSpacing: 1.1px
    textTransform: uppercase
  caption-xs:
    fontFamily: "Be Vietnam Pro"
    fontSize: 10px
    fontWeight: 900
    lineHeight: 1.5
    letterSpacing: 0px
rounded:
  none: 0px
  xs: 8px
  sm: 16px
  md: 32px
spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 20px
  xl: 24px
  xxl: 28px
  xxxl: 32px
  section: 36px
  band: 40px
shadows:
  sm: "rgb(199, 210, 254) 0px 4px 6px -1px, rgb(199, 210, 254) 0px 2px 4px -2px"
  md: "rgba(124, 58, 237, 0.08) 0px -2px 16px 0px"
  lg: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px"
  xl: "rgb(221, 214, 254) 0px 1px 2px 0px"
elevationStrategy: layered-micro
themes:
  derived: dark   # the other theme is the site's measured palette
  light:
    bg: "#F7F7FD"
    surface: "#F0F0F5"
    surfaceRaised: "#E8E8EE"
    text: "#1E293B"
    textMuted: "#64748B"
    border: "#E2E8F0"
    accent: "#6366F1"
    accentFg: "#000000"
    focusRing: "#6366F1"
    elevation: shadow
  dark:
    bg: "#0C0C13"
    surface: "#1B1B21"
    surfaceRaised: "#27272D"
    text: "#F9F9FE"
    textMuted: "#9F9FA5"
    border: "#333339"
    accent: "#7678F3"
    accentFg: "#0B0B0C"
    focusRing: "#6366F1"
    elevation: "border+surface"
  contrastFailures:
    - "light: muted on bg = 4.46:1 (needs 4.5:1)"
gradients:
  - context: section
    kind: linear
    value: "linear-gradient(to right bottom, rgb(240, 249, 255), rgb(255, 255, 255))"
  - context: section
    kind: linear
    value: "linear-gradient(to right bottom, rgb(245, 243, 255), rgb(255, 255, 255))"
  - context: section
    kind: linear
    value: "linear-gradient(rgb(255, 179, 0), rgb(245, 158, 11))"
components:
  button-filled:
    typography: "{typography.body-lg-strong}"
    textColor: "rgb(255, 255, 255)"
    height: 57px
    padding: "14px 28px 14px 28px"
    boxShadow: "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(187, 247, 208) 0px 10px 15px -3px, rgb(187, 247, 208) 0px 4px 6px -4px"
    rounded: "{rounded.sm}"
    backgroundColor: "rgb(88, 204, 2)"
  button-primary:
    typography: "{typography.button-sm-strong}"
    textColor: "rgb(255, 255, 255)"
    height: 40px
    padding: "8px 16px 8px 16px"
    boxShadow: "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(199, 210, 254) 0px 4px 6px -1px, rgb(199, 210, 254) 0px 2px 4px -2px"
    rounded: "{rounded.sm}"
    backgroundColor: "{colors.primary}"
  button-text:
    typography: "{typography.button-sm}"
    textColor: "{colors.body}"
    height: 20px
  button-outline:
    typography: "{typography.body-lg}"
    textColor: "{colors.neutral-1}"
    border: "2px solid {colors.hairline}"
    height: 66.5px
    padding: "12px 16px 12px 16px"
    rounded: "{rounded.sm}"
    backgroundColor: "rgb(255, 255, 255)"
  navigation:
    textColor: "{colors.body}"
    height: 20px
    fontSize: 14px
    fontFamily: "Be Vietnam Pro"
    fontWeight: 700
    lineHeight: 1.43
  navigation-sm:
    typography: "{typography.caption-md}"
    textColor: "{colors.body}"
    height: 16px
  footer:
    typography: "{typography.body-lg}"
    textColor: "{colors.neutral-1}"
    border: "1px solid {colors.hairline}"
    backgroundColor: "rgb(255, 255, 255)"
  link:
    typography: "{typography.body-lg}"
    textColor: "{colors.neutral-1}"
    border: "2px solid {colors.hairline}"
    rounded: 24px
    backgroundColor: "rgb(255, 255, 255)"
  link-sm:
    typography: "{typography.body-lg}"
    textColor: "{colors.neutral-1}"
    border: "2px solid rgb(186, 230, 253)"
    padding: "16px 20px 16px 20px"
    rounded: 24px
states:
  other-hover:
    target: other
    state: hover
    backgroundColor: "rgba(255, 251, 235, 0.8)"
breakpoints:
  - width: 375
    containerWidth: 343
    gridColumns: 2
    navLinksVisible: 58
    menuToggleVisible: false
    headingPx: 34
    bodyPx: 16
    sectionPaddingX: 16
  - width: 768
    containerWidth: 704
    gridColumns: 3
    navLinksVisible: 59
    menuToggleVisible: false
    headingPx: 48
    bodyPx: 16
    sectionPaddingX: 32
  - width: 1024
    containerWidth: 960
    gridColumns: 4
    navLinksVisible: 59
    menuToggleVisible: false
    headingPx: 54
    bodyPx: 16
    sectionPaddingX: 32
  - width: 1280
    containerWidth: 1088
    gridColumns: 4
    navLinksVisible: 59
    menuToggleVisible: false
    headingPx: 54
    bodyPx: 16
    sectionPaddingX: 32
  - width: 1440
    containerWidth: 1088
    gridColumns: 4
    navLinksVisible: 59
    menuToggleVisible: false
    headingPx: 54
    bodyPx: 16
    sectionPaddingX: 32
coverage:
  statesFound: 61
  gradientsFound: 3
  rolesUnassigned: 8
  archetypesUnnamed: 0
  archetypesDetected: 0
  responsiveMeasured: true
  stylesheetsBlocked: true
  semanticRampDeclared: false
---

# Design System Inspired by ÔnThi

## 1. Visual Theme & Atmosphere

ÔnThi's design system embodies a **playful, educational, and energetic** aesthetic specifically crafted for young learners (grades 1–5). The visual language combines vibrant, optimistic colours with generous whitespace and soft, rounded corners to create an inviting, non-threatening learning environment. Typography is bold and confident, with heavy weights on headings to draw attention and guide focus. The system leverages bright accent colours—particularly lime green and purple—to reinforce game-like engagement and progress feedback. Depth is created through subtle, barely-visible shadows and colour-blocking rather than dramatic layering, keeping the interface clean and accessible. The overall impression is modern, friendly, and deliberately designed to make learning feel like play.

**Key Characteristics**

- Bright, optimistic primary accent (`{colors.primary}` — `#6366F1`) establishing brand identity across CTAs and interactive elements
- Lime-green action buttons (`#58CC02`) for high-visibility, game-like feedback
- Rounded, pill-shaped buttons and cards promoting a soft, approachable feel
- Bold, heavy typography weights (900) on headings for visual hierarchy and emphasis
- Soft, barely-perceptible shadows using colour-tinted layers rather than dark drop shadows
- Clean, minimalist neutral palette (`{colors.canvas}` — `#F7F7FD`) reducing cognitive load
- Playful use of decorative accent colours (orange, cyan, purple) for visual variety and category distinction

## 2. Color Palette & Roles

### Primary

- **Brand Accent** (`{colors.primary}` — `#6366F1`): Primary call-to-action buttons, active states, brand identity markers, and key interactive elements throughout the platform.
- **Link** (`{colors.link}` — `#6D28D9`): Inline hyperlinks and navigation anchors.

### Accent Colors (Decorative)

- **Accent 1** (`{colors.accent-1}` — `#0369A1`): Decorative use; observed but no measured role.
- **Accent 2** (`{colors.accent-2}` — `#7C3AED`): Decorative use; observed but no measured role.
- **Accent 3** (`{colors.accent-3}` — `#4F46E5`): Decorative use; observed but no measured role.
- **Accent 4** (`{colors.accent-4}` — `#C2410C`): Decorative use; observed but no measured role.
- **Accent 5** (`{colors.accent-5}` — `#FDE68A`): Decorative use; observed but no measured role.
- **Accent 6** (`{colors.accent-6}` — `#FED7AA`): Decorative use; observed but no measured role.

### Neutral Scale

- **Canvas** (`{colors.canvas}` — `#F7F7FD`): Default page background and largest surface areas.
- **Ink** (`{colors.ink}` — `#1E293B`): Primary text, headings, and high-contrast foreground elements.
- **Body** (`{colors.body}` — `#64748B`): Body copy and secondary text.
- **Muted** (`{colors.muted}` — `#94A3B8`): Captions, helper text, and tertiary information.
- **Faint** (`{colors.faint}` — `#CBD5E1`): Placeholder text and very subtle detail.
- **Hairline** (`{colors.hairline}` — `#E2E8F0`): 1px borders, dividers, and thin strokes.

### Surface & Borders

- **Neutral 1** (`{colors.neutral-1}` — `#0A0A0A`): Deep black, used sparingly for maximum contrast when needed.
- **Neutral 2** (`{colors.neutral-2}` — `#EDE9FE`): Very light purple-tinted neutral, subtle background emphasis.

## 3. Typography Rules

### Font Family

**Primary Font:** Be Vietnam Pro (https://fonts.googleapis.com/)  
Fallback stack: `Be Vietnam Pro, system-ui, -apple-system, sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|---|---|---|---|---|---|---|
| Display XL | Be Vietnam Pro | 54px | 900 | 1 | -1.35px | Hero heading; extreme negative tracking for impact |
| Display XXL | Be Vietnam Pro | 110px | 400 | 1.5 | 0px | Extra-large display (rare); lighter weight |
| Heading LG | Be Vietnam Pro | 30px | 900 | 1.2 | 0px | Section headers; bold and commanding |
| Heading MD | Be Vietnam Pro | 24px | 900 | 1.33 | 0px | Subsection titles |
| Heading SM | Be Vietnam Pro | 20px | 900 | 1.4 | 0px | Card titles and module headers |
| Heading XS | Be Vietnam Pro | 15px | 900 | 1.33 | 0px | Small section labels |
| Body XL | Be Vietnam Pro | 24px | 400 | 1.33 | 0px | Large body text in callouts |
| Body LG | Be Vietnam Pro | 16px | 400 | 1.5 | 0px | Primary body copy |
| Body LG Strong | Be Vietnam Pro | 16px | 900 | 1.5 | 0.4px | Emphasized body copy |
| Body MD | Be Vietnam Pro | 14px | 400 | 1.43 | 0px | Standard body text |
| Body SM | Be Vietnam Pro | 13px | 400 | 1.5 | 0px | Secondary body copy |
| Body SM Strong | Be Vietnam Pro | 13px | 700 | 1.38 | 0px | Emphasized secondary text |
| Button SM | Be Vietnam Pro | 14px | 600 | 1.43 | 0px | Standard button text |
| Button SM Strong | Be Vietnam Pro | 14px | 900 | 1.43 | 0.35px / 0px | Heavy button labels; letter-spacing varies |
| Caption MD | Be Vietnam Pro | 12px | 400 | 1.33 | 0px | Helper text and labels |
| Caption MD Strong | Be Vietnam Pro | 12px | 600 | 1.33 | 0px | Emphasized captions |
| Caption MD 2 | Be Vietnam Pro | 12px | 900 | 1.33 | 0px | Very bold caption |
| Caption SM | Be Vietnam Pro | 11px | 400 | 1.5 | 0px | Subtle secondary labels |
| Caption SM Strong | Be Vietnam Pro | 11px | 900 | 1.5 | 1.1px | All-caps strong labels (text-transform: uppercase) |
| Caption XS | Be Vietnam Pro | 10px | 900 | 1.5 | 1px / 0px | Smallest labels; all-caps and standard variants |

### Principles

- **Heavy weights drive hierarchy:** Headings consistently use weight 900 (ultra-bold) to create strong visual separation from body text, reinforcing the game-like, energetic tone.
- **Extreme negative tracking on display sizes:** The -1.35px letter-spacing on the 54px hero heading (`{typography.display-xl}`) creates visual drama and tightness appropriate to the brand's bold personality.
- **Consistent line-height ratios:** Body text uses 1.5 for generosity; headings compress to 1–1.4 for impact.
- **Letter-spacing varies by role:** Buttons and captions employ slight positive tracking (0.35–1.1px) for clarity at smaller sizes, while body text and most headings use 0px for natural flow.
- **Be Vietnam Pro is warm and friendly:** The font's rounded letterforms and lack of serifs align with the educational, approachable mission.

## 4. Component Stylings

### Buttons

#### Filled / Primary Button
- **Background:** `rgb(99, 102, 241)` (`{colors.primary}`)
- **Text Color:** `rgb(255, 255, 255)` (white)
- **Padding:** `8px 16px`
- **Height:** `40px`
- **Font:** `{typography.button-sm-strong}` (14px, weight 900, line-height 20px)
- **Border Radius:** `{rounded.sm}` (16px)
- **Border:** `0px`
- **Box Shadow:** `rgb(199, 210, 254) 0px 4px 6px -1px, rgb(199, 210, 254) 0px 2px 4px -2px` (soft indigo tint)
- **Width:** `144.156px` (measured)

#### Filled / Action Button (Lime Green)
- **Background:** `rgb(88, 204, 2)` (bright lime green)
- **Text Color:** `rgb(255, 255, 255)` (white)
- **Padding:** `14px 28px`
- **Height:** `57px`
- **Font:** `{typography.body-lg-strong}` (16px, weight 900, line-height 24px)
- **Border Radius:** `{rounded.sm}` (16px)
- **Border:** `0px`
- **Box Shadow:** `rgb(187, 247, 208) 0px 10px 15px -3px, rgb(187, 247, 208) 0px 4px 6px -4px` (soft green shadow)
- **Width:** `232.609px` (measured)

#### Ghost / Text Button
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `rgb(100, 116, 139)` (`{colors.body}`)
- **Padding:** `0px`
- **Height:** `20px`
- **Font:** `{typography.button-sm}` (14px, weight 600, line-height 20px)
- **Border Radius:** `{rounded.none}` (0px)
- **Border:** `0px`
- **Box Shadow:** `none`

#### Outline Button
- **Background:** `rgb(255, 255, 255)` (white)
- **Text Color:** `rgb(10, 10, 10)` (`{colors.neutral-1}`)
- **Padding:** `12px 16px`
- **Height:** `66.5px`
- **Font:** `{typography.body-lg}` (16px, weight 400, line-height 24px)
- **Border Radius:** `{rounded.sm}` (16px)
- **Border:** `2px solid rgb(226, 232, 240)` (hairline)
- **Box Shadow:** `none`
- **Width:** `312px` (measured)

### Cards & Containers

#### Link Card (Default)
- **Background:** `rgb(255, 255, 255)` (white)
- **Text Color:** `rgb(10, 10, 10)` (`{colors.neutral-1}`)
- **Padding:** `0px`
- **Height:** `310px`
- **Font:** `{typography.body-lg}` (16px, weight 400, line-height 24px)
- **Border Radius:** `24px`
- **Border:** `2px solid rgb(226, 232, 240)` (hairline)
- **Box Shadow:** `none`
- **Width:** `260px` (measured)

#### Link Card (Small / Alternate)
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `rgb(10, 10, 10)` (`{colors.neutral-1}`)
- **Padding:** `16px 20px`
- **Height:** `103px`
- **Font:** `{typography.body-lg}` (16px, weight 400, line-height 24px)
- **Border Radius:** `24px`
- **Border:** `2px solid rgb(186, 230, 253)` (light cyan)
- **Box Shadow:** `none`
- **Width:** `1088px` (measured; full-width on larger screens)

### Navigation

#### Navigation Default
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `rgb(100, 116, 139)` (`{colors.body}`)
- **Padding:** `0px`
- **Height:** `20px`
- **Font:** `{typography.body-md}` (14px, weight 700, line-height 20px)
- **Border Radius:** `{rounded.none}` (0px)
- **Border:** `0px`
- **Box Shadow:** `none`
- **Width:** `520px` (measured)

#### Navigation Small
- **Background:** `rgba(0, 0, 0, 0)` (transparent)
- **Text Color:** `rgb(100, 116, 139)` (`{colors.body}`)
- **Padding:** `0px`
- **Height:** `16px`
- **Font:** `{typography.caption-md}` (12px, weight 400, line-height 16px)
- **Border Radius:** `{rounded.none}` (0px)
- **Border:** `0px`
- **Box Shadow:** `none`
- **Width:** `960px` (measured)

### Footer

#### Footer Default
- **Background:** `rgb(255, 255, 255)` (white)
- **Text Color:** `rgb(10, 10, 10)` (`{colors.neutral-1}`)
- **Padding:** `0px`
- **Height:** `721.5px`
- **Font:** `{typography.body-lg}` (16px, weight 400, line-height 24px)
- **Border Radius:** `{rounded.none}` (0px)
- **Border:** `1px solid rgb(226, 232, 240)` (hairline)
- **Box Shadow:** `none`
- **Width:** `1440px` (measured; full viewport)

## 5. Layout Principles

### Spacing System

**Base Unit:** `{spacing.xxs}` = 4px

**Scale (all increments):**
- `{spacing.xxs}` = 4px — micro-adjustments between inline elements
- `{spacing.xs}` = 8px — tight button padding, small gaps
- `{spacing.sm}` = 12px — form field spacing, card internals
- `{spacing.md}` = 16px — standard padding around content, section dividers
- `{spacing.lg}` = 20px — generous padding, list spacing
- `{spacing.xl}` = 24px — large section gaps
- `{spacing.xxl}` = 28px — extra-large gaps between major blocks
- `{spacing.xxxl}` = 32px — prominent section spacing
- `{spacing.section}` = 36px — named section padding
- `{spacing.band}` = 40px — large page bands and hero sections

### Grid & Container

- **Maximum Content Width:** `1088px` (measured on largest viewports; 1280px+ screens still constrain to this)
- **Column Strategy:** Flexible column count per viewport (2–4 columns depending on screen width), with cards and modules wrapping naturally
- **Section Padding (horizontal):** `{spacing.md}` (16px) on mobile; `{spacing.xxxl}` (32px) on desktop

### Whitespace Philosophy

The system prioritizes **generous, intentional whitespace** to reduce visual noise and create distinct content zones. Sections are separated by air rather than hard lines. Cards and modules have padding of at least `{spacing.md}` (16px) internally. The pale neutral background (`{colors.canvas}` — `#F7F7FD`) amplifies the effect of whitespace, making the interface feel spacious and calming. Stacking uses consistent increments; no arbitrary spacing values exist.

### Border Radius Scale

- **`{rounded.none}`** = 0px — sharp, minimal-style components (footers, full-bleed sections)
- **`{rounded.xs}`** = 8px — tight radius for images and minor elements
- **`{rounded.sm}`** = 16px — buttons, primary interactive components
- **`{rounded.md}`** = 32px — large cards and prominent containers

Observed component usage:
- Buttons: `{rounded.sm}` (16px)
- Images: `{rounded.xs}` (8px)
- Large cards: `{rounded.md}` (32px)
- Footers/full-width sections: `{rounded.none}` (0px)

### Border Widths

- **Hairline (1px):** Used for subtle borders on cards, dividers, and structural lines (e.g., footer top border in `rgb(226, 232, 240)`)
- **Medium (2px):** Applied to outline buttons and bordered link cards for clear visual emphasis

## 6. Depth & Elevation

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow; colour-blocking only | Body text, plain backgrounds, most surface elements |
| Micro (sm) | `rgb(199, 210, 254) 0px 4px 6px -1px, rgb(199, 210, 254) 0px 2px 4px -2px` | Primary buttons; indigo-tinted, barely-perceptible lift |
| Micro (lg) | `rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px` | Custom elements; neutral subtle shadow |
| Micro (xl) | `rgb(221, 214, 254) 0px 1px 2px 0px` | Custom layering; ultra-thin purple-tinted lift |
| Navigation (md) | `rgba(124, 58, 237, 0.08) 0px -2px 16px 0px` | Navigation bar; top-blurred purple tint for floating effect |
| Action Button | `rgb(187, 247, 208) 0px 10px 15px -3px, rgb(187, 247, 208) 0px 4px 6px -4px` | Lime-green buttons; soft green shadow emphasizing action importance |

**Shadow Philosophy:**  
Depth is created through **colour-tinted shadows** rather than dark drop shadows. Each shadow layer is barely visible (0.08–0.1 opacity on blacks, or very light semantic colours) and uses layered, multi-step definitions. This creates an illusion of floating without harshness. Primary CTA buttons use indigo-tinted shadows matching the brand; action buttons use green shadows matching their fill. The navigation bar floats with a purple-blurred shadow from above, reinforcing its sticky presence.

### Opacity Levels

- **16%** (`0.16`) — Very subtle background emphasis, overlays
- **35%** (`0.35`) — Moderate overlay or disabled states
- **45%** (`0.45`) — Medium-emphasis hover states, semi-transparent surfaces
- **50%** (`0.50`) — Standard semi-transparency for overlays
- **60%** (`0.60`) — Strong semi-transparency, disabled or secondary elements
- **70%** (`0.70`) — High opacity; used for important overlays

### Z-index / Layering

- **Dropdown / Popover:** `40` — Above standard content, below modals
- **Sticky Navigation / Floating Elements:** `50` — Above dropdowns; always-visible bar

## 7. Do's and Don'ts

### Do

- **Use `{colors.primary}` (`#6366F1`) for all primary CTAs** — Sign-up, main action buttons, and key interactive elements must be the indigo brand colour to maintain visual consistency.
- **Apply `{typography.heading-*}` weights at 900 (ultra-bold)** — Every heading must use the heaviest weight to drive the energetic, playful tone appropriate for young learners.
- **Leverage soft, rounded corners** — Apply `{rounded.sm}` (16px) to all interactive buttons and `{rounded.md}` (32px) to large containers for a friendly, approachable feel.
- **Build shadows with colour tints, not black** — Use the indigo, green, and purple shadow values provided; never default to dark drop shadows.
- **Maintain consistent horizontal padding** — Use `{spacing.md}` (16px) on mobile and `{spacing.xxxl}` (32px) on desktop; never add arbitrary padding values.
- **Use the neutral text ramp (`{colors.ink}`, `{colors.body}`, `{colors.muted}`, `{colors.faint}`) hierarchically** — Reserve `{colors.ink}` for headings, `{colors.body}` for body copy, `{colors.muted}` for secondary info, and `{colors.faint}` for hints.
- **Group related sections with `{spacing.band}` (40px) gaps** — Large visual breaks between content zones.
- **Test interactions on small viewports (375px)** — The mobile layout compresses significantly and must remain readable and tappable.

### Don't

- **Do not use decorative accent colours (`{colors.accent-1}` through `{colors.accent-6}`) as primary interactive fills** — These are reserved for visual variety and category distinction, not core CTAs.
- **Do not apply light weights (400, 600) to headings** — The brand's personality demands ultra-bold (900) for all heading text.
- **Do not create sharp (0px border-radius) buttons or cards** — All interactive elements and content containers must use rounded corners as measured (`{rounded.sm}` or `{rounded.md}`).
- **Do not invent new shadow treatments** — Only use the provided shadow values (indigo-tinted for buttons, green for actions, purple for navigation).
- **Do not exceed 1088px max-content width** — Even on 1440px+ screens, content remains constrained for readability and focus.
- **Do not use the full `{colors.neutral-1}` (`#0A0A0A`) black on body text** — Reserve it for maximum contrast only; prefer `{colors.ink}` for primary text.
- **Do not skip the generous whitespace model** — Padding and margins are not negotiable; they are core to the calm, non-overwhelming aesthetic.
- **Do not mix font families** — Be Vietnam Pro is the sole typeface; no serif or monospace fonts should appear in body or headings outside of code blocks.

## 8. Responsive Behavior

### Breakpoints

| Viewport | Max Width | Grid Columns | Heading Size | Body Size | Padding-X | Key Changes |
|---|---|---|---|---|---|---|
| 375px (mobile) | 343px | 2 | 34px | 16px | 16px | Tight layout; content column 343px; single nav row |
| 768px (tablet) | 704px | 3 | 48px | 16px | 32px | Expanded grid to 3 columns; section padding increases |
| 1024px (laptop) | 960px | 4 | 54px | 16px | 32px | Full 4-column layout; display heading reaches 54px |
| 1280px (desktop) | 1088px | 4 | 54px | 16px | 32px | Max content width locked at 1088px |
| 1440px+ (wide) | 1088px | 4 | 54px | 16px | 32px | No further expansion; maintains 1088px constraint |

**Breakpoint Definitions:**
- **Mobile:** 0–767px (2-column, tight padding)
- **Tablet:** 768–1023px (3-column, medium padding)
- **Desktop:** 1024px+ (4-column, max width 1088px, generous padding)

### Touch Targets

Minimum interactive element sizes:
- **Buttons:** `40px` height (`{spacing.md}` top/bottom padding + content) — Verified on primary button measurement
- **Form inputs:** `40px+` height for comfortable mobile tapping
- **Card links:** `310px` (width) × `min-height 103px` (small variant) — Adequate tap zone
- **Navigation links:** Maintain `{spacing.md}` (16px) spacing between clickable areas

### Collapsing Strategy

- **Mobile (375px):** Content stacks vertically; grid collapses to 2 columns; section padding contracts to `{spacing.md}` (16px); headings shrink to 34px; all interactive elements remain at `40px+` minimum height.
- **Tablet (768px):** Grid expands to 3 columns; padding grows to `{spacing.xxxl}` (32px); headings grow to 48px.
- **Desktop (1024px+):** Grid reaches 4 columns; content width locks at `1088px`; headings reach 54px; padding remains `{spacing.xxxl}` (32px).
- **Beyond 1280px:** No further expansion; content remains centred and constrained at `1088px` max.

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA:** Indigo (`{colors.primary}` — `#6366F1`)
- **Action Button:** Lime Green (`#58CC02`)
- **Background (Canvas):** Pale Lavender (`{colors.canvas}` — `#F7F7FD`)
- **Heading Text:** Dark Slate (`{colors.ink}` — `#1E293B`)
- **Body Text:** Medium Slate (`{colors.body}` — `#64748B`)
- **Secondary Text:** Muted Slate (`{colors.muted}` — `#94A3B8`)
- **Hint/Placeholder:** Faint Slate (`{colors.faint}` — `#CBD5E1`)
- **Borders & Hairlines:** Light Slate (`{colors.hairline}` — `#E2E8F0`)
- **Link:** Deep Purple (`{colors.link}` — `#6D28D9`)
- **Accent (Decorative):** Cyan, Orange, Purple variants available (`{colors.accent-1}` through `{colors.accent-6}`)

### Iteration Guide

1. **All button text must use weight 900** — Buttons are labelled with `{typography.button-sm-strong}` (14px, weight 900) or `{typography.body-lg-strong}` (16px, weight 900); never use weight 600 or below for button labels.

2. **Primary buttons are `#6366F1` with indigo shadow; action buttons are lime green (`#58CC02`) with green shadow** — Match shadow colour to button fill for visual cohesion.

3. **All headings use weight 900 with no less than 900 weight** — h1 through h6 all use ultra-bold; the hierarchy is driven by size, not weight.

4. **Negative letter-spacing on display sizes is intentional** — The 54px heading (`{typography.display-xl}`) uses -1.35px tracking for visual tightness and impact; do not round this to 0.

5. **Spacing increments are strict multiples of 4px** — Never invent intermediate spacing values; use only the 10 provided scale increments (`{spacing.xxs}` through `{spacing.band}`).

6. **Rounded corners on buttons and cards are non-negotiable** — Minimum 16px (`{rounded.sm}`); exceptions are full-bleed structural elements (footers, sections) which use 0px.

7. **Max content width is 1088px on all viewports ≥1280px** — Content must remain centred and not expand beyond this threshold.

8. **Shadows use colour tints, never pure black** — Primary buttons shadow with indigo (`rgb(199, 210, 254)`), actions with green (`rgb(187, 247, 208)`), and navigation with purple (`rgba(124, 58, 237, 0.08)`).

9. **Mobile layout is 2-column grid with 375px max content width and 16px horizontal padding** — Tablet jumps to 3 columns at 768px; desktop reaches 4 columns at 1024px+.

10. **The neutral text ramp (`{colors.ink}`, `{colors.body}`, `{colors.muted}`, `{colors.faint}`) is used hierarchically and must not be mixed or invented** — Respect this four-tier hierarchy in all text styling.

## 10. Known Gaps

- **No interaction states beyond hover documented** — Extracted stylesheets reveal hover border and background colour changes for decorative elements, but no explicit focus, active, or disabled states are formally defined. Implement standard accessible defaults (focus outline, reduced opacity for disabled).

- **No semantic status colours (error, success, warning, info)** — The site does not expose a colour ramp for error messages, success confirmations, or warning alerts. Any such states must be inferred or added by the implementer.

- **Eight decorative accent colours have no measured role** — `{colors.accent-1}` through `{colors.accent-6}` are used visually but have no documented job in the system. Treat them as optional decorative or category-distinction colours; do not assign them to critical UI roles.

- **No dark mode** — Only a light theme was extracted. The system does not officially support dark mode.

- **Interaction feedback animations undefined** — Hover states show border and background colour shifts but no CSS transitions or transform animations are documented (e.g., button scale, ripple effects). Standard smooth transitions should be assumed.

- **No form validation or inline error styling** — The extraction does not include textual or visual validation patterns for form fields. Implementers must add standard patterns (red border, error message text in `{colors.accent-4}` or similar).

- **Some cross-origin stylesheets unreadable** — Third-party or CDN-hosted CSS rules may not have been fully captured, so rare or highly specific component styles could be missing.

- **No micro-interaction guidance** — Page transitions, scroll behaviours, loading states, and skeleton screens are not documented.

- **Surfaces behind authentication not visited** — The extraction covered only publicly visible pages; logged-in or premium-only interfaces may have additional colour, typography, or component patterns.