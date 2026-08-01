"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContentSections() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".text-section");

    sections.forEach((section) => {
      // Staggered reveal for children
      gsap.fromTo(section.children,
        { opacity: 0, y: 40, filter: "blur(4px)" },
        {
          opacity: 1, y: 0, filter: "blur(0px)",
          duration: 1.2, ease: "power4.out",
          stagger: 0.2,
          scrollTrigger: { trigger: section, start: "top 85%", end: "top 40%", scrub: 1.2 },
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef}>
      {/* Company / Brokerage Story Section */}
      <section className="relative z-10 py-32 px-6 md:px-20 bg-background text-foreground">
        <div className="max-w-4xl mx-auto text-center text-section">
          <p className="text-[10px] tracking-[0.5em] text-[var(--gold)] uppercase mb-4 font-medium">
            Our Story
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-light mb-8">
            Driven by <em className="text-[var(--gold)] font-serif italic">Passion</em>
          </h2>
          <div className="gold-line mx-auto w-24 h-px bg-[var(--gold)] mb-8" />
          <p className="text-lg opacity-80 leading-relaxed font-light">
            We source the finest sports cars from around the world, ensuring each vehicle 
            meets our exacting standards for performance, history, and pure driving exhilaration. 
            Experience the pinnacle of automotive engineering and unparalleled service tailored 
            for the true enthusiast.
          </p>
        </div>
      </section>

      {/* Car Inventory Showcase - Placeholder Grid */}
      <section className="relative z-10 py-20 px-6 md:px-20 bg-[var(--bg-testimonials)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-section flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <p className="text-[10px] tracking-[0.5em] text-[var(--gold)] uppercase mb-4 font-medium">
                Inventory
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-light">
                Current <em className="text-[var(--gold)] font-serif italic">Collection</em>
              </h2>
            </div>
            <button className="text-xs tracking-widest uppercase border-b border-[var(--gold)] pb-1 hover:text-[var(--gold)] transition-colors opacity-80 hover:opacity-100">
              View All
            </button>
          </div>

          {/* Grid of 6 empty cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item, index) => (
              <div 
                key={item}
                className="text-section card-luxury rounded-2xl overflow-hidden group cursor-pointer border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 transition-colors duration-500"
              >
                {/* Image Placeholder */}
                <div className="aspect-[4/3] bg-foreground/10 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <span className="text-xs tracking-widest uppercase font-medium">Image Coming Soon</span>
                  </div>
                </div>
                {/* Details Placeholder */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-display text-xl font-medium">Vehicle Model {item}</h3>
                    <span className="text-[var(--gold)] text-sm tracking-wider">POA</span>
                  </div>
                  <div className="flex gap-4 text-xs opacity-60 tracking-wider">
                    <span>2024</span>
                    <span>•</span>
                    <span>1,200 mi</span>
                    <span>•</span>
                    <span>Auto</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
