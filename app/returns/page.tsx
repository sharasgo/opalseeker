import React from 'react';
import NavBar from '@/components/NavBar';

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <div className="pt-32 pb-16 px-6 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 text-center">Returns & Refunds</h1>
        <div className="w-16 h-1 bg-amber-600 mx-auto mb-12"></div>
        
        <div className="prose prose-lg mx-auto text-gray-700 font-sans">
          <p className="lead text-xl text-gray-600 mb-8">
            Your satisfaction is paramount. If you are not completely enchanted by your opal, you can return it.
          </p>

          <h3 className="text-xl font-bold mt-10 mb-4">30-Day Money Back Guarantee</h3>
          <p className="mb-6">
            We offer a no-questions-asked 30-day return policy. If you receive your opal and decide it is not right for you, 
            you can return it for a full refund of the purchase price (excluding any shipping costs paid during order).
          </p>

          <h3 className="text-xl font-bold mt-10 mb-4">Return Condition</h3>
          <p className="mb-6">
            To be eligible for a return, the opal MUST be exactly as it was when shipped. It must not be altered, set in jewelry, 
            scratched, chipped, or polished further. Any alterations void the return policy completely.
          </p>
          
          <h3 className="text-xl font-bold mt-10 mb-4">How to Initiate a Return</h3>
          <p className="mb-6">
            Contact us at <a href="mailto:support@opalseeker.com" className="text-amber-600 font-bold hover:underline">support@opalseeker.com</a> 
            to initiate your return. We will provide detailed return shipping instructions to ensure the opal is safely returned to our Australian vault.
          </p>
          
          <div className="bg-amber-50 border-l-4 border-amber-600 p-6 mt-10">
            <h4 className="font-bold text-amber-900 mb-2">Important Note on Return Shipping</h4>
            <p className="text-sm text-amber-800">
              Return shipping costs and full insurance for the return journey are the responsibility of the buyer. 
              We highly recommend using a trackable signature-required service.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
