'use client';

import React, { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import ProductCard from '@/components/ProductCard';
import { db } from '@/lib/firebase';
import { collection, getDocs, query } from 'firebase/firestore';

export default function CollectionPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'));
        const qs = await getDocs(q);
        const data = qs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <NavBar />
      <div className="pt-20 pb-16 px-6 max-w-[1600px] mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Our Collection</h1>
          <div className="w-16 h-1 bg-[#cc6600] mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-xl mx-auto text-lg font-light leading-relaxed">
            Browse our full range of solid black opals, crystal opals, and boulder opals. 
            All stones are natural, ethically sourced, and expertly cut.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">Loading our collection...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
