"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Configuration
const FRAME_COUNT = 240;
const CRITICAL_FRAMES = 40; // Frames needed before scroll unlocks
const SEQUENCE_PATH = '/sequence';

// --- Scroll Mapping Configuration ---
interface ScrollSegment {
  name: string;
  scrollStart: number;
  scrollEnd: number;
  frameStart: number;
  frameEnd: number;
}

const SCROLL_SEGMENTS: ScrollSegment[] = [
  { name: "hold intro",    scrollStart: 0.0, scrollEnd: 0.1, frameStart: 0,   frameEnd: 40  },
  { name: "explosion",     scrollStart: 0.1, scrollEnd: 0.7, frameStart: 41,  frameEnd: 180 },
  { name: "hold exploded", scrollStart: 0.7, scrollEnd: 1.0, frameStart: 181, frameEnd: 239 },
];

function getFrameUrl(index: number): string {
  const padded = String(index).padStart(3, '0');
  return `${SEQUENCE_PATH}/watch-frame-${padded}.jpg`;
}

export default function WatchSequenceHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadingContainerRef = useRef<HTMLDivElement>(null);
  const loadingTextRef = useRef<HTMLDivElement>(null);

  // FIX #5: Track loaded count in a ref — avoid 240 re-renders + 240 GSAP setups.
  // Only update state (for the progress bar) every ~10 frames and on completion.
  const loadedCountRef = useRef(0);
  const [loadedImages, setLoadedImages] = useState(0);
  const scrollUnlockedRef = useRef(false);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const animationObj = useRef({ frame: 0 });

  // Render function — draws the current frame onto the canvas
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const logicalWidth = canvas.clientWidth || canvas.width;
    const logicalHeight = canvas.clientHeight || canvas.height;

    const canvasRatio = logicalWidth / logicalHeight;
    const imgRatio = img.width / img.height;

    let drawWidth = logicalWidth;
    let drawHeight = logicalHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = logicalWidth / imgRatio;
      offsetY = (logicalHeight - drawHeight) / 2;
    } else {
      drawWidth = logicalHeight * imgRatio;
      offsetX = (logicalWidth - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, logicalWidth, logicalHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // FIX #1: Progressive loading — lock scroll only until CRITICAL_FRAMES are ready,
  // then continue loading the rest in the background without blocking the user.
  useEffect(() => {
    document.documentElement.classList.add("lenis-stopped");

    const onImageLoaded = (i: number) => {
      loadedCountRef.current++;
      const count = loadedCountRef.current;

      // Only trigger a React state update every 10 frames (for the progress bar),
      // and always on critical milestone + full completion.
      if (count % 10 === 0 || count === CRITICAL_FRAMES || count === FRAME_COUNT) {
        setLoadedImages(count);
      }

      // FIX #1: Unlock scroll after critical frames are ready
      if (count === CRITICAL_FRAMES && !scrollUnlockedRef.current) {
        scrollUnlockedRef.current = true;
        renderFrame(0);

        if (loadingTextRef.current && loadingContainerRef.current) {
          gsap.timeline({
            onComplete: () => {
              document.documentElement.classList.remove("lenis-stopped");
              if (loadingContainerRef.current) {
                loadingContainerRef.current.style.display = "none";
              }
            },
          })
            .to(loadingTextRef.current, { opacity: 0, y: 20, duration: 0.5, ease: "power2.inOut" })
            .to(loadingContainerRef.current, { opacity: 0, duration: 0.8, ease: "power2.inOut" }, "-=0.2");
        } else {
          document.documentElement.classList.remove("lenis-stopped");
        }
      }
    };

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      imagesRef.current[i - 1] = img;

      img.onload = () => onImageLoaded(i);
      img.onerror = () => onImageLoaded(i);
      
      img.src = getFrameUrl(i);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ← runs ONCE only

  // FIX #5: GSAP scroll setup runs ONCE — not re-run on every image load.
  // Uses the stable `imagesRef` (ref, not state) to access loaded images.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);

      renderFrame(Math.round(animationObj.current.frame));
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // FIX #12: overwrite: "auto" prevents tween accumulation on rapid scroll
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5,
      onUpdate: (self) => {
        const vel = self.getVelocity();
        const rotationAmount = Math.max(-2, Math.min(2, vel / 1500));

        gsap.to(canvasRef.current, {
          rotation: rotationAmount,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto", // FIX #12
        });

        if (Math.abs(vel) < 10) {
          gsap.to(canvasRef.current, {
            rotation: 0,
            duration: 1,
            ease: "power2.out",
            overwrite: "auto", // FIX #12
          });
        }

        // Calculate target frame from scroll progress
        let targetFrame = 0;
        const p = self.progress;

        const firstSeg = SCROLL_SEGMENTS[0];
        const lastSeg = SCROLL_SEGMENTS[SCROLL_SEGMENTS.length - 1];

        if (p <= firstSeg.scrollStart) {
          targetFrame = firstSeg.frameStart;
        } else if (p >= lastSeg.scrollEnd) {
          targetFrame = lastSeg.frameEnd;
        } else {
          for (const seg of SCROLL_SEGMENTS) {
            if (p >= seg.scrollStart && p <= seg.scrollEnd) {
              const segmentProgress =
                seg.scrollEnd === seg.scrollStart
                  ? 0
                  : (p - seg.scrollStart) / (seg.scrollEnd - seg.scrollStart);
              targetFrame = seg.frameStart + (seg.frameEnd - seg.frameStart) * segmentProgress;
              break;
            }
          }
        }

        targetFrame = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(targetFrame)));

        // FIX #12: overwrite: true kills the previous tween before creating a new one
        gsap.to(animationObj.current, {
          frame: targetFrame,
          duration: 0.1,
          overwrite: true, // FIX #12
          onUpdate: () => {
            renderFrame(Math.round(animationObj.current.frame));
          },
        });
      },
    });

    const textSt = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1, // Slight smoothing for text
      animation: gsap.timeline()
        // Phase 1: The Breath — centered, grows from 70% to 100%, letter-spacing expands
        .fromTo(".logo-watermark",
          { xPercent: -50, yPercent: -50, x: "0vw", scale: 0.7, letterSpacing: "0.05em" },
          { scale: 1, letterSpacing: "0.35em", ease: "none", duration: 0.70 },
          0
        )
        // Phase 2: The Drift — moves right + shrinks to compact size
        .to(".logo-watermark", 
          { x: "32vw", scale: 0.28, ease: "power2.inOut", duration: 0.22 }, 
          0.70
        )
        // Phase 3: The Reveal — tagline fades up ONLY after drift completes
        .fromTo(".hero-tagline",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: "power2.out", duration: 0.08 },
          ">"
        )
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      st.kill();
      textSt.kill();
    };
  }, []); // ← FIX #5: empty deps — runs ONCE, reads images via ref

  const progressPercent = Math.min(100, Math.round((loadedImages / FRAME_COUNT) * 100));
  const criticalPercent = Math.min(100, Math.round((loadedImages / CRITICAL_FRAMES) * 100));

  return (
    <>
      {/* Loading Screen (Watch-inspired luxury loader) */}
      <div
        ref={loadingContainerRef}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07070a]"
      >
        <div ref={loadingTextRef} className="flex flex-col items-center">
          
          {/* Circular Watch Face Loader */}
          <div className="relative w-36 h-36 rounded-full border border-titanium/20 flex items-center justify-center bg-black/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            
            {/* Watch Face Ticks (12, 3, 6, 9 o'clock dots) */}
            <span className="absolute top-2 w-1.5 h-1.5 rounded-full bg-gold/60"></span>
            <span className="absolute right-2 w-1.5 h-1.5 rounded-full bg-titanium/40"></span>
            <span className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-titanium/40"></span>
            <span className="absolute left-2 w-1.5 h-1.5 rounded-full bg-titanium/40"></span>
            
            {/* Watch Face Sub-dial or concentric detail */}
            <div className="w-28 h-28 rounded-full border border-dashed border-titanium/10 absolute"></div>

            {/* Sweep Loading Hand (Hours/Minutes) — Tied to loading percentage */}
            <div 
              className="absolute w-[1.5px] h-12 bg-gold origin-bottom bottom-1/2 left-1/2 -translate-x-1/2 transition-transform duration-500 ease-out"
              style={{ 
                transform: `rotate(${(criticalPercent / 100) * 360}deg)`,
                willChange: "transform"
              }}
            />

            {/* Faster Second Hand (Continuous sweeping micro-ticks for clock feeling) */}
            <div 
              className="absolute w-[0.75px] h-14 bg-red-500 origin-bottom bottom-1/2 left-1/2 -translate-x-1/2 animate-[spin_6s_linear_infinite]"
              style={{ willChange: "transform" }}
            />

            {/* Center Gold Pin/Pivot */}
            <div className="absolute w-3 h-3 rounded-full bg-gold border-2 border-[#07070a] shadow-md z-10"></div>
          </div>

          {/* Luxury Typography details below the loader */}
          <h1 className="text-xl tracking-[0.4em] font-light text-foreground uppercase mt-8 font-display">AURA</h1>
          <p className="text-[10px] font-mono tracking-[0.25em] text-gold/80 uppercase mt-3">
            Calibrating... {criticalPercent}%
          </p>
          <span className="text-[8px] font-mono tracking-[0.2em] text-titanium/40 uppercase mt-1">
            Setting Escapement
          </span>
        </div>
      </div>

      {/* Hero Content Container (provides scroll height) */}
      <div ref={containerRef} className="relative h-[300vh] w-full z-10 pointer-events-none bg-midnight">
        {/* FIX #8: will-change: transform promotes canvas to its own GPU compositing layer */}
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 w-full h-screen z-0 object-cover"
          style={{ willChange: "transform" }}
        />

        <div className="sticky top-0 h-screen flex flex-col justify-center items-center px-6 md:px-20 overflow-hidden pointer-events-auto">

          {/* AURA Heading — white, fully opaque, prominent */}
          <div
            className="logo-watermark absolute left-1/2 top-1/2 will-change-transform whitespace-nowrap z-10"
            style={{ 
              transformOrigin: "center center", 
              transform: "translate(-50%, -50%)",
              fontSize: "clamp(130px, 20.8vw, 312px)",
              lineHeight: 1,
            }}
          >
            <span className="block font-medium text-white" style={{ fontFamily: "var(--font-bodoni)", textShadow: "0 4px 30px rgba(0,0,0,0.25)" }}>
              AURA
            </span>
          </div>

          {/* Tagline — PRE-POSITIONED at right side, only fades up */}
          <p
            className="hero-tagline absolute top-[58%] will-change-transform text-red-500 uppercase font-normal whitespace-nowrap z-10"
            style={{
              left: "50%",
              transform: "translateX(calc(-50% + 32vw))",
              fontSize: "clamp(13px, 1.3vw, 17px)",
              letterSpacing: "0.25em",
              fontFamily: "var(--font-slab)",
              opacity: 0,
            }}
          >
            Precision on your wrist
          </p>

          {/* Top-left corner detail */}
          <div className="absolute top-24 left-6 md:left-12 z-10 opacity-40">
            <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-2">Est. 2024</div>
            <div className="w-8 h-px bg-[var(--gold)]"></div>
          </div>

          {/* Top-right corner detail */}
          <div className="absolute top-24 right-6 md:right-12 z-10 text-right opacity-40">
            <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-2">Caliber I</div>
            <div className="w-8 h-px bg-[var(--gold)] ml-auto"></div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-12 flex flex-col items-center gap-3 animate-bounce">
            <span className="font-mono text-[9px] tracking-[0.4em] uppercase opacity-40">Wind</span>
            <div className="w-px h-10 bg-gradient-to-b from-[var(--gold)] to-transparent"></div>
          </div>
        </div>
      </div>
    </>
  );
}
