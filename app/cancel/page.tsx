import React from 'react';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import { XCircle } from 'lucide-react';

export default function CancelPage() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col">
      <NavBar />
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <XCircle size={64} className="text-white/40 mb-8" strokeWidth={1} />
        <h1 className="font-serif text-4xl sm:text-6xl font-light mb-6">Order Cancelled</h1>
        <p className="text-white/60 max-w-md mx-auto mb-12 font-light leading-relaxed">
          Your transaction was not completed. Your selected opals are still waiting for you in your cart.
        </p>
        <Link 
          href="/" 
          className="border border-white/20 text-white px-8 py-4 rounded-full uppercase tracking-[0.1em] text-sm font-semibold hover:bg-white hover:text-black transition-colors"
        >
          Return to Collection
        </Link>
      </div>
    </main>
  );
}
