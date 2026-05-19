import React from 'react';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#050505] flex flex-col">
      <NavBar />
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <CheckCircle size={64} className="text-white/40 mb-8" strokeWidth={1} />
        <h1 className="font-serif text-4xl sm:text-6xl font-light mb-6">Payment Successful</h1>
        <p className="text-white/60 max-w-md mx-auto mb-12 font-light leading-relaxed">
          Thank you for acquiring a piece of Australian history. Your opal will be carefully packaged and shipped shortly. We have sent a receipt to your email.
        </p>
        <Link 
          href="/" 
          className="bg-white text-black px-8 py-4 rounded-full uppercase tracking-[0.1em] text-sm font-semibold hover:bg-neutral-200 transition-colors"
        >
          Return to Collection
        </Link>
      </div>
    </main>
  );
}
