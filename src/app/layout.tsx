import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });

export const metadata: Metadata = {
  title: 'Quantum Trade AI | Institutional AI Trading Terminal',
  description: 'Bloomberg-inspired AI trading platform for forex, gold, crypto, prop firm analytics, TradingView charting, scanner signals, and premium alerts.',
  keywords: ['AI trading', 'forex signals', 'XAUUSD', 'TradingView', 'prop firm dashboard', 'crypto scanner'],
  openGraph: {
    title: 'Quantum Trade AI',
    description: 'Premium AI trading terminal for market scanning, signals, and prop firm performance.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable}`}>
      <body>{children}</body>
    </html>
  );
}
