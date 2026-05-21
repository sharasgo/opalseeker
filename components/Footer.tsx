import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white/70 py-16 px-6 md:px-12 font-sans">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        
        {/* Brand */}
        <div className="md:col-span-1">
          <h3 className="font-serif text-2xl text-white mb-6 tracking-wide">OpalSeeker</h3>
          <p className="text-[13px] font-light leading-relaxed mb-6">
            Direct from Lightning Ridge. Ethically sourced, solid Australian opals crafted into heirlooms.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
              <Facebook className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="w-5 h-5" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Shop */}
        <div className="md:col-span-1">
          <h4 className="text-[11px] uppercase tracking-widest text-white font-medium mb-6">Shop</h4>
          <ul className="space-y-4 text-[13px] font-light">
            <li><Link href="/collection" className="hover:text-white transition-colors">All Opals</Link></li>
            <li><Link href="/collection" className="hover:text-white transition-colors">Black Opals</Link></li>
            <li><Link href="/collection" className="hover:text-white transition-colors">Boulder Opals</Link></li>
            <li><Link href="/collection" className="hover:text-white transition-colors">Crystal Opals</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="md:col-span-1">
          <h4 className="text-[11px] uppercase tracking-widest text-white font-medium mb-6">Customer Care</h4>
          <ul className="space-y-4 text-[13px] font-light">
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
            <li><Link href="/returns" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link href="/education" className="hover:text-white transition-colors">Opal Education</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-1">
          <h4 className="text-[11px] uppercase tracking-widest text-white font-medium mb-6">Newsletter</h4>
          <p className="text-[13px] font-light leading-relaxed mb-4">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <form className="flex border-b border-white/30 pb-2 transition-colors focus-within:border-white">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-transparent border-none outline-none w-full text-[13px] font-light text-white placeholder-white/50"
            />
            <button type="submit" className="text-[10px] uppercase tracking-widest text-white ml-2 hover:opacity-70 transition-opacity whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>

      </div>

      <div className="max-w-[1400px] mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-light text-white/50">
        <p>&copy; {new Date().getFullYear()} OpalSeeker. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
