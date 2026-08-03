# 💎 AURA | Premium Luxury Smartwatch Showcase

A premium, state-of-the-art interactive web showcase for the **AURA Smartwatch**. Engineered for elite visual fidelity, responsive tactile controls, hardware-accelerated animations, and complete SEO/AEO (Answer Engine Optimization) compliance.

Built using **Next.js 15+**, **GSAP**, and **Lenis Scroll**, and optimized for fast initial rendering over congested networks.

---

## ✨ Features & Visual Highlights

- **🕹️ Watch-Escapement Loader**: A luxury mechanical loader design inspired by classic Swiss horology. Features a golden hour/minute hand tracking preload completion and an active sweeping red second hand.
- **🎬 Hardware-Accelerated Sequence**: 240 high-definition frames mapped to scroll progress to render a watch assembly hardware blow-up.
- **🖱️ Drag-and-Swipe Strap Showcase**: Restructured stateful card slider mimicking high-end catalogs.
  - Interactive mouse drag/touch swipe gesture sliding.
  - Circular wrap-around tracks showing multiple faded preview cards on both sides.
  - Multi-column specifications sheets and macro-view detail images (40x zoom) for Italian Leather, Titanium Link, Gold Milanese, Obsidian Ceramic, and Sport Fluoro straps.
- **👆 Interactive Tap-to-Reveal**: Toggle dial complications between Always-On-Display (AOD) and active modes on a high-fidelity watch screen.
- **🗺️ Mapped Anchor Navigation**: Smooth-scroll transitions linked directly from header navbar options to sections.

---

## ⚡ Performance Optimization Architecture

All 13 critical performance bottlenecks identified in initial audits have been fully resolved:

1. **Prioritized Preloading**: The splash screen loads the first **40 critical frames** sequentially to unlock scrolling in under 3 seconds, then lazy-loads the remaining 200 frames in the background. This resolves HTTP/1.1 queue congestion over slower networks (like Wi-Fi or LocalTunnel proxies).
2. **GPU Layer Promotion**: Promoted the canvas renderer to its own GPU compositing layer using `will-change: transform` to prevent CPU redraw lags.
3. **Decoupled Render Reflows**: Decoupled the micro-ticking `LiveClock` component to isolate renders and prevent parent section layouts from reflow calculation loops.
4. **Stale Setup Prevention**: Shifted preloader counters to React `useRef` instances, eliminating 240 duplicate GSAP initialization cycles.
5. **Asset Clean-up**: Deleted over 13MB of unused 3D assets, textures, and DAE model templates.
6. **Next.js Web Fonts**: Migrated fonts to preloaded, self-hosted next/font systems in `layout.tsx` to eliminate render-blocking CSS imports.
7. **Edge Caching**: Configured a 1-year immutable caching policy in `next.config.ts` for all frame images and static assets.

---

## 📁 Repository Directory Structure

```bash
├── public/
│   ├── images/         # Strap variants and macro-detail assets
│   ├── macro/          # Carousel macro detailed photos
│   └── sequence/       # 240 optimized watch frame sequence JPEGs
├── src/
│   ├── app/
│   │   ├── layout.tsx  # Fonts configuration & AEO JSON-LD Schema
│   │   ├── page.tsx    # Landing page layout entry
│   │   ├── robots.ts   # Dynamic robots.txt generation
│   │   └── sitemap.ts  # Dynamic sitemap.xml route sitemap
│   └── components/
│       ├── Footer.tsx  # Premium multi-column luxury footer
│       ├── Navbar.tsx  # Responsive top header & mobile drawer
│       ├── WatchContentSections.tsx  # Slider, Case, & Atelier sections
│       └── WatchSequenceHero.tsx      # Canvas preloader & scroll sequence
├── next.config.ts      # Cache control policies & image formats configuration
├── vercel.json         # Security headers & redirect configuration
└── deployment_guide.md # Step-by-step Vercel + Cloudflare hosting guide
```

---

## 🔍 SEO & AEO (Answer Engine Optimization)

Engineered to be read and scraped by search engine bots and AI answer engines (Gemini, Perplexity, ChatGPT):
- **JSON-LD Schema**: Injected a Schema.org `Product` block in the document header detailing brand profile, case sizes, power reserve, water resistance ratings, and variant pricing models.
- **Dynamic Crawl Files**: Serves custom `/sitemap.xml` and `/robots.txt` dynamically.

---

## 🚀 Setup & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

*To view on mobile, run `npx next dev -H 0.0.0.0` and connect to `http://<your-wifi-ip>:3000`.*

### 3. Compile Production Build
```bash
npm run build
```

---

## ☁️ Deployment

For detailed hosting instructions using **Vercel** and proxying through **Cloudflare** (including the critical SSL settings to prevent infinite redirect loops), refer to the [Deployment Guide](file:///c:/Users/HP/Downloads/3D-Site/deployment_guide.md).