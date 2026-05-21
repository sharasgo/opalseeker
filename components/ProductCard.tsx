'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/data/products';
import { useCart } from './CartContext';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function ProductCard({ product, darkTheme = false, smallThumbnail = false, variant = 'default' }: { product: Product, darkTheme?: boolean, smallThumbnail?: boolean, variant?: 'default' | 'related' }) {
  const { addToCart } = useCart();

  if (variant === 'related') {
    return (
      <div className={`group flex flex-col bg-white overflow-hidden text-center relative ${smallThumbnail ? 'scale-90 transform origin-top' : ''}`}>
        <Link href={`/product/${product.id}`} className="relative w-full aspect-[4/4.5] bg-black cursor-pointer overflow-hidden block">
          {product.image?.startsWith('data:video') || product.image?.includes('#video') ? (
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
          <button 
            className="absolute top-4 right-4 w-9 h-9 bg-[#fdfaf6] rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform z-10"
            onClick={(e) => { e.preventDefault(); }}
          >
            <Heart className="w-4 h-4 text-[#c59c7a]" strokeWidth={1.5} />
          </button>
        </Link>
        <div className="px-4 py-8 flex flex-col items-center justify-center border border-t-0 border-[#1a1a1a]/10">
          <Link href={`/product/${product.id}`} className="font-sans text-[16px] text-[#1a1a1a] mb-1 hover:opacity-70 transition-opacity font-light">
            {product.name}
          </Link>
          <div className="text-[15px] font-sans text-[#4a4a4a] font-light">
            €{product.price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EUR
          </div>
        </div>
      </div>
    );
  }

  const textColor = darkTheme ? 'text-white' : 'text-[#1a1a1a]';
  const textMuted = darkTheme ? 'text-white/60' : 'text-[#1a1a1a]/50';
  const borderColor = darkTheme ? 'border-white/20' : 'border-[#1a1a1a]/10';

  return (
    <div className="group flex flex-col bg-transparent overflow-hidden text-left">
      <Link href={`/product/${product.id}`} className={`relative ${smallThumbnail ? 'w-[80%] mx-auto' : 'w-full'} aspect-[4/5] ${darkTheme ? 'bg-[#121212]' : 'bg-[#f5f2ed]'} cursor-pointer overflow-hidden block mb-6`}>
        {product.image?.startsWith('data:video') || product.image?.includes('#video') ? (
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
          <Link href={`/product/${product.id}`} className={`font-serif text-lg ${textColor} leading-tight hover:italic transition-all`}>
            {product.name}
          </Link>
        </div>
        
        <div className={`text-[10px] uppercase tracking-[0.2em] ${textMuted} mb-4 font-sans`}>
          {product.type || 'Solid Black Opal'}
        </div>
        
        <div className={`mt-auto flex items-center justify-between border-t ${borderColor} pt-4`}>
          <span className={`font-sans font-medium text-sm ${textColor}`}>€{product.price.toLocaleString('en-US')}</span>
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className={`${textColor} uppercase tracking-[0.2em] text-[9px] font-medium hover:opacity-50 transition-opacity`}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
