'use client';

import { useState } from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('trending');

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-zinc-950 text-white antialiased">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        {children}
      </body>
    </html>
  );
            }
