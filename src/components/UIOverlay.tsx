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
          end: "bottom top", 
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

    gsap.to(document.body, {
      backgroundColor: "#e8ede7", // Soft greenish taupe for sustainability
      color: "#2f4f2f", // Dark green text
      scrollTrigger: {
        trigger: ".section-eco",
        start: "top 50%",
        end: "top top",
        scrub: true,
      },
    });

    // Restore to white for testimonials and footer
    gsap.to(document.body, {
      backgroundColor: "#ffffff", 
      color: "#2b1b11",
      scrollTrigger: {
        trigger: ".section-testimonials",
        start: "top 70%",
        end: "top 30%",
        scrub: true,
      },
    });

  }, []);

  return (
    <div ref={containerRef} className="relative z-10 w-full pointer-events-none">
      
      {/* HERO SECTION */}
      <div className="h-screen flex flex-col justify-center pt-8 pb-16 px-6 md:px-20 section-white overflow-hidden relative">
        
        {/* FADE OVERLAY: Washes out the 3D model behind the hero section */}
        <div 
          ref={fadeOverlayRef} 
          className="absolute inset-0 z-0 bg-gradient-to-b from-white/60 via-white/40 to-white/80 pointer-events-none"
        />

        <div className="text-section w-full max-w-4xl mx-auto text-center pointer-events-auto relative z-10">
          <h1 className="text-5xl md:text-9xl font-bold tracking-tighter mb-4 text-foreground leading-[1]" style={{ textShadow: "0 4px 30px rgba(255,255,255,0.9), 0 2px 10px rgba(255,255,255,1)" }}>
            STEP INTO<br/>THE FUTURE
          </h1>
          <p className="text-base md:text-2xl font-medium text-foreground/90 mt-4 md:mt-6 bg-white/50 backdrop-blur-md inline-block px-4 py-2 md:px-6 md:py-2 rounded-full shadow-sm">
            Scroll to explore the anatomy of comfort.
          </p>
          
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-15vh] md:bottom-[-20vh] animate-bounce opacity-70">
             <p className="text-xs tracking-widest uppercase mb-2">Scroll</p>
             <div className="w-px h-12 bg-foreground mx-auto"></div>
          </div>
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
        </div>
      </div>

      {/* SECTION 3: Engineering */}
      <div className="min-h-[150vh] flex flex-col md:flex-row items-end md:items-center justify-end px-6 pb-32 md:pb-0 md:px-32 section-light relative z-10">
        <div className="text-section max-w-xl text-left md:text-right pointer-events-auto w-full md:w-auto">
          <p className="text-xs md:text-sm tracking-widest uppercase mb-2 opacity-70">02 / Engineering</p>
          <h2 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 tracking-tight">Adaptive<br/>Cushioning</h2>
          <p className="text-base md:text-xl opacity-90 leading-relaxed font-light">
            The sole adapts to your unique foot shape, distributing weight evenly for a weightless sensation throughout the day.
          </p>
        </div>
      </div>

      {/* SECTION 4: Sustainability */}
      <div className="min-h-[150vh] flex flex-col items-center justify-center px-6 md:px-32 section-eco relative z-10">
        <div className="text-section max-w-2xl text-center pointer-events-auto">
          <p className="text-xs md:text-sm tracking-widest uppercase mb-2 opacity-70">03 / Future</p>
          <h2 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 tracking-tight">Zero<br/>Footprint</h2>
          <p className="text-base md:text-xl opacity-90 leading-relaxed font-light mb-10">
            Engineered with 100% recycled polymers and plant-based dyes. We believe that stepping into the future means leaving no trace behind.
          </p>
          <button className="px-10 py-4 bg-foreground text-background text-base md:text-lg font-medium rounded-full hover:bg-accent-brown hover:text-white transition-all duration-300 shadow-xl">
            PRE-ORDER NOW
          </button>
        </div>
      </div>

      {/* NON-3D TESTIMONIALS SECTION */}
      <div className="py-32 px-6 md:px-20 section-testimonials bg-white pointer-events-auto relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-section text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">What Our Wearers Say</h2>
            <p className="text-lg text-gray-600">The verdict is in. Comfort has a new name.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-section bg-gray-50 p-8 rounded-2xl">
              <div className="flex gap-1 mb-4 text-yellow-500">
                ★★★★★
              </div>
              <p className="text-gray-800 italic mb-6">"Literally the most comfortable shoes I have ever worn. It feels like walking on air, yet they look incredibly sleek and professional."</p>
              <p className="font-bold text-sm tracking-widest uppercase">— Sarah J.</p>
            </div>
            
            <div className="text-section bg-gray-50 p-8 rounded-2xl">
              <div className="flex gap-1 mb-4 text-yellow-500">
                ★★★★★
              </div>
              <p className="text-gray-800 italic mb-6">"The leather quality is outstanding. After 6 months of daily wear, they've developed a beautiful patina and somehow gotten even more comfortable."</p>
              <p className="font-bold text-sm tracking-widest uppercase">— Marcus T.</p>
            </div>
            
            <div className="text-section bg-gray-50 p-8 rounded-2xl">
              <div className="flex gap-1 mb-4 text-yellow-500">
                ★★★★★
              </div>
              <p className="text-gray-800 italic mb-6">"I love the sustainability aspect. Knowing I'm wearing a shoe that leaves a zero footprint makes every step feel better."</p>
              <p className="font-bold text-sm tracking-widest uppercase">— Elena R.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
