"use client";

import { useEffect, useRef } from "react";
import { useState, useCallback } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import WatchTapReveal from "./WatchTapReveal";

// FIX #6: LiveClock is isolated into its own component so only it re-renders
// at 21×/sec — the rest of WatchContentSections stays still.
function LiveClock() {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) +
          " : " +
          now.getMilliseconds().toString().padStart(3, "0")
      );
    };
    const timerId = setInterval(updateTime, 47);
    updateTime();
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="font-mono text-5xl md:text-8xl text-foreground font-light tracking-widest mb-12 tabular-nums">
      {timeString}
    </div>
  );
}

// FIX #9: MacroSlideshow uses Next.js <Image> for automatic WebP, lazy loading, and sizing
function MacroSlideshow() {
  const [macroIndex, setMacroIndex] = useState(0);
  const macroImages = ["/macro/macro-1.jpg", "/macro/macro-2.jpg", "/macro/macro-3.jpg"];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setMacroIndex((prev) => (prev + 1) % macroImages.length);
    }, 4000);
    return () => clearInterval(slideTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative z-10 w-3/4 md:w-4/5 aspect-square border border-titanium/20 rounded-full flex items-center justify-center bg-black/10 backdrop-blur-sm overflow-hidden">
      {macroImages.map((src, idx) => (
        <Image
          key={src}
          src={src}
          alt={`Macro shot ${idx + 1}`}
          fill
          sizes="(max-width: 768px) 75vw, 40vw"
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            idx === macroIndex ? "opacity-100" : "opacity-0"
          }`}
          loading={idx === 0 ? "eager" : "lazy"}
        />
      ))}
    </div>
  );
}

export default function WatchContentSections() {
  const containerRef = useRef<HTMLDivElement>(null);
  const specNumbersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const bandContainerRef = useRef<HTMLDivElement>(null);
  const bandWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // FIX #4: Track only the triggers we create — never call ScrollTrigger.getAll().kill()
    const ownTriggers: ScrollTrigger[] = [];

    // Section 1: Specs Count Up
    specNumbersRef.current.forEach((el) => {
      if (!el) return;
      const targetVal = parseFloat(el.getAttribute("data-target") || "0");

      const ctx = gsap.context(() => {
        gsap.fromTo(
          el,
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
            onUpdate: function () {
              if (el.getAttribute("data-suffix")) {
                el.innerHTML =
                  Math.round(Number(this.targets()[0].innerHTML)) +
                  el.getAttribute("data-suffix")!;
              } else {
                el.innerHTML = Math.round(
                  Number(this.targets()[0].innerHTML)
                ).toString();
              }
            },
          }
        );
      });

      // Register cleanup of GSAP context instead of global kill
      return () => ctx.revert();
    });

    // Section 2: Complications Fade In
    const complications = gsap.utils.toArray(".complication");
    gsap.fromTo(
      complications,
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
          onToggle: (self) => ownTriggers.push(self), // FIX #4
        },
      }
    );

    // Section 3: Horizontal Scroll (The Band)
    if (bandWrapperRef.current && bandContainerRef.current) {
      const sections = gsap.utils.toArray<HTMLElement>(".band-panel");

      const bandSt = gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: bandWrapperRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + bandContainerRef.current?.offsetWidth,
        },
      });

      // FIX #4: Push the trigger we own so we can kill only it
      if (bandSt.scrollTrigger) ownTriggers.push(bandSt.scrollTrigger);
    }

    // FIX #4: Kill only our own triggers — never touches WatchSequenceHero's triggers
    return () => {
      ownTriggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative z-20 w-full bg-background overflow-hidden">

      {/* SECTION 1: THE CASE */}
      <section className="relative min-h-screen flex flex-col md:flex-row items-center py-20 px-6 md:px-20 bg-background text-foreground">
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-brushed opacity-30"></div>
          {/* FIX #9: MacroSlideshow now uses Next.js <Image> */}
          <MacroSlideshow />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center pl-0 md:pl-20 mt-12 md:mt-0">
          <h3 className="font-mono text-gold text-sm tracking-[0.3em] uppercase mb-6">The Case</h3>
          <h2 className="font-display text-4xl md:text-6xl font-light mb-8 text-engraved">
            Grade 5 titanium. <br />Sapphire crystal. <br />50 meters of quiet confidence.
          </h2>

          <div className="flex flex-col gap-8 mt-12 border-l border-titanium/20 pl-8">
            <div>
              <div className="text-4xl font-mono font-light text-titanium">
                <span ref={(el) => { specNumbersRef.current[0] = el; }} data-target="42" data-suffix="mm">0mm</span>
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-foreground/50 mt-2">Case Diameter</div>
            </div>
            <div>
              <div className="text-4xl font-mono font-light text-titanium">
                <span ref={(el) => { specNumbersRef.current[1] = el; }} data-target="72" data-suffix="hrs">0hrs</span>
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-foreground/50 mt-2">Power Reserve</div>
            </div>
            <div>
              <div className="text-4xl font-mono font-light text-titanium">
                <span ref={(el) => { specNumbersRef.current[2] = el; }} data-target="100" data-suffix="m">0m</span>
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-foreground/50 mt-2">Water Resistance</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE MOVEMENT */}
      <WatchTapReveal aodImage="/images/watch-aod.jpg" activeImage="/images/watch-active.jpg" />

          {/* Panel 1: Leather */}
          <div className="band-panel w-screen h-full flex flex-col md:flex-row items-center justify-center p-8 md:p-24 relative border-r border-titanium/10 overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(185,28,28,0.15)_0%,transparent_70%)]"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-12 md:gap-20">
              {/* Text column */}
              <div className="flex flex-col items-start max-w-md w-full">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                  <span className="font-mono text-gold text-xs tracking-[0.4em] uppercase font-semibold">Tuscan Atelier</span>
                </div>
                <h2 className="font-display text-4xl md:text-6xl font-light text-foreground mb-6 leading-none">
                  Italian <br /><span className="italic font-normal text-gold">Leather</span>
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-titanium mb-8 font-light">
                  Sourced from historic tanneries in Florence. This supple full-grain strap breathes gracefully and patinas uniquely over time, telling your personal story.
                </p>
                {/* Tech spec details */}
                <div className="grid grid-cols-2 gap-6 w-full pt-6 border-t border-titanium/10 font-mono text-[10px] uppercase tracking-widest text-titanium/60">
                  <div>
                    <div className="text-foreground font-semibold mb-1">Thickness</div>
                    <div>2.8mm tapered</div>
                  </div>
                  <div>
                    <div className="text-foreground font-semibold mb-1">Origin</div>
                    <div>Florence, Italy</div>
                  </div>
                </div>
              </div>
              
              {/* Image column with luxury frame */}
              <div className="relative w-full md:w-1/2 aspect-video md:aspect-[4/3] max-w-lg border border-titanium/20 bg-black/40 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
                <Image src="/images/leather-band.png" alt="Italian Leather Band" fill className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" sizes="(max-width: 768px) 100vw, 550px" />
                <div className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40 bg-black/40 px-3 py-1 rounded backdrop-blur-sm border border-white/5">
                  Caliber Selection / 01
                </div>
              </div>
            </div>
          </div>

          {/* Panel 2: Titanium */}
          <div className="band-panel w-screen h-full flex flex-col md:flex-row items-center justify-center p-8 md:p-24 relative border-r border-titanium/10 overflow-hidden">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,rgba(138,138,142,0.2)_0%,transparent_70%)]"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-12 md:gap-20">
              {/* Text column */}
              <div className="flex flex-col items-start max-w-md w-full">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                  <span className="font-mono text-gold text-xs tracking-[0.4em] uppercase font-semibold">Aerospace Grade</span>
                </div>
                <h2 className="font-display text-4xl md:text-6xl font-light text-foreground mb-6 leading-none">
                  Titanium <br /><span className="italic font-normal text-gold">Link</span>
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-titanium mb-8 font-light">
                  Sculpted from Grade 5 titanium. Each individual link is micro-polished for a perfect weight-to-durability balance that feels virtually weightless on the wrist.
                </p>
                {/* Tech spec details */}
                <div className="grid grid-cols-2 gap-6 w-full pt-6 border-t border-titanium/10 font-mono text-[10px] uppercase tracking-widest text-titanium/60">
                  <div>
                    <div className="text-foreground font-semibold mb-1">Material</div>
                    <div>Grade 5 Titanium</div>
                  </div>
                  <div>
                    <div className="text-foreground font-semibold mb-1">Locking</div>
                    <div>Butterfly clasp</div>
                  </div>
                </div>
              </div>
              
              {/* Image column with luxury frame */}
              <div className="relative w-full md:w-1/2 aspect-video md:aspect-[4/3] max-w-lg border border-titanium/20 bg-black/40 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
                <Image src="/images/titanium-band.png" alt="Titanium Link Band" fill className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" sizes="(max-width: 768px) 100vw, 550px" />
                <div className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40 bg-black/40 px-3 py-1 rounded backdrop-blur-sm border border-white/5">
                  Caliber Selection / 02
                </div>
              </div>
            </div>
          </div>

          {/* Panel 3: Sport */}
          <div className="band-panel w-screen h-full flex flex-col md:flex-row items-center justify-center p-8 md:p-24 relative overflow-hidden">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,rgba(30,58,95,0.25)_0%,transparent_70%)]"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-12 md:gap-20">
              {/* Text column */}
              <div className="flex flex-col items-start max-w-md w-full">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                  <span className="font-mono text-gold text-xs tracking-[0.4em] uppercase font-semibold">Active Motion</span>
                </div>
                <h2 className="font-display text-4xl md:text-6xl font-light text-foreground mb-6 leading-none">
                  Sport <br /><span className="italic font-normal text-gold">Fluoro</span>
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-titanium mb-8 font-light">
                  Molded from high-performance fluoroelastomer. Impervious to sweat, water, and elements, yet surprisingly soft. Engineered to stretch with every pulse.
                </p>
                {/* Tech spec details */}
                <div className="grid grid-cols-2 gap-6 w-full pt-6 border-t border-titanium/10 font-mono text-[10px] uppercase tracking-widest text-titanium/60">
                  <div>
                    <div className="text-foreground font-semibold mb-1">Durability</div>
                    <div>Element resistant</div>
                  </div>
                  <div>
                    <div className="text-foreground font-semibold mb-1">Texture</div>
                    <div>Smooth satin</div>
                  </div>
                </div>
              </div>
              
              {/* Image column with luxury frame */}
              <div className="relative w-full md:w-1/2 aspect-video md:aspect-[4/3] max-w-lg border border-titanium/20 bg-black/40 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
                <Image src="/images/sport-band.png" alt="Sport Fluoroelastomer Band" fill className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" sizes="(max-width: 768px) 100vw, 550px" />
                <div className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/40 bg-black/40 px-3 py-1 rounded backdrop-blur-sm border border-white/5">
                  Caliber Selection / 03
                </div>
              </div>
            </div>
          </div>

      {/* SECTION 4: TIMEKEEPING */}
      <section className="relative min-h-screen flex items-center justify-center py-20 px-6 bg-midnight overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <svg className="w-[150vw] h-[150vw] animate-[spin_240s_linear_infinite]" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 2" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.2" />
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={i} x1="50" y1="5" x2="50" y2="10" transform={`rotate(${i * 30} 50 50)`} stroke="currentColor" strokeWidth="1" />
            ))}
          </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <h3 className="font-mono text-gold text-sm tracking-[0.3em] uppercase mb-12">Timekeeping</h3>
          {/* FIX #6: Isolated — only this component re-renders at 21×/sec */}
          <LiveClock />
          <h2 className="font-display text-2xl md:text-4xl font-light text-titanium max-w-2xl">
            It tells time. <br />It tells your story. <br />It knows when to stay silent.
          </h2>
        </div>
      </section>

      {/* SECTION 5: CONFIGURE YOURS */}
      <section className="relative min-h-screen py-32 px-6 md:px-20 bg-background flex flex-col items-center">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-6xl font-light text-engraved mb-6">The Atelier</h2>
          <p className="font-mono text-sm tracking-[0.2em] text-titanium uppercase">Select your caliber</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {[
            { name: "Midnight Titanium", desc: "Grade 5 Titanium / Stealth Band", color: "bg-zinc-800", image: "/images/variant-midnight.png" },
            { name: "Champagne Gold", desc: "18k PVD Coating / Leather Band", color: "bg-amber-700/50", image: "/images/variant-gold.png" },
            { name: "Deep Sapphire", desc: "Ceramic Case / Sport Band", color: "bg-blue-900/50", image: "/images/variant-sapphire.png" },
          ].map((variant, i) => (
            <div key={i} className="group flex flex-col items-center cursor-pointer">
              <div className="w-full aspect-[3/4] border border-titanium/20 bg-black/10 flex items-center justify-center relative overflow-hidden mb-6 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
                <Image src={variant.image} alt={variant.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 350px" />
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${variant.color}`}></div>
              </div>
              <h3 className="font-display text-2xl mb-2 text-foreground group-hover:text-gold transition-colors duration-300">{variant.name}</h3>
              <p className="font-mono text-xs text-titanium uppercase tracking-widest text-center">{variant.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <button className="btn-luxury px-12 py-5 tracking-[0.3em] rounded">
            <span>Reserve Your AURA</span>
          </button>
        </div>
      </section>

    </div>
  );
}
