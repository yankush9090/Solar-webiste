'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sun,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Filter
} from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { Product, ProductCategory } from '@/lib/types';
import { INITIAL_PRODUCTS, INITIAL_PRODUCT_CATEGORIES } from '@/lib/data/initial-data';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<ProductCategory[]>(INITIAL_PRODUCT_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    SolarService.getProducts().then(setProducts);
    SolarService.getProductCategories().then(setCategories);
  }, []);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category_id === selectedCategory);

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold text-solar-600 bg-solar-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Tier-1 Solar Hardware
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            High-Efficiency Panels, Inverters & Storage Systems
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            We supply and install only certified Tier-1 equipment backed by 25-year manufacturer warranties and tested for extreme Indian climatic conditions.
          </p>
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-solar-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Hardware ({products.length})
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-solar-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img
                    src={prod.image_url}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {prod.capacity && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold rounded-lg">
                      {prod.capacity}
                    </span>
                  )}
                  {prod.featured && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider rounded-lg shadow">
                      ★ Featured
                    </span>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-2 text-xs text-slate-400 font-semibold uppercase tracking-wider">
                    <span>{prod.brand}</span>
                    {prod.model && (
                      <>
                        <span>•</span>
                        <span>{prod.model}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-solar-600 transition-colors">
                    {prod.name}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {prod.short_description}
                  </p>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">{prod.warranty}</span>
                    {prod.price_display && (
                      <span className="font-bold text-solar-700">{prod.price_display}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/products/${prod.slug}`}
                  className="w-full py-2.5 px-4 text-xs font-bold text-center block bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors"
                >
                  View Technical Specs & Quote
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
