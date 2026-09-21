import React from 'react';
import SolarCalculator from '@/components/calculator/SolarCalculator';
import { Zap, ShieldCheck, HelpCircle, CheckCircle2, TrendingUp } from 'lucide-react';
import { getCalculatorSettingsAction, getSettingsAction } from '@/lib/db/actions';
import { INITIAL_CALCULATOR_SETTINGS, INITIAL_SITE_SETTINGS } from '@/lib/data/initial-data';

export const dynamic = 'force-dynamic';

export default async function SolarCalculatorPage() {
  const [calcSettings, siteSettings] = await Promise.all([
    getCalculatorSettingsAction().catch(() => INITIAL_CALCULATOR_SETTINGS),
    getSettingsAction().catch(() => INITIAL_SITE_SETTINGS)
  ]);

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold text-solar-600 bg-solar-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Savings Estimator
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Calculate Your Solar System Size, Subsidy & Payback
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Find out exactly how many solar panels you need, how much money you will save each month, and how much direct DBT cash subsidy you qualify for under the Central Government scheme.
          </p>
        </div>
      </section>

      {/* Main Interactive Calculator Component */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SolarCalculator initialSettings={calcSettings} whatsappNumber={siteSettings.whatsapp_number} />
      </section>

      {/* Subsidy Slabs Guide Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider">
              National Solar Portal
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-2">
              Official PM Surya Ghar Central Subsidy Slabs
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Direct Benefit Transfer (DBT) deposited straight into the applicant&apos;s bank account post-inspection.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px] bg-slate-50">
                  <th className="py-3.5 px-4">System Capacity</th>
                  <th className="py-3.5 px-4">Central Subsidy Amount</th>
                  <th className="py-3.5 px-4">Avg Monthly Units</th>
                  <th className="py-3.5 px-4">Suitable Household Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900">1 kW System</td>
                  <td className="py-3 px-4 text-solar-600 font-bold">₹30,000</td>
                  <td className="py-3 px-4">120 – 130 Units</td>
                  <td className="py-3 px-4">1 BHK / Monthly Bill up to ₹1,500</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900">2 kW System</td>
                  <td className="py-3 px-4 text-solar-600 font-bold">₹60,000</td>
                  <td className="py-3 px-4">240 – 260 Units</td>
                  <td className="py-3 px-4">2 BHK / Monthly Bill ₹1,500 – ₹3,000</td>
                </tr>
                <tr className="hover:bg-slate-50/50 bg-amber-50/40 font-semibold">
                  <td className="py-3 px-4 font-black text-slate-900">3 kW System (Recommended)</td>
                  <td className="py-3 px-4 text-amber-700 font-black text-base">₹78,000 (Maximum)</td>
                  <td className="py-3 px-4">360 – 400 Units</td>
                  <td className="py-3 px-4">3 BHK / 1-2 ACs / Bill ₹3,000 – ₹5,000</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900">Above 3 kW (Up to 10 kW)</td>
                  <td className="py-3 px-4 text-slate-900 font-bold">₹78,000 (Capped at 3kW rate)</td>
                  <td className="py-3 px-4">600 – 1,200 Units</td>
                  <td className="py-3 px-4">Duplex Villas & Multi-Storey Homes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How Calculations are Derived */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <Zap className="w-5 h-5 text-solar-600" />
            <h4 className="text-sm font-bold text-slate-900">Solar Generation Factor</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every 1 kW of solar capacity generates an average of 4 to 4.5 electrical units (kWh) per day in India, totaling approximately 120 units per month.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <TrendingUp className="w-5 h-5 text-solar-600" />
            <h4 className="text-sm font-bold text-slate-900">Financial Payback</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dividing the net customer investment by annual bill savings yields an average payback period between 2.8 and 3.5 years.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <ShieldCheck className="w-5 h-5 text-solar-600" />
            <h4 className="text-sm font-bold text-slate-900">Roof Area Required</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every 1 kW of modern 550W bifacial panels requires approximately 80 to 90 square feet of shadow-free rooftop terrace or sheet area.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
