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
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Solutions', href: '/solutions' },
    { name: 'Calculator', href: '/solar-calculator', badge: 'Save ₹' },
    { name: 'Packages', href: '/packages' },
    { name: 'Products', href: '/products' },
    { name: 'Projects', href: '/projects' },
    { name: 'Subsidy', href: '/subsidy', badge: '₹78K' },
    { name: 'Financing', href: '/financing' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const whatsappHref = `https://wa.me/${settings.whatsapp_number?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Solaris team, I would like to inquire about solar rooftop solutions.')}`;

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
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-solar-600 via-solar-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-solar-500/20 group-hover:scale-105 transition-transform">
              <Sun className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 flex items-center">
                SOLARIS
                <span className="text-solar-600 ml-1 text-sm font-semibold tracking-wider">ENERGY</span>
              </span>
              <p className="text-[10px] text-slate-500 tracking-wide uppercase font-medium hidden sm:block">
                Clean Power • Maximum Savings
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-2 xl:px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                    isActive
                      ? 'text-solar-700 bg-solar-50 font-semibold'
                      : 'text-slate-600 hover:text-solar-600 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className="ml-1 px-1.5 py-0.5 text-[9px] font-bold bg-amber-500 text-slate-950 rounded-full">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              title="Search site (Ctrl+K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Direct WhatsApp Quick Chat */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:inline-flex items-center px-3 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
            >
              <MessageCircle className="w-4 h-4 mr-1.5 text-emerald-600 fill-emerald-600" />
              WhatsApp
            </a>

            {/* Primary CTA */}
            <Link
              href="/solar-calculator"
              className="inline-flex items-center px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-solar-600 to-solar-700 hover:from-solar-700 hover:to-solar-800 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap"
            >
              <Calculator className="w-3.5 h-3.5 mr-1.5" />
              Calculate Savings
            </Link>
          </div>

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
            <div className="grid grid-cols-2 gap-2 mb-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${
                      isActive
                        ? 'bg-solar-50 text-solar-700 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold bg-amber-400 text-slate-900 rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg"
              >
                <MessageCircle className="w-4 h-4 mr-2 text-emerald-600" />
                Chat with Solar Engineer on WhatsApp
              </a>

              <Link
                href="/contact"
                className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-bold text-white bg-solar-600 hover:bg-solar-700 rounded-lg shadow"
              >
                Request Free Site Survey
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
