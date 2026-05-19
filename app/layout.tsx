import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/CartContext';
import CartDrawer from '@/components/CartDrawer';
import { AuthProvider } from '@/components/AuthProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const cormorantGaramond = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'], 
  variable: '--font-serif',
  style: ['normal', 'italic'] 
});

export const metadata: Metadata = {
  title: 'OpalSeeker | Premium Australian Opals',
  description: 'An elegant marketplace showcasing the finest Australian Opals.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorantGaramond.variable}`}>
      <body className="bg-white text-neutral-900 font-sans antialiased selection:bg-blue-100 selection:text-blue-900" suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
