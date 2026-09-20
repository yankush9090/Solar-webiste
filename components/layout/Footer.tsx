import React from 'react';
import Link from 'next/link';
import {
  Sun,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Facebook,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react';
import { SiteSettings } from '@/lib/types';
import { INITIAL_SITE_SETTINGS } from '@/lib/data/initial-data';

interface FooterProps {
  settings?: SiteSettings;
}

export default function Footer({ settings = INITIAL_SITE_SETTINGS }: FooterProps) {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      {/* Top Value Banner */}
      <div className="bg-gradient-to-r from-solar-950 via-slate-900 to-solar-950 border-b border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-solar-500/20 text-solar-400 flex items-center justify-center shrink-0 border border-solar-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base sm:text-lg">
                Certified Tier-1 Solar Engineering & MNRE Standards
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                25-Year performance warranty, direct bank subsidy assistance & lifetime customer support.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            <Link
              href="/solar-calculator"
              className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-lg shadow-amber-500/10"
            >
              Solar Savings Calculator
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
            >
              Get Free Site Survey
            </Link>
          </div>
        </div>
      </div>

      {/* Main Multi-column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-solar-500 to-amber-400 flex items-center justify-center text-white shadow-md">
                <Sun className="w-6 h-6" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                SOLARIS <span className="text-solar-400 text-sm font-semibold">ENERGY</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Solaris Energy Solutions is a premier EPC contractor delivering turnkey rooftop and utility-scale solar installations across residential, commercial, industrial, and agricultural sectors.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              {settings.facebook_url && (
                <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 hover:bg-solar-600 text-slate-400 hover:text-white transition-colors" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.instagram_url && (
                <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 hover:bg-solar-600 text-slate-400 hover:text-white transition-colors" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.linkedin_url && (
                <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 hover:bg-solar-600 text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {settings.youtube_url && (
                <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-900 hover:bg-solar-600 text-slate-400 hover:text-white transition-colors" aria-label="YouTube">
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Solar Solutions
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/solutions/on-grid-solar" className="hover:text-solar-400 transition-colors flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-solar-400" />
                  On-Grid Solar
                </Link>
              </li>
              <li>
                <Link href="/solutions/off-grid-solar" className="hover:text-solar-400 transition-colors flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-solar-400" />
                  Off-Grid Battery Solar
                </Link>
              </li>
              <li>
                <Link href="/solutions/hybrid-solar" className="hover:text-solar-400 transition-colors flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-solar-400" />
                  Hybrid Solar Systems
                </Link>
              </li>
              <li>
                <Link href="/solutions/residential-solar" className="hover:text-solar-400 transition-colors flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-solar-400" />
                  Residential Rooftop
                </Link>
              </li>
              <li>
                <Link href="/solutions/commercial-solar" className="hover:text-solar-400 transition-colors flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-solar-400" />
                  Commercial & Hospitals
                </Link>
              </li>
              <li>
                <Link href="/solutions/industrial-solar" className="hover:text-solar-400 transition-colors flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-solar-400" />
                  Industrial High-Yield
                </Link>
              </li>
              <li>
                <Link href="/solutions/agriculture-solar" className="hover:text-solar-400 transition-colors flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-solar-400" />
                  Solar Water Pumps
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Important Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/solar-calculator" className="text-amber-400 hover:text-amber-300 transition-colors font-medium">
                  ★ Solar Calculator
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:text-solar-400 transition-colors">
                  Turnkey Solar Packages
                </Link>
              </li>
              <li>
                <Link href="/subsidy" className="hover:text-solar-400 transition-colors">
                  PM Surya Ghar Subsidy
                </Link>
              </li>
              <li>
                <Link href="/financing" className="hover:text-solar-400 transition-colors">
                  Solar Loan & EMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-solar-400 transition-colors">
                  Panels & Inverters
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-solar-400 transition-colors">
                  Completed Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-solar-400 transition-colors">
                  Solar Guides & News
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-solar-400 transition-colors">
                  About Our Company
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Reach Us */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Headquarters
            </h4>
            <ul className="space-y-3 text-xs leading-relaxed">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-solar-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-solar-400 shrink-0" />
                <a href={`tel:${settings.phone_number}`} className="hover:text-white transition-colors">
                  {settings.phone_number}
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-solar-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-solar-400 shrink-0" />
                <span>{settings.working_hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Subsidy disclaimer */}
        <div className="mt-12 pt-6 border-t border-slate-900 text-[11px] text-slate-400 leading-relaxed">
          <p>
            * Disclaimer: Solar generation figures, electricity savings, system costs, and government subsidies displayed across this website are estimates based on standard testing conditions (STC) and prevailing national policies (PM Surya Ghar / MNRE). Actual savings and generation depend on roof tilt, orientation, local solar irradiance, DISCOM electricity tariffs, and state regulatory guidelines.
          </p>
        </div>

        {/* Bottom copyright & admin */}
        <div className="mt-6 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} {settings.company_name}. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-400 transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
