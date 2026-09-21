'use client';

import React, { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Package as PackageIcon,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Phone,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { Package } from '@/lib/types';
import { INITIAL_PACKAGES } from '@/lib/data/initial-data';

export default function PackageDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SolarService.getPackageBySlug(slug).then((res) => {
      setPkg(res);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-solar-500 border-t-transparent rounded-full mx-auto" />
        <p className="text-slate-500 text-sm mt-4">Loading solar package details...</p>
      </div>
    );
  }

  if (!pkg) {
    return notFound();
  }

  const effectiveCost = pkg.discount_price || pkg.price;
  const netAfterSubsidy = Math.max(effectiveCost - (pkg.estimated_subsidy || 0), 0);

  const whatsappMsg = `Hello Solaris Team, I am interested in booking/inquiring about the ${pkg.name} (${pkg.capacity} ${pkg.system_type}). Please share site survey availability.`;
  const whatsappUrl = `https://wa.me/917849067305?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="space-y-16 py-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/packages"
          className="inline-flex items-center text-xs font-semibold text-solar-600 hover:text-solar-700 mb-6"
        >
          ← Back to Turnkey Packages
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Summary & Pricing (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold text-solar-600 bg-solar-50 px-3 py-1 rounded-full uppercase tracking-wider">
                {pkg.capacity} • {pkg.system_type} Architecture
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                {pkg.name}
              </h1>
              <p className="text-sm font-semibold text-solar-700 mt-1">
                Estimated Output: {pkg.estimated_generation}
              </p>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {pkg.description}
            </p>

            {/* Financial Breakdown Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-50 to-solar-50/50 border border-solar-200 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Turnkey Pricing & Subsidy Equation
              </h3>

              <div className="flex justify-between text-sm text-slate-600">
                <span>Standard Package Price:</span>
                <span className="line-through">₹{pkg.price.toLocaleString('en-IN')}</span>
              </div>

              {pkg.discount_price && (
                <div className="flex justify-between text-sm text-slate-900 font-bold">
                  <span>Solaris Offer Price:</span>
                  <span>₹{pkg.discount_price.toLocaleString('en-IN')}</span>
                </div>
              )}

              {pkg.estimated_subsidy > 0 && (
                <div className="flex justify-between text-sm text-amber-700 font-bold bg-amber-100/70 p-2 rounded-xl">
                  <span>PM Surya Ghar Direct Subsidy:</span>
                  <span>- ₹{pkg.estimated_subsidy.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-300 flex justify-between items-center">
                <span className="text-base font-black text-slate-900">Effective Net Investment:</span>
                <span className="text-2xl font-black text-solar-700">₹{netAfterSubsidy.toLocaleString('en-IN')}*</span>
              </div>
            </div>

            {/* Itemized Components Table */}
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-bold text-slate-900">
                Itemized Package Components
              </h3>
              <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                <table className="w-full text-xs divide-y divide-slate-100">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-4 text-left">Component</th>
                      <th className="py-3 px-4 text-left">Quantity</th>
                      <th className="py-3 px-4 text-left">Specification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pkg.components.map((c, i) => (
                      <tr key={i} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-bold text-slate-900">{c.name}</td>
                        <td className="py-3 px-4 font-semibold text-solar-700">{c.quantity}</td>
                        <td className="py-3 px-4 text-slate-600">{c.spec}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key Benefits */}
            {pkg.benefits && pkg.benefits.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h3 className="text-base font-bold text-slate-900">
                  Package Advantages
                </h3>
                <div className="space-y-2">
                  {pkg.benefits.map((b, i) => (
                    <div key={i} className="flex items-start text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-solar-600 mr-2.5 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Booking Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-slate-900 text-white p-7 rounded-3xl shadow-xl space-y-6 border border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Turnkey Booking
                </span>
                <h3 className="text-xl font-black mt-1">
                  Book Free Site Survey for this {pkg.capacity} Package
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Our installation engineer will inspect your roof structure and guarantee subsidy eligibility.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800 space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-solar-400 shrink-0" />
                  <span>Warranty: {pkg.warranty}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-200">
                  <Zap className="w-4 h-4 text-solar-400 shrink-0" />
                  <span>DISCOM Net Metering Included</span>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href="/contact"
                  className="w-full py-3.5 px-4 text-xs sm:text-sm font-bold text-center block bg-solar-500 hover:bg-solar-600 text-white rounded-xl shadow transition-colors"
                >
                  Schedule Rooftop Survey
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 text-xs sm:text-sm font-bold text-center flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow transition-colors"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Book via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
