"use client";

import React, { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-6 bg-white/30 backdrop-blur-md border-b border-white/20 transition-all">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <a href="#" className="text-2xl font-bold tracking-tighter text-foreground drop-shadow-md">AURA</a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
          <a href="#" className="hover:text-accent-brown transition-colors drop-shadow-sm">COLLECTION</a>
          <a href="#" className="hover:text-accent-brown transition-colors drop-shadow-sm">DESIGN</a>
          <a href="#" className="hover:text-accent-brown transition-colors drop-shadow-sm">SUSTAINABILITY</a>
        </nav>
        
        <div className="hidden md:flex gap-4 items-center">
          <button className="p-2 hover:bg-white/20 rounded-full transition-colors text-foreground" aria-label="Cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </button>
          <button className="px-6 py-2 bg-foreground text-background font-medium rounded-full hover:bg-accent-brown transition-colors shadow-lg">
            SHOP NOW
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-white/20 p-6 flex flex-col gap-6 shadow-xl">
          <a href="#" className="text-lg font-medium hover:text-accent-brown text-foreground">COLLECTION</a>
          <a href="#" className="text-lg font-medium hover:text-accent-brown text-foreground">DESIGN</a>
          <a href="#" className="text-lg font-medium hover:text-accent-brown text-foreground">SUSTAINABILITY</a>
          <div className="w-full h-px bg-foreground/10"></div>
          <button className="w-full py-3 bg-foreground text-background font-medium rounded-full hover:bg-accent-brown transition-colors">
            SHOP NOW
          </button>
        </div>
      )}
    </header>
  );
}
