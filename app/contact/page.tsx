import React from 'react';
import NavBar from '@/components/NavBar';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <div className="pt-32 pb-16 px-6 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 text-center">Contact Us</h1>
        <div className="w-16 h-1 bg-amber-600 mx-auto mb-12"></div>
        
        <div className="bg-neutral-50 p-8 md:p-12 border border-gray-200 rounded-sm">
          <p className="text-center text-gray-600 mb-10">
            Have a question about a specific opal or need help with your order? Our team in Lightning Ridge is ready to assist you.
          </p>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">First Name</label>
                <input type="text" className="w-full border border-gray-300 p-3 rounded-sm focus:ring-1 focus:ring-amber-600 focus:border-amber-600 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Last Name</label>
                <input type="text" className="w-full border border-gray-300 p-3 rounded-sm focus:ring-1 focus:ring-amber-600 focus:border-amber-600 outline-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
              <input type="email" className="w-full border border-gray-300 p-3 rounded-sm focus:ring-1 focus:ring-amber-600 focus:border-amber-600 outline-none" />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Message</label>
              <textarea rows={6} className="w-full border border-gray-300 p-3 rounded-sm focus:ring-1 focus:ring-amber-600 focus:border-amber-600 outline-none"></textarea>
            </div>
            
            <button type="button" className="w-full bg-amber-600 text-white font-bold uppercase tracking-wider text-sm py-4 rounded-sm hover:bg-amber-700 transition-colors">
              Send Message
            </button>
          </form>
          
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            <p className="font-bold text-gray-800 mb-2">OpalSeeker Headquarters</p>
            <p>123 Gemstone Avenue, Lightning Ridge</p>
            <p>New South Wales, Australia 2834</p>
            <p className="mt-4">Email: support@opalseeker.com</p>
          </div>
        </div>
      </div>
    </main>
  );
}
