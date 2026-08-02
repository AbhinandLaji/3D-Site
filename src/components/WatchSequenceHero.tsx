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
      scrub: 0.5,
      animation: gsap.timeline()
        .fromTo(".hero-title-aura",
          { opacity: 0, scale: 0.95, filter: "blur(10px)" },
          { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.3, ease: "power2.out" }
        )
        .to(".hero-title-aura", { opacity: 0.1, scale: 1.05, duration: 0.7, ease: "none" }, ">")
        .fromTo(".hero-subtitle-precision",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
          0.7
        ),
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
      {/* Loading Screen */}
      <div
        ref={loadingContainerRef}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      >
        <div ref={loadingTextRef} className="text-center">
          <h1 className="text-5xl font-bold tracking-tighter text-foreground mb-4">AURA</h1>
          <div className="w-48 h-1 bg-foreground/20 rounded-full mx-auto mb-2 overflow-hidden">
            <div
              className="h-full bg-foreground rounded-full transition-all duration-300 ease-out"
              style={{ width: `${criticalPercent}%` }}
            />
          </div>
          <p className="text-sm font-medium tracking-widest text-foreground/60 uppercase">
            Calibrating... {criticalPercent}%
          </p>
        </div>
      </div>

      {/* Hero Content Container */}
      <div ref={containerRef} className="relative h-[200vh] w-full z-10 pointer-events-none bg-midnight">
        {/* FIX #8: will-change: transform promotes canvas to its own GPU compositing layer */}
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 w-full h-screen z-0 object-cover"
          style={{ willChange: "transform" }}
        />

        <div className="sticky top-0 h-screen flex flex-col justify-center items-center px-6 md:px-20 overflow-hidden pointer-events-auto">

          {/* Typographic Lockup */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
            <h2 className="hero-title-aura text-[12vw] font-display text-foreground font-light tracking-[0.2em] uppercase leading-none opacity-0 mix-blend-overlay">
              AURA
            </h2>
            <p className="hero-subtitle-precision font-mono text-sm md:text-base text-titanium tracking-[0.4em] uppercase mt-8 opacity-0">
              Precision on Your Wrist
            </p>
          </div>

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
