'use client';

import React from 'react';
import { useCart } from './CartContext';
import { useAuth } from './AuthProvider';
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);

  const { user } = useAuth();

  if (!isCartOpen) return null;

  const handleCheckout = async () => {
    if (!user) {
      alert("Please sign in to checkout.");
      return;
    }
    setIsCheckingOut(true);
    try {
      // Mock Checkout - Create order directly in Firestore
      const { doc, setDoc, collection } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');
      
      const orderId = `ord_${Date.now()}`;
      await setDoc(doc(db, 'orders', orderId), {
        userId: user.uid,
        items: cart,
        totalAmount: cartTotal,
        status: 'pending',
        createdAt: Date.now(),
        updatedAt: Date.now()
      });

      alert('Order placed successfully!');
      clearCart();
      setIsCartOpen(false);
      window.location.href = '/profile';
      
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(error.message || 'Checkout failed.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white border-l border-gray-200 z-50 flex flex-col shadow-2xl p-6 md:p-8 text-neutral-900 font-sans transform transition-transform">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <h2 className="text-xl font-bold uppercase tracking-wide flex items-center gap-2">
            <ShoppingCart size={20} />
            Your Cart
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-black"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 space-y-4">
              <ShoppingCart size={48} strokeWidth={1.5} />
              <p className="text-sm font-medium tracking-wide">Your cart is empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="mt-4 text-amber-600 hover:text-amber-700 font-bold uppercase text-xs tracking-wider border-b-2 border-transparent hover:border-amber-600 transition-colors pb-1"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 items-start pb-6 border-b border-gray-100 last:border-0">
                <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col h-full">
                  <div>
                    <h3 className="font-bold text-base leading-snug">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">{item.origin}</p>
                  </div>
                  <div className="mt-auto pt-4 flex items-center justify-between w-full">
                    <span className="font-bold text-amber-600">€{item.price.toLocaleString('en-US')}</span>
                    <div className="flex items-center gap-3 text-sm border border-gray-200 rounded px-2 py-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-500 hover:text-black transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="w-4 text-center font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-500 hover:text-black transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="mt-auto pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <span className="uppercase tracking-wider text-sm font-bold text-gray-500">Subtotal</span>
              <span className="text-2xl font-bold">€{cartTotal.toLocaleString('en-US')}</span>
            </div>
            <p className="text-xs text-gray-500 text-center mb-4">Shipping and taxes calculated at checkout.</p>
            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-[#cc6600] text-white py-4 rounded font-bold uppercase tracking-wide text-sm hover:bg-[#b35900] transition-colors disabled:opacity-50"
            >
              {isCheckingOut ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
