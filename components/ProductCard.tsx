'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { useCart } from './CartContext';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="group flex flex-col bg-transparent overflow-hidden text-left">
      <Link href={`/product/${product.id}`} className="relative w-full aspect-[4/5] bg-[#f5f2ed] cursor-pointer overflow-hidden block mb-6">
        {product.image?.startsWith('data:video') ? (
          <video 
            src={product.image} 
            autoPlay loop muted playsInline
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
          />
        ) : (
          <Image 
            src={product.image} 
            alt={product.name} 
            fill 
            className="object-cover transition-transform duration-[2s] group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>
      
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2 gap-4">
          <Link href={`/product/${product.id}`} className="font-serif text-lg text-[#1a1a1a] leading-tight hover:italic transition-all">
            {product.name}
          </Link>
        </div>
        
        <div className="text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 mb-4 font-sans">
          {product.type || 'Solid Black Opal'}
        </div>
        
        <div className="mt-auto flex items-center justify-between border-t border-[#1a1a1a]/10 pt-4">
          <span className="font-sans font-medium text-sm text-[#1a1a1a]">${product.price.toLocaleString('en-US')}</span>
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="text-[#1a1a1a] uppercase tracking-[0.2em] text-[9px] font-medium hover:opacity-50 transition-opacity"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
