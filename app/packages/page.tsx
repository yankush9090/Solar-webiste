'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Package as PackageIcon,
  CheckCircle2,
  Zap,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { Package } from '@/lib/types';
import { INITIAL_PACKAGES } from '@/lib/data/initial-data';

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>(INITIAL_PACKAGES);

  useEffect(() => {
    SolarService.getPackages().then(setPackages);
  }, []);

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold text-solar-600 bg-solar-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Turnkey Solutions
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Turnkey Residential & Commercial Solar Packages
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            All-inclusive solar packages with zero hidden costs. Every package includes Tier-1 bifacial panels, high-efficiency inverters, elevated galvanized structures, earthing, DISCOM approvals, and national subsidy processing.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-7 flex flex-col justify-between border transition-all duration-300 ${
                pkg.featured
                  ? 'bg-slate-950 text-white border-solar-500 shadow-2xl relative'
                  : 'bg-white text-slate-900 border-slate-200 shadow-sm hover:shadow-lg'
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider rounded-full shadow">
                  ★ High Demand Package
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${pkg.featured ? 'bg-solar-900 text-solar-300' : 'bg-slate-100 text-slate-700'}`}>
                    {pkg.capacity} • {pkg.system_type}
                  </span>
                  <h3 className="text-xl font-black mt-2.5 leading-snug">{pkg.name}</h3>
                  <p className={`text-xs mt-1 font-medium ${pkg.featured ? 'text-solar-300' : 'text-solar-700'}`}>
                    {pkg.estimated_generation}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/30">
                  <p className={`text-xs ${pkg.featured ? 'text-slate-400' : 'text-slate-500'}`}>Turnkey Cost</p>
                  <p className="text-3xl font-black tracking-tight">
                    ₹{pkg.discount_price ? pkg.discount_price.toLocaleString('en-IN') : pkg.price.toLocaleString('en-IN')}
                  </p>
                  {pkg.estimated_subsidy > 0 && (
                    <div className="mt-1.5 p-2 rounded-xl bg-amber-400/20 border border-amber-400/40 text-[11px] font-bold text-amber-400">
                      Less ₹{pkg.estimated_subsidy.toLocaleString('en-IN')} PM Surya Ghar Subsidy
                    </div>
                  )}
                </div>

                <p className={`text-xs leading-relaxed ${pkg.featured ? 'text-slate-300' : 'text-slate-600'}`}>
                  {pkg.description}
                </p>

                <div className="space-y-2 pt-2 text-xs">
                  <p className={`font-bold uppercase tracking-wider text-[10px] ${pkg.featured ? 'text-slate-400' : 'text-slate-500'}`}>
                    Itemized Components:
                  </p>
                  {pkg.components.map((comp, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <span className={pkg.featured ? 'text-slate-300' : 'text-slate-600'}>{comp.name}</span>
                      <span className="font-semibold">{comp.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href={`/packages/${pkg.slug}`}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold text-center block transition-all ${
                    pkg.featured
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md'
                      : 'bg-solar-600 hover:bg-solar-700 text-white'
                  }`}
                >
                  View Full Specs & Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
