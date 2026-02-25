# Shape & Sate — Landing

Vite + React + TypeScript landing page with a loader and placeholder layout. Uses **Framer Motion** for animations.

## Run

```bash
npm install
npm run dev
```

Build: `npm run build`. Preview: `npm run preview`.

---

## Adding your assets

### Fonts

1. Put font files in `public/fonts/` (e.g. `.woff2`).
2. In `index.html` (or a global CSS file), add `@font-face` and set the variables in `src/index.css`:

   ```css
   :root {
     --font-display: 'Your Display Serif', Georgia, serif;
     --font-sans: 'Your Sans', system-ui, sans-serif;
   }
   ```

The headline uses `--font-display`, the corner logos and tagline use `--font-sans`.

### Corner logos (SVGs)

- **Top right:** “SHAPE” (vertical, reads upward).
- **Bottom left:** “SATE” (vertical, reads downward).

**Option A — Inline SVG in the component**

Edit `src/App.tsx` and pass your SVG as children:

```tsx
<CornerLogo position="top-right">
  <img src="/shape.svg" alt="" className="corner-logo__img" />
</CornerLogo>
```

Or import the SVG as a React component (e.g. with `vite-plugin-svgr` if you add it) and render it inside `CornerLogo`.

**Option B — Put SVGs in `public/`**

Add `shape.svg` and `sate.svg` in `public/`, then:

```tsx
<CornerLogo position="top-right" src="/shape.svg" alt="" />
<CornerLogo position="bottom-left" src="/sate.svg" alt="" />
```

Corner styles (rotation, position) are in `src/App.css` under `.corner-logo--top-right` and `.corner-logo--bottom-left`.

---

## Loader animation

The loader in `src/components/Loader.tsx` is a placeholder. To add your complex animation:

1. Build your sequence with Framer Motion (`motion.*`, `animate`, `variants`, `useAnimation`, or keyframes).
2. When the animation is finished, call the `onComplete` prop so the page reveals:

   ```tsx
   <motion.div
     animate={{ ... }}
     onAnimationComplete={() => onComplete?.()}
   >
   ```

If `onComplete` is never called, the app still hides the loader after 4 seconds (fallback in `App.tsx`).
# shapesate-landing
