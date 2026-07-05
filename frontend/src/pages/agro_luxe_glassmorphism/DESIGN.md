
---
name: Agro-Luxe Glassmorphism
colors:
  surface: '#0e150f'
  surface-dim: '#0e150f'
  surface-bright: '#343b33'
  surface-container-lowest: '#09100a'
  surface-container-low: '#171d16'
  surface-container: '#1b211a'
  surface-container-high: '#252c24'
  surface-container-highest: '#30372f'
  on-surface: '#dde5d9'
  on-surface-variant: '#bdcaba'
  inverse-surface: '#dde5d9'
  inverse-on-surface: '#2b322b'
  outline: '#879485'
  outline-variant: '#3e4a3d'
  surface-tint: '#62df7d'
  primary: '#62df7d'
  on-primary: '#003914'
  primary-container: '#1ca64d'
  on-primary-container: '#003111'
  inverse-primary: '#006e2d'
  secondary: '#bec6e0'
  on-secondary: '#283044'
  secondary-container: '#3f465c'
  on-secondary-container: '#adb4ce'
  tertiary: '#ffb2bf'
  on-tertiary: '#660027'
  tertiary-container: '#ec6284'
  on-tertiary-container: '#5a0022'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7ffc97'
  primary-fixed-dim: '#62df7d'
  on-primary-fixed: '#002109'
  on-primary-fixed-variant: '#005320'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#ffd9de'
  tertiary-fixed-dim: '#ffb2bf'
  on-tertiary-fixed: '#3f0016'
  on-tertiary-fixed-variant: '#8a143c'
  background: '#0e150f'
  on-background: '#dde5d9'
  surface-variant: '#30372f'
typography:
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

This design system establishes a "Premium Agritech" aesthetic for KrushiMart, bridging the gap between raw agricultural roots and high-end digital commerce. The visual language centers on **3D Glassmorphism**, utilizing translucent layers to create a sense of depth and airiness against a deep, sophisticated backdrop. 

The target audience—modern farmers and discerning direct-to-consumer buyers—should experience a sense of technological empowerment and organic freshness. By combining floating geometric shapes with perspective transforms, the UI feels dynamic and alive. The emotional response is one of "Future-Forward Growth": reliable, lucrative, and cutting-edge.

## Colors

The palette is anchored by **Forest Green** and **Rich Navy-Black**, providing a high-contrast foundation for glass effects. **Mint Glow** acts as a neon highlight for interaction states, while **Gold** is reserved for premium features, certifications, and high-value pricing.

- **Background Strategy:** Use the primary-to-dark linear gradient for main landing sections. Use the rich navy-black for deep application backgrounds.
- **Glass Specification:** Surfaces should use a white tint with low opacity (8-12%) to allow background colors and geometric shapes to bleed through.
- **Interactive Glows:** Hover states utilize the Mint Glow (#bbf7d0) with an outer box-shadow (0 0 15px) to simulate a neon hardware effect.

## Typography

This design system pairs the friendly, rounded geometric forms of **Plus Jakarta Sans** for headlines with the highly legible, utilitarian **Inter** for data-heavy body content. 

Headlines should be rendered in white or Mint Glow to pop against dark backgrounds. Body text on glass panels should maintain high contrast; use pure white or a very light gray (#f8fafc) to ensure readability through the backdrop blur.

## Layout & Spacing

The system utilizes a **Fixed Grid** model for desktop (12 columns) and a fluid model for mobile. Because of the 3D perspective transforms used on cards, generous padding and margins are required to prevent elements from visually colliding when tilted.

- **Perspective Containers:** Layout sections containing 3D cards must include `perspective: 1000px`.
- **Rhythm:** Use a 4px baseline grid. Most components should use `md` (24px) for internal padding to maintain a spacious, premium feel.

## Elevation & Depth

Depth is the defining characteristic of this design system. It is achieved through a combination of three techniques:

1.  **Backdrop Blur:** All glass panels must implement `backdrop-filter: blur(12px)`.
2.  **3D Transforms:** Featured cards use `transform: rotateY() rotateX()` on hover to create a physical tilting effect.
3.  **Layered Borders:** Every glass panel requires a 1px solid border (`border_glass`) to define its edges against the background, simulating the light-catching edge of physical glass.
4.  **Floating Shapes:** Backgrounds feature blurred, floating geometric spheres in Forest Green and Mint Glow, positioned at different Z-indexes to provide a parallax effect behind the UI.

## Shapes

The shape language is purposefully soft to contrast with the technical "neon" aspects of the system. 

- **Primary Cards:** Use a 20px radius to emphasize the "organic" nature of the marketplace.
- **Interactive Elements:** Buttons and inputs use a 12px radius, providing a distinct but related geometry that feels comfortable for touch and click.
- **Icons:** Should be encased in circular or highly rounded glass containers when used as decorative elements.

## Components

### Buttons
Primary buttons use a solid Forest Green background with a Mint Glow hover state. Secondary buttons are "ghost" glass panels with a 1px border. All buttons use a 12px radius and Inter Semibold.

### Cards (The Hero Component)
Cards are the centerpiece. They feature 20px rounded corners, 12px backdrop blur, and a subtle 1px white border. On hover, they should scale by 1.05 and apply a subtle 3D tilt towards the cursor.

### Chips & Badges
Small glass pills with Mint Glow or Gold text. These should have a slightly higher opacity (20%) to ensure the labels are readable over complex backgrounds.

### Input Fields
Glass containers with 12px radius. The border color should transition to Mint Glow (#bbf7d0) on focus, accompanied by a subtle outer glow.

### Marketplace Specifics
- **Product Tiles:** Feature 3D image containers where the produce "pops" out of the glass frame.
- **Price Tags:** Use the Gold (#fbbf24) color for the amount to signify value and quality.
- **Inventory Progress:** Use a custom progress bar with a Mint-to-Green gradient and a glowing tip.