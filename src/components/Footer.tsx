export default function Footer() {
  return (
    <footer className="bg-[#07070a] text-titanium relative z-10 overflow-hidden border-t border-titanium/10 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 pb-16 border-b border-titanium/5">
          
          {/* Brand Intro & Newsletter (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col items-start gap-8">
            <a href="#" className="group flex items-center gap-3">
              <div className="w-6 h-6 rounded-full border border-titanium/30 flex items-center justify-center relative transition-transform duration-700 group-hover:rotate-[360deg]">
                <div className="w-0.5 h-2 bg-titanium absolute bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom rounded-full"></div>
                <div className="w-0.5 h-1.5 bg-gold absolute bottom-1/2 left-1/2 -translate-x-1/2 origin-bottom rotate-90 rounded-full"></div>
                <div className="w-1 h-1 rounded-full bg-titanium absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              <span className="font-display text-lg tracking-[0.3em] font-light text-foreground">AURA</span>
            </a>

            <p className="text-xs leading-relaxed text-titanium/60 max-w-sm font-light">
              AURA represents a decade-long search for horological silence. Crafted at the intersection of aerospace titanium metallurgy, hand-threaded Italian leather, and high-performance caliber engineering.
            </p>

            <div className="w-full max-w-sm mt-4 font-mono text-[10px]">
              <p className="text-titanium/40 mb-3 uppercase tracking-[0.2em] font-semibold">Join the journal. Substance only.</p>
              <div className="relative group flex items-center border-b border-titanium/20 pb-2 focus-within:border-gold transition-colors duration-500">
                <input
                  type="email"
                  placeholder="ENTER EMAIL ADDRESS"
                  className="bg-transparent outline-none flex-1 text-[10px] text-titanium placeholder-titanium/30 uppercase tracking-widest w-full"
                />
                <button className="text-[9px] tracking-[0.3em] uppercase text-gold hover:text-foreground transition-colors duration-300 whitespace-nowrap ml-2">
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>

          {/* Spacer (1 Column) */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Links Grid (6 Columns) */}
          <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-10">
            {/* Column 1 */}
            <div className="flex flex-col items-start gap-4">
              <h4 className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/80 font-bold">Collections</h4>
              <ul className="flex flex-col gap-2.5 font-mono text-[10px] tracking-[0.2em] uppercase text-titanium/50">
                <li><a href="#" className="hover:text-gold transition-colors duration-300">Midnight Titanium</a></li>
                <li><a href="#" className="hover:text-gold transition-colors duration-300">Champagne Gold</a></li>
                <li><a href="#" className="hover:text-gold transition-colors duration-300">Deep Sapphire</a></li>
                <li><a href="#" className="hover:text-gold transition-colors duration-300">The Custom Atelier</a></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col items-start gap-4">
              <h4 className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/80 font-bold">The Craft</h4>
              <ul className="flex flex-col gap-2.5 font-mono text-[10px] tracking-[0.2em] uppercase text-titanium/50">
                <li><a href="#" className="hover:text-gold transition-colors duration-300">Caliber I Movement</a></li>
                <li><a href="#" className="hover:text-gold transition-colors duration-300">Titanium Casting</a></li>
                <li><a href="#" className="hover:text-gold transition-colors duration-300">Italian Tanneries</a></li>
                <li><a href="#" className="hover:text-gold transition-colors duration-300">Assembly Lab</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col items-start gap-4 col-span-2 md:col-span-1">
              <h4 className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/80 font-bold">Atelier</h4>
              <ul className="flex flex-col gap-2.5 font-mono text-[10px] tracking-[0.2em] uppercase text-titanium/50">
                <li><a href="#" className="hover:text-gold transition-colors duration-300">Our Journal</a></li>
                <li><a href="#" className="hover:text-gold transition-colors duration-300">Locations</a></li>
                <li><a href="#" className="hover:text-gold transition-colors duration-300">Private Viewing</a></li>
                <li><a href="#" className="hover:text-gold transition-colors duration-300">Support</a></li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Metadata Info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 font-mono text-[9px] tracking-[0.25em] text-titanium/35 uppercase w-full">
          <div>
            &copy; {new Date().getFullYear()} AURA HOROLOGY. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-titanium/60 transition-colors duration-300">Privacy Policy</a>
            <span>/</span>
            <a href="#" className="hover:text-titanium/60 transition-colors duration-300">Terms of Use</a>
            <span>/</span>
            <a href="#" className="hover:text-titanium/60 transition-colors duration-300">Patents</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/50"></span>
            <span>UNITED STATES / EN</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
