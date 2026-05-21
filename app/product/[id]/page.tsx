'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import NavBar from '@/components/NavBar';
import { db } from '@/lib/firebase';
import { doc, getDoc, onSnapshot, collection, query, limit, getDocs } from 'firebase/firestore';
import { useCart } from '@/components/CartContext';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Globe, Headset, Mountain, CheckCircle2 } from 'lucide-react';

const ZoomImage = ({ src, alt }: { src: string; alt: string }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setBackgroundPosition(`${x}% ${y}%`);
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden cursor-zoom-in group"
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-200 ${isZoomed ? 'opacity-0' : 'opacity-100'}`}
      />
      {isZoomed && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition,
            backgroundSize: '200%',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
    </div>
  );
};

export default function ProductPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;
    
    const docRef = doc(db, 'products', id as string);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.error("Product not found");
      }
      setLoading(false);
    }, (err) => {
      console.error("Error fetching product:", err);
      setLoading(false);
    });

    getDocs(query(collection(db, 'products'), limit(5))).then((snapshot) => {
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(p => p.id !== id);
      setRelatedProducts(fetched.slice(0, 4));
    }).catch(err => {
      console.error("Error fetching related products:", err);
    });

    return () => unsubscribe();
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
      <div className="px-6 md:px-12 py-3 border-b border-[#1a1a1a]/10 text-[9px] uppercase tracking-[0.2em] text-[#1a1a1a]/50 flex items-center gap-2">
        <Link href="/" className="hover:text-[#1a1a1a] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/collection" className="hover:text-[#1a1a1a] transition-colors">Collection</Link>
        <span>/</span>
        <span className="text-[#1a1a1a]">{product.name}</span>
      </div>

      <div className="flex flex-col md:flex-row relative border-t-0 border-[#1a1a1a]/10">
        {/* Product Media Gallery */}
        <div className="w-full md:w-[54%] border-r border-[#1a1a1a]/10 pl-[1cm] pt-[0.33cm] pb-[1cm] flex flex-col">
          <div className="w-[80%] md:w-[94.5%] grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-transparent">
            {images.map((media, idx) => {
               const mediaLower = media?.toLowerCase() || '';
               const isYoutube = mediaLower.includes('youtube.com/') || mediaLower.includes('youtu.be/');
               const isVimeo = mediaLower.includes('vimeo.com/');
               const isHostedVideo = mediaLower.startsWith('data:video') || mediaLower.includes('#video') || mediaLower.includes('.mp4') || mediaLower.includes('.mov') || mediaLower.includes('.webm');
               const isVideo = isHostedVideo || isYoutube || isVimeo;
               const isFullWidth = isVideo || (images.length % 2 !== 0 && idx === images.length - 1);
               return (
                <div key={idx} className={`relative w-full flex items-center justify-center bg-[#fcfbf9] overflow-hidden group ${isFullWidth ? 'col-span-1 sm:col-span-2 aspect-[16/9]' : 'col-span-1 aspect-square'}`}>
                  {isYoutube ? (
                    (() => {
                      let videoId = '';
                      if (media.includes('v=')) videoId = media.split('v=')[1]?.split('&')[0];
                      else if (media.includes('youtu.be/')) videoId = media.split('youtu.be/')[1]?.split('?')[0];
                      return (
                        <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full object-cover"></iframe>
                      );
                    })()
                  ) : isVimeo ? (
                    (() => {
                      const videoId = media.split('vimeo.com/')[1]?.split('?')[0];
                      return (
                        <iframe src={`https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=1&background=1`} width="100%" height="100%" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="w-full h-full object-cover"></iframe>
                      );
                    })()
                  ) : isHostedVideo ? (
                    <video 
                      src={media.replace('#video', '')} 
                      autoPlay loop muted playsInline controls
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ZoomImage 
                      src={media} 
                      alt={`${product.name} - View ${idx + 1}`} 
                    />
                 )}
                </div>
              )
            })}

            {images.length === 0 && (
              <div className="col-span-1 sm:col-span-2 aspect-square flex items-center justify-center text-[#1a1a1a]/30 text-xs uppercase tracking-widest bg-[#fcfbf9]">
                No Media Available
              </div>
            )}
          </div>
        </div>

        {/* Product Details Panel */}
        <div className="w-full md:w-[46%] px-8 py-10 md:px-6 md:pb-[1cm] lg:px-8 lg:pt-[1cm] flex flex-col">
          <div className="flex flex-col flex-1 h-full">
            <h1 className="text-[28px] md:text-[34px] font-sans font-normal leading-[1.2] tracking-tight mb-2 text-[#222]">
              {product.name}
            </h1>
            
            <div className="text-[20px] font-sans font-normal text-[#444] mb-8">
              €{product.price.toLocaleString('de-DE', { minimumFractionDigits: 2 })} EUR
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={adding}
              className="w-full bg-[#1b232c] text-white py-[14px] rounded-full text-xs font-semibold uppercase tracking-wide hover:bg-[#111] transition-all disabled:opacity-70 mb-4"
            >
              {adding ? 'ADDING...' : 'ADD TO CART'}
            </button>
            <button
              className="w-full bg-transparent border border-[#ccc] text-[#333] py-[14px] rounded-full text-xs font-medium uppercase tracking-[0.05em] hover:bg-[#fcfbf9] transition-all flex justify-center items-center gap-2 mb-10"
            >
               <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                 <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z"/>
               </svg>
               ADD TO WISHLIST
            </button>

            <div className="mt-auto pt-6 border-t border-[#1a1a1a]/10 max-w-full flex flex-col">
              <h3 className="text-[14px] font-medium text-[#222] mb-4 uppercase tracking-wider">Description</h3>
              <div className="prose prose-sm prose-p:my-1 prose-neutral text-[#4b5563] font-light [&_p:last-child]:mb-0 pr-2">
                <div 
                  className="whitespace-pre-wrap product-description-html [&>p:last-child]:mb-0"
                  dangerouslySetInnerHTML={{ __html: product.description || '' }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="px-6 md:px-12 py-16 md:py-24 border-t border-[#1a1a1a]/10 bg-[#1a1a1a]">
          <h2 className="text-[20px] font-sans font-medium uppercase tracking-widest text-white mb-10 text-center">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-12">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} variant="related" />
            ))}
          </div>
        </div>
      )}

      {/* Promises Section */}
      <div className="border-t border-[#1a1a1a]/10 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#1a1a1a]/10 text-center">
          <div className="p-10 flex flex-col items-center justify-start">
            <Globe className="w-6 h-6 mb-5 text-[#1a1a1a]" strokeWidth={1.5} />
            <h3 className="text-[14px] font-medium text-[#1a1a1a] mb-3 underline underline-offset-4 decoration-1 decoration-[#1a1a1a] hover:decoration-[#1a1a1a]/40 transition-all">We Ship Worldwide</h3>
            <p className="text-[13px] text-[#1a1a1a]/70 font-light leading-relaxed px-2">
              Delivering the color of Australia safely and securely to you.
            </p>
          </div>
          <div className="p-10 flex flex-col items-center justify-start">
            <Headset className="w-6 h-6 mb-5 text-[#1a1a1a]" strokeWidth={1.5} />
            <h3 className="text-[14px] font-medium text-[#1a1a1a] mb-3 underline underline-offset-4 decoration-1 decoration-[#1a1a1a] hover:decoration-[#1a1a1a]/40 transition-all">Concierge Service</h3>
            <p className="text-[13px] text-[#1a1a1a]/70 font-light leading-relaxed px-2">
              Got a question or need help with your selection? We're here to help.
            </p>
          </div>
          <div className="p-10 flex flex-col items-center justify-start">
            <Mountain className="w-6 h-6 mb-5 text-[#1a1a1a]" strokeWidth={1.5} />
            <h3 className="text-[14px] font-medium text-[#1a1a1a] mb-3 underline underline-offset-4 decoration-1 decoration-[#1a1a1a] hover:decoration-[#1a1a1a]/40 transition-all">Provenance</h3>
            <p className="text-[13px] text-[#1a1a1a]/70 font-light leading-relaxed px-2">
              Sourced by us. Cut by us. We know the story behind every opal.
            </p>
          </div>
          <div className="p-10 flex flex-col items-center justify-start">
            <CheckCircle2 className="w-6 h-6 mb-5 text-[#1a1a1a]" strokeWidth={1.5} />
            <h3 className="text-[14px] font-medium text-[#1a1a1a] mb-3 underline underline-offset-4 decoration-1 decoration-[#1a1a1a] hover:decoration-[#1a1a1a]/40 transition-all">Our Promise</h3>
            <p className="text-[13px] text-[#1a1a1a]/70 font-light leading-relaxed px-2">
              We stand by every opal we sell—if something's not right, we'll make it right.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
