"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LoadingScreen() {
  const { progress } = useProgress();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable scroll while loading
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div ref={textRef} className="text-center">
        <h1 className="text-5xl font-bold tracking-tighter text-foreground mb-4">AURA</h1>
        <div className="w-48 h-1 bg-foreground/20 rounded-full mx-auto mb-2 overflow-hidden">
          <div 
            className="h-full bg-foreground rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm font-medium tracking-widest text-foreground/60 uppercase">
          Assembling {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
}
