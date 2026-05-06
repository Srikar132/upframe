# UPFRAME Style Guide

## Section Structure

Every section follows this pattern:

```tsx
<section ref={sectionRef} className="section common-padding container mx-auto">
  <div className="section-header">
    <div className="flex flex-col gap-2">
      <div className="header-label">Label Text</div>
      <h4 className="font-black max-w-3xl leading-[1.05] tracking-tight text-foreground">
        Heading text
      </h4>
    </div>
    <Button size="lg" className="rounded-full self-start md:self-auto">CTA</Button>
  </div>
  {/* section content */}
</section>
```

The `.section-header` class handles `flex-col md:flex-row` layout with `justify-between`.  
The `.header-label` class auto-adds a lime dot prefix and a grey line suffix via `::before`/`::after`.

## Typography

| Element | Usage |
|---------|-------|
| `h4` | Section headings — `font-black leading-[1.05] tracking-tight` |
| `h2` | Hero/large headings |
| `.p-xl / .p-base / .p-sm / .p-xs` | Body text scale |
| `--font-heading` | Space Grotesk — all `h1–h6` |
| `--font-sans` | Manrope — body default |
| `--font-cursive` | Indie Flower — accent text |

## Shadcn Components

- **Button** — `<Button size="lg" className="rounded-full">` for CTAs; `size="icon"` for icon-only
- **Card / CardHeader / CardContent / CardFooter** — structural containers
- **Badge** — `<Badge>` for tags/labels (default = lime accent, secondary = purple tint, muted = grey)
- **Do not** use raw `<button>` or `<div>` for interactive elements — use shadcn primitives


LiquidCard props: `src`, `alt`, `width` (CSS string), `height` (CSS string), `distortionStyle` (`ripple` | `melt` | `wave`).

## GSAP Pattern


- Always use `useGSAP()` — not `useEffect` — for GSAP animations (auto-cleanup)
- Start animated elements with `opacity-0` class; GSAP uses `autoAlpha` to drive visibility
- Register plugins at module scope (outside component)

## Color Tokens

| Token | Value | Use |
|-------|-------|-----|
| `--background` | `#ffffff` | page bg |
| `--foreground` | `#000000` | primary text |
| `--primary` | lime | buttons, dots |
| `--secondary` | purple `#7C5DFA` | accent cards |
| `--accent` | bright lime | badges, highlights |
| `--muted` | soft grey | subtle bg |
| `--card` | white | card bg |
| `--border` | light grey | dividers |

## Layout Utilities

- `.common-padding` → `px-4 sm:px-6 lg:px-8`
- `.section` (on `section` tag) → `py-8 md:py-12 lg:py-16` (auto-applied via global styles)
- Use `container mx-auto` for max-width centering
