"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function WatchContentSections() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for animations
  const specNumbersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const bandContainerRef = useRef<HTMLDivElement>(null);
  const bandWrapperRef = useRef<HTMLDivElement>(null);
  
  // Live time state for Section 4
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    // Live clock update
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " : " + now.getMilliseconds().toString().padStart(3, '0')
      );
    };
    const timerId = setInterval(updateTime, 47); // fast update for milliseconds
    updateTime();

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Section 1: Specs Count Up
    specNumbersRef.current.forEach((el) => {
      if (!el) return;
      const targetVal = parseFloat(el.getAttribute("data-target") || "0");
      
      gsap.fromTo(el, 
        { innerHTML: 0 },
        {
          innerHTML: targetVal,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
          snap: { innerHTML: 1 },
          onUpdate: function() {
            if(el.getAttribute("data-suffix")) {
               el.innerHTML = Math.round(Number(this.targets()[0].innerHTML)) + el.getAttribute("data-suffix")!;
            } else {
               el.innerHTML = Math.round(Number(this.targets()[0].innerHTML)).toString();
            }
          }
        }
      );
    });

    // Section 2: Complications Fade In
    const complications = gsap.utils.toArray('.complication');
    gsap.fromTo(complications, 
      { opacity: 0, scale: 0.8, y: 10 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".movement-section",
          start: "top 50%",
        }
      }
    );

    // Section 3: Horizontal Scroll (The Band)
    if (bandWrapperRef.current && bandContainerRef.current) {
      const sections = gsap.utils.toArray('.band-panel');
      
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: bandWrapperRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + bandContainerRef.current?.offsetWidth,
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative z-20 w-full bg-background overflow-hidden">
      
      {/* SECTION 1: THE CASE (Materials) */}
      <section className="relative min-h-screen flex flex-col md:flex-row items-center py-20 px-6 md:px-20 bg-background text-foreground">
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden flex items-center justify-center">
          {/* Placeholder for Macro Image */}
          <div className="absolute inset-0 bg-brushed opacity-30"></div>
          <div className="relative z-10 w-3/4 aspect-square border border-titanium/20 rounded-full flex items-center justify-center bg-black/10 backdrop-blur-sm">
            <span className="font-mono text-titanium/50 text-xs tracking-widest">[MACRO SHOT PLACEHOLDER]</span>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center pl-0 md:pl-20 mt-12 md:mt-0">
          <h3 className="font-mono text-gold text-sm tracking-[0.3em] uppercase mb-6">The Case</h3>
          <h2 className="font-display text-4xl md:text-6xl font-light mb-8 text-engraved">Grade 5 titanium. <br/>Sapphire crystal. <br/>50 meters of quiet confidence.</h2>
          
          <div className="flex flex-col gap-8 mt-12 border-l border-titanium/20 pl-8">
            <div>
              <div className="text-4xl font-mono font-light text-titanium">
                <span ref={el => {specNumbersRef.current[0] = el}} data-target="42" data-suffix="mm">0mm</span>
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-foreground/50 mt-2">Case Diameter</div>
            </div>
            <div>
              <div className="text-4xl font-mono font-light text-titanium">
                <span ref={el => {specNumbersRef.current[1] = el}} data-target="72" data-suffix="hrs">0hrs</span>
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-foreground/50 mt-2">Power Reserve</div>
            </div>
            <div>
              <div className="text-4xl font-mono font-light text-titanium">
                <span ref={el => {specNumbersRef.current[2] = el}} data-target="100" data-suffix="m">0m</span>
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-foreground/50 mt-2">Water Resistance</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE MOVEMENT (Technology) */}
      <section className="movement-section relative min-h-screen flex flex-col items-center justify-center py-32 px-6 md:px-20 bg-midnight text-foreground border-y border-titanium/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--sapphire)_0%,_transparent_70%)] opacity-10"></div>
        
        <div className="relative z-10 text-center max-w-3xl mx-auto mb-20">
          <h3 className="font-mono text-gold text-sm tracking-[0.3em] uppercase mb-6">The Movement</h3>
          <h2 className="font-display text-3xl md:text-5xl font-light text-engraved">A chipset engineered for decades,<br/>not upgrade cycles.</h2>
        </div>

        <div className="relative w-full max-w-xl aspect-square rounded-full border border-titanium/20 bg-black/40 backdrop-blur-md flex items-center justify-center">
          <span className="font-mono text-titanium/30 text-xs tracking-widest">[WATCH FACE PLACEHOLDER]</span>
          
          {/* Complications */}
          <div className="complication absolute top-[25%] right-[25%] w-16 h-16 rounded-full border border-gold/30 flex flex-col items-center justify-center bg-black/50">
            <span className="text-[10px] font-mono text-gold">28</span>
            <span className="text-[8px] font-mono text-titanium uppercase">Date</span>
          </div>
          <div className="complication absolute bottom-[25%] left-[25%] w-20 h-20 rounded-full border border-titanium/30 flex flex-col items-center justify-center bg-black/50">
            <div className="w-10 h-10 rounded-full bg-sapphire/20 border border-sapphire/50"></div>
            <span className="text-[8px] font-mono text-titanium uppercase mt-1">Phase</span>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE BAND (Craftsmanship) */}
      <section ref={bandWrapperRef} className="relative h-screen bg-background overflow-hidden">
        <div ref={bandContainerRef} className="absolute top-0 left-0 h-full w-[300vw] flex">
          
          <div className="band-panel w-screen h-full flex flex-col md:flex-row items-center justify-center p-12 md:p-24 relative border-r border-titanium/10">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-tr from-amber-900 to-transparent"></div>
            <div className="relative z-10 flex flex-col items-start max-w-lg">
              <h3 className="font-mono text-gold text-sm tracking-[0.3em] uppercase mb-4">Italian Leather</h3>
              <p className="font-display text-2xl md:text-4xl font-light text-foreground mb-6">Supple. Breathable. Patinas beautifully over time.</p>
              <div className="w-full h-48 border border-titanium/20 bg-black/20 flex items-center justify-center">
                 <span className="font-mono text-titanium/50 text-xs tracking-widest">[LEATHER BAND IMG]</span>
              </div>
            </div>
          </div>

          <div className="band-panel w-screen h-full flex flex-col md:flex-row items-center justify-center p-12 md:p-24 relative border-r border-titanium/10">
            <div className="absolute inset-0 bg-brushed opacity-20"></div>
            <div className="relative z-10 flex flex-col items-start max-w-lg">
              <h3 className="font-mono text-gold text-sm tracking-[0.3em] uppercase mb-4">Titanium Link</h3>
              <p className="font-display text-2xl md:text-4xl font-light text-foreground mb-6">Machined from aerospace-grade Grade 5 titanium.</p>
              <div className="w-full h-48 border border-titanium/20 bg-black/20 flex items-center justify-center">
                 <span className="font-mono text-titanium/50 text-xs tracking-widest">[TITANIUM BAND IMG]</span>
              </div>
            </div>
          </div>

          <div className="band-panel w-screen h-full flex flex-col md:flex-row items-center justify-center p-12 md:p-24 relative">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-b from-blue-900 to-black"></div>
            <div className="relative z-10 flex flex-col items-start max-w-lg">
              <h3 className="font-mono text-gold text-sm tracking-[0.3em] uppercase mb-4">Sport Fluoroelastomer</h3>
              <p className="font-display text-2xl md:text-4xl font-light text-foreground mb-6">Impervious to elements. Engineered for motion.</p>
              <div className="w-full h-48 border border-titanium/20 bg-black/20 flex items-center justify-center">
                 <span className="font-mono text-titanium/50 text-xs tracking-widest">[SPORT BAND IMG]</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: TIMEKEEPING (Experience) */}
      <section className="relative min-h-screen flex items-center justify-center py-20 px-6 bg-midnight overflow-hidden">
        {/* Background Abstract Gear SVG */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <svg className="w-[150vw] h-[150vw] animate-[spin_240s_linear_infinite]" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2"/>
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.2"/>
            {Array.from({length: 12}).map((_, i) => (
              <line key={i} x1="50" y1="5" x2="50" y2="10" transform={`rotate(${i*30} 50 50)`} stroke="currentColor" strokeWidth="1"/>
            ))}
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <h3 className="font-mono text-gold text-sm tracking-[0.3em] uppercase mb-12">Timekeeping</h3>
          
          <div className="font-mono text-5xl md:text-8xl text-foreground font-light tracking-widest mb-12 tabular-nums">
            {timeString}
          </div>

          <h2 className="font-display text-2xl md:text-4xl font-light text-titanium max-w-2xl">
            It tells time. <br/>It tells your story. <br/>It knows when to stay silent.
          </h2>
        </div>
      </section>

      {/* SECTION 5: CONFIGURE YOURS (CTA) */}
      <section className="relative min-h-screen py-32 px-6 md:px-20 bg-background flex flex-col items-center">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-6xl font-light text-engraved mb-6">The Atelier</h2>
          <p className="font-mono text-sm tracking-[0.2em] text-titanium uppercase">Select your caliber</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {[
            { name: "Midnight Titanium", desc: "Grade 5 Titanium / Stealth Band", color: "bg-zinc-800" },
            { name: "Champagne Gold", desc: "18k PVD Coating / Leather Band", color: "bg-amber-700/50" },
            { name: "Deep Sapphire", desc: "Ceramic Case / Sport Band", color: "bg-blue-900/50" }
          ].map((variant, i) => (
            <div key={i} className="group flex flex-col items-center cursor-pointer">
              <div className="w-full aspect-[3/4] border border-titanium/20 bg-black/10 flex items-center justify-center relative overflow-hidden mb-6 transition-colors duration-500 hover:bg-black/20">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${variant.color}`}></div>
                <div className="w-32 h-32 rounded-full border border-titanium/30 flex items-center justify-center relative z-10">
                  <span className="font-mono text-[10px] text-titanium/50">VARIANT {i+1}</span>
                </div>
              </div>
              <h3 className="font-display text-2xl mb-2">{variant.name}</h3>
              <p className="font-mono text-xs text-titanium uppercase tracking-widest text-center">{variant.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <button className="btn-luxury px-12 py-5 tracking-[0.3em]">
            <span>Reserve Your AURA</span>
          </button>
        </div>
      </section>

    </div>
  );
}
