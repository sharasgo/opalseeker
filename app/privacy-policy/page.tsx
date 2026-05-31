'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Fingerprint, Lock, ShieldCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
            <Lock className="h-4 w-4" />
            <span>Encrypted Data Vault</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-light text-white uppercase tracking-tighter">
            Privacy <span className="font-bold">Policy</span>
          </h1>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-white/60 font-light leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-white text-xl font-display uppercase tracking-widest border-l-2 border-cyan-400 pl-4 py-1">Identity Encryption</h2>
            <p>
              We treat the identity of our acquisitions as a matter of high confidentiality. Personal orientation data, financial credentials, and acquisition history are protected by 256-bit AES encryption and stored in sovereign data centers that adhere to strict privacy mandates.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-white text-xl font-display uppercase tracking-widest border-l-2 border-cyan-400 pl-4 py-1">Data Transmission Protocols</h2>
            <p>
              Interactions on our platform are secured via TLS 1.3. We do not engage in data harvesting or third-party behavioral tracking. Your visit logs are ephemeral and purged every 24 hours to maintain the &quot;stealth&quot; nature of luxury acquisitions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-white text-xl font-display uppercase tracking-widest border-l-2 border-cyan-400 pl-4 py-1">Collector Confidentiality</h2>
            <p>
              Provenance records for rare specimens are anonymized in our public catalog. Private ledger records identifying physical owners are only accessible through multi-factor biometric authentication and are never disclosed to third-party commercial entities.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <div className="bg-white/5 p-8 border border-white/5 space-y-4">
              <Fingerprint className="h-6 w-6 text-cyan-400" />
              <h3 className="text-white font-mono text-sm uppercase tracking-widest">Biometric Zero</h3>
              <p className="text-xs">We utilize zero-knowledge proofs for authentication, ensuring your biometric keys never leave your device.</p>
            </div>
            <div className="bg-white/5 p-8 border border-white/5 space-y-4">
              <ShieldCheck className="h-6 w-6 text-cyan-400" />
              <h3 className="text-white font-mono text-sm uppercase tracking-widest">GDRP Protocol</h3>
              <p className="text-xs">Fully compliant with international data protection frameworks, including GDPR and the Australian Privacy Act.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
