'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans p-6 lg:p-12">
      <div className="max-w-4xl mx-auto space-y-12 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-cyan-400 font-mono text-[10px] uppercase tracking-widest hover:text-white transition-colors group"
        >
          <ArrowLeft className="h-3 w-3 group-hover:-translate-x-1 transition-transform" />
          Back to Vault
        </Link>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
            <Mail className="h-4 w-4" />
            <span>Operations Control</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-light text-white uppercase tracking-tighter">
            Contact <span className="font-bold">Us</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 text-white/60 font-light leading-relaxed">
          <div className="space-y-10">
            <section className="space-y-6">
              <h2 className="text-white text-xl font-display uppercase tracking-widest border-l-2 border-cyan-400 pl-4 py-1">Concierge Access</h2>
              <p className="text-sm">
                For inquiries regarding specific high-reserve specimens or private acquisition consultations, our operations team is available via the following secure channels.
              </p>
              
              <div className="space-y-6 pt-4">
                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-white/5 border border-white/10 text-cyan-400 group-hover:bg-cyan-400/10 transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-mono text-xs uppercase tracking-widest font-bold">Secure Email</h3>
                    <p className="text-sm hover:text-white transition-colors cursor-pointer">concierge@opalseeker.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-white/5 border border-white/10 text-cyan-400 group-hover:bg-cyan-400/10 transition-colors">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-mono text-xs uppercase tracking-widest font-bold">Encrypted Comms</h3>
                    <p className="text-sm tracking-widest">+61 (2) 5550-OPAL</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-3 bg-white/5 border border-white/10 text-cyan-400 group-hover:bg-cyan-400/10 transition-colors">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-white font-mono text-xs uppercase tracking-widest font-bold">Sovereign Vault</h3>
                    <p className="text-sm">Lightning Ridge, NSW<br/>Australia, 2834</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="bg-[#111] p-8 border border-white/5 space-y-6">
            <h2 className="text-white text-xl font-display uppercase tracking-widest">Inquiry Dispatch</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30">Identifier / Name</label>
                <input type="text" className="w-full bg-black border border-white/10 p-3 text-sm focus:border-cyan-400/50 outline-none transition-all rounded-none" placeholder="RECIPIENT NAME" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30">Transmission Node (Email)</label>
                <input type="email" className="w-full bg-black border border-white/10 p-3 text-sm focus:border-cyan-400/50 outline-none transition-all rounded-none" placeholder="EMAIL@DOMAIN.COM" />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30">Lattice Query / Message</label>
                <textarea className="w-full bg-black border border-white/10 p-3 text-sm focus:border-cyan-400/50 outline-none transition-all rounded-none h-32 resize-none" placeholder="YOUR TECHNICAL MESSAGE..."></textarea>
              </div>
              <button className="w-full py-4 bg-cyan-500 text-black font-mono text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-cyan-400 transition-all flex items-center justify-center gap-2">
                <Send className="h-3 w-3" /> Dispatch Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
