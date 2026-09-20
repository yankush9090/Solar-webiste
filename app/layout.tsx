import type { Metadata } from 'next';
import './globals.css';
import AppShell from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'Solaris Energy Solutions | Turnkey Solar EPC, Rooftop & Commercial Solar',
  description: 'Leading solar energy EPC contractor. Residential rooftop solar, commercial solar installations, PM Surya Ghar subsidy up to ₹78,000, and intelligent energy storage solutions.',
  keywords: [
    'Solar Rooftop',
    'PM Surya Ghar Subsidy',
    'Residential Solar',
    'Commercial Solar',
    'Solar Calculator',
    'On-Grid Solar',
    'Hybrid Solar Inverter',
    'Solar EPC'
  ],
  authors: [{ name: 'Solaris Energy Solutions' }],
  openGraph: {
    title: 'Solaris Energy Solutions | Powering Clean Sustainable Energy',
    description: 'Slash your electricity bills up to 90% with turnkey solar rooftop installations and direct bank subsidies.',
    url: 'https://solarisenergy.com',
    siteName: 'Solaris Energy',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
