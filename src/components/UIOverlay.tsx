"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function UIOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Select all the text blocks we want to animate
    const sections = gsap.utils.toArray<HTMLElement>(".text-section");

    sections.forEach((section) => {
      // Fade in and slide up as each section comes into view
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%", // Trigger when top of section is at 70% of viewport
            end: "top 30%",
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef} className="relative z-10 w-full pointer-events-none">
      {/* 
        We use pointer-events-none on the wrapper so we can still interact with the 3D scene (if we wanted to).
        We enable pointer-events-auto on the text itself if it has links.
      */}
      
      {/* Spacer to push the first text down */}
      <div className="h-screen flex items-center justify-center">
        <div className="text-section text-center max-w-3xl px-6 pointer-events-auto mix-blend-difference text-white">
          <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
            Discover the Anatomy of Perfect Design
          </h1>
          <p className="text-xl md:text-2xl font-light opacity-80">
            Scroll down to assemble.
          </p>
        </div>
      </div>

      <div className="h-screen flex items-center justify-start px-10 md:px-32">
        <div className="text-section max-w-lg pointer-events-auto mix-blend-difference text-white">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Precision Engineering</h2>
          <p className="text-lg opacity-80 leading-relaxed">
            Every component is crafted with meticulous attention to detail, designed to work in perfect harmony.
          </p>
        </div>
      </div>

      <div className="h-screen flex items-center justify-end px-10 md:px-32">
        <div className="text-section max-w-lg text-right pointer-events-auto mix-blend-difference text-white">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Seamless Integration</h2>
          <p className="text-lg opacity-80 leading-relaxed">
            The assembly is greater than the sum of its parts. Experience the synergy of modern engineering.
          </p>
        </div>
      </div>

      <div className="h-screen flex items-center justify-center px-10 md:px-32">
        <div className="text-section text-center max-w-2xl pointer-events-auto mix-blend-difference text-white">
          <h2 className="text-5xl md:text-6xl font-serif mb-6">Fully Assembled</h2>
          <p className="text-xl opacity-80 mb-8">
            The final product, ready for the world.
          </p>
          <button className="px-8 py-3 border border-white hover:bg-white hover:text-black transition-colors duration-300">
            Pre-order Now
          </button>
        </div>
      </div>
    </div>
  );
}
