'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';

interface WhatsAppFloatingProps {
  whatsappNumber?: string;
  customMessage?: string;
}

export default function WhatsAppFloating({
  whatsappNumber = '+917849067305',
  customMessage,
}: WhatsAppFloatingProps) {
  const pathname = usePathname();

  // Dynamic contextual WhatsApp message based on current route
  const getContextualMessage = (): string => {
    if (customMessage) return customMessage;

    if (pathname.includes('/solar-calculator')) {
      return 'Hello, I used your solar calculator and would like to discuss my solar rooftop requirement and subsidy.';
    }
    if (pathname.startsWith('/products/')) {
      const slug = pathname.replace('/products/', '').replace(/-/g, ' ');
      return `Hello, I am interested in the solar product: ${slug}. Could you share the datasheet and price?`;
    }
    if (pathname.startsWith('/packages/')) {
      const slug = pathname.replace('/packages/', '').replace(/-/g, ' ');
      return `Hello, I am interested in the ${slug} solar package. Please share installation timeline and subsidy details.`;
    }
    if (pathname.startsWith('/solutions/')) {
      const slug = pathname.replace('/solutions/', '').replace(/-/g, ' ');
      return `Hello, I would like to enquire about ${slug} solar solutions for my property.`;
    }
    if (pathname.includes('/subsidy')) {
      return 'Hello, I would like to know how much government subsidy I am eligible for under PM Surya Ghar.';
    }
    if (pathname.includes('/financing')) {
      return 'Hello, I would like to know about zero-downpayment solar loan options and bank EMI schemes.';
    }
    if (pathname.includes('/contact')) {
      return 'Hello, I would like to book a free rooftop solar site survey.';
    }
    return 'Hello, I am interested in solar rooftop installation with Maati Energy.';
  };

  const cleanNumber = (whatsappNumber || '').replace(/[^0-9]/g, '');
  const message = getContextualMessage();
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;

  return (
    <aside aria-label="WhatsApp quick contact" className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip hint on hover */}
      <span className="hidden md:inline-block mr-3 px-3 py-1.5 rounded-lg bg-slate-900/90 text-white text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Chat with Solar Specialist
      </span>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
        </span>
      </a>
    </aside>
  );
}
