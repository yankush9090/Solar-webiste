'use client';

import React, { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Sun,
  ShieldCheck,
  CheckCircle2,
  Download,
  Phone,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { Product } from '@/lib/types';
import { INITIAL_PRODUCTS } from '@/lib/data/initial-data';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SolarService.getProductBySlug(slug).then((res) => {
      setProduct(res);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-solar-500 border-t-transparent rounded-full mx-auto" />
        <p className="text-slate-500 text-sm mt-4">Loading hardware details...</p>
      </div>
    );
  }

  if (!product) {
    return notFound();
  }

  const whatsappMsg = `Hello Solaris Team, I am interested in purchasing/inquiring about the product: ${product.name} (${product.brand} - ${product.model || ''}). Please share available stock and price.`;
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="space-y-16 py-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="inline-flex items-center text-xs font-semibold text-solar-600 hover:text-solar-700 mb-6"
        >
          ← Back to Hardware Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Product Image (5 cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="rounded-3xl overflow-hidden border border-slate-200 bg-white p-4 shadow-sm">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Right: Info & Specs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold text-solar-600 bg-solar-50 px-3 py-1 rounded-full uppercase tracking-wider">
                {product.brand} {product.model ? `• ${product.model}` : ''}
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                {product.name}
              </h1>
              {product.capacity && (
                <p className="text-sm font-semibold text-slate-500 mt-1">
                  Rated Capacity: {product.capacity}
                </p>
              )}
            </div>

            {product.price_display && (
              <div className="p-4 rounded-2xl bg-solar-50 border border-solar-200/80 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500">Estimated Pricing</p>
                  <p className="text-2xl font-black text-solar-700">{product.price_display}</p>
                </div>
                <span className="text-xs font-semibold text-solar-600 bg-white px-3 py-1.5 rounded-xl border border-solar-200">
                  Bulk & Project Pricing Available
                </span>
              </div>
            )}

            <p className="text-sm text-slate-700 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Engineered Advantages
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.features.map((feat, i) => (
                    <div key={i} className="flex items-start text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-solar-500 mr-2 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications Table */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Technical Specifications
                </h3>
                <div className="overflow-hidden rounded-2xl border border-slate-200">
                  <table className="w-full text-xs divide-y divide-slate-100">
                    <tbody className="divide-y divide-slate-100">
                      {Object.entries(product.specifications).map(([key, val]) => (
                        <tr key={key} className="hover:bg-slate-50">
                          <td className="py-2.5 px-4 font-semibold text-slate-600 w-1/3 bg-slate-50/50">
                            {key}
                          </td>
                          <td className="py-2.5 px-4 text-slate-900 font-bold">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Warranty Info */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-center space-x-3">
              <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-900">Official OEM Warranty</p>
                <p className="text-xs text-amber-800">{product.warranty}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/contact"
                className="flex-1 py-3 px-6 text-xs sm:text-sm font-bold text-center bg-solar-600 hover:bg-solar-700 text-white rounded-xl shadow transition-all"
              >
                Request Datasheet & Quote
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center py-3 px-6 text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow transition-all"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat with Product Specialist
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
