'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ } from '@/lib/types';

interface HomeFaqAccordionProps {
  faqs: FAQ[];
}

export default function HomeFaqAccordion({ faqs }: HomeFaqAccordionProps) {
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0]?.id || null);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="space-y-3">
      {faqs.slice(0, 6).map((faq) => {
        const isOpen = openFaq === faq.id;
        return (
          <div
            key={faq.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
          >
            <button
              type="button"
              onClick={() => toggleFaq(faq.id)}
              className="w-full p-4 sm:p-5 text-left flex justify-between items-center focus:outline-none"
              aria-expanded={isOpen}
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
              <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
