export default function Footer() {
  return (
    <footer className="bg-foreground text-background pt-20 pb-10 px-6 md:px-20 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-1">
          <h2 className="text-3xl font-bold tracking-tighter mb-6 text-white">AURA</h2>
          <p className="text-sm opacity-70 leading-relaxed text-gray-300">
            Redefining the anatomy of comfort through sustainable engineering and premium craftsmanship.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium mb-6 uppercase tracking-widest text-xs text-gray-400">Shop</h3>
          <ul className="flex flex-col gap-4 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white transition-colors">All Footwear</a></li>
            <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-6 uppercase tracking-widest text-xs text-gray-400">About</h3>
          <ul className="flex flex-col gap-4 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Materials</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium mb-6 uppercase tracking-widest text-xs text-gray-400">Stay Updated</h3>
          <p className="text-sm opacity-70 mb-4 text-gray-300">Subscribe for early access to new releases.</p>
          <div className="flex border-b border-gray-600 pb-2">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-transparent outline-none w-full text-sm text-white placeholder-gray-500"
            />
            <button className="text-xs font-bold tracking-wider hover:text-white text-gray-400 transition-colors uppercase">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Aura Footwear Inc. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
