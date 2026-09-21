import React from 'react';
import Link from 'next/link';
import {
  Compass,
  FileCheck2,
  Cpu,
  Receipt,
  FileSignature,
  Truck,
  Wrench,
  CheckCircle2,
  Headphones,
  ArrowRight,
  ShieldCheck,
  Zap,
  Award
} from 'lucide-react';

export const metadata = {
  title: 'Solar EPC Process & Engineering Journey | Solaris Energy',
  description: 'Explore our 9-step turnkey solar EPC methodology from site survey, 3D shadow analysis, and DISCOM approvals to Tier-1 installation and lifetime monitoring.',
};

const EPC_STEPS = [
  {
    step: '01',
    title: 'Discovery & Consultation',
    icon: Compass,
    summary: 'Analyzing your past 12-month electricity bills, sanctioned load, and clean energy objectives.',
    details: 'Our solar consultant understands your daytime load patterns, diesel generator expenses, and net metering objectives to size the optimal capacity.'
  },
  {
    step: '02',
    title: 'Site Survey & LiDAR Shadow Analysis',
    icon: FileCheck2,
    summary: 'Drone-enabled aerial mapping, structural roof integrity check, and irradiance measurement.',
    details: 'Engineers inspect roof orientation (True South), tilt angle, parapet wall shading, electrical conduit paths, and existing meter/earthing pits.'
  },
  {
    step: '03',
    title: 'Engineering & 3D System Design',
    icon: Cpu,
    summary: 'PVSyst string sizing, single-line diagrams (SLD), and custom wind-load engineered structures.',
    details: 'Optimizing string inverter DC/AC ratios, array spacing to eliminate self-shading, and specifying hot-dip galvanized structural members.'
  },
  {
    step: '04',
    title: 'Commercial Proposal & ROI Model',
    icon: Receipt,
    summary: 'Guaranteed generation simulation, PM Surya Ghar subsidy deduction, and cashflow modeling.',
    details: 'Transparent itemized Bill of Quantities (BOQ), bank loan EMI comparisons, 25-year levelized cost of electricity (LCOE), and tax depreciation benefits.'
  },
  {
    step: '05',
    title: 'Statutory & DISCOM Net-Metering Approvals',
    icon: FileSignature,
    summary: 'End-to-end liaisoning with local DISCOMs for solar grid-synchronization sanction.',
    details: 'We prepare technical feasibility applications, electrical inspectorate (CEIG) clearances, and net-meter procurement documentation.'
  },
  {
    step: '06',
    title: 'Procurement of Tier-1 Components',
    icon: Truck,
    summary: 'ALMM-approved TOPCon bifacial modules, European string inverters, and IEC-standard cables.',
    details: 'Direct factory sourcing ensures original manufacturer warranties, batch flash test reports, and IP65/IP66 weather-sealed electrical protection.'
  },
  {
    step: '07',
    title: 'Turnkey Civil & Electrical Installation',
    icon: Wrench,
    summary: 'Non-penetrative ballast or chemical-anchor mounting executed by certified solar technicians.',
    details: 'Adherence to IS 3043 earthing standards, SPD lightning arrestors, UV-resistant DC conduits, and dedicated AC/DC distribution boxes.'
  },
  {
    step: '08',
    title: 'Testing, Inspection & Net-Meter Handover',
    icon: CheckCircle2,
    summary: 'Rigorous insulation tests, IV curve tracing, bi-directional meter activation, and grid sync.',
    details: 'Joint inspection with DISCOM officials, verification of anti-islanding safety, and issuance of safety sign-off certificates.'
  },
  {
    step: '09',
    title: 'IoT Telemetry & Lifetime O&M Support',
    icon: Headphones,
    summary: '24/7 cloud generation monitoring, automated string alerts, and proactive maintenance visits.',
    details: 'Mobile app access to track live generation, CO2 offsets, proactive thermographic module cleaning, and 5-year workmanship warranty.'
  }
];

export default function EpcPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="bg-slate-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-solar-500/10 border border-solar-500/30 text-solar-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 mr-1.5" /> Turnkey Solar EPC Methodology
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            From Solar Feasibility to Grid Power in <span className="text-solar-400">9 Seamless Steps</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            We manage every stage of your solar plant — engineering design, government net-metering approvals, Tier-1 procurement, and lifetime operation.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/get-quote"
              className="px-6 py-3 bg-solar-600 hover:bg-solar-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-1.5"
            >
              <span>Schedule Free Site Feasibility</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/solar-calculator"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all"
            >
              Calculate Plant Capacity
            </Link>
          </div>
        </div>
      </section>

      {/* 9-Step Interactive Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Our Engineering & Commissioning Lifecycle
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            Zero hassle for the property owner. We shoulder all DISCOM liaisons, safety testing, and structural compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EPC_STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:border-solar-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-200 group-hover:text-solar-500 transition-colors font-mono">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-2xl bg-solar-50 text-solar-600 flex items-center justify-center group-hover:bg-solar-600 group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-solar-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-600 mt-1">
                      {item.summary}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                      {item.details}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-[10px] font-bold text-solar-700">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                  Quality Assured Stage
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust & Guarantee Banner */}
      <section className="bg-white py-12 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-1">
            <Award className="w-8 h-8 text-solar-600 mx-auto" />
            <h4 className="text-base font-bold text-slate-900">ALMM Tier-1 Certified</h4>
            <p className="text-xs text-slate-500">Only MNRE and BIS approved modules and inverters deployed.</p>
          </div>
          <div className="space-y-1">
            <Zap className="w-8 h-8 text-amber-500 mx-auto" />
            <h4 className="text-base font-bold text-slate-900">100% DISCOM Liaisoning</h4>
            <p className="text-xs text-slate-500">Net-metering, CEIG safety, and subsidy paperwork completely handled.</p>
          </div>
          <div className="space-y-1">
            <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto" />
            <h4 className="text-base font-bold text-slate-900">25-Year Performance Warranty</h4>
            <p className="text-xs text-slate-500">Guaranteed generation output backed by direct manufacturer warranty.</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 text-center max-w-4xl mx-auto space-y-4">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          Ready to Initiate Your Solar EPC Journey?
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          Request an on-site solar feasibility survey. Our engineers will verify your roof stability and create a custom PVSyst report.
        </p>
        <div className="pt-2">
          <Link
            href="/get-quote"
            className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-solar-600 to-amber-500 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-solar-500/20 transition-all space-x-2"
          >
            <span>Request Free Site Survey</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
