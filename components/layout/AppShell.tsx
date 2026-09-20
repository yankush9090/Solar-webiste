'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloating from '../whatsapp/WhatsAppFloating';
import GlobalSearchModal from '../search/GlobalSearchModal';
import { SiteSettings } from '@/lib/types';
import { getSettingsAction } from '@/lib/db/actions';
import { INITIAL_SITE_SETTINGS } from '@/lib/data/initial-data';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);

  useEffect(() => {
    if (!isAdmin) {
      getSettingsAction().then(setSettings);
    }
  }, [isAdmin]);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-solar-500 selection:text-white">
      <Navbar settings={settings} onOpenSearch={() => setIsSearchOpen(true)} />

      <main className="flex-grow">
        {children}
      </main>

      <Footer settings={settings} />

      <WhatsAppFloating whatsappNumber={settings.whatsapp_number} />

      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
