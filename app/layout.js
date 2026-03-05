import { Inter, Playfair_Display } from 'next/font/google';
import '../styles/globals.css';  // ✅ Correct path to your global styles

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata = {
  title: 'WikiVideo Pro',
  description: 'Discover premium videos from Wikimedia Commons',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-zinc-950 text-white antialiased">{children}</body>
    </html>
  );
}
