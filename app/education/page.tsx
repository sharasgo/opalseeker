import React from 'react';
import NavBar from '@/components/NavBar';
import Image from 'next/image';

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <div className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 text-center">Opal Education</h1>
        <div className="w-16 h-1 bg-amber-600 mx-auto mb-12"></div>
        
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-serif font-bold mb-4 text-gray-900">What is an Opal?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Opal is a hydrated amorphous form of silica. Unlike most gemstones, opal is non-crystalline, 
              meaning it lacks a defined crystal structure. Its internal structure is composed of tightly 
              packed microscopic silica spheres. When light passes through these spheres, it diffracts, 
              causing the mesmerizing &quot;play-of-color&quot; that opals are famous for.
            </p>
            <div className="relative w-full h-64 bg-gray-100 rounded-sm overflow-hidden border border-gray-200">
               <Image src="https://picsum.photos/seed/opal-education1/800/400" alt="Opal formation" fill className="object-cover" />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold mb-4 text-gray-900">Types of Australian Opals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-neutral-50 p-6 border border-gray-100 rounded-sm">
                <h3 className="font-bold mb-2">Black Opal</h3>
                <p className="text-sm text-gray-600">The most valuable type, mined primarily in Lightning Ridge. It features a dark body tone which makes the colors pop.</p>
              </div>
              <div className="bg-neutral-50 p-6 border border-gray-100 rounded-sm">
                <h3 className="font-bold mb-2">Boulder Opal</h3>
                <p className="text-sm text-gray-600">Mined in Queensland, these opals form within ironstone boulders. The ironstone is left on the back for strength and contrast.</p>
              </div>
              <div className="bg-neutral-50 p-6 border border-gray-100 rounded-sm">
                <h3 className="font-bold mb-2">Crystal Opal</h3>
                <p className="text-sm text-gray-600">Transparent to semi-transparent opals. Mainly found in Coober Pedy. Incredible when held up to the light.</p>
              </div>
              <div className="bg-neutral-50 p-6 border border-gray-100 rounded-sm">
                <h3 className="font-bold mb-2">White/Light Opal</h3>
                <p className="text-sm text-gray-600">Features a light or white body color. The more common type of opal, offering delicate pastels.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold mb-4 text-gray-900">Valuing an Opal</h2>
            <p className="text-gray-700 leading-relaxed">
              Opal valuation is complex. The most critical factor is the brilliance of the color, followed by the pattern 
              (Harlequin is the rarest), the body tone (darker is generally more valuable), and the size (carat weight). 
              A highly brilliant crystal opal can sometimes be worth more than a dull black opal.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
