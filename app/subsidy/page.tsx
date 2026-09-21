import React from 'react';
import Link from 'next/link';
import {
  Zap,
  CheckCircle2,
  FileText,
  ExternalLink,
  ShieldCheck,
  Phone,
  ArrowRight
} from 'lucide-react';
import { getSubsidyAction } from '@/lib/db/actions';
import { INITIAL_SUBSIDY } from '@/lib/data/initial-data';

export const metadata = {
  title: 'PM Surya Ghar Subsidy Guide 2024–2025 | Up to ₹78,000 Direct Benefit',
  description: 'Complete guide to the Central Government PM Surya Ghar rooftop solar subsidy. Slabs, eligibility rules, required documents, and application process.',
};

export const dynamic = 'force-dynamic';

export default async function SubsidyPage() {
  const sub = await getSubsidyAction().catch(() => INITIAL_SUBSIDY);

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
            Government of India Initiative
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {sub.name}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {sub.overview}
          </p>
          <div className="flex items-center space-x-4 text-xs text-slate-500 pt-1">
            <span>Last Updated: {sub.last_updated}</span>
            <span>•</span>
            <a
              href={sub.portal_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-solar-600 hover:underline flex items-center font-bold"
            >
              National Portal: pmsuryaghar.gov.in <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Subsidy Slabs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-2xl font-black text-slate-900">
            Direct Subsidy Slabs for Residential Households
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sub.subsidy_details.map((slab, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-amber-50/40 border border-slate-200 flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    System Size
                  </span>
                  <h3 className="text-lg font-black text-slate-900 mt-1">{slab.capacity}</h3>
                </div>

                <div>
                  <p className="text-xs text-slate-500">Central DBT Subsidy</p>
                  <p className="text-2xl font-black text-amber-600 mt-0.5">{slab.central_subsidy}</p>
                </div>

                <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                  Credited directly to applicant&apos;s bank account.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility & Documents */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Eligibility Card */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-slate-900">
              Who is Eligible for the Subsidy?
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              {sub.eligibility.map((el, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-solar-500 mr-2.5 shrink-0 mt-0.5" />
                  <span>{el}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Documents Card */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-slate-900">
              Mandatory Documents Checklist
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              {sub.documents_required.map((doc, i) => (
                <li key={i} className="flex items-start">
                  <FileText className="w-4 h-4 text-amber-500 mr-2.5 shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Step by Step Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full uppercase tracking-wider">
              Step-by-Step Walkthrough
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mt-2">
              How the Subsidy is Applied and Disbursed
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {sub.application_process.map((step) => (
              <div key={step.step} className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                <span className="text-2xl font-black text-amber-400">
                  0{step.step}
                </span>
                <h4 className="text-sm font-bold text-white">{step.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-300">
              Solaris handles all technical filings, DISCOM liaisons, and commissioning uploads on your behalf.
            </p>
            <Link
              href="/contact"
              className="px-6 py-3 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl transition-colors shrink-0"
            >
              Apply with Solaris Assistance
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
