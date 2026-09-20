import React from 'react';
import Link from 'next/link';
import { Sun, Home, Compass, Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-solar-50 text-solar-600 flex items-center justify-center mx-auto shadow-inner border border-solar-100">
          <Sun className="w-10 h-10 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-black text-slate-900 tracking-tight">404</span>
          <h1 className="text-2xl font-bold text-slate-900">Page Not Found</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            The solar page you are looking for might have been moved, renamed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs font-bold bg-solar-600 hover:bg-solar-700 text-white shadow transition-all"
          >
            <Home className="w-3.5 h-3.5 mr-1.5" /> Back Home
          </Link>
          <Link
            href="/solutions"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs font-bold bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 transition-all"
          >
            <Compass className="w-3.5 h-3.5 mr-1.5" /> Solar Solutions
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all"
          >
            <Phone className="w-3.5 h-3.5 mr-1.5" /> Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
