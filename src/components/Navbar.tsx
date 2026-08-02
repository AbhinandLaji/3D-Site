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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 header-responsive ${
      scrolled 
        ? "py-3 glass-sapphire shadow-[0_1px_30px_rgba(0,0,0,0.2)]" 
        : "py-5 bg-transparent"
    }`}>
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Logo */}
        <a href="#" className="group flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-titanium flex items-center justify-center relative transition-transform duration-700 group-hover:rotate-[360deg]">
            {/* Minimal Watch Face Icon */}
            <div className="w-0.5 h-3 bg-titanium absolute bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom rounded-full"></div>
            <div className="w-0.5 h-2 bg-gold absolute bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom rotate-90 rounded-full"></div>
            <div className="w-1 h-1 rounded-full bg-titanium absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <span className="font-display text-xl tracking-[0.3em] font-light text-foreground">AURA</span>
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {["THE WATCH", "THE CRAFT", "ATELIER", "JOURNAL"].map((item) => (
            <a key={item} href="#" className="relative group text-xs tracking-[0.2em] font-medium text-foreground opacity-70 hover:opacity-100 transition-opacity duration-300">
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-500 group-hover:w-full"></span>
            </a>
          ))}
        </nav>
        
        {/* Mobile Right Section (Menu) */}
        <div className="flex md:hidden items-center gap-4">
          <button 
            className="p-2 text-foreground transition-transform duration-300"
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
        <div className="glass-sapphire px-6 pb-8 pt-6 flex flex-col gap-0 border-b border-titanium/20">
          <div className="h-px bg-gradient-to-r from-transparent via-titanium to-transparent mb-6 w-full" />
          {["THE WATCH", "THE CRAFT", "ATELIER", "JOURNAL"].map((item, i) => (
            <a key={item} href="#" className="flex items-center justify-between py-4 border-b border-titanium/10 text-sm tracking-[0.2em] font-medium text-foreground opacity-80 hover:opacity-100 transition-opacity duration-300">
              <span>{item}</span>
              <span className="text-gold font-light">0{i + 1}</span>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
