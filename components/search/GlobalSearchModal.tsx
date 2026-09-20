'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, Sun, Package, FileText, HelpCircle, ArrowRight } from 'lucide-react';
import {
  INITIAL_SOLUTIONS,
  INITIAL_PRODUCTS,
  INITIAL_PACKAGES,
  INITIAL_BLOG_POSTS,
  INITIAL_FAQS
} from '@/lib/data/initial-data';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const filteredSolutions = q
    ? INITIAL_SOLUTIONS.filter(
        (s) => s.title.toLowerCase().includes(q) || s.short_description.toLowerCase().includes(q)
      )
    : [];

  const filteredProducts = q
    ? INITIAL_PRODUCTS.filter(
        (p) => p.name.toLowerCase().includes(q) || p.short_description.toLowerCase().includes(q)
      )
    : [];

  const filteredPackages = q
    ? INITIAL_PACKAGES.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      )
    : [];

  const filteredBlogs = q
    ? INITIAL_BLOG_POSTS.filter(
        (b) => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q)
      )
    : [];

  const filteredFaqs = q
    ? INITIAL_FAQS.filter(
        (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
      )
    : [];

  const totalResults =
    filteredSolutions.length +
    filteredProducts.length +
    filteredPackages.length +
    filteredBlogs.length +
    filteredFaqs.length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 md:p-20">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative border-b border-slate-200 p-4 flex items-center">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search solar solutions, products, packages, subsidy, FAQs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-slate-900 placeholder-slate-400 text-base focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-6">
          {!q && (
            <div className="text-center py-8 text-slate-500 text-sm">
              <p className="font-medium text-slate-700">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2 justify-center mt-3">
                {['On-Grid Solar', 'PM Surya Ghar', '3 kW Package', 'Hybrid Inverter', 'Subsidy Slabs', 'Net Metering'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1 bg-slate-100 hover:bg-solar-50 hover:text-solar-700 text-slate-600 text-xs rounded-full font-medium transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {q && totalResults === 0 && (
            <div className="text-center py-10 text-slate-500 text-sm">
              No results found for &ldquo;{query}&rdquo;. Try searching for &quot;on-grid&quot;, &quot;subsidy&quot;, or &quot;packages&quot;.
            </div>
          )}

          {/* Solutions matches */}
          {filteredSolutions.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-solar-700 flex items-center mb-2">
                <Sun className="w-3.5 h-3.5 mr-1" /> Solar Solutions ({filteredSolutions.length})
              </span>
              <div className="space-y-1">
                {filteredSolutions.map((item) => (
                  <Link
                    key={item.id}
                    href={`/solutions/${item.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 group transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-solar-600">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{item.short_description}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-solar-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Packages matches */}
          {filteredPackages.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 flex items-center mb-2">
                <Package className="w-3.5 h-3.5 mr-1" /> Turnkey Solar Packages ({filteredPackages.length})
              </span>
              <div className="space-y-1">
                {filteredPackages.map((item) => (
                  <Link
                    key={item.id}
                    href={`/packages/${item.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 group transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-amber-600">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {item.capacity} • {item.estimated_generation}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Products matches */}
          {filteredProducts.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-700 flex items-center mb-2">
                Products & Hardware ({filteredProducts.length})
              </span>
              <div className="space-y-1">
                {filteredProducts.map((item) => (
                  <Link
                    key={item.id}
                    href={`/products/${item.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 group transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-cyan-700">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {item.brand} • {item.capacity}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-700 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Blog matches */}
          {filteredBlogs.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 flex items-center mb-2">
                <FileText className="w-3.5 h-3.5 mr-1" /> Guides & Articles ({filteredBlogs.length})
              </span>
              <div className="space-y-1">
                {filteredBlogs.map((item) => (
                  <Link
                    key={item.id}
                    href={`/blog/${item.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 group transition-colors"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{item.excerpt}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* FAQs matches */}
          {filteredFaqs.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center mb-2">
                <HelpCircle className="w-3.5 h-3.5 mr-1" /> Frequently Asked Questions ({filteredFaqs.length})
              </span>
              <div className="space-y-1">
                {filteredFaqs.map((item) => (
                  <div key={item.id} className="p-2.5 rounded-lg bg-slate-50 text-xs">
                    <p className="font-semibold text-slate-900 mb-1">{item.question}</p>
                    <p className="text-slate-600 line-clamp-2">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
