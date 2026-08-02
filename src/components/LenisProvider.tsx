"use client";

import { useEffect } from "react";
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
  useEffect(() => {
    // Disable native browser scroll restoration and force scroll to top on refresh
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.08 }}>
      <LenisSync />
      {children}
    </ReactLenis>
  );
}
