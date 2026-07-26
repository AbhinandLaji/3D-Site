export default function Footer() {
  return (
    <footer className="bg-[#1a0f07] text-[#f0ebe2] relative z-10 overflow-hidden">
      
      {/* Top Gold Rule */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#c8963c] to-transparent opacity-60" />

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
              <div className="w-8 h-8 rounded-full bg-[#c8963c]/20 border border-[#c8963c]/40 flex items-center justify-center">
                <span className="text-[#c8963c] text-xs font-bold">A</span>
              </div>
              <span className="font-display text-2xl tracking-[0.3em] font-light text-[#f0ebe2]">AURA</span>
            </div>
            <p className="text-sm leading-[1.9] text-[#f0ebe2]/50 max-w-xs">
              Redefining the anatomy of comfort through sustainable engineering and premium craftsmanship.
            </p>
            <div className="flex items-center gap-4 mt-8">
              {["IG", "TW", "PIN"].map((s) => (
                <a key={s} href="#" className="w-9 h-9 rounded-full border border-[#c8963c]/20 flex items-center justify-center text-[10px] tracking-widest text-[#f0ebe2]/40 hover:border-[#c8963c] hover:text-[#c8963c] transition-all duration-300">
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
              <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#c8963c] mb-7">{title}</h3>
              <ul className="flex flex-col gap-4">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-[#f0ebe2]/50 hover:text-[#f0ebe2] transition-colors duration-300">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h3 className="text-[10px] tracking-[0.4em] uppercase text-[#c8963c] mb-7">Early Access</h3>
            <p className="text-sm text-[#f0ebe2]/50 mb-6 leading-relaxed">
              Be the first to know about new drops and limited editions.
            </p>
            <div className="relative group">
              <div className="h-px w-full bg-[#f0ebe2]/10 group-focus-within:bg-[#c8963c] transition-colors duration-500 mb-4" />
              <div className="flex items-center gap-4">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-transparent outline-none flex-1 text-sm text-[#f0ebe2] placeholder-[#f0ebe2]/20 pb-2"
                />
                <button className="text-[10px] tracking-[0.3em] font-medium uppercase text-[#c8963c] hover:text-[#f0ebe2] transition-colors duration-300 pb-2 whitespace-nowrap">
                  JOIN →
                </button>
              </div>
              <div className="h-px w-full bg-[#f0ebe2]/10 group-focus-within:bg-[#c8963c] transition-colors duration-500" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#f0ebe2]/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-[#f0ebe2]/25 tracking-wider">
            &copy; {new Date().getFullYear()} Aura Footwear Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <a key={l} href="#" className="text-[11px] text-[#f0ebe2]/25 hover:text-[#f0ebe2]/60 transition-colors duration-300 tracking-wider">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
