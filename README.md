# 3D Product Showcase

This is a Next.js 14+ project scaffolded with Three.js (R3F), GSAP (ScrollTrigger), and Lenis for an immersive, scroll-driven 3D product showcase.

## Getting Started

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding Your Own 3D Model

The current model is a simple placeholder Box. To add your own product model:

1. Place your GLB file in the `public/models/` directory and name it `model.glb` (or update the path in `src/components/Model.tsx`).
2. **Inspect your model's meshes**: To animate individual pieces of your product (like a sole, laces, or heel), you need to know their exact names in the GLB file.
3. The easiest way to find the mesh names is to run `gltfjsx` on your model. This will generate a React component and you can look at the generated file to see the mesh names:
   ```bash
   npx gltfjsx public/models/model.glb
   ```
   Alternatively, the `Model.tsx` component will automatically print a list of all found mesh names to the browser console when it loads!

## Configuring the Exploded View Animation

Once you know your mesh names, open `src/hooks/useScrollAssembly.ts`.

Update the `DEFAULT_CONFIG` object with your mesh names as keys. For each mesh, define its starting (exploded) position and rotation:

```typescript
export const DEFAULT_CONFIG: AnimationConfig = {
  "mesh_name_1": {
    startPos: [0, 5, 0], // x, y, z starting position
    startRot: [Math.PI / 2, 0, 0], // x, y, z starting rotation in radians
  },
  "mesh_name_2": {
    startPos: [2, 3, 0],
    startRot: [0, Math.PI / 4, 0],
  },
  // ...
};
```

As the user scrolls down the page, GSAP's ScrollTrigger (synced perfectly with Lenis smooth scroll) will animate all these meshes from their starting offsets to `[0, 0, 0]`, effectively assembling the product.

## Extending the Scroll Length

To add more text sections or slow down the assembly animation:
1. Open `src/components/UIOverlay.tsx`.
2. Duplicate or add new `<div>` blocks for text sections. Each section with `h-screen` adds another viewport height of scrolling.
3. The GSAP animation in `useScrollAssembly.ts` scrubs across the entire `body` scroll length automatically, so adding more HTML height will naturally stretch out the 3D assembly time.
