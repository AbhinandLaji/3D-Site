"use client";

import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// FIX #3: Register ScrollTrigger ONCE here — this is the root provider loaded first.
// All other components (WatchSequenceHero, WatchContentSections, useScrollAssembly)
// no longer need to call gsap.registerPlugin themselves.
gsap.registerPlugin(ScrollTrigger);

// Child component to synchronize Lenis scroll events with GSAP ScrollTrigger
function LenisSync() {
  useLenis(() => {
    ScrollTrigger.update();
  });
  return null;
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.08 }}>
      <LenisSync />
      {children}
    </ReactLenis>
  );
}
