'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sun,
  BatteryCharging,
  Zap,
  Home,
  Building2,
  Factory,
  Sprout,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { Solution } from '@/lib/types';
import { INITIAL_SOLUTIONS } from '@/lib/data/initial-data';

export default function SolutionsPage() {
  const [solutions, setSolutions] = useState<Solution[]>(INITIAL_SOLUTIONS);

  useEffect(() => {
    SolarService.getSolutions().then(setSolutions);
  }, []);

  return (
    <div className="space-y-16 py-12">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold text-solar-600 bg-solar-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Engineering Catalog
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Advanced Solar Solutions for Every Energy Need
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Whether your priority is eliminating domestic electricity bills, achieving complete blackout-proof off-grid independence, or reducing commercial operating expenditure by lakhs, we provide custom EPC solar engineering.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((sol) => (
            <div
              key={sol.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={sol.hero_image}
                  alt={sol.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <h3 className="absolute bottom-4 left-5 right-5 text-xl font-bold text-white leading-tight">
                  {sol.title}
                </h3>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <p className="text-sm text-slate-600 leading-relaxed">
                  {sol.short_description}
                </p>

                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Key Highlights:
                  </p>
                  {sol.benefits.slice(0, 3).map((b, i) => (
                    <div key={i} className="flex items-start text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-solar-500 mr-2 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/solutions/${sol.slug}`}
                    className="inline-flex items-center text-xs font-bold text-solar-600 hover:text-solar-700 group-hover:translate-x-1 transition-transform"
                  >
                    View System Specs & Process <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Link>
                  <Link
                    href="/solar-calculator"
                    className="text-[11px] font-semibold text-slate-400 hover:text-slate-600"
                  >
                    Estimate Cost
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Help choosing solution banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-r from-slate-900 to-solar-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black">
              Unsure which solar architecture fits your property?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Talk directly with a senior solar EPC engineer. We review your electricity load profile and suggest the optimum solution.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-5 py-3 text-xs sm:text-sm font-bold bg-solar-500 hover:bg-solar-600 text-white rounded-xl shadow"
            >
              Request Engineering Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
