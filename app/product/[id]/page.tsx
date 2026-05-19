'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import NavBar from '@/components/NavBar';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useCart } from '@/components/CartContext';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

export default function ProductPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'products', id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    setAdding(true);
    addToCart(product);
    setTimeout(() => {
      setAdding(false);
    }, 500); // Give user a quick feedback
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fcfbf9] text-[#1a1a1a]">
        <NavBar />
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50">Loading Product...</div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-[#fcfbf9] text-[#1a1a1a]">
        <NavBar />
        <div className="flex flex-col justify-center items-center h-[60vh]">
          <h1 className="text-4xl font-serif font-light mb-6">Product Not Found</h1>
          <p className="text-[#1a1a1a]/60 mb-8 font-light">The opal you are looking for does not exist or has been removed.</p>
          <Link href="/collection" className="border-b border-[#1a1a1a]/20 hover:border-[#1a1a1a] pb-1 uppercase tracking-[0.2em] text-[10px] transition-colors">
            Return to Collection
          </Link>
        </div>
      </main>
    );
  }

  const images: string[] = product.images?.length > 0 ? product.images : (product.image ? [product.image] : []);
  const activeMedia = images[activeImageIdx] || '';

  return (
    <main className="min-h-screen bg-[#fcfbf9] text-[#1a1a1a]">
      <NavBar />
      
      {/* Breadcrumb */}
      <div className="px-6 md:px-12 py-8 border-b border-[#1a1a1a]/10 text-[9px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 flex items-center gap-2">
        <Link href="/" className="hover:text-[#1a1a1a] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/collection" className="hover:text-[#1a1a1a] transition-colors">Collection</Link>
        <span>/</span>
        <span className="text-[#1a1a1a]">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Product Image Panel */}
        <div className="border-b md:border-b-0 md:border-r border-[#1a1a1a]/10 bg-[#f5f2ed] p-8 md:p-16 flex flex-col items-center justify-center group overflow-hidden">
          <div className="relative w-full aspect-square max-w-xl mx-auto flex items-center justify-center">
            {activeMedia?.startsWith('data:video') ? (
              <video 
                src={activeMedia} 
                autoPlay loop muted playsInline controls
                className="w-full h-full object-contain"
              />
            ) : (
              activeMedia && (
                <Image
                  src={activeMedia}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto w-full mt-12 py-2 max-w-xl max-h-32 justify-center">
              {images.map((media, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative w-20 h-20 shrink-0 border border-[#1a1a1a]/10 overflow-hidden rounded-sm transition-all shadow-sm ${idx === activeImageIdx ? 'opacity-100 ring-1 ring-[#1a1a1a]' : 'opacity-50 hover:opacity-100'}`}
                >
                  {media?.startsWith('data:video') ? (
                     <video src={media} className="w-full h-full object-cover" />
                  ) : (
                    <img src={media} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Panel */}
        <div className="p-8 md:p-16 lg:p-24 xl:p-32 flex flex-col pt-12 md:pt-[15vh]">
          <div className="mb-4 text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 flex justify-between items-center">
            <span>{product.type || 'Solid Black Opal'}</span>
            {product.origin && <span>Origin: {product.origin}</span>}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-serif font-light leading-[1.1] mb-8">
            {product.name}
          </h1>
          
          <div className="text-2xl md:text-3xl font-sans font-light mb-12 border-b border-[#1a1a1a]/10 pb-12">
            ${product.price.toLocaleString('en-US')}
          </div>

          <div className="prose prose-sm prose-neutral text-[#1a1a1a]/70 font-light mb-16 max-w-full">
            <div className="markdown-body">
              <ReactMarkdown>{product.description}</ReactMarkdown>
            </div>
          </div>

          <div className="mt-auto pt-8">
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.1em] border-b border-[#1a1a1a]/10 pb-3 text-[#1a1a1a]/60">
                <span>Shipping</span>
                <span>Complimentary Worldwide</span>
              </div>
              <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.1em] border-b border-[#1a1a1a]/10 pb-3 text-[#1a1a1a]/60">
                <span>Returns</span>
                <span>30-Day Guarantee</span>
              </div>
              <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.1em] border-b border-[#1a1a1a]/10 pb-3 text-[#1a1a1a]/60">
                <span>Authenticity</span>
                <span>Certificate Included</span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="w-full bg-[#1a1a1a] text-[#fcfbf9] py-5 uppercase text-[10px] tracking-[0.2em] font-medium hover:bg-[#1a1a1a]/80 transition-all active:scale-[0.99] disabled:opacity-70 flex justify-center items-center gap-3"
            >
              {adding ? 'Adding to Cart...' : 'Add to Cart'}
              {!adding && (
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
                   <path d="M5 12h14M12 5l7 7-7 7"/>
                 </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
