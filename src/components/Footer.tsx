export default function Footer() {
  return (
    <footer className="bg-midnight text-titanium relative z-10 overflow-hidden border-t border-titanium/10">
      
      <div className="max-w-4xl mx-auto px-6 py-24 flex flex-col items-center text-center">
        
        <div className="mb-12 flex flex-col items-center">
          <div className="w-6 h-6 rounded-full border border-titanium/30 flex items-center justify-center relative mb-4">
            <div className="w-0.5 h-2 bg-titanium/50 absolute bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom rounded-full"></div>
            <div className="w-1 h-1 rounded-full bg-titanium/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <span className="font-display text-lg tracking-[0.4em] font-light text-foreground uppercase">AURA Timepieces</span>
        </div>

        <div className="flex gap-8 mb-16 font-mono text-[12px] uppercase tracking-widest">
          <a href="#" className="hover:text-foreground transition-colors duration-300">Specifications</a>
          <span className="opacity-30">|</span>
          <a href="#" className="hover:text-foreground transition-colors duration-300">Atelier</a>
          <span className="opacity-30">|</span>
          <a href="#" className="hover:text-foreground transition-colors duration-300">Journal</a>
        </div>

        <div className="w-full max-w-sm mb-20 font-mono text-[12px]">
          <p className="opacity-70 mb-4 uppercase tracking-[0.2em]">Receive our journal. No frequency, only substance.</p>
          <div className="relative group flex items-center border-b border-titanium/30 pb-2 focus-within:border-gold transition-colors duration-500">
            <input
              type="email"
              placeholder="YOUR@EMAIL.COM"
              className="bg-transparent outline-none flex-1 text-[12px] text-titanium placeholder-titanium/30 uppercase tracking-widest"
            />
            <button className="text-[10px] tracking-[0.3em] uppercase text-gold hover:text-foreground transition-colors duration-300 whitespace-nowrap">
              SUBSCRIBE
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 font-mono text-[10px] uppercase tracking-[0.3em] opacity-40">
          <p>Hand-assembled with precision.</p>
          <p>&copy; {new Date().getFullYear()} AURA HOROLOGY. ALL RIGHTS RESERVED.</p>
        </div>

      </div>
    </footer>
  );
}
