"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Configuration
const FRAME_COUNT = 240; // <-- replace with your actual total count
const SEQUENCE_PATH = '/sequence';

function getFrameUrl(index: number): string {
  // index is 1-based here to match ezgif's naming
  const padded = String(index).padStart(3, '0');
  return `${SEQUENCE_PATH}/ezgif-frame-${padded}.jpg`;
}

export default function ImageSequenceHero() {
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

    const img = imagesRef.current[index];
    if (!img) return; // Not yet loaded or failed

    // Calculate 'cover' behavior for canvas
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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
        // Calculate the current frame based on scroll progress
        const targetFrame = Math.min(
          FRAME_COUNT - 1,
          Math.max(0, Math.floor(self.progress * (FRAME_COUNT - 1)))
        );

        gsap.to(animationObj.current, {
          frame: targetFrame,
          duration: 0.1, // Quick tween for smooth frame transition
          onUpdate: () => {
            renderFrame(Math.round(animationObj.current.frame));
          },
        });
      },
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      st.kill();
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
            Loading Sequence {progressPercent}%
          </p>
        </div>
      </div>

      {/* Hero Content Container (provides scroll height) */}
      <div ref={containerRef} className="relative h-[200vh] w-full z-10 pointer-events-none">
        {/* The canvas sits behind everything, fixed to screen */}
        <canvas
          ref={canvasRef}
          className="fixed top-0 left-0 w-full h-screen z-0 object-cover"
        />

        {/* Hero text overlay can go here, similar to the start of UIOverlay.
            For now we let the page layout handle text overlay if needed,
            but we add a gradient or some base styling so it doesn't just cut off. */}
        <div className="sticky top-0 h-screen flex flex-col justify-center items-center px-6 md:px-20 overflow-hidden pointer-events-auto">
          {/* Top-left corner detail */}
          <div className="absolute top-24 left-6 md:left-12 z-10 opacity-40">
            <div className="text-[10px] tracking-[0.4em] uppercase mb-2">Est. 2024</div>
            <div className="w-8 h-px bg-[var(--gold)]"></div>
          </div>

          {/* Top-right corner detail */}
          <div className="absolute top-24 right-6 md:right-12 z-10 text-right opacity-40">
            <div className="text-[10px] tracking-[0.4em] uppercase mb-2">Collection I</div>
            <div className="w-8 h-px bg-[var(--gold)] ml-auto"></div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-12 flex flex-col items-center gap-3 animate-bounce">
            <span className="text-[9px] tracking-[0.4em] uppercase opacity-40">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-[var(--gold)] to-transparent"></div>
          </div>
        </div>
      </div>
    </>
  );
}
