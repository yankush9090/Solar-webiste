'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sun,
  Menu,
  X,
  Phone,
  Calculator,
  Search,
  MessageCircle,
  ChevronDown,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { SiteSettings } from '@/lib/types';
import { INITIAL_SITE_SETTINGS } from '@/lib/data/initial-data';

interface NavbarProps {
  settings?: SiteSettings;
  onOpenSearch?: () => void;
}

export default function Navbar({ settings = INITIAL_SITE_SETTINGS, onOpenSearch }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Calculator', href: '/solar-calculator' },
    { name: 'Subsidy', href: '/subsidy' },
    { name: 'EPC', href: '/epc' },
    { name: 'Finance', href: '/financing' },
    { name: 'FAQ', href: '/faq' },
  ];

  const whatsappHref = `https://wa.me/${settings.whatsapp_number?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${settings.company_name || 'Maati Energy'} team, I would like to inquire about solar rooftop solutions.`)}`;

  return (
    <>
      {/* Top micro bar for quick trust & contact */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 hidden md:block border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center text-amber-400 font-medium">
              <Zap className="w-3.5 h-3.5 mr-1" /> PM Surya Ghar Empanelled Vendor
            </span>
            <span className="text-slate-400">
              Working Hours: {settings.working_hours}
            </span>
          </div>
          <div className="flex items-center space-x-5">
            <a href={`tel:${settings.phone_number}`} className="flex items-center hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 mr-1.5 text-solar-400" />
              {settings.phone_number}
            </a>
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100 py-2.5'
            : 'bg-white py-3.5 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group py-0.5">
            {settings.logo_url ? (
              <img
                src={settings.logo_url}
                alt={settings.company_name || 'Maati Energy'}
                className="h-10 sm:h-12 w-auto max-w-[190px] sm:max-w-[240px] object-contain transition-transform group-hover:scale-105"
              />
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-solar-600 via-solar-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-solar-500/20 group-hover:scale-105 transition-transform">
                  <Sun className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="text-xl font-black tracking-tight text-slate-900 flex items-center">
                    {settings.company_name || 'MAATI ENERGY'}
                  </span>
                  <p className="text-[10px] text-slate-500 tracking-wide uppercase font-medium hidden sm:block">
                    {settings.tagline || 'Sustainable. Smart. Indian.'}
                  </p>
                </div>
              </>
            )}
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-bold transition-colors ${
                    isActive
                      ? 'text-emerald-800 font-black'
                      : 'text-slate-900 hover:text-emerald-700'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Contact Pill CTA Button */}
            <Link
              href="/contact"
              className="px-6 py-2 rounded-full text-sm font-bold text-white bg-[#14532d] hover:bg-[#166534] shadow-sm transition-all whitespace-nowrap"
            >
              Contact
            </Link>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors ml-1"
              title="Search site (Ctrl+K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </nav>

          {/* Mobile Menu & Search Buttons */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-1 mb-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2.5 rounded-xl text-sm font-bold ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link
                href="/contact"
                className="mt-2 text-center px-6 py-2.5 rounded-full text-sm font-bold text-white bg-[#14532d] hover:bg-[#166534]"
              >
                Contact
              </Link>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl"
              >
                <MessageCircle className="w-4 h-4 mr-2 text-emerald-600" />
                Chat with Solar Engineer on WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
