export default function Footer() {
  return (
    <footer className="bg-[var(--bg-sustainability)] text-[var(--text-sustainability)] relative z-10 overflow-hidden">
      
      {/* Top Accent Rule */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-60" />

      {/* Large brand watermark */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <div className="font-display text-[20vw] font-light leading-none text-white opacity-[0.02] text-center">AURA</div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-6 relative z-10">
        
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Brand col */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[var(--gold)]/20 border border-[var(--gold)]/40 flex items-center justify-center">
                <span className="text-[var(--gold)] text-xs font-bold">A</span>
              </div>
              <span className="font-display text-2xl tracking-[0.3em] font-light text-[var(--text-sustainability)]">AURA</span>
            </div>
            <p className="text-sm leading-[1.9] opacity-60 max-w-xs">
              Redefining the anatomy of comfort through sustainable engineering and premium craftsmanship.
            </p>
            <div className="flex items-center gap-4 mt-8">
              {["IG", "TW", "PIN"].map((s) => (
                <a key={s} href="#" className="w-9 h-9 rounded-full border border-[var(--gold)]/20 flex items-center justify-center text-[10px] tracking-widest opacity-60 hover:opacity-100 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all duration-300">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {[
            { title: "Shop", links: ["All Footwear", "New Arrivals", "Limited Edition", "Accessories", "Gift Cards"] },
            { title: "Company", links: ["Our Story", "Sustainability", "Materials Lab", "Careers", "Press"] },
          ].map(({ title, links }) => (
            <div key={title} className="md:col-span-2">
              <h3 className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-7">{title}</h3>
              <ul className="flex flex-col gap-4">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm opacity-60 hover:opacity-100 hover:text-[var(--gold)] transition-colors duration-300">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h3 className="text-[10px] tracking-[0.4em] uppercase text-[var(--gold)] mb-7">Early Access</h3>
            <p className="text-sm opacity-60 mb-6 leading-relaxed">
              Be the first to know about new drops and limited editions.
            </p>
            <div className="relative group">
              <div className="h-px w-full bg-[var(--text-sustainability)]/10 group-focus-within:bg-[var(--gold)] transition-colors duration-500 mb-4" />
              <div className="flex items-center gap-4">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-transparent outline-none flex-1 text-sm text-[var(--text-sustainability)] placeholder-[var(--text-sustainability)]/20 pb-2"
                />
                <button className="text-[10px] tracking-[0.3em] font-medium uppercase text-[var(--gold)] hover:text-[var(--text-sustainability)] transition-colors duration-300 pb-2 whitespace-nowrap">
                  JOIN →
                </button>
              </div>
              <div className="h-px w-full bg-[var(--text-sustainability)]/10 group-focus-within:bg-[var(--gold)] transition-colors duration-500" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--text-sustainability)]/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] opacity-40 tracking-wider">
            &copy; {new Date().getFullYear()} Aura Footwear Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <a key={l} href="#" className="text-[11px] opacity-40 hover:opacity-80 transition-colors duration-300 tracking-wider">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
