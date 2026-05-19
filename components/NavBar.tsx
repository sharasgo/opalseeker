'use client';

import React from 'react';
import { useCart } from './CartContext';
import { useAuth } from './AuthProvider';
import { ShoppingCart, Search, Menu, UserCircle } from 'lucide-react';
import Link from 'next/link';

export default function NavBar() {
  const { cart, setIsCartOpen } = useCart();
  const { user, login, role } = useAuth();
  
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="bg-[#1a1a1a] text-[#fcfbf9] text-center py-2 text-[9px] font-medium tracking-[0.2em] uppercase">
        Australia&apos;s Most Trusted Opal Source
      </div>
      <nav className={`sticky top-0 z-30 px-6 md:px-12 py-5 flex items-center justify-between transition-all duration-300 ${scrolled ? 'bg-[#fcfbf9]/90 backdrop-blur-md border-b border-[#1a1a1a]/10' : 'bg-[#fcfbf9] border-b border-transparent'}`}>
        <div className="flex items-center gap-4 w-1/3">
          <Menu className="md:hidden text-[#1a1a1a]" size={20} strokeWidth={1.5} />
          <div className="hidden md:flex items-center gap-8 text-[10px] font-medium text-[#1a1a1a]/70 uppercase tracking-[0.2em]">
            <Link href="/collection" className="hover:text-[#1a1a1a] transition-colors">Opals</Link>
            <Link href="/collection" className="hover:text-[#1a1a1a] transition-colors">Jewelry</Link>
            <Link href="/education" className="hover:text-[#1a1a1a] transition-colors">Learn</Link>
          </div>
        </div>
        
        <div className="flex justify-center w-1/3">
          <Link href="/" className="font-serif text-3xl tracking-tight text-[#1a1a1a]">
            OpalSeeker
          </Link>
        </div>
        
        <div className="flex items-center justify-end gap-6 text-[#1a1a1a]/70 w-1/3">
          <button className="hover:text-[#1a1a1a] transition-colors hidden sm:block">
            <Search size={18} strokeWidth={1.5} />
          </button>
          
          {user ? (
            <div className="flex items-center gap-4">
              {role === 'admin' && (
                <Link href="/admin" className="hidden sm:flex items-center gap-2 hover:text-[#1a1a1a] transition-colors">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#cc6600]">Admin</span>
                </Link>
              )}
              <Link href="/profile" className="flex items-center gap-2 hover:text-[#1a1a1a] transition-colors">
                <UserCircle strokeWidth={1.5} size={18} />
                <span className="text-[10px] uppercase font-medium tracking-[0.2em] hidden sm:block">Profile</span>
              </Link>
            </div>
          ) : (
            <button onClick={() => login()} className="flex items-center gap-2 hover:text-[#1a1a1a] transition-colors">
              <UserCircle strokeWidth={1.5} size={18} />
              <span className="text-[10px] uppercase font-medium tracking-[0.2em] hidden sm:block">Sign In</span>
            </button>
          )}

          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 hover:text-[#1a1a1a] transition-colors relative"
          >
            <ShoppingCart strokeWidth={1.5} size={18} />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#1a1a1a] text-[#fcfbf9] text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full leading-none">
                {itemCount}
              </span>
            )}
            <span className="text-[10px] uppercase font-medium tracking-[0.2em] hidden sm:block">Cart</span>
          </button>
        </div>
      </nav>
    </>
  );
}

