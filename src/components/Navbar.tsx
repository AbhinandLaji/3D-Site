"use client";

import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      scrolled 
        ? "py-3 bg-[var(--background)]/90 backdrop-blur-xl border-b border-[var(--gold)]/20 shadow-[0_1px_30px_rgba(0,0,0,0.1)]" 
        : "py-5 bg-transparent"
    }`}>
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Logo */}
        <a href="#" className="group flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--foreground)] flex items-center justify-center transition-transform duration-500 group-hover:rotate-180">
            <span className="text-[var(--gold)] text-xs font-bold">A</span>
          </div>
          <span className="font-display text-xl tracking-[0.3em] font-light text-[var(--foreground)]">AURA</span>
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {["COLLECTION", "DESIGN", "SUSTAINABILITY"].map((item) => (
            <a key={item} href="#" className="relative group text-xs tracking-[0.2em] font-medium text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors duration-300">
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[var(--gold)] transition-all duration-500 group-hover:w-full"></span>
            </a>
          ))}
        </nav>
        
        <div className="hidden md:flex gap-4 items-center">
          {/* Theme Toggle (Desktop) */}
          <button 
            onClick={() => document.documentElement.classList.toggle('dark')}
            className="p-2 text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors duration-300"
            aria-label="Toggle Dark Mode"
          >
            <svg className="hidden dark:block" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg className="block dark:hidden" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>

          {/* Cart */}
          <button className="relative p-2 text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors duration-300" aria-label="Cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[var(--gold)] rounded-full"></span>
          </button>
          
          {/* CTA Button */}
          <button className="btn-luxury px-7 py-2.5 rounded-full">
            <span>SHOP NOW</span>
          </button>
        </div>

        {/* Mobile Right Section (Theme Toggle + Menu) */}
        <div className="flex md:hidden items-center gap-4">
          <button 
            onClick={() => document.documentElement.classList.toggle('dark')}
            className="p-2 text-[var(--foreground)]/70 transition-colors duration-300"
            aria-label="Toggle Dark Mode"
          >
            <svg className="hidden dark:block" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg className="block dark:hidden" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>

          <button 
            className="p-2 text-[var(--foreground)] transition-transform duration-300"
            style={{ transform: isMobileMenuOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="15" y2="16"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-[var(--background)]/98 backdrop-blur-xl px-6 pb-8 pt-6 flex flex-col gap-0 border-b border-[var(--gold)]/20">
          <div className="gold-line mb-6 w-full" />
          {["COLLECTION", "DESIGN", "SUSTAINABILITY"].map((item, i) => (
            <a key={item} href="#" className="flex items-center justify-between py-4 border-b border-[var(--foreground)]/10 text-sm tracking-[0.2em] font-medium text-[var(--foreground)]/80 hover:text-[var(--gold)] transition-colors duration-300">
              <span>{item}</span>
              <span className="text-[var(--gold)] font-light">0{i + 1}</span>
            </a>
          ))}
          <button className="btn-luxury mt-8 w-full py-4 rounded-full">
            <span>SHOP THE COLLECTION</span>
          </button>
        </div>
      </div>
    </header>
  );
}
