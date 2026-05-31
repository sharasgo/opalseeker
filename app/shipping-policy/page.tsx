'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Truck, ShieldCheck, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ShippingPolicyPage() {
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
            <Truck className="h-4 w-4" />
            <span>Logistics Protocol</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-display font-light text-white uppercase tracking-tighter">
            Shipping <span className="font-bold">Policy</span>
          </h1>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-white/60 font-light leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-white text-xl font-display uppercase tracking-widest border-l-2 border-cyan-400 pl-4 py-1">Secure Global Transit</h2>
            <p>
              Every specimen in our reserve is dispatched under a high-security logistic protocol. We partner exclusively with specialized armored courier services (DHL Express, FedEx Priority, and Brinks) to ensure the physical integrity of your acquisition during every stage of transit.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-white text-xl font-display uppercase tracking-widest border-l-2 border-cyan-400 pl-4 py-1">Insurance & Liability</h2>
            <p>
              Full-value insurance coverage is mandatory for all shipments. This covers the acquisition from the moment it leaves our secure vault in Lightning Ridge until it is signed for by the verified recipient. Any anomalies or damage identified upon receipt must be documented forensicly and reported within 24 hours.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-white text-xl font-display uppercase tracking-widest border-l-2 border-cyan-400 pl-4 py-1">Diplomatic Clearance</h2>
            <p>
              Our operations team coordinates with international customs brokerage to ensure all diplomatic and trade clearances are pre-processed. Recipients are responsible for any destination-specific VAT, GST, or import excise duties required by their local jurisdiction.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
            <div className="bg-white/5 p-8 border border-white/5 space-y-4">
              <Globe className="h-6 w-6 text-cyan-400" />
              <h3 className="text-white font-mono text-sm uppercase tracking-widest">Global Reach</h3>
              <p className="text-xs">We ship to over 140 countries, utilizing verified secure-path routing to avoid high-risk transit zones.</p>
            </div>
            <div className="bg-white/5 p-8 border border-white/5 space-y-4">
              <ShieldCheck className="h-6 w-6 text-cyan-400" />
              <h3 className="text-white font-mono text-sm uppercase tracking-widest">Gps Stealth</h3>
              <p className="text-xs">Each consignment is housed in anti-tamper packaging with integrated GPS telemetry for real-time monitoring.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
