"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
// Re-compile trigger comment to clear dev server stale cache
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import WatchTapReveal from "./WatchTapReveal";

// Live clock component: runs isolated to prevent re-rendering the entire page
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

// Macro slideshow in Section 1
function MacroSlideshow() {
  const [macroIndex, setMacroIndex] = useState(0);
  const macroImages = ["/macro/macro-1.jpg", "/macro/macro-2.jpg", "/macro/macro-3.jpg"];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setMacroIndex((prev) => (prev + 1) % macroImages.length);
    }, 4000);
    return () => clearInterval(slideTimer);
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
  const timekeepingSectionRef = useRef<HTMLDivElement>(null);

  // Stateful Slider for The Band (restructured to match GLIDESPEAKERS mockup layout)
  const [activeSlide, setActiveSlide] = useState(0);
  
  const bandSlides = [
    {
      name: "Italian Leather",
      tagline: "TUSCAN ATELIER",
      desc: "Sourced from historic tanneries in Florence. This supple full-grain strap breathes gracefully and patinas uniquely over time, telling your personal story.",
      image: "/images/leather-band.png",
      detailImage: "/images/leather-detail.png",
      link: "#",
      accent: "#b91c1c",
      specs: [
        { label: "Thickness", value: "2.8mm tapered" },
        { label: "Origin", value: "Florence, Italy" },
        { label: "Stitching", value: "Hand-threaded" }
      ]
    },
    {
      name: "Titanium Link",
      tagline: "AEROSPACE GRADE",
      desc: "Sculpted from Grade 5 titanium. Each individual link is micro-polished for a perfect weight-to-durability balance that feels virtually weightless on the wrist.",
      image: "/images/titanium-band.png",
      detailImage: "/images/titanium-detail.png",
      link: "#",
      accent: "#8a8a8e",
      specs: [
        { label: "Material", value: "Grade 5 Titanium" },
        { label: "Locking", value: "Butterfly clasp" },
        { label: "Finish", value: "Micro-polished" }
      ]
    },
    {
      name: "Sport Fluoro",
      tagline: "ACTIVE MOTION",
      desc: "Molded from high-performance fluoroelastomer. Impervious to sweat, water, and elements, yet surprisingly soft. Engineered to stretch with every pulse.",
      image: "/images/sport-band.png",
      detailImage: "/images/sport-detail.png",
      link: "#",
      accent: "#1e3a5f",
      specs: [
        { label: "Durability", value: "Water resistant" },
        { label: "Texture", value: "Smooth satin" },
        { label: "Closure", value: "Pin-and-tuck" }
      ]
    }
  ];

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % bandSlides.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + bandSlides.length) % bandSlides.length);
  };

  const scrollDownToTimekeeping = () => {
    timekeepingSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Specs Count Up Animation
      specNumbersRef.current.forEach((el) => {
        if (!el) return;
        const targetVal = parseFloat(el.getAttribute("data-target") || "0");

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
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative z-20 w-full bg-background overflow-hidden">

      {/* SECTION 1: THE CASE */}
      <section className="relative min-h-screen flex flex-col md:flex-row items-center py-20 px-6 md:px-20 bg-background text-foreground">
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-brushed opacity-30"></div>
          <MacroSlideshow />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center pl-0 md:pl-20 mt-12 md:mt-0">
          <h3 className="font-mono text-gold text-sm tracking-[0.3em] uppercase mb-6 font-semibold">The Case</h3>
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

      {/* SECTION 3: THE BAND SLIDER (GlideSpeakers Restructure) */}
      <section className="relative min-h-[125vh] bg-[#07070a] text-foreground flex flex-col justify-between overflow-hidden py-10 px-6 md:px-16 border-t border-titanium/5">
        
        {/* Slider Header */}
        <div className="flex justify-between items-center w-full relative z-30">
          <span className="font-display text-lg tracking-[0.3em] font-light text-foreground opacity-90">AURA / STRAPS</span>
          <div className="hidden md:flex gap-10 font-mono text-[10px] tracking-[0.35em] uppercase text-titanium">
            <span className="hover:text-foreground cursor-pointer transition-colors duration-300">Materials</span>
            <span className="hover:text-foreground cursor-pointer transition-colors duration-300">Calibers</span>
            <span className="hover:text-foreground cursor-pointer transition-colors duration-300">Reserve</span>
          </div>
          <div className="w-8 h-8 rounded-full border border-titanium/30 flex items-center justify-center cursor-pointer hover:border-gold transition-colors duration-300">
            <div className="w-3.5 h-[1.5px] bg-foreground"></div>
          </div>
        </div>

        {/* Slider Main Viewport */}
        <div className="relative flex-grow flex flex-col items-center justify-center w-full z-20 my-6">
          
          {/* Slides Track */}
          <div className="relative w-full max-w-5xl h-[330px] md:h-[350px] flex items-center justify-center">
            {bandSlides.map((slide, index) => {
              // Calculate offset relative to active slide
              let offset = index - activeSlide;
              if (offset < -1) offset += bandSlides.length;
              if (offset > 1) offset -= bandSlides.length;

              const isActive = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;

              return (
                <div
                  key={slide.name}
                  onClick={() => {
                    if (isLeft) handlePrev();
                    if (isRight) handleNext();
                  }}
                  className={`absolute transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col items-center select-none
                    ${isActive ? "z-20 scale-100 opacity-100 cursor-default" : "z-10 scale-[0.6] opacity-20 cursor-pointer blur-[1px] hover:opacity-35"}
                  `}
                  style={{
                    transform: `translateX(${offset * 105}%)`,
                    pointerEvents: isActive ? "auto" : "auto",
                  }}
                >
                  {/* Card Image */}
                  <div className={`relative w-[240px] md:w-[280px] aspect-[3/4] rounded-lg overflow-hidden border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.8)] transition-all duration-700
                    ${isActive ? "scale-100" : "scale-[0.9]"}
                  `}>
                    <Image
                      src={slide.image}
                      alt={slide.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 240px, 280px"
                      priority={index === 0}
                    />
                    
                    {/* Dark gradient base inside image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>
                    
                    {/* Slide Text Overlaid inside bottom of the Active Card */}
                    {isActive && (
                      <div className="absolute bottom-6 left-6 right-6 text-left">
                        <span className="font-mono text-[9px] tracking-[0.4em] text-gold uppercase font-semibold block mb-2">{slide.tagline}</span>
                        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-none">
                          {slide.name}
                        </h2>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Slide Specs details & Detail Image below the Card Track */}
          <div className="mt-10 w-full max-w-4xl px-6 md:px-12 flex flex-col md:flex-row items-center md:items-start justify-between gap-10 min-h-[160px] animate-[fadeIn_0.8s_ease-out]">
            {/* Left side: Specs & Description */}
            <div className="flex-1 text-left flex flex-col items-start gap-5">
              <p className="text-xs md:text-sm text-titanium leading-relaxed font-light max-w-md">
                {bandSlides[activeSlide].desc}
              </p>
              <div className="grid grid-cols-3 gap-6 w-full pt-4 border-t border-titanium/10 font-mono text-[9px] uppercase tracking-widest text-titanium/60">
                {bandSlides[activeSlide].specs.map((spec) => (
                  <div key={spec.label}>
                    <div className="text-foreground font-semibold mb-0.5">{spec.label}</div>
                    <div>{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Detail image & Reserve Button */}
            <div className="flex items-center gap-6">
              <div className="relative w-28 h-20 border border-titanium/20 bg-black/45 rounded overflow-hidden shadow-lg group">
                <Image src={bandSlides[activeSlide].detailImage} alt="Strap Macro Detail" fill className="object-cover transition-transform duration-700 hover:scale-110" sizes="112px" />
              </div>
              <div className="flex flex-col items-start gap-3">
                <button className="px-6 py-2.5 rounded border border-titanium/30 hover:border-gold hover:text-gold text-[9px] tracking-[0.25em] uppercase font-mono transition-all duration-300 bg-transparent">
                  Reserve {bandSlides[activeSlide].name.split(" ")[0]}
                </button>
                <span className="font-mono text-[8px] tracking-[0.3em] text-titanium/40 uppercase">Macro view / 40x</span>
              </div>
            </div>
          </div>

          {/* Bottom Navigation Buttons placed BELOW the contents */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-titanium/20 flex items-center justify-center text-titanium hover:text-foreground hover:border-gold hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-titanium/20 flex items-center justify-center text-titanium hover:text-foreground hover:border-gold hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

        </div>

        {/* Bottom Left: Scroll Down indicator */}
        <div className="flex justify-start w-full relative z-30 pt-2">
          <button
            onClick={scrollDownToTimekeeping}
            className="w-10 h-10 rounded-full border border-titanium/20 flex items-center justify-center text-titanium hover:text-foreground hover:border-gold transition-all duration-300 animate-pulse cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </button>
        </div>

      </section>

      {/* SECTION 4: TIMEKEEPING */}
      <div ref={timekeepingSectionRef}>
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
            <LiveClock />
            <h2 className="font-display text-2xl md:text-4xl font-light text-titanium max-w-2xl">
              It tells time. <br />It tells your story. <br />It knows when to stay silent.
            </h2>
          </div>
        </section>
      </div>

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
