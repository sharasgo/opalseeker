import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Opal Seeker | Luxury 360° Online Boutique',
  description: 'Exquisite, high-definition authentic Australian opals from Lightning Ridge, Queensland and Coober Pedy. Experience 360-degree light play and secure payment checkouts on opalseeker.com.',
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[#050505] text-[#f5f5f5] min-h-screen selection:bg-cyan-500/20 selection:text-cyan-200 antialiased font-sans" suppressHydrationWarning>
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

