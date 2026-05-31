'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Instagram, Twitter, MapPin, ShieldCheck, Truck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#080808] pt-16 pb-8 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-white/5 flex items-center justify-center overflow-hidden">
                <Image 
                  src="/icon.png" 
                  alt="Opal Seeker Logo" 
                  width={32} 
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-display font-light tracking-widest uppercase">Opal<span className="font-bold text-white">Seeker</span></span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed font-light">
              Direct from the source. We provide the world&apos;s most exquisite Australian opals, 
              meticulously selected for their unique play-of-color and investment-grade quality.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/5 rounded-none hover:bg-white/10 transition-colors">
                <Instagram className="h-4 w-4 text-white/60" />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-none hover:bg-white/10 transition-colors">
                <Twitter className="h-4 w-4 text-white/60" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Curation</h4>
            <ul className="space-y-3">
              {['Black Opals', 'Boulder Opals', 'Crystal Opals', 'New Arrivals', 'Investment Class'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/60 hover:text-cyan-400 transition-colors font-light">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Service</h4>
            <ul className="space-y-3">
              {[
                { name: 'Shipping Policy', href: '/shipping-policy' },
                { name: 'Returns & Refunds', href: '/returns-and-refunds' },
                { name: 'Privacy Policy', href: '/privacy-policy' },
                { name: 'Terms of Service', href: '/terms-of-service' },
                { name: 'Contact Us', href: '/contact-us' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-white/60 hover:text-cyan-400 transition-colors font-light">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Trust */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Global Presence</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <MapPin className="h-4 w-4 text-cyan-400 mt-1" />
                <span className="text-sm text-white/60 font-light">Lightning Ridge, <br/>NSW Australia</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-cyan-400" />
                <a href="mailto:concierge@opalseeker.com" className="text-sm text-white/60 hover:text-white transition-colors font-light">
                  concierge@opalseeker.com
                </a>
              </div>
            </div>
            
            <div className="pt-4 space-y-3">
              <div className="flex items-center space-x-2 text-[10px] text-white/30 uppercase tracking-widest">
                <ShieldCheck className="h-3 w-3 text-cyan-400/50" />
                <span>Insured Global Logistics</span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] text-white/30 uppercase tracking-widest">
                <Truck className="h-3 w-3 text-cyan-400/50" />
                <span>Express DHL Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-mono text-white/20 tracking-widest uppercase text-center w-full">
            © {new Date().getFullYear()} Opal Seeker Boutique. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
