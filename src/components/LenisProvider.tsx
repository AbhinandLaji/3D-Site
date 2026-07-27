"use client";

import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

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
    <ReactLenis root>
      <LenisSync />
      {children}
    </ReactLenis>
  );
}
