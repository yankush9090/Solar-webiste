import React from 'react';
import Link from 'next/link';
import EmiCalculator from '@/components/calculator/EmiCalculator';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Phone,
  FileCheck,
  Building,
  ArrowRight
} from 'lucide-react';
import { INITIAL_FINANCING } from '@/lib/data/initial-data';

export const metadata = {
  title: 'Solar Loans & 0% Downpayment Financing | Solaris',
  description: 'Finance your rooftop solar system with collateral-free bank loans starting at 7.00% interest. Low monthly EMI often less than your current electricity bill.',
};

export default function FinancingPage() {
  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold text-solar-600 bg-solar-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Affordable Green Capital
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Zero-Downpayment Solar Financing & Collateral-Free Loans
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Transition to solar power without upfront capital strain. With low-interest bank solar schemes starting at just 7.0% p.a., your monthly electricity bill savings immediately exceed your loan EMI!
          </p>
        </div>
      </section>

      {/* Interactive EMI Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EmiCalculator />
      </section>

      {/* Partner Banks & Financing Options */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-solar-600 bg-solar-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Empanelled Lenders
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2">
            National Solar Loan Schemes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INITIAL_FINANCING.map((fin) => (
            <div
              key={fin.id}
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-solar-50 text-solar-600 flex items-center justify-center font-bold">
                    <Building className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {fin.partner_name}
                  </h3>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Interest Rate:</span>
                    <span className="font-bold text-solar-700">{fin.interest_rate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Max Tenure:</span>
                    <span className="font-bold text-slate-900">{fin.max_tenure}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Loan Range:</span>
                    <span className="font-bold text-slate-900">Up to ₹{fin.max_loan ? (fin.max_loan / 100000) : 10} Lakhs</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <p className="font-bold text-slate-900 text-[11px] uppercase tracking-wider">Key Benefits:</p>
                  {fin.features.map((feat, i) => (
                    <div key={i} className="flex items-start">
                      <CheckCircle2 className="w-3.5 h-3.5 text-solar-500 mr-2 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className="w-full py-2.5 px-4 text-xs font-bold text-center block bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors"
              >
                Apply for Loan Assistance
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Documents Required */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full uppercase tracking-wider">
                Minimal Documentation
              </span>
              <h3 className="text-2xl sm:text-3xl font-black">
                Checklist for Quick Solar Loan Approval
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Most rooftop solar loans up to ₹3,00,000 are collateral-free with fast digital approvals within 48 to 72 hours.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                'Latest Electricity Bill (Applicant Name)',
                'Aadhaar Card & PAN Card',
                'Last 6 Months Bank Statement',
                'Proof of Roof Ownership / Property Tax Receipt',
                'Quotation / Proforma Invoice from Solaris',
                'Recent Passport Size Photograph'
              ].map((doc, idx) => (
                <div key={idx} className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/80 flex items-start">
                  <FileCheck className="w-4 h-4 text-solar-400 mr-2 shrink-0 mt-0.5" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
