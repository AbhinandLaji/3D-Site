"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

interface WatchTapRevealProps {
  aodImage: string;
  activeImage: string;
}

export default function WatchTapReveal({ aodImage, activeImage }: WatchTapRevealProps) {
  const [isActive, setIsActive] = useState(false);
  const [isTapping, setIsTapping] = useState(false);

  const handleTap = useCallback(() => {
    setIsTapping(true);
    setTimeout(() => setIsTapping(false), 350);
    setIsActive((prev) => !prev);
  }, []);

  return (
    <section className="relative w-full bg-[#0a0a0f] py-32 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        
        {/* Section heading */}
        <div className="text-center mb-20 md:mb-28">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-[#f5e6c8] leading-[1.1] tracking-tight max-w-4xl mx-auto">
            A chipset engineered for decades,<br className="hidden md:block" /> not upgrade cycles.
          </h2>
        </div>

        {/* Interactive row */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">
          
          {/* Watch Assembly: Strap + Face + Strap */}
          <div
            onClick={handleTap}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleTap(); }}
            className={`
              relative cursor-pointer select-none flex flex-col items-center
              transition-transform duration-300 ease-out
              ${isTapping ? "scale-[0.94]" : "hover:scale-[1.02]"}
            `}
            style={{ touchAction: "manipulation" }}
          >
            {/* Pulse ring */}
            {!isActive && (
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[380px] md:h-[380px] lg:w-[440px] lg:h-[440px] rounded-full border border-[#f5e6c8]/10 animate-pulse-ring pointer-events-none z-20" />
            )}

            {/* Flash overlay */}
            <div
              className={`
                absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                w-[280px] h-[280px] md:w-[380px] md:h-[380px] lg:w-[440px] lg:h-[440px] 
                rounded-full pointer-events-none z-30 transition-opacity duration-100
                ${isActive ? "opacity-100" : "opacity-0"}
              `}
              style={{
                background: "radial-gradient(circle, rgba(245,230,200,0.1) 0%, transparent 65%)",
              }}
            />

            {/* TOP STRAP */}
            <div className="relative w-[90px] md:w-[120px] lg:w-[140px] h-[100px] md:h-[140px] lg:h-[160px] -mb-2 z-0">
              <div 
                className="absolute inset-0 rounded-t-lg"
                style={{
                  background: "linear-gradient(90deg, #1a1a1f 0%, #2a2a30 20%, #3a3a40 50%, #2a2a30 80%, #1a1a1f 100%)",
                  boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5), 0 -2px 8px rgba(0,0,0,0.3)",
                }}
              />
              <div className="absolute inset-x-2 top-2 bottom-0 flex flex-col gap-[3px]">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className="flex-1 rounded-sm"
                    style={{
                      background: `linear-gradient(180deg, 
                        ${i % 2 === 0 ? '#3a3a42' : '#2e2e34'} 0%, 
                        ${i % 2 === 0 ? '#2e2e34' : '#25252a'} 50%, 
                        ${i % 2 === 0 ? '#1e1e22' : '#1a1a1f'} 100%)`,
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.3)',
                    }}
                  />
                ))}
              </div>
              <div 
                className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px]"
                style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(200,169,110,0.15) 30%, rgba(200,169,110,0.15) 70%, transparent 100%)' }}
              />
              <div 
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[70px] md:w-[90px] lg:w-[100px] h-[12px] rounded-b-sm"
                style={{
                  background: 'linear-gradient(90deg, #1a1a1f, #3a3a40, #1a1a1f)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                }}
              />
            </div>

            {/* WATCH FACE */}
            <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] lg:w-[440px] lg:h-[440px] z-10">
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <Image
                  src={aodImage}
                  alt="AURA always-on display"
                  fill
                  className="object-cover transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{
                    opacity: isActive ? 0 : 1,
                    filter: isActive ? "brightness(0.5)" : "brightness(0.9)",
                    transform: isActive ? "scale(1.05)" : "scale(1)",
                  }}
                  priority
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 380px, 440px"
                />
                <Image
                  src={activeImage}
                  alt="AURA active display"
                  fill
                  className="object-cover absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{
                    opacity: isActive ? 1 : 0,
                    filter: isActive ? "brightness(1.05)" : "brightness(0.6)",
                    transform: isActive ? "scale(1)" : "scale(1.05)",
                  }}
                  priority
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 380px, 440px"
                />
              </div>
            </div>

            {/* BOTTOM STRAP */}
            <div className="relative w-[90px] md:w-[120px] lg:w-[140px] h-[100px] md:h-[140px] lg:h-[160px] -mt-2 z-0">
              <div 
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-[70px] md:w-[90px] lg:w-[100px] h-[12px] rounded-t-sm"
                style={{
                  background: 'linear-gradient(90deg, #1a1a1f, #3a3a40, #1a1a1f)',
                  boxShadow: '0 -2px 6px rgba(0,0,0,0.4)',
                }}
              />
              <div 
                className="absolute inset-0 rounded-b-lg"
                style={{
                  background: "linear-gradient(90deg, #1a1a1f 0%, #2a2a30 20%, #3a3a40 50%, #2a2a30 80%, #1a1a1f 100%)",
                  boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)",
                }}
              />
              <div className="absolute inset-x-2 top-0 bottom-2 flex flex-col-reverse gap-[3px]">
                {[...Array(5)].map((_, i) => (
                  <div 
                    key={i} 
                    className="flex-1 rounded-sm"
                    style={{
                      background: `linear-gradient(180deg, 
                        ${i % 2 === 0 ? '#1e1e22' : '#1a1a1f'} 0%, 
                        ${i % 2 === 0 ? '#2e2e34' : '#25252a'} 50%, 
                        ${i % 2 === 0 ? '#3a3a42' : '#2e2e34'} 100%)`,
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.3)',
                    }}
                  />
                ))}
              </div>
              <div 
                className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px]"
                style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(200,169,110,0.15) 30%, rgba(200,169,110,0.15) 70%, transparent 100%)' }}
              />
            </div>
          </div>

          {/* Side Text Panel */}
          <div className="flex flex-col items-center lg:items-start gap-6 max-w-md text-center lg:text-left">
            <div
              className={`
                inline-flex items-center gap-2.5 text-xs tracking-[0.2em] uppercase
                transition-all duration-500
                ${isActive ? "text-[#c8a96e] opacity-0 h-0 overflow-hidden" : "text-[#8a8a8e] opacity-100"}
              `}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
                <path d="M12 2a4 4 0 0 1 4 4v4h1.5a2.5 2.5 0 0 1 0 5H18v3a6 6 0 0 1-12 0v-8a4 4 0 0 1 4-4z"/>
                <path d="M12 6v4"/>
              </svg>
              <span>Tap on the watch</span>
            </div>

            <h3 className="text-3xl md:text-4xl lg:text-[42px] font-medium leading-[1.15] tracking-tight text-[#f5e6c8]">
              {isActive ? <>Precision<br />awakened.</> : <>Always on.<br />Always ready.</>}
            </h3>

            <p className="text-sm md:text-base leading-relaxed text-[#8a8a8e] max-w-sm">
              {isActive
                ? "Complications illuminate. Sapphire crystal comes alive. Your world, one touch away."
                : "The display sleeps, but never goes dark. A gentle glance reveals the time."}
            </p>

            <div className={`h-px bg-gradient-to-r from-[#c8a96e] to-transparent transition-all duration-700 ${isActive ? "w-24 opacity-100" : "w-0 opacity-0"}`} />
          </div>
        </div>
      </div>
    </section>
  );
}
