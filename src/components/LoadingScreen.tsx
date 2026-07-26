"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
  const { progress } = useProgress();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable scroll while loading by adding a class to html (if you have styling for it)
    // or by letting the full-screen fixed overlay intercept clicks/scrolls
    document.documentElement.classList.add("lenis-stopped");

    if (progress === 100) {
      // Fade out timeline
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.classList.remove("lenis-stopped");
          if (containerRef.current) {
            containerRef.current.style.display = "none";
          }
        },
      });

      tl.to(textRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power2.inOut",
      }).to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "-=0.2"
      );
    }
  }, [progress]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div ref={textRef} className="text-center">
        <h1 className="text-4xl font-serif text-white mb-2">Loading Experience</h1>
        <p className="text-xl font-mono text-gray-400">
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}
