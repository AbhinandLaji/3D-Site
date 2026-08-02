import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

// FIX #3: ScrollTrigger is registered once in LenisProvider — no duplicate registration here

export function useScrollAssembly() {
  const [modelRef, setModelRef] = useState<THREE.Group | null>(null);

  useEffect(() => {
    if (!modelRef) return;

    const el = modelRef;
    let mm = gsap.matchMedia();

    // DESKTOP ANIMATIONS
    mm.add("(min-width: 768px)", () => {
      // Start: shoe fits neatly inside the heading gap
      el.position.set(0, 0.1, 0); 
      el.rotation.set(0.05, -0.25, 0.05); 
      el.scale.set(1.1, 1.1, 1.1); 

      const tl = gsap.timeline({
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1 },
      });

      // FIX #12: overwrite: "auto" prevents accumulation of tweens during rapid scroll
      tl.to(el.position, { x: 1.5, y: -0.2, z: 0, duration: 1, ease: "power1.inOut", overwrite: "auto" }, 0);
      tl.to(el.rotation, { x: 0, y: -1.2, z: 0.1, duration: 1, ease: "power1.inOut", overwrite: "auto" }, 0);
      tl.to(el.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 1, ease: "power1.inOut", overwrite: "auto" }, 0);

      // To Engineering — move shoe left for right-side content
      tl.to(el.position, { x: -1.5, y: 0, z: 0.5, duration: 1, ease: "power1.inOut", overwrite: "auto" }, 1);
      tl.to(el.rotation, { x: 0.2, y: 1.2, z: -0.1, duration: 1, ease: "power1.inOut", overwrite: "auto" }, 1);
      tl.to(el.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 1, ease: "power1.inOut", overwrite: "auto" }, 1);

      // To Sustainability — top-down dramatic angle
      tl.to(el.position, { x: 0, y: 1, z: -1, duration: 1, ease: "power1.inOut", overwrite: "auto" }, 2);
      tl.to(el.rotation, { x: 1.2, y: 0, z: 0, duration: 1, ease: "power1.inOut", overwrite: "auto" }, 2);
      tl.to(el.scale, { x: 1.0, y: 1.0, z: 1.0, duration: 1, ease: "power1.inOut", overwrite: "auto" }, 2);

      // Fade out for Testimonials & Footer
      tl.to(el.position, { x: 0, y: 3, z: -3, duration: 0.5, ease: "power1.in", overwrite: "auto" }, 3);
      tl.to(el.scale, { x: 0, y: 0, z: 0, duration: 0.5, ease: "power1.in", overwrite: "auto" }, 3);
    });

    // MOBILE ANIMATIONS
    mm.add("(max-width: 767px)", () => {
      // Start smaller and lower to not block text
      el.position.set(0, -1.5, 1);
      el.rotation.set(0.1, 0.4, 0);
      el.scale.set(1.2, 1.2, 1.2);

      const tl = gsap.timeline({
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1 },
      });

      // Phase 1 (Materials): Move model DOWN so text can be ABOVE it
      tl.to(el.position, { x: 0, y: -2.5, z: 0, duration: 1, ease: "power1.inOut", overwrite: "auto" }, 0);
      tl.to(el.rotation, { x: 0, y: -1.2, z: 0, duration: 1, ease: "power1.inOut", overwrite: "auto" }, 0);
      tl.to(el.scale, { x: 1, y: 1, z: 1, duration: 1, ease: "power1.inOut", overwrite: "auto" }, 0);

      // Phase 2 (Engineering): Move model UP so text can be BELOW it
      tl.to(el.position, { x: 0, y: 1.5, z: 0, duration: 1, ease: "power1.inOut", overwrite: "auto" }, 1);
      tl.to(el.rotation, { x: 0.2, y: 1.2, z: -0.1, duration: 1, ease: "power1.inOut", overwrite: "auto" }, 1);
      tl.to(el.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 1, ease: "power1.inOut", overwrite: "auto" }, 1);

      // Phase 3 (Sustainability)
      tl.to(el.position, { x: 0, y: -1, z: 0, duration: 1, ease: "power1.inOut", overwrite: "auto" }, 2);
      tl.to(el.rotation, { x: 1, y: 0, z: 0, duration: 1, ease: "power1.inOut", overwrite: "auto" }, 2);
      tl.to(el.scale, { x: 0.9, y: 0.9, z: 0.9, duration: 1, ease: "power1.inOut", overwrite: "auto" }, 2);

      // Fade out for Testimonials & Footer
      tl.to(el.position, { x: 0, y: 3, z: -3, duration: 0.5, ease: "power1.in", overwrite: "auto" }, 3);
      tl.to(el.scale, { x: 0, y: 0, z: 0, duration: 0.5, ease: "power1.in", overwrite: "auto" }, 3);
    });

    return () => {
      mm.revert();
    };
  }, [modelRef]);

  return { setModelRef };
}
