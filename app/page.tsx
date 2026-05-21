'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import NavBar from '@/components/NavBar';
import ProductCard from '@/components/ProductCard';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, limit, doc, getDoc } from 'firebase/firestore';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [homeContent, setHomeContent] = useState<any>({
    heroTitleLine1: 'Australian',
    heroTitleLine2: 'Opals',
    heroSubtitle: "",
    heroBackgroundImage: '',
    founderMessage: "\"My name is Justin, and I've been mining and cutting opals all my life. We're based in Lightning Ridge, the home of the Black Opal. When you buy from OpalSeeker, you're buying directly from the source. No middlemen, just beautiful, ethically sourced, solid Australian opals.\""
  });

  useEffect(() => {
    const fetchProductsAndContent = async () => {
      try {
        const q = query(collection(db, 'products'), limit(5));
        const qs = await getDocs(q);
        const data = qs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(data);
        
        const homeSnap = await getDoc(doc(db, 'content', 'homePage'));
        if (homeSnap.exists()) {
          setHomeContent(homeSnap.data());
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchProductsAndContent();
  }, []);

  return (
    <main className="min-h-screen bg-[#fcfbf9] text-[#1a1a1a] selection:bg-[#cc6600] selection:text-white">
      <NavBar />

      {/* Hero Section */}
      <section className="relative w-full h-[85vh] flex items-end pb-16 px-6 md:px-16 border-b border-[#1a1a1a]/20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {homeContent.heroBackgroundImage ? (
            (homeContent.heroBackgroundImage.startsWith('data:video') || homeContent.heroBackgroundImage.includes('#video')) ? (
              <video 
                src={homeContent.heroBackgroundImage} 
                autoPlay loop muted playsInline
                className="w-full h-full object-cover transition-transform duration-[3s] hover:scale-105"
              />
            ) : (
              <Image
                src={homeContent.heroBackgroundImage}
                alt="OpalSeeker"
                fill
                className="object-cover transition-transform duration-[3s] hover:scale-105"
                priority
                referrerPolicy="no-referrer"
              />
            )
          ) : (
            <div className="w-full h-full bg-[#1a1a1a]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 h-full">
          <div className="max-w-2xl mt-auto pb-8 md:pb-0">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-[10px] md:text-xs text-white/70 uppercase tracking-[0.2em] mb-6"
            >
              Established 1961
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-[110px] font-serif text-white font-light leading-[0.85] tracking-tight mb-8"
            >
              {homeContent.heroTitleLine1.trimEnd().split('\n').map((line: string, i: number, arr: any[]) => <React.Fragment key={i}>{line}{i < arr.length - 1 && <br/>}</React.Fragment>)}
              <br />
              <span className="italic opacity-90">{homeContent.heroTitleLine2}</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-md md:text-lg text-white/80 font-light max-w-lg mb-10 leading-relaxed"
            >
              {homeContent.heroSubtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <Link href="/collection" className="inline-flex items-center justify-center border border-white/40 text-white px-8 py-4 uppercase text-xs tracking-[0.15em] hover:bg-white hover:text-black transition-colors rounded-full backdrop-blur-sm">
                Discover the Collection
              </Link>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
            className="hidden lg:block relative writing-vertical-rl text-white/50 text-[10px] tracking-[0.3em] font-sans h-full text-right pb-12 rotate-180"
          >
            PREMIUM LIGHTNING RIDGE STONES
          </motion.div>
        </div>
      </section>

      {/* Categories Grid - Recipe 12 Style */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="border-b border-[#1a1a1a]/20 grid grid-cols-2 md:grid-cols-4 bg-[#fcfbf9]"
      >
        <Link href="/collection" className="flex flex-col justify-between aspect-square md:aspect-[3/2] border-r border-b md:border-b-0 border-[#1a1a1a]/10 p-6 md:p-10 group hover:bg-[#1a1a1a] hover:text-white transition-colors duration-300">
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-50 group-hover:opacity-70">01</span>
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-light">Solid Opals</h3>
            <p className="text-[10px] uppercase tracking-[0.2em] mt-4 opacity-60 group-hover:opacity-80">Shop collection</p>
          </div>
        </Link>
        <Link href="/collection" className="flex flex-col justify-between aspect-square md:aspect-[3/2] border-r border-[#1a1a1a]/10 p-6 md:p-10 group hover:bg-[#1a1a1a] hover:text-white transition-colors duration-300">
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-50 group-hover:opacity-70">02</span>
          <div>
             <h3 className="font-serif text-2xl md:text-3xl font-light">Rough Opals</h3>
             <p className="text-[10px] uppercase tracking-[0.2em] mt-4 opacity-60 group-hover:opacity-80">Shop collection</p>
          </div>
        </Link>
        <Link href="/collection" className="flex flex-col justify-between aspect-square md:aspect-[3/2] border-r border-b border-[#1a1a1a]/10 md:border-b-0 p-6 md:p-10 group hover:bg-[#1a1a1a] hover:text-white transition-colors duration-300">
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-50 group-hover:opacity-70">03</span>
          <div>
             <h3 className="font-serif text-2xl md:text-3xl font-light">Fine Jewelry</h3>
             <p className="text-[10px] uppercase tracking-[0.2em] mt-4 opacity-60 group-hover:opacity-80">Shop collection</p>
          </div>
        </Link>
        <Link href="/education" className="flex flex-col justify-between aspect-square md:aspect-[3/2] p-6 md:p-10 group hover:bg-[#1a1a1a] hover:text-white transition-colors duration-300">
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-50 group-hover:opacity-70">04</span>
          <div>
             <h3 className="font-serif text-2xl md:text-3xl font-light italic">Masterclass</h3>
             <p className="text-[10px] uppercase tracking-[0.2em] mt-4 opacity-60 group-hover:opacity-80">Learn more</p>
          </div>
        </Link>
      </motion.section>

      {/* Featured Collection */}
      <section className="py-16 md:py-32 px-6 md:px-12 max-w-[1800px] mx-auto border-b border-[#1a1a1a]/20 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-6"
        >
          <h2 className="text-4xl md:text-6xl font-serif text-[#1a1a1a] font-light tracking-tight">
            Latest <span className="italic tracking-normal">Discoveries</span>
          </h2>
          <Link href="/collection" className="text-xs uppercase tracking-[0.15em] text-[#1a1a1a]/70 hover:text-[#1a1a1a] border-b border-[#1a1a1a]/20 pb-1 inline-block transition-colors">
            View the Collection
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-16"
        >
          {products.slice(0, 5).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </section>

      {/* Lustre & Editorial Section */}
      <section className="bg-[#1a1a1a] text-[#fcfbf9] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 border-b border-[#fcfbf9]/20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="p-12 md:p-16 xl:p-24 flex flex-col justify-center"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] mb-8 text-[#fcfbf9]/50">Exclusive Collection</p>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-[80px] font-light mb-10 leading-[0.9]">
              Lustre <br /> <span className="italic opacity-80">Jewelry</span>
            </h2>
            <p className="text-[#fcfbf9]/70 font-light text-lg mb-12 max-w-md leading-relaxed">
              Discover our exclusive collection of fine opal jewelry, expertly crafted in 18k gold and platinum. Each piece is designed to showcase the natural brilliance of the Australian black opal.
            </p>
            <div>
              <Link href="/collection" className="inline-flex border border-[#fcfbf9]/30 rounded-full px-8 py-4 uppercase text-xs tracking-[0.2em] hover:bg-[#fcfbf9] hover:text-[#1a1a1a] transition-colors">
                Explore Lustre
              </Link>
            </div>
          </motion.div>
          <div className="relative min-h-[500px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-[#fcfbf9]/20 overflow-hidden">
            <motion.div
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image 
                src="https://picsum.photos/seed/lustrek/1000/1200" 
                alt="Lustre Opal Jewelry" 
                fill 
                className="object-cover opacity-90 transition-transform duration-[5s] hover:scale-105"
              />
            </motion.div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[500px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-[#fcfbf9]/20 order-2 lg:order-1 overflow-hidden">
             <motion.div
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
             >
               <Image 
                  src="https://picsum.photos/seed/cuttingk/1000/1200" 
                  alt="Master the Art of Opal Cutting" 
                  fill 
                  className="object-cover opacity-80 grayscale mix-blend-luminosity hover:grayscale-0 transition-all duration-[3s]"
               />
             </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="p-12 md:p-16 xl:p-24 flex flex-col justify-center order-1 lg:order-2"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] mb-8 text-[#fcfbf9]/50">Education</p>
            <h2 className="font-serif text-5xl md:text-7xl lg:text-[80px] font-light mb-10 leading-[0.9]">
              Art of <br /> <span className="italic opacity-80">Cutting</span>
            </h2>
            <p className="text-[#fcfbf9]/70 font-light text-lg mb-12 max-w-md leading-relaxed">
              If you have ever wanted to learn the secrets of cutting and polishing raw opal into magnificent gemstones, Justin shares decades of expertise. Get the tools, rough opals, and masterclasses to begin your journey.
            </p>
            <div>
              <Link href="/education" className="inline-flex border border-[#fcfbf9]/30 rounded-full px-8 py-4 uppercase text-xs tracking-[0.2em] hover:bg-[#fcfbf9] hover:text-[#1a1a1a] transition-colors">
                Start Learning
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Want to Learn About Opal? Section */}
      <section className="py-24 md:py-32 px-6 bg-[#fcfbf9] border-b border-[#1a1a1a]/10 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-6xl font-serif text-[#1a1a1a] mb-8 font-light">Join the <span className="italic">Inner Circle</span></h2>
          <p className="text-[#1a1a1a]/60 mb-12 font-light text-lg md:text-xl px-4">
            Get exclusive early access to magnificent new stones, masterclasses, and stories from Lightning Ridge.
          </p>
          <form className="flex flex-col sm:flex-row max-w-xl mx-auto items-center">
            <input 
              type="email" 
              placeholder="YOUR EMAIL ADDRESS" 
              className="flex-1 w-full bg-transparent border-b border-[#1a1a1a]/30 px-4 py-4 focus:outline-none focus:border-[#1a1a1a] transition-colors rounded-none placeholder:text-[#1a1a1a]/40 text-center sm:text-left text-xs tracking-[0.1em]"
              required
            />
            <button 
              type="button" 
              className="mt-6 sm:mt-0 sm:ml-4 border border-[#1a1a1a] text-[#1a1a1a] rounded-full px-10 py-4 uppercase text-[10px] tracking-[0.2em] hover:bg-[#1a1a1a] hover:text-white transition-colors whitespace-nowrap font-medium"
            >
              Sign Up
            </button>
          </form>
        </motion.div>
      </section>

      {/* Info Section */}
      <section className="bg-[#1a1a1a] text-[#fcfbf9] py-24 md:py-32 px-6 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#fcfbf9]/50 mb-12">The Founder</h2>
          <p className="text-[#fcfbf9]/80 mb-16 leading-relaxed text-2xl md:text-4xl font-serif font-light whitespace-pre-wrap">
            {homeContent.founderMessage}
          </p>
          <Link href="/about" className="inline-block border-b border-[#fcfbf9]/40 hover:border-[#fcfbf9] pb-1 uppercase tracking-[0.2em] text-[10px] transition-colors">
            Read My Story
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-[#fcfbf9] text-[#1a1a1a] pt-24 md:pt-32 pb-12 px-6 md:px-12 border-t border-[#1a1a1a]/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-24">
          <div className="md:col-span-1">
            <h3 className="font-serif text-3xl mb-6 tracking-tight">OpalSeeker</h3>
            <p className="text-[#1a1a1a]/60 text-sm leading-relaxed mb-6 font-light max-w-xs">
              The Finest Australian Opal from Lightning Ridge, curated for the discerning collector.
            </p>
          </div>
          
          <div>
            <h4 className="font-sans font-medium uppercase tracking-[0.2em] text-[9px] mb-8 text-[#1a1a1a]/40">Shop</h4>
            <ul className="space-y-4">
              <li><Link href="/collection" className="text-sm font-light hover:italic opacity-80 hover:opacity-100 transition-all">Solid Black Opals</Link></li>
              <li><Link href="/collection" className="text-sm font-light hover:italic opacity-80 hover:opacity-100 transition-all">Boulder Opals</Link></li>
              <li><Link href="/collection" className="text-sm font-light hover:italic opacity-80 hover:opacity-100 transition-all">Crystal Opals</Link></li>
              <li><Link href="/collection" className="text-sm font-light hover:italic opacity-80 hover:opacity-100 transition-all">Fine Jewelry</Link></li>
              <li><Link href="/collection" className="text-sm font-light hover:italic opacity-80 hover:opacity-100 transition-all">Rough Opals</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-sans font-medium uppercase tracking-[0.2em] text-[9px] mb-8 text-[#1a1a1a]/40">Support</h4>
            <ul className="space-y-4">
              <li><Link href="/contact" className="text-sm font-light hover:italic opacity-80 hover:opacity-100 transition-all">Contact Us</Link></li>
              <li><Link href="/faq" className="text-sm font-light hover:italic opacity-80 hover:opacity-100 transition-all">FAQ</Link></li>
              <li><Link href="/shipping" className="text-sm font-light hover:italic opacity-80 hover:opacity-100 transition-all">Shipping</Link></li>
              <li><Link href="/returns" className="text-sm font-light hover:italic opacity-80 hover:opacity-100 transition-all">Returns</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-sans font-medium uppercase tracking-[0.2em] text-[9px] mb-8 text-[#1a1a1a]/40">Connect</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm font-light hover:italic opacity-80 hover:opacity-100 transition-all">YouTube</Link></li>
              <li><Link href="#" className="text-sm font-light hover:italic opacity-80 hover:opacity-100 transition-all">Instagram</Link></li>
              <li><Link href="#" className="text-sm font-light hover:italic opacity-80 hover:opacity-100 transition-all">Facebook</Link></li>
              <li><Link href="#" className="text-sm font-light hover:italic opacity-80 hover:opacity-100 transition-all">Pinterest</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-[#1a1a1a]/10 pt-10 text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/40">
          <p>&copy; {new Date().getFullYear()} OpalSeeker.</p>
          <p className="mt-4 md:mt-0">All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
