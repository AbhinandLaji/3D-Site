"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const particleConfig = [
  { size: 3, left: 10, dur: 15, delay: -2 },
  { size: 5, left: 25, dur: 18, delay: -5 },
  { size: 4, left: 45, dur: 12, delay: -1 },
  { size: 6, left: 65, dur: 20, delay: -8 },
  { size: 2, left: 80, dur: 14, delay: -4 },
  { size: 4, left: 90, dur: 17, delay: -10 },
  { size: 3, left: 15, dur: 16, delay: -7 },
  { size: 5, left: 35, dur: 22, delay: -3 },
  { size: 4, left: 55, dur: 13, delay: -9 },
  { size: 3, left: 75, dur: 19, delay: -6 },
];

export default function UIOverlay() {
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

    /* BACKGROUND PHASE TRANSITIONS */
    // Default phase
    document.body.setAttribute("data-theme-phase", "hero");

    ScrollTrigger.create({
      trigger: ".section-brown",
      start: "top 60%",
      end: "bottom top",
      onEnter: () => document.body.setAttribute("data-theme-phase", "materials"),
      onLeaveBack: () => document.body.setAttribute("data-theme-phase", "hero"),
    });

    ScrollTrigger.create({
      trigger: ".section-light",
      start: "top 60%",
      end: "bottom top",
      onEnter: () => document.body.setAttribute("data-theme-phase", "engineering"),
      onLeaveBack: () => document.body.setAttribute("data-theme-phase", "materials"),
    });

    ScrollTrigger.create({
      trigger: ".section-eco",
      start: "top 60%",
      end: "bottom top",
      onEnter: () => document.body.setAttribute("data-theme-phase", "sustainability"),
      onLeaveBack: () => document.body.setAttribute("data-theme-phase", "engineering"),
    });

    ScrollTrigger.create({
      trigger: ".section-testimonials",
      start: "top 80%",
      end: "bottom top",
      onEnter: () => document.body.setAttribute("data-theme-phase", "testimonials"),
      onLeaveBack: () => document.body.setAttribute("data-theme-phase", "sustainability"),
    });

  }, []);

  return (
    <div ref={containerRef} className="relative z-10 w-full pointer-events-none">

      {/* ──────────────── HERO ──────────────── */}
      <div className="h-screen flex flex-col justify-center items-center px-6 md:px-20 section-white overflow-hidden relative">
        
        {/* Floating Particles */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {particleConfig.map((p, i) => (
            <div key={i} className="particle particle-float" style={{
              width: p.size + 'px',
              height: p.size + 'px',
              left: p.left + '%',
              top: '105%',
              animationDuration: p.dur + 's',
              animationDelay: p.delay + 's',
            }} />
          ))}
        </div>

        {/* No overlay — let the vibrant 3D shoe show through fully */}

        {/* Top-left corner detail */}
        <div className="absolute top-24 left-6 md:left-12 z-10 pointer-events-auto opacity-40">
          <div className="text-[10px] tracking-[0.4em] uppercase mb-2">Est. 2024</div>
          <div className="w-8 h-px bg-[var(--gold)]"></div>
        </div>

        {/* Top-right corner detail */}
        <div className="absolute top-24 right-6 md:right-12 z-10 text-right opacity-40">
          <div className="text-[10px] tracking-[0.4em] uppercase mb-2">Collection I</div>
          <div className="w-8 h-px bg-[var(--gold)] ml-auto"></div>
        </div>

        {/* Ghost number */}
        <div className="absolute -bottom-10 -right-8 number-display leading-none opacity-60">01</div>

        {/* Clean semantic H1 for SEO and screen readers */}
        <h1 className="sr-only">STEP INTO THE FUTURE — AURA Premium Red Footwear</h1>

        {/* ── HERO TEXT — both rows split around the same center shoe column ── */}
        <div aria-hidden="true" className="relative z-10 text-center pointer-events-auto w-full max-w-6xl">

          {/* Eyebrow label */}
          <p className="text-[10px] md:text-xs tracking-[0.5em] text-[var(--gold)] uppercase mb-2 font-medium">
            The Anatomy of Elegance
          </p>

          {/* ── ROW 1: "STEP" | [shoe] | "into" ── */}
          <div className="flex items-center justify-center w-full">
            <span className="font-display text-shimmer leading-none flex-1 text-right pr-6 md:pr-10 block" style={{
              fontSize: "clamp(2.8rem, 9.5vw, 8.5rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
            }}>
              STEP
            </span>

            {/* Shared center column — shoe lives here */}
            <div className="hero-shoe-gap flex-shrink-0" style={{
              width: "clamp(240px, 32vw, 420px)",
              height: "clamp(140px, 19vw, 280px)",
            }} />

            <span className="font-display text-shimmer leading-none flex-1 text-left pl-6 md:pl-10 block" style={{
              fontSize: "clamp(2.8rem, 9.5vw, 8.5rem)",
              fontWeight: 300,
              fontStyle: "italic",
              letterSpacing: "-0.02em",
            }}>
              into
            </span>
          </div>

          {/* ── ROW 2: "THE" | [same gap] | "FUTURE" ── */}
          <div className="flex items-center justify-center w-full" style={{ marginTop: "-0.1em" }}>
            <span className="font-display text-shimmer leading-none flex-1 text-right pr-6 md:pr-10 block" style={{
              fontSize: "clamp(2.8rem, 9.5vw, 8.5rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
            }}>
              THE
            </span>

            {/* Same width gap as Row 1 — shoe is visible in BOTH rows */}
            <div className="hero-shoe-gap flex-shrink-0 relative" style={{
              width: "clamp(240px, 32vw, 420px)",
              height: "clamp(140px, 19vw, 280px)",
            }}>
              {/* Subtle label centred under shoe */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-35">
                <div className="w-px h-4 bg-[var(--gold)]" />
                <span className="text-[8px] tracking-[0.35em] uppercase">Premium Red</span>
              </div>
            </div>

            <span className="font-display text-shimmer leading-none flex-1 text-left pl-6 md:pl-10 block" style={{
              fontSize: "clamp(2.8rem, 9.5vw, 8.5rem)",
              fontWeight: 300,
              fontStyle: "italic",
              letterSpacing: "-0.02em",
            }}>
              FUTURE
            </span>
          </div>

          <div className="gold-line mt-10 mb-6 w-32 mx-auto" />

          <p className="text-sm md:text-base font-light tracking-[0.1em] opacity-70">
            Scroll to discover the anatomy of tomorrow.
          </p>

          {/* Scroll indicator */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-16vh] flex flex-col items-center gap-3 animate-bounce">
            <span className="text-[9px] tracking-[0.4em] uppercase opacity-40">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-[var(--gold)] to-transparent"></div>
          </div>
        </div>
      </div>




      {/* ──────────────── MATERIALS ──────────────── */}
      <div className="min-h-[150vh] flex flex-col md:flex-row items-start md:items-center justify-start px-6 pt-40 md:pt-0 md:px-20 section-brown relative z-10">
        
        <div className="absolute -top-8 left-4 md:left-8 number-display opacity-10" style={{ color: "transparent", WebkitTextStroke: "1px var(--text-materials)" }}>02</div>

        <div className="text-section max-w-xl pointer-events-auto relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-6 h-px bg-[var(--gold)]"></div>
            <p className="text-[10px] tracking-[0.5em] uppercase opacity-60">01 — Materials</p>
          </div>
          
          <h2 className="font-display text-shimmer-light" style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 300,
            lineHeight: "0.95",
            letterSpacing: "-0.02em"
          }}>
            Premium<br/><em>Leather</em>
          </h2>

          <div className="gold-line my-8 w-24" />

          <p className="text-sm md:text-base opacity-80 leading-[1.9] font-light max-w-sm">
            Crafted from ethically sourced, full-grain leather. Our shoes develop a rich, natural patina that evolves with every step you take.
          </p>

          {/* Stat row */}
          <div className="mt-10 grid grid-cols-3 gap-6">
            {[["100%", "Full Grain"], ["12+", "Treatments"], ["∞", "Lifespan"]].map(([num, label]) => (
              <div key={label} className="border-t border-[var(--gold)] opacity-80 pt-4">
                <div className="font-display text-2xl opacity-90" style={{ color: "var(--gold)" }}>{num}</div>
                <div className="text-[10px] tracking-[0.2em] uppercase opacity-50 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ──────────────── ENGINEERING ──────────────── */}
      <div className="min-h-[150vh] flex flex-col md:flex-row items-end md:items-center justify-end px-6 pb-40 md:pb-0 md:px-20 section-light relative z-10">
        
        <div className="absolute -top-8 right-4 md:right-8 number-display opacity-10" style={{ color: "transparent", WebkitTextStroke: "1px var(--text-engineering)" }}>03</div>

        <div className="text-section max-w-xl text-left md:text-right pointer-events-auto w-full md:w-auto relative z-10">
          <div className="flex items-center gap-4 mb-8 md:justify-end">
            <p className="text-[10px] tracking-[0.5em] uppercase opacity-60">02 — Engineering</p>
            <div className="w-6 h-px bg-[var(--gold)]"></div>
          </div>

          <h2 className="font-display" style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 300,
            lineHeight: "0.95",
            letterSpacing: "-0.02em",
            color: "var(--text-engineering)"
          }}>
            Adaptive<br/><em>Cushioning</em>
          </h2>

          <div className="gold-line my-8 w-24 md:ml-auto" />

          <p className="text-sm md:text-base leading-[1.9] font-light opacity-80 max-w-sm md:ml-auto">
            The sole adapts to your unique foot shape, distributing weight evenly for a weightless sensation throughout the day.
          </p>

          {/* Feature pills */}
          <div className="mt-10 flex flex-wrap gap-3 md:justify-end">
            {["Memory Foam Core", "Zero-G Midsole", "Adaptive Arch"].map((f) => (
              <span key={f} className="px-4 py-2 rounded-full border border-[var(--text-engineering)] opacity-70 text-[10px] tracking-[0.15em] uppercase font-medium">
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ──────────────── SUSTAINABILITY ──────────────── */}
      <div className="min-h-[150vh] flex flex-col items-center justify-center px-6 md:px-20 section-eco relative z-10 overflow-hidden">

        {/* Decorative corner rings */}
        <div className="absolute top-16 left-8 w-24 h-24 rounded-full border border-[var(--text-sustainability)] opacity-30"></div>
        <div className="absolute top-20 left-12 w-16 h-16 rounded-full border border-[var(--gold)] opacity-30"></div>
        <div className="absolute bottom-16 right-8 w-32 h-32 rounded-full border border-[var(--text-sustainability)] opacity-20"></div>

        <div className="text-section max-w-2xl text-center pointer-events-auto relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-6 h-px bg-[var(--text-sustainability)]"></div>
            <p className="text-[10px] tracking-[0.5em] uppercase opacity-60">03 — Future</p>
            <div className="w-6 h-px bg-[var(--text-sustainability)]"></div>
          </div>

          <h2 className="font-display" style={{
            fontSize: "clamp(3.5rem, 10vw, 8rem)",
            fontWeight: 300,
            lineHeight: "0.95",
            letterSpacing: "-0.02em",
            color: "var(--text-sustainability)"
          }}>
            Zero<br/><em>Footprint</em>
          </h2>

          <div className="h-px my-8 w-24 mx-auto" style={{ background: "linear-gradient(90deg, transparent, var(--text-sustainability), transparent)" }} />

          <p className="text-sm md:text-base leading-[1.9] font-light opacity-75 mb-12">
            Engineered with 100% recycled polymers and plant-based dyes. Every step leaves no trace behind.
          </p>

          <button className="btn-luxury px-12 py-4 rounded-full bg-[var(--gold)] text-[var(--background)] font-bold">
            <span>PRE-ORDER NOW</span>
          </button>
        </div>
      </div>

      {/* ──────────────── TESTIMONIALS ──────────────── */}
      <div className="py-32 px-6 md:px-20 section-testimonials bg-[var(--bg-testimonials)] pointer-events-auto relative z-20">
        <div className="max-w-7xl mx-auto">

          <div className="text-section flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-6">
            <div>
              <p className="text-[10px] tracking-[0.5em] uppercase text-[var(--gold)] mb-4">Testimonials</p>
              <h2 className="font-display" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 300, lineHeight: "1", color: "var(--text-testimonials)" }}>
                Worn &<br/><em>Loved</em>
              </h2>
            </div>
            <div className="gold-line w-full md:w-48 h-px self-center" />
            <div className="text-right hidden md:block opacity-60">
              <p className="text-xs tracking-widest uppercase">3,200+ Reviews</p>
              <p className="font-display text-3xl text-[var(--gold)] mt-1">4.9 ★</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { q: `"The most comfortable shoes I have ever worn. It feels like walking on air, yet they look incredibly sleek."`, name: "Sarah J.", loc: "New York" },
              { q: `"The leather quality is outstanding. After 6 months, they've developed a beautiful patina and gotten even more comfortable."`, name: "Marcus T.", loc: "London" },
              { q: `"I love the sustainability aspect. Knowing I wear a zero footprint shoe makes every step feel better."`, name: "Elena R.", loc: "Berlin" },
            ].map(({ q, name, loc }) => (
              <div key={name} className="text-section card-luxury p-8 rounded-2xl">
                <div className="text-[var(--gold)] text-sm mb-6 tracking-widest">★★★★★</div>
                <p className="opacity-80 text-sm leading-[1.9] mb-8 font-light italic">{q}</p>
                <div className="gold-line mb-4 w-full" />
                <div className="flex justify-between items-center">
                  <p className="text-xs tracking-[0.2em] uppercase font-medium">{name}</p>
                  <p className="text-xs opacity-60 tracking-widest">{loc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

