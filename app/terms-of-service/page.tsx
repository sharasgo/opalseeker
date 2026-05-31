'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale, Gavel, FileText } from 'lucide-react';

export default function TermsOfServicePage() {
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
            <Scale className="h-4 w-4" />
            <span>Governance Framework</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-light text-white uppercase tracking-tighter">
            Terms of <span className="font-bold">Service</span>
          </h1>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-white/60 font-light leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-white text-xl font-display uppercase tracking-widest border-l-2 border-cyan-400 pl-4 py-1">Binding Acquisition Agreement</h2>
            <p>
              By interacting with the Opal Seeker platform, you enter into a binding governance agreement. Acquisitions are finalized upon the successful verification of funds and the subsequent dispatch of the specimen from our secure reserve.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-white text-xl font-display uppercase tracking-widest border-l-2 border-cyan-400 pl-4 py-1">Geological Representation</h2>
            <p>
              While every effort is made to represent the 360-degree play-of-color accurately through our Digital Goniophotometer, the organic nature of opals means that light diffraction varies based on specific environmental lumen conditions. Our technical specifications (Brightness B1-B7, Body Tone N1-N9) are the definitive baseline for material state.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-white text-xl font-display uppercase tracking-widest border-l-2 border-cyan-400 pl-4 py-1">Jurisdiction & Arbitration</h2>
            <p>
              This agreement is governed by the laws of New South Wales, Australia. Any disputes arising from high-value acquisitions must be resolved through specialized commercial arbitration in Sydney, with expert geological testimony where material state is in question.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <div className="bg-white/5 p-8 border border-white/5 space-y-4">
              <Gavel className="h-6 w-6 text-cyan-400" />
              <h3 className="text-white font-mono text-sm uppercase tracking-widest">Escrow Trust</h3>
              <p className="text-xs">All high-value transactions are secured through multi-sig escrow protocols to protect both seeker and boutique.</p>
            </div>
            <div className="bg-white/5 p-8 border border-white/5 space-y-4">
              <FileText className="h-6 w-6 text-cyan-400" />
              <h3 className="text-white font-mono text-sm uppercase tracking-widest">Asset Title</h3>
              <p className="text-xs">Legal title of the asset transfers only upon verified physical receipt and the expiration of the 14-day inspection window.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
