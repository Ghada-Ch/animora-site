# Design System Documentation

## Overview

Animora is built on a comprehensive design system that ensures consistency, beauty, and expressiveness across all characters and components.

## Color Palette

### Primary Gradient
The iconic animora gradient flows from pink through purple to cyan, representing creativity, playfulness, and futuristic energy.

```
#FF1493 (Pink) → #8B5CF6 (Purple) → #00D9FF (Cyan)
```

### Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Purple | #8B5CF6 | Primary actions, focus states |
| Pink | #FF1493 | Accent, character mouths |
| Blue | #3B82F6 | Secondary actions |
| Cyan | #00D9FF | Highlights, interactive elements |
| Magenta | #A855F7 | Alternative accent |

### Emotion Colors

| Emotion | Color | Hex |
|---------|-------|-----|
| Happy | Yellow | #FFB800 |
| Excited | Cyan | #00D9FF |
| Thinking | Blue | #3B82F6 |
| Sad | Purple | #A855F7 |
| Angry | Coral | #FF6B6B |
| Love | Pink | #FF1493 |

### Neutrals (Dark Mode)
```
50:  #F8FAFC
100: #F1F5F9
200: #E2E8F0
300: #CBD5E1
400: #94A3B8
500: #64748B
600: #475569
700: #334155
800: #1E293B
900: #0F172A
```

## Typography

### Font Stack

#### Display (Headings)
**Satoshi** - Modern, friendly, playful
- Weights: 300, 400, 500, 600, 700, 900

#### Body (Text)
**Inter** - Clean, readable, balanced
- Weights: 400, 500, 600

#### Code
**Fira Code** - Monospace, developer-focused
- Weights: 400, 500

### Scale

| Level | Size | Weight | Line Height |
|-------|------|--------|-------------|
| H1 | 3.5rem | 700 | 1.1 |
| H2 | 2.5rem | 700 | 1.2 |
| H3 | 1.875rem | 700 | 1.3 |
| Body | 1rem | 400 | 1.6 |
| Body Small | 0.875rem | 400 | 1.5 |
| Code | 0.875rem | 400 | 1.6 |

## Motion & Animation

### Spring Physics Presets

| Preset | Stiffness | Damping | Feel |
|--------|-----------|---------|------|
| Light | 100 | 10 | Smooth, loose |
| Normal | 167 | 26 | Balanced, natural |
| Medium | 300 | 30 | Bouncy, playful |
| Stiff | 500 | 40 | Quick, responsive |

### Easing Functions

```
ease:       cubic-bezier(0.25, 0.1, 0.25, 1)
easeIn:     cubic-bezier(0.42, 0, 1, 1)
easeOut:    cubic-bezier(0, 0, 0.58, 1)
easeInOut:  cubic-bezier(0.42, 0, 0.58, 1)
```

### Duration Presets

| Speed | Duration |
|-------|----------|
| fast | 0.15s |
| normal | 0.3s |
| slow | 0.5s |
| verySlow | 0.8s |

## Spacing

```
xs:   0.25rem (4px)
sm:   0.5rem (8px)
md:   1rem (16px)
lg:   1.5rem (24px)
xl:   2rem (32px)
2xl:  3rem (48px)
3xl:  4rem (64px)
4xl:  6rem (96px)
```

## Border Radius

```
none:  0
sm:    0.25rem (4px)
md:    0.5rem (8px)
lg:    1rem (16px)
xl:    1.5rem (24px)
full:  9999px (circle)
```

## Shadows

### Depth Shadows

```
sm:  0 1px 2px 0 rgba(0, 0, 0, 0.05)
md:  0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)
lg:  0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)
xl:  0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)
```

### Glow Shadows

```
neon: 0 0 20px rgba(255, 20, 147, 0.6), 0 0 40px rgba(139, 92, 246, 0.4)
glow: 0 0 30px rgba(0, 217, 255, 0.5)
```

## Character Design Principles

### Expression
- **Eyes** communicate primary emotion (scale, opacity, position)
- **Mouth** conveys feeling (shape, curve, openness)
- **Glow** indicates intensity (color, brightness)

### Interaction
- **Hover** = Slight scale up and increased glow
- **Click** = Bounce effect with emotional reaction
- **Focus** = Neon outline and attention glow

### Personality
- **Playful** animations (tail wags, ear twitches)
- **Responsive** to user input
- **Expressive** through color and motion
- **Alive** with constant subtle movements

## Responsive Design

### Breakpoints

| Size | Width |
|------|-------|
| xs | 0px |
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

## Accessibility

- **Color Contrast** - 4.5:1 minimum for text
- **Motion** - Respects `prefers-reduced-motion`
- **Focus Indicators** - Clear, visible focus states
- **Semantic HTML** - Proper heading hierarchy
- **ARIA Labels** - Where appropriate

## Implementation

All design tokens are available in `src/theme/tokens.ts`:

```typescript
import {
  COLORS,
  TYPOGRAPHY,
  MOTION,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
} from 'animora';
```

---

For questions or suggestions about the design system, please open an issue on GitHub.
