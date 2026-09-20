'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  ChevronDown,
  Search,
  MessageCircle,
  Phone
} from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { FAQ } from '@/lib/types';
import { INITIAL_FAQS } from '@/lib/data/initial-data';

export default function FaqPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(INITIAL_FAQS);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

  useEffect(() => {
    SolarService.getFAQs().then(setFaqs);
  }, []);

  const categories = ['All', 'Subsidy & Pricing', 'Technical & Net Metering', 'Installation', 'Maintenance & Warranty', 'Financing'];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCat = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold text-solar-600 bg-solar-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Clear Answers
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Everything you need to know about rooftop solar installation, net metering regulations, central government subsidies, and warranty terms.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 text-sm border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-solar-500 bg-white shadow-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-solar-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                  className="w-full p-5 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-solar-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-sm">
              No questions matched your search criteria. Contact us directly for assistance.
            </div>
          )}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-slate-900 text-white p-8 rounded-3xl text-center space-y-3">
          <h3 className="text-xl font-bold">Have a specific question not answered here?</h3>
          <p className="text-xs text-slate-300">
            Our solar technical advisors are available on WhatsApp and phone to assist with any questions.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <a
              href="https://wa.me/919876543210?text=Hello%2C%20I%20have%20a%20question%20about%20solar."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center shadow"
            >
              <MessageCircle className="w-4 h-4 mr-1.5" />
              Ask on WhatsApp
            </a>
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
