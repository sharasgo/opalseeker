import React from 'react';
import NavBar from '@/components/NavBar';

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <div className="pt-32 pb-16 px-6 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 text-center">Shipping Information</h1>
        <div className="w-16 h-1 bg-amber-600 mx-auto mb-12"></div>
        
        <div className="prose prose-lg mx-auto text-gray-700 font-sans">
          <p className="lead text-xl text-gray-600 mb-8">
            We deliver the world's finest opals safely and securely to your doorstep, anywhere in the world.
          </p>

          <h3 className="text-xl font-bold mt-10 mb-4">Insured Worldwide Shipping</h3>
          <p className="mb-6">
            Every shipment is fully insured by our specialized logistics partners for the full purchase value of the opal. 
            You bear zero risk until the package is signed for at your address.
          </p>
          
          <h3 className="text-xl font-bold mt-10 mb-4">Delivery Providers</h3>
          <p className="mb-6">
            We utilize top-tier couriers such as FedEx International Priority and DHL Express to ensure rapid, trackable, and safe delivery.
          </p>

          <h3 className="text-xl font-bold mt-10 mb-4">Processing Times</h3>
          <p className="mb-6">
            Orders are typically securely packed and dispatched from Lightning Ridge within 1-2 business days after payment confirmation.
          </p>

          <h3 className="text-xl font-bold mt-10 mb-4">Customs, Duties, and Taxes</h3>
          <p className="mb-6">
            Please be aware that international shipments may be subject to local customs duties and taxes depending on your country. 
            These charges are solely the responsibility of the buyer. We are required by law to declare the full value of the item on customs forms.
          </p>
        </div>
      </div>
    </main>
  );
}
