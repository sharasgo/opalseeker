'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, RotateCcw, ShieldAlert, Microscope } from 'lucide-react';

export default function ReturnsRefundsPage() {
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
            <RotateCcw className="h-4 w-4" />
            <span>Integrity Protocol</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-light text-white uppercase tracking-tighter">
            Returns <span className="font-bold">& Refunds</span>
          </h1>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-white/60 font-light leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-white text-xl font-display uppercase tracking-widest border-l-2 border-cyan-400 pl-4 py-1">Forensic Inspection Window</h2>
            <p>
              Given the unique lattice matrix and geological state of each specimen, we offer a 14-day inspection window. During this period, the acquisition must remain in its original tamper-evident vault seal. Once a seal is breached, the specimen is deemed &quot;accepted&quot; for geological integrity purposes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-white text-xl font-display uppercase tracking-widest border-l-2 border-cyan-400 pl-4 py-1">Return Verification</h2>
            <p>
              To initiate a return, the specimen must be re-dispatched via our approved armored logistics partner. Upon arrival at our Lightning Ridge facility, each stone undergoes a forensic spectral analysis to verify it matches the architectural &quot;digital twin&quot; registered in our ledger.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-white text-xl font-display uppercase tracking-widest border-l-2 border-cyan-400 pl-4 py-1">Credit & Escrow Release</h2>
            <p>
              Following successful forensic verification (typically 3-5 business days), a full credit release or escrow refund will be initiated. Please note that return logistics and re-certification costs may be deducted from the final settlement unless a material defect in the silica matrix was identified.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <div className="bg-white/5 p-8 border border-white/5 space-y-4">
              <ShieldAlert className="h-6 w-6 text-cyan-400" />
              <h3 className="text-white font-mono text-sm uppercase tracking-widest">Tamper Evident</h3>
              <p className="text-xs">Any alteration of the stone, including cutting, polishing, or solvent exposure, void the return protocol immediately.</p>
            </div>
            <div className="bg-white/5 p-8 border border-white/5 space-y-4">
              <Microscope className="h-6 w-6 text-cyan-400" />
              <h3 className="text-white font-mono text-sm uppercase tracking-widest">Spectral Match</h3>
              <p className="text-xs">Returns are only finalized after 100% correlation with our high-resolution baseline spectral signatures.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
