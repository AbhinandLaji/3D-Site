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

    // Starting "off" state — small, rotated, offset
    el.position.set(0, -2, -3);
    el.rotation.set(0.4, -1.2, 0);
    el.scale.set(0.4, 0.4, 0.4);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "+=400%", // matches your h-[400vh] spacer
        scrub: 1,
      },
    });

    tl.to(el.position, { x: 0, y: 0, z: 0, ease: "power2.out" }, 0);
    tl.to(el.rotation, { x: 0, y: 0, z: 0, ease: "power2.out" }, 0);
    tl.to(el.scale, { x: 1, y: 1, z: 1, ease: "power2.out" }, 0);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [modelRef]);

  return { setModelRef };
}
