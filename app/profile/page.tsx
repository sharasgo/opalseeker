'use client';

import React, { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, role, logout } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const q = query(collection(db, 'orders'), where('userId', '==', user.uid));
        const qs = await getDocs(q);
        setOrders(qs.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (e) {
        console.error('Error fetching orders', e);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  if (loading) return <div className="min-h-screen bg-white"><NavBar /><div className="pt-32 text-center">Loading...</div></div>;

  if (!user) {
    return (
      <main className="min-h-screen bg-white">
        <NavBar />
        <div className="pt-32 pb-16 px-6 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-serif mb-6">Please sign in</h1>
          <p className="text-gray-600 mb-8">You need to sign in to view your profile.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <div className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-serif text-gray-900">Your Profile</h1>
          <button onClick={logout} className="text-sm font-bold tracking-wider text-gray-600 hover:text-black uppercase">
            Sign Out
          </button>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded p-8 mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Account Details</h2>
            <p className="text-gray-700">{user.email}</p>
            <p className="text-gray-500 text-sm capitalize mt-1">Role: {role || 'customer'}</p>
          </div>
          {role === 'admin' && (
            <Link href="/admin" className="bg-[#111] text-white px-6 py-3 rounded text-sm font-bold uppercase tracking-wider hover:bg-[#cc6600] transition-colors">
              Admin Dashboard
            </Link>
          )}
        </div>

        <h2 className="text-2xl font-serif text-gray-900 mb-6">Order History</h2>
        
        {orders.length === 0 ? (
          <div className="text-center bg-gray-50 py-16 rounded border border-gray-200">
            <p className="text-gray-500 mb-6">You haven&apos;t placed any orders yet.</p>
            <Link href="/collection" className="bg-[#cc6600] text-white px-8 py-3 rounded text-sm font-bold uppercase tracking-wider hover:bg-[#b35900] transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="border border-gray-200 rounded p-6">
                <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4 text-sm text-gray-500">
                  <div>
                    <p className="font-bold text-gray-900 mb-1">Order #{order.id.slice(0, 8)}</p>
                    <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 mb-1">€{order.totalAmount.toLocaleString()}</p>
                    <p className="uppercase text-xs tracking-wider font-semibold text-[#cc6600]">{order.status}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.quantity}x {item.name}</span>
                      <span className="text-gray-900 font-medium">€{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
