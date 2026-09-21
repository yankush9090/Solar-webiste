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
  CheckCircle2,
  XCircle,
  HelpCircle,
  Calculator,
  ShieldCheck,
  TrendingUp,
  Award,
  Layers,
  Phone,
  FileCheck
} from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { Solution } from '@/lib/types';
import { INITIAL_SOLUTIONS } from '@/lib/data/initial-data';

type ArchitectureMode = 'on-grid' | 'off-grid' | 'hybrid';

interface ArchitectureDetails {
  id: ArchitectureMode;
  name: string;
  subtitle: string;
  tag: string;
  howItWorks: string;
  benefits: string[];
  limitations: string[];
  bestWhen: string;
  discomNote: string;
}

const ARCHITECTURES: Record<ArchitectureMode, ArchitectureDetails> = {
  'on-grid': {
    id: 'on-grid',
    name: 'On-Grid (Grid-Tied) Solar',
    subtitle: 'Maximum Electricity Bill Reduction • Lowest Upfront Capital',
    tag: 'Most Popular for Homes & Businesses',
    howItWorks:
      'Solar panels convert sunlight to DC electricity, which a grid-synchronized inverter transforms into AC power. Your appliances use solar energy first during daytime. Surplus units automatically export to the public electricity grid through a bi-directional net-meter, earning power credits. At night or during cloudy days, you draw power seamlessly from the grid.',
    benefits: [
      'Lowest capital cost among all architectures (no recurring battery replacement expenses)',
      'Fastest payback period (typically 3 to 4 years for residential, under 3 years for commercial)',
      '100% eligible for PM Surya Ghar: Muft Bijli Yojana central subsidy up to ₹78,000',
      'Zero maintenance storage hardware — fit and forget for 25+ years',
    ],
    limitations: [
      'Automatically shuts down during grid blackouts for anti-islanding safety (to protect utility line workers)',
      'Does not provide backup power unless fitted with a specialized generator or islanding kit',
    ],
    bestWhen:
      'Your property has a stable electricity grid with infrequent power cuts, and your main priority is slashing monthly power bills to zero while getting maximum subsidy.',
    discomNote:
      'Requires net-metering sanctions from your state DISCOM. Maati Energy manages the complete DISCOM paperwork, technical inspection, and meter swap on your behalf.',
  },
  'off-grid': {
    id: 'off-grid',
    name: 'Off-Grid Standalone Solar',
    subtitle: '100% Energy Independence • Dedicated Battery Energy Storage',
    tag: 'Ideal for Remote & Zero-Grid Areas',
    howItWorks:
      'A fully self-sustaining micro power station independent of the utility grid. Solar panels generate power to directly run daytime loads while charging a heavy-duty Lithium Ferrophosphate (LiFePO4) or tubular battery bank. During night time, monsoons, or extreme weather, the battery bank supplies all household or operational electricity.',
    benefits: [
      'Complete immunity from grid blackouts, voltage fluctuations, and utility tariff hikes',
      'No reliance on DISCOM connection or local electricity feeder availability',
      'Perfect for remote farmhouses, agricultural pumps, telecom towers, and eco-resorts',
      'Clean alternative to noisy, expensive, high-maintenance diesel generators',
    ],
    limitations: [
      'Higher upfront investment due to battery storage banks',
      'Not eligible for standard PM Surya Ghar grid-tied subsidies',
      'Requires disciplined load management during multi-day continuous monsoon overcast',
    ],
    bestWhen:
      'Your location has no grid power, suffers from prolonged daily power outages (4+ hours), or you want 100% energy sovereignty without utility oversight.',
    discomNote:
      'Does not require DISCOM net-metering approvals since power never interacts with or backfeeds into the utility grid lines.',
  },
  'hybrid': {
    id: 'hybrid',
    name: 'Hybrid Solar with Storage',
    subtitle: 'Best of Both Worlds • Grid Net-Metering + 24/7 Uninterrupted Backup',
    tag: 'Premium Reliability & Zero Downtime',
    howItWorks:
      'Combines the economic savings of on-grid solar with the blackout security of battery storage. Intelligent hybrid inverters route solar power to loads first, charge batteries second, and export any leftover surplus to the grid. If the utility grid fails, the system transitions into emergency islanding mode in under 10 milliseconds without rebooting computers or Wi-Fi.',
    benefits: [
      'Zero blackout downtime — seamless millisecond transfer during grid failure',
      'Reduces electricity bills via daytime solar self-consumption and net-metering credits',
      'Intelligent time-of-day (ToD) peak shaving and night-time battery energy discharge',
      'Can be configured with modular lithium batteries that scale as your family or business grows',
    ],
    limitations: [
      'Higher initial setup cost than plain on-grid systems',
      'Inverter and battery space required indoors or under shaded enclosures',
      'Subsidy rules vary: central CFA applies strictly to the solar array portion in approved states',
    ],
    bestWhen:
      'You experience regular 1-3 hour power cuts, run critical home offices, medical equipment, or commercial refrigeration, and want both low bills and 24/7 continuous energy.',
    discomNote:
      'Requires a specialized bi-directional hybrid net-metering connection approved by your state electricity board.',
  },
};

const COMPARISON_ROWS = [
  {
    feature: 'Utility Grid Connection',
    onGrid: 'Mandatory',
    offGrid: 'Not Needed',
    hybrid: 'Connected (Supports Grid Export)',
    tooltip: 'Whether a connection to the state electricity DISCOM is necessary.',
  },
  {
    feature: 'Battery Energy Storage',
    onGrid: 'No Batteries',
    offGrid: 'Mandatory Battery Bank',
    hybrid: 'Integrated Lithium/Tubular Storage',
    tooltip: 'Hardware storage needed to preserve energy for non-sunny hours.',
  },
  {
    feature: 'Power During Grid Blackout',
    onGrid: 'Shuts down (Anti-Islanding Safety)',
    offGrid: 'Full Continuous Power from Battery',
    hybrid: 'Instant Seamless Backup (<10ms)',
    tooltip: 'Behavior of your power supply when the outside transformer fails.',
  },
  {
    feature: 'Electricity Bill Offset',
    onGrid: 'Up to 90% - 100% Savings',
    offGrid: '100% (No Electricity Bill)',
    hybrid: 'Up to 90% - 100% Savings',
    tooltip: 'Expected reduction on your monthly DISCOM electricity statement.',
  },
  {
    feature: 'Capital Investment',
    onGrid: 'Lowest Initial Cost',
    offGrid: 'Higher (Includes Battery Bank)',
    hybrid: 'Moderate to High',
    tooltip: 'Initial turnkey procurement and installation cost.',
  },
  {
    feature: 'PM Surya Ghar Subsidy Eligibility',
    onGrid: 'Full Central CFA (Up to ₹78,000)',
    offGrid: 'Not applicable for residential CFA',
    hybrid: 'Solar array eligible in select states',
    tooltip: 'Direct bank subsidy from the Ministry of New & Renewable Energy.',
  },
  {
    feature: 'Typical ROI Payback Period',
    onGrid: '3.0 - 4.2 Years',
    offGrid: '4.5 - 6.0 Years (vs Diesel Gen)',
    hybrid: '3.8 - 5.0 Years',
    tooltip: 'Time required for cumulative bill savings to cover initial investment.',
  },
];

const SUBSIDY_SLABS = [
  { slab: 'First 2 kW Capacity', rate: '₹30,000 per kW', maxAmount: '₹60,000' },
  { slab: 'Additional 3rd kW', rate: '₹18,000 for 3rd kW', maxAmount: '₹18,000' },
  { slab: 'Cap for Individual Homes (>3 kW)', rate: 'No extra CFA above 3 kW', maxAmount: '₹78,000 Max' },
  { slab: 'Group Housing (GHS / RWA)', rate: '₹18,000 per kW for common areas', maxAmount: 'Up to 500 kW' },
];

export default function SolutionsPage() {
  const [activeArch, setActiveArch] = useState<ArchitectureMode>('on-grid');
  const [solutions, setSolutions] = useState<Solution[]>(INITIAL_SOLUTIONS);

  useEffect(() => {
    SolarService.getSolutions().then(setSolutions);
  }, []);

  const arch = ARCHITECTURES[activeArch];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Header Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-solar-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide uppercase shadow-sm">
              <Layers className="w-3.5 h-3.5" />
              <span>SOLAR ENGINEERING ARCHITECTURES</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Three Intelligent Ways to Power Your Property With Solar.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Every home, commercial warehouse, and agricultural site has unique grid reliability, roof space, and
              budget parameters. Explore the three fundamental solar architectures to discover the perfect fit.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/solar-calculator"
                className="px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 transition-all flex items-center group"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Find My Recommended System
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center"
              >
                Book Engineering Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 3-Architecture Selector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-bold text-solar-600 uppercase tracking-widest bg-solar-50 px-3 py-1 rounded-full">
            System Configuration
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Compare Solar System Models
          </h2>
          <p className="text-sm text-slate-600">
            Click an architecture below to understand how power flows, key trade-offs, and optimal deployment conditions.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-100 p-1.5 rounded-2xl inline-flex border border-slate-200/80 shadow-sm max-w-full overflow-x-auto">
            {(['on-grid', 'off-grid', 'hybrid'] as ArchitectureMode[]).map((mode) => {
              const isActive = activeArch === mode;
              const titles = {
                'on-grid': 'On-Grid (Net-Metered)',
                'off-grid': 'Off-Grid (Standalone)',
                'hybrid': 'Hybrid (Solar + Storage)',
              };
              return (
                <button
                  key={mode}
                  onClick={() => setActiveArch(mode)}
                  className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-slate-950 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-white/60'
                  }`}
                >
                  {titles[mode]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Architecture Display Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Details & Benefits */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                  {arch.tag}
                </span>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Architecture 0{activeArch === 'on-grid' ? 1 : activeArch === 'off-grid' ? 2 : 3}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {arch.name}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-amber-600 mt-1">
                  {arch.subtitle}
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {arch.howItWorks}
              </p>

              {/* Benefits */}
              <div className="space-y-2.5 pt-2">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Key Advantages:
                </p>
                {arch.benefits.map((b, i) => (
                  <div key={i} className="flex items-start text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2.5 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              {/* Limitations */}
              <div className="space-y-2.5 pt-2">
                <p className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Important Considerations:
                </p>
                {arch.limitations.map((l, i) => (
                  <div key={i} className="flex items-start text-xs sm:text-sm text-slate-600">
                    <XCircle className="w-4 h-4 text-amber-600 mr-2.5 shrink-0 mt-0.5" />
                    <span>{l}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/solar-calculator"
                className="inline-flex items-center text-xs sm:text-sm font-bold text-solar-600 hover:text-solar-700"
              >
                Calculate {arch.name} Savings <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Deployment Guidance & DISCOM Note */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-full">
                <Award className="w-3.5 h-3.5" />
                <span>Best Deployment Match</span>
              </div>
              <h4 className="text-xl font-bold text-white">When is this right for you?</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {arch.bestWhen}
              </p>
            </div>

            <div className="bg-amber-50/70 border border-amber-200/70 rounded-3xl p-6 sm:p-8 space-y-3">
              <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
                <FileCheck className="w-4 h-4 text-amber-700" />
                <span>DISCOM Liaisoning & Sanctions</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-950/80 leading-relaxed">
                {arch.discomNote}
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">Need personal architecture guidance?</p>
                <p className="text-[11px] text-slate-500">Free load analysis by certified solar engineers.</p>
              </div>
              <Link
                href="/contact"
                className="px-4 py-2 bg-solar-600 hover:bg-solar-700 text-white rounded-xl text-xs font-bold transition-colors shrink-0"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Matrix Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-bold text-solar-600 uppercase tracking-widest bg-solar-50 px-3 py-1 rounded-full">
            Side-by-Side Matrix
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Architectural Comparison at a Glance
          </h2>
          <p className="text-sm text-slate-600">
            A direct technical comparison to help you weigh grid dependency, cost, resilience, and government benefits.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-950 text-white text-xs uppercase tracking-wider">
                  <th className="py-4 px-6 font-bold w-1/4">Feature / Parameter</th>
                  <th className="py-4 px-6 font-bold w-1/4 text-emerald-400">On-Grid Solar</th>
                  <th className="py-4 px-6 font-bold w-1/4 text-amber-400">Off-Grid Solar</th>
                  <th className="py-4 px-6 font-bold w-1/4 text-solar-300">Hybrid Solar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? 'bg-white hover:bg-slate-50/70' : 'bg-slate-50/40 hover:bg-slate-50'}
                  >
                    <td className="py-4 px-6 font-bold text-slate-900">
                      <div>{row.feature}</div>
                      <div className="text-[11px] text-slate-400 font-normal mt-0.5">{row.tooltip}</div>
                    </td>
                    <td className="py-4 px-6 text-slate-700 font-medium">
                      {row.onGrid}
                    </td>
                    <td className="py-4 px-6 text-slate-700 font-medium">
                      {row.offGrid}
                    </td>
                    <td className="py-4 px-6 text-slate-700 font-medium">
                      {row.hybrid}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Government Financial Support / Subsidy Breakdown Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl border border-emerald-500/20 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: Big Highlights */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold tracking-wider uppercase">
                <Award className="w-3.5 h-3.5" />
                <span>GOVERNMENT FINANCIAL ASSISTANCE</span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                PM-Surya Ghar: Muft Bijli Yojana
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                For eligible residential consumers with grid-connected electricity meters, the central financial assistance
                (CFA) provides direct bank transfers to make rooftop solar radically affordable.
              </p>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-4xl sm:text-5xl font-black text-amber-400 tracking-tight">
                  ₹78,000
                </p>
                <p className="text-xs sm:text-sm font-medium text-slate-300 mt-2 leading-relaxed">
                  Maximum central subsidy for an individual home rooftop solar plant (3 kW or higher).
                </p>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed border-t border-white/10 pt-4">
                * Note: Subsidy is not a contractor discount. It is official Central Financial Assistance (CFA) deposited
                directly into the consumer&apos;s bank account post DISCOM inspection and net-meter commissioning.
              </p>
            </div>

            {/* Right Col: Slab Breakdown */}
            <div className="lg:col-span-6 bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/10 space-y-4 backdrop-blur-md">
              <h4 className="text-base font-bold text-white uppercase tracking-wider border-b border-white/10 pb-3">
                Official Subsidy Slab Breakdown
              </h4>

              <div className="space-y-3">
                {SUBSIDY_SLABS.map((slab, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-white">{slab.slab}</p>
                      <p className="text-[11px] text-emerald-400 font-medium">{slab.rate}</p>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg">
                      {slab.maxAmount}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/subsidy"
                  className="w-full text-center px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold transition-all flex items-center justify-center shadow-lg"
                >
                  Read Detailed Subsidy Application Guide <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multiple Policy Pathways */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-solar-600 uppercase tracking-widest bg-solar-50 px-3 py-1 rounded-full">
            Diverse Incentives
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            More Than One Government Solar Route Exists
          </h2>
          <p className="text-sm text-slate-600">
            Different national and state initiatives serve different customer categories. We guide you to the exact program that optimizes your returns.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                Residential Homes
              </span>
              <h4 className="text-lg font-bold text-slate-900 mt-3">PM Surya Ghar</h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Direct national rooftop solar CFA capped at ₹78,000 for individual houses and housing societies.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-solar-600">
              Direct to Bank Account
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg">
                Agriculture & Farms
              </span>
              <h4 className="text-lg font-bold text-slate-900 mt-3">PM-KUSUM Scheme</h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Subsidized standalone solar irrigation pumps and solarization of rural agricultural feeders.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-solar-600">
              Up to 60% Pump Subsidy
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                State Policies
              </span>
              <h4 className="text-lg font-bold text-slate-900 mt-3">State DISCOM Banking</h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                State-level energy banking, cross-subsidy exemptions, and open access provisions for high-load consumers.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-solar-600">
              State Specific Tariffs
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-lg transition-all space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg">
                Commercial & Factories
              </span>
              <h4 className="text-lg font-bold text-slate-900 mt-3">Tax Depreciation (40%)</h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Under Section 32 of the Income Tax Act, commercial enterprises claim 40% accelerated depreciation in year one.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 text-[11px] font-bold text-solar-600">
              Massive Tax Savings
            </div>
          </div>
        </div>
      </section>

      {/* Sector Solutions Catalog (from Database) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-solar-600 uppercase tracking-widest bg-solar-50 px-3 py-1 rounded-full">
            Tailored Engineering
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Sector-Specific Turnkey Packages
          </h2>
          <p className="text-sm text-slate-600">
            Explore our specialized engineering offerings across residential villas, commercial complexes, and industrial plants.
          </p>
        </div>

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
                    View System Specs <ArrowRight className="w-4 h-4 ml-1.5" />
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

      {/* Help Choosing Solution CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-3xl bg-gradient-to-br from-solar-900 via-solar-950 to-slate-950 text-white p-8 sm:p-12 shadow-2xl border border-solar-800/40 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Unsure which solar architecture fits your rooftop?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Our certified solar EPC engineers analyze your sanction load, 12-month bill history, and roof shadow to model the most cost-effective solution.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              href="/solar-calculator"
              className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg"
            >
              Run Solar Calculator
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
            >
              Request Engineering Survey
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
