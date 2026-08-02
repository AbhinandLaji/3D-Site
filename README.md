# AURA | Premium Luxury Smartwatch Showcase

A premium, state-of-the-art interactive web showcase for the **AURA Smartwatch**, engineered for high-performance visual fidelity, silky smooth scrolling, and complete SEO/AEO compliance. Built with **Next.js 15+** and optimized using **GSAP** and custom sequence rendering.

---

## 💎 Design & Visual Highlights

- **Watch-Escapement Loader**: A luxury mechanical loader design inspired by traditional horology. Includes a golden hour/minute indicator showing preload completion and a ticking red second hand.
- **GSAP Canvas Sequence Hero**: Captivating, progressive frame sequence (240 high-definition frames) rendering a hardware assembly blow-up matching scroll depth.
- **Premium Asymmetric Strap Showcase**: Custom center-focused stateful slider modeled after high-end catalogs. Highlights:
  - Tuscan Italian Leather (detailed specs, Florence origins, hand-threaded stitch tags)
  - Grade 5 Aerospace Titanium Link (butterfly clasp specs, micro-polished texture tags)
  - Active Sport Fluoroelastomer (pin-and-tuck closure, satiny texture tags)
  - Side-by-side macro close-up detail previews (40x zoom) and action buttons.
- **Dynamic Interaction Layout**: Clean, elegant typography (Bodoni, Roboto Slab, Cormorant Garamond), smooth luxury hover cards, and interactive tap-to-reveal watch dial indicators.

---

## ⚡ Performance Optimizations

We implemented a highly optimized asset delivery pipeline to achieve instant initial load and butter-smooth scrolling:
1. **Progressive Preloading**: The viewport unlocks scrolling as soon as the first **40 critical frames** are ready, while the remaining 200 frames load asynchronously in the background.
2. **Stable State Rendering**: Moved image preloader counts to React `useRef` counters to prevent 240 duplicate GSAP ScrollTrigger rebuild cycles.
3. **Hardware Acceleration**: Canvas layers leverage GPU compositing layers via `will-change: transform`.
4. **Infinite Cache-Control Policy**: Implemented 1-year immutable caching headers inside `next.config.ts` for all assets, sequence frames, and images.
5. **Modern Image Compression**: Enabled AVIF/WebP image optimization formats inside Next.js configuration.
6. **Unmount Safety**: Centralized GSAP ScrollTriggers in a unified `gsap.context()` context window with a `revert()` cleanup hook to avoid unmount crashes or `removeChild` failures.
7. **Smooth Motion**: Leveraged centralized Lenis scroll handling with zero conflicts.

---

## 🔍 SEO & AEO (Answer Engine Optimization)

Engineered to be fully readable by AI agents (Gemini, ChatGPT, Perplexity) and standard search crawlers:
- **JSON-LD Schema Markup**: Embedded a comprehensive structured `Product` schema in `layout.tsx`, detailing brand identity, model, case size, power reserve, water resistance ratings, and variant pricing.
- **Accessible HTML5 Hierarchy**: Descriptive unique IDs, semantic headers, and strict image dimension guidelines.

---

## 🚀 Setup & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development
```bash
npm run dev
```
The application will be available at [http://localhost:3000](http://localhost:3000).

### 3. Production Build & Check
```bash
npm run build
```