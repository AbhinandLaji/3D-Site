"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function UIOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fadeOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Select sections
    const sections = gsap.utils.toArray<HTMLElement>(".text-section");
    
    // Animate text elements on scroll
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
        }
      );
    });

    // Fade out the white overlay as we scroll past the hero section
    if (fadeOverlayRef.current) {
      gsap.to(fadeOverlayRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: ".section-white",
          start: "top top",
          end: "bottom top", // Fade out completely as the hero section leaves the viewport
          scrub: true,
        },
      });
    }

    // Background color transition based on scroll
    gsap.to(document.body, {
      backgroundColor: "#4a2c11", // Dark brown for the second phase
      color: "#ffffff", // Switch text to white for contrast
      scrollTrigger: {
        trigger: ".section-brown",
        start: "top 50%",
        end: "top top",
        scrub: true,
      },
    });
    
    // Revert to white at the very bottom (optional) or stay brown
    gsap.to(document.body, {
      backgroundColor: "#f5f0e6", // Light brown/beige
      color: "#2b1b11",
      scrollTrigger: {
        trigger: ".section-light",
        start: "top 50%",
        end: "top top",
        scrub: true,
      },
    });

  }, []);

  return (
    <div ref={containerRef} className="relative z-10 w-full pointer-events-none">
      
      {/* HERO SECTION */}
      <div className="h-screen flex flex-col justify-between pt-8 pb-16 px-6 md:px-20 section-white overflow-hidden relative">
        
        {/* FADE OVERLAY: Washes out the 3D model behind the hero section */}
        <div 
          ref={fadeOverlayRef} 
          className="absolute inset-0 z-0 bg-gradient-to-b from-white/60 via-white/40 to-white/80 pointer-events-none"
        />

        <header className="relative z-10 flex justify-between items-center w-full pointer-events-auto">
          <div className="text-xl md:text-2xl font-bold tracking-tighter text-foreground drop-shadow-md">AURA</div>
          <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
            <a href="#" className="hover:text-accent-brown transition-colors drop-shadow-md">COLLECTION</a>
            <a href="#" className="hover:text-accent-brown transition-colors drop-shadow-md">DESIGN</a>
            <a href="#" className="hover:text-accent-brown transition-colors drop-shadow-md">SUSTAINABILITY</a>
          </nav>
          <button className="px-5 py-2 text-sm md:text-base md:px-6 md:py-2 bg-foreground text-background font-medium rounded-full hover:bg-accent-brown transition-colors shadow-lg">
            SHOP NOW
          </button>
        </header>

        <div className="text-section w-full max-w-4xl mx-auto text-center pointer-events-auto mt-16 md:mt-20 mb-auto relative z-10">
          <h1 className="text-5xl md:text-9xl font-bold tracking-tighter mb-4 text-foreground leading-[1]" style={{ textShadow: "0 4px 30px rgba(255,255,255,0.9), 0 2px 10px rgba(255,255,255,1)" }}>
            STEP INTO<br/>THE FUTURE
          </h1>
          <p className="text-base md:text-2xl font-medium text-foreground/90 mt-4 md:mt-6 bg-white/50 backdrop-blur-md inline-block px-4 py-2 md:px-6 md:py-2 rounded-full shadow-sm">
            Scroll to explore the anatomy of comfort.
          </p>
        </div>
      </div>

      {/* SECTION 2: Materials */}
      <div className="min-h-[150vh] flex flex-col md:flex-row items-start md:items-center justify-start px-6 pt-32 md:pt-0 md:px-32 section-brown relative z-10">
        <div className="text-section max-w-lg pointer-events-auto">
          <p className="text-xs md:text-sm tracking-widest uppercase mb-2 opacity-70">01 / Materials</p>
          <h2 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 tracking-tight">Premium<br/>Leather</h2>
          <p className="text-base md:text-xl opacity-90 leading-relaxed font-light">
            Crafted from ethically sourced, full-grain leather. Our shoes offer unparalleled durability and a rich, natural patina that evolves with every step you take.
          </p>
          <div className="mt-8 md:mt-12 flex gap-3 md:gap-4">
            <div className="w-12 md:w-16 h-1 bg-white opacity-20"></div>
            <div className="w-12 md:w-16 h-1 bg-white opacity-100"></div>
            <div className="w-12 md:w-16 h-1 bg-white opacity-20"></div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Engineering */}
      <div className="min-h-[150vh] flex flex-col md:flex-row items-end md:items-center justify-end px-6 pb-32 md:pb-0 md:px-32 section-light relative z-10">
        <div className="text-section max-w-xl text-left md:text-right pointer-events-auto w-full md:w-auto">
          <p className="text-xs md:text-sm tracking-widest uppercase mb-2 opacity-70">02 / Engineering</p>
          <h2 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 tracking-tight">Adaptive<br/>Cushioning</h2>
          <p className="text-base md:text-xl opacity-90 leading-relaxed font-light mb-8 md:mb-10">
            The sole adapts to your unique foot shape, distributing weight evenly for a weightless sensation throughout the day.
          </p>
          <button className="w-full md:w-auto px-8 py-4 md:px-10 md:py-4 bg-foreground text-background text-base md:text-lg font-medium rounded-full hover:bg-accent-brown hover:text-white transition-all duration-300 shadow-xl">
            PRE-ORDER
          </button>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-[20vh] md:h-[50vh]"></div>
    </div>
  );
}
