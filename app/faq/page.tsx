import React from 'react';
import NavBar from '@/components/NavBar';

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <div className="pt-32 pb-16 px-6 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 text-center">Frequently Asked Questions</h1>
        <div className="w-16 h-1 bg-amber-600 mx-auto mb-12"></div>
        
        <div className="space-y-8">
          <div className="border-b border-gray-200 pb-6">
            <h3 className="font-bold text-xl mb-3 text-gray-900">Are your opals solid, doublets, or triplets?</h3>
            <p className="text-gray-600">We only sell 100% natural, solid Australian opals. We do not sell any composite stones like doublets or triplets, ensuring you acquire an heirloom-quality gemstone.</p>
          </div>
          
          <div className="border-b border-gray-200 pb-6">
            <h3 className="font-bold text-xl mb-3 text-gray-900">Do you offer certificates of authenticity?</h3>
            <p className="text-gray-600">Yes, every solid opal over $1,000 comes with a signed Certificate of Authenticity detailing the opal&apos;s weight, origin, type, and characteristics.</p>
          </div>
          
          <div className="border-b border-gray-200 pb-6">
            <h3 className="font-bold text-xl mb-3 text-gray-900">How do I care for my opal?</h3>
            <p className="text-gray-600">Solid Australian opals do not need to be kept in water or rubbed with oil. Simply clean them with a soft, damp cloth and mild soap. Avoid thermal shock, harsh chemicals, and ultrasonic cleaners.</p>
          </div>
          
          <div className="border-b border-gray-200 pb-6">
            <h3 className="font-bold text-xl mb-3 text-gray-900">Do opals crack or &quot;craze&quot; easily?</h3>
            <p className="text-gray-600">Australian opals are renowned for their stability compared to opals from other parts of the world. Because they form in arid environments, they have a lower water content and are highly resistant to crazing (cracking).</p>
          </div>
          
          <div className="border-b border-gray-200 pb-6">
            <h3 className="font-bold text-xl mb-3 text-gray-900">Where are you located?</h3>
            <p className="text-gray-600">We are based in Lightning Ridge, New South Wales, Australia—the world capital of the black opal. We ship globally from our safe vaults straight to your door.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
