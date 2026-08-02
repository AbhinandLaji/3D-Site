"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Configuration
const FRAME_COUNT = 240; // <-- replace with your actual total count
const SEQUENCE_PATH = '/sequence';

// --- Scroll Mapping Configuration ---
// Define non-linear scroll mapping to allocate scroll distance proportionally 
// to visual motion. 
// scrollStart/scrollEnd are percentages (0.0 to 1.0) of the total scroll distance.
// frameStart/frameEnd are the corresponding frame indices for that segment.
interface ScrollSegment {
  name: string;
  scrollStart: number; 
  scrollEnd: number;   
  frameStart: number;
  frameEnd: number;
}

const SCROLL_SEGMENTS: ScrollSegment[] = [
  { name: "hold intro", scrollStart: 0.0, scrollEnd: 0.1, frameStart: 0, frameEnd: 40 },
  { name: "explosion", scrollStart: 0.1, scrollEnd: 0.7, frameStart: 41, frameEnd: 180 },
  { name: "hold exploded", scrollStart: 0.7, scrollEnd: 1.0, frameStart: 181, frameEnd: 239 },
];

function getFrameUrl(index: number): string {
  const padded = String(index).padStart(3, '0');
  return `${SEQUENCE_PATH}/watch-frame-${padded}.jpg`;
}

export default function WatchSequenceHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Loading state refs
  const loadingContainerRef = useRef<HTMLDivElement>(null);
  const loadingTextRef = useRef<HTMLDivElement>(null);

  const [loadedImages, setLoadedImages] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const animationObj = useRef({ frame: 0 });

  // Preload images
  useEffect(() => {
    let loadedCount = 0;

    // Disable scroll while loading
    document.documentElement.classList.add("lenis-stopped");

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);

      img.onload = () => {
        loadedCount++;
        setLoadedImages(loadedCount);
        imagesRef.current[i - 1] = img;

        if (loadedCount === FRAME_COUNT) {
          // All images loaded
          renderFrame(0);

          // Fade out loading screen
          const tl = gsap.timeline({
            onComplete: () => {
              document.documentElement.classList.remove("lenis-stopped");
              if (loadingContainerRef.current) {
                loadingContainerRef.current.style.display = "none";
              }
            },
          });

          if (loadingTextRef.current && loadingContainerRef.current) {
            tl.to(loadingTextRef.current, {
              opacity: 0,
              y: 20,
              duration: 0.5,
              ease: "power2.inOut",
            }).to(
              loadingContainerRef.current,
              {
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut",
              },
              "-=0.2"
            );
          }
        }
      };

      // Handle error gracefully so it doesn't block forever if one fails
      img.onerror = () => {
        loadedCount++;
        setLoadedImages(loadedCount);
        imagesRef.current[i - 1] = img; // store broken image anyway to maintain index
      };
    }
  }, []);

  // Render function to draw image to cover the canvas
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const img = imagesRef.current[index];
    if (!img) return; // Not yet loaded or failed

    // Calculate 'cover' behavior for canvas using logical CSS sizes
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

  // Setup GSAP ScrollTrigger and Resize Observer
  useEffect(() => {
    // Only register on client
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Handle resize
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
      
      renderFrame(Math.round(animationObj.current.frame));
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial sizing

    // GSAP Scroll Scrub
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.5, // Smooth scrubbing
      onUpdate: (self) => {
        // Gyroscopic canvas rotation based on scroll velocity
        const vel = self.getVelocity();
        const rotationAmount = Math.max(-2, Math.min(2, vel / 1500));
        gsap.to(canvasRef.current, {
          rotation: rotationAmount,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto"
        });

        // Return rotation to 0 when stopped
        if (Math.abs(vel) < 10) {
           gsap.to(canvasRef.current, { rotation: 0, duration: 1, ease: "power2.out", overwrite: "auto" });
        }

        // Find which segment we are currently in based on scroll progress
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
              const segmentProgress = (seg.scrollEnd === seg.scrollStart) 
                ? 0 
                : (p - seg.scrollStart) / (seg.scrollEnd - seg.scrollStart);
              targetFrame = seg.frameStart + (seg.frameEnd - seg.frameStart) * segmentProgress;
              break;
            }
          }
        }
        
        targetFrame = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(targetFrame)));

        gsap.to(animationObj.current, {
          frame: targetFrame,
          duration: 0.1, // Quick tween for smooth frame transition
          onUpdate: () => {
            renderFrame(Math.round(animationObj.current.frame));
          },
        });
      },
    });

    // Text Overlay Animation Timeline
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
          0.7 // Starts exactly at 70% scroll progress (which aligns with frame 180 segment)
        )
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      st.kill();
      textSt.kill();
    };
  }, [loadedImages]); // Re-run setup when images load, though realistically it's fine once since we use refs

  const progressPercent = Math.min(100, Math.round((loadedImages / FRAME_COUNT) * 100));

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
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm font-medium tracking-widest text-foreground/60 uppercase">
            Calibrating... {progressPercent}%
          </p>
        </div>
      </div>

      {/* Hero Content Container (provides scroll height) */}
      <div ref={containerRef} className="relative h-[200vh] w-full z-10 pointer-events-none bg-midnight">
        {/* The canvas sits behind everything, fixed to screen */}
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 w-full h-screen z-0 object-cover"
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
