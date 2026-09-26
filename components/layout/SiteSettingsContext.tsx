'use client';

import { createContext, useContext } from 'react';
import { INITIAL_SITE_SETTINGS } from '@/lib/data/initial-data';
import { SiteSettings } from '@/lib/types';

const SiteSettingsContext = createContext<SiteSettings>(INITIAL_SITE_SETTINGS);

export function SiteSettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: React.ReactNode;
}) {
  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}