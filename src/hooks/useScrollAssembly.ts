import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useScrollAssembly() {
  const [modelRef, setModelRef] = useState<THREE.Group | null>(null);

  useEffect(() => {
    if (!modelRef) return;

    const el = modelRef;
    let mm = gsap.matchMedia();

    // DESKTOP ANIMATIONS
    mm.add("(min-width: 768px)", () => {
      el.position.set(0, -1.2, 2); 
      el.rotation.set(0.1, 0.4, 0); 
      el.scale.set(1.5, 1.5, 1.5); 

      const tl = gsap.timeline({
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1 },
      });

      tl.to(el.position, { x: 1.5, y: -0.2, z: 0, duration: 1, ease: "power1.inOut" }, 0);
      tl.to(el.rotation, { x: 0, y: -1.2, z: 0.1, duration: 1, ease: "power1.inOut" }, 0);
      tl.to(el.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 1, ease: "power1.inOut" }, 0);

      tl.to(el.position, { x: -1.5, y: 0, z: 0.5, duration: 1, ease: "power1.inOut" }, 1);
      tl.to(el.rotation, { x: 0.2, y: 1.2, z: -0.1, duration: 1, ease: "power1.inOut" }, 1);
      tl.to(el.scale, { x: 1.4, y: 1.4, z: 1.4, duration: 1, ease: "power1.inOut" }, 1);

      tl.to(el.position, { x: 0, y: -1, z: 1.5, duration: 0.5, ease: "power1.inOut" }, 2);
      tl.to(el.rotation, { x: 0, y: 0, z: 0, duration: 0.5, ease: "power1.inOut" }, 2);
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
      tl.to(el.position, { x: 0, y: -2.5, z: 0, duration: 1, ease: "power1.inOut" }, 0);
      tl.to(el.rotation, { x: 0, y: -1.2, z: 0, duration: 1, ease: "power1.inOut" }, 0);
      tl.to(el.scale, { x: 1, y: 1, z: 1, duration: 1, ease: "power1.inOut" }, 0);

      // Phase 2 (Engineering): Move model UP so text can be BELOW it
      tl.to(el.position, { x: 0, y: 1.5, z: 0, duration: 1, ease: "power1.inOut" }, 1);
      tl.to(el.rotation, { x: 0.2, y: 1.2, z: -0.1, duration: 1, ease: "power1.inOut" }, 1);
      tl.to(el.scale, { x: 1.1, y: 1.1, z: 1.1, duration: 1, ease: "power1.inOut" }, 1);

      // Phase 3 (Spacer)
      tl.to(el.position, { x: 0, y: 0, z: 1, duration: 0.5, ease: "power1.inOut" }, 2);
      tl.to(el.rotation, { x: 0, y: 0, z: 0, duration: 0.5, ease: "power1.inOut" }, 2);
    });

    return () => {
      mm.revert();
    };
  }, [modelRef]);

  return { setModelRef };
}
