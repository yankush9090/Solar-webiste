'use client';

import React, { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Sun,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageCircle,
  HelpCircle,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { Solution } from '@/lib/types';
import { INITIAL_SOLUTIONS } from '@/lib/data/initial-data';

export default function SolutionDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [solution, setSolution] = useState<Solution | null>(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    SolarService.getSolutionBySlug(slug).then((res) => {
      setSolution(res);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-solar-500 border-t-transparent rounded-full mx-auto" />
        <p className="text-slate-500 text-sm mt-4">Loading solution details...</p>
      </div>
    );
  }

  if (!solution) {
    return notFound();
  }

  const whatsappMsg = `Hello Solaris Team, I would like to inquire about ${solution.title} for my property. Please share full technical specifications and cost estimate.`;
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="space-y-16 py-12">
      {/* 1. HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white min-h-[420px] flex items-center p-8 sm:p-12 lg:p-16">
          <img
            src={solution.hero_image}
            alt={solution.title}
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <Link
              href="/solutions"
              className="inline-flex items-center text-xs font-semibold text-solar-400 hover:text-solar-300"
            >
              ← Back to Solutions
            </Link>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight">
              {solution.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              {solution.short_description}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/solar-calculator"
                className="px-6 py-3.5 rounded-xl text-sm font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow transition-all"
              >
                Calculate Estimated Savings
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow transition-all flex items-center"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW & FULL DESCRIPTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              System Engineering & Architecture
            </h2>
            <div className="prose prose-slate max-w-none text-slate-700 text-base leading-relaxed space-y-4">
              <p>{solution.full_description}</p>
            </div>

            {/* Benefits List */}
            <div className="pt-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Primary Financial & Technical Benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {solution.benefits.map((b, i) => (
                  <div key={i} className="flex items-start p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-solar-600 mr-2.5 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-slate-800">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features List */}
            <div className="pt-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Key Technical Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {solution.features.map((f, i) => (
                  <div key={i} className="flex items-start p-3.5 rounded-xl bg-solar-50/50 border border-solar-100">
                    <Sun className="w-4 h-4 text-solar-600 mr-2.5 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-slate-800">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How It Works Steps */}
            {solution.how_it_works && solution.how_it_works.length > 0 && (
              <div className="pt-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">
                  How This System Operates
                </h3>
                <div className="space-y-4">
                  {solution.how_it_works.map((step) => (
                    <div
                      key={step.step}
                      className="flex gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm"
                    >
                      <span className="text-2xl font-black text-solar-600/40 shrink-0">
                        {step.step}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar CTA & Applications (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Suitable Applications Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Ideal Applications
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {solution.applications.map((app, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-solar-500 mr-2 shrink-0" />
                    <span>{app}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Consultation Card */}
            <div className="bg-gradient-to-br from-slate-900 to-solar-950 text-white p-6 rounded-3xl shadow-xl space-y-4">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                Free Engineering Audit
              </span>
              <h4 className="text-lg font-black leading-snug">
                Get a Customized Proposal for {solution.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Includes shadow simulation, structural load report, and DISCOM net-metering feasibility.
              </p>
              <div className="space-y-2.5 pt-2">
                <Link
                  href="/contact"
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-center block bg-solar-500 hover:bg-solar-600 text-white transition-colors"
                >
                  Request Rooftop Site Survey
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-center flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 mr-1.5" /> Chat with Engineer
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOLUTION FAQS */}
      {solution.faqs && solution.faqs.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-solar-600 bg-solar-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Technical Clarity
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Frequently Asked Questions on {solution.title}
            </h3>
          </div>

          <div className="space-y-3">
            {solution.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex justify-between items-center focus:outline-none"
                  >
                    <span className="text-sm font-bold text-slate-900 pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-solar-600' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
