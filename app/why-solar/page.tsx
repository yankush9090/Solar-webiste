import React from 'react';
import Link from 'next/link';
import {
  TrendingDown,
  Leaf,
  ShieldCheck,
  Zap,
  Award,
  BadgePercent,
  Clock,
  ArrowRight,
  Sun
} from 'lucide-react';

export const metadata = {
  title: 'Why Switch to Solar Energy | Solaris Energy Solutions',
  description: 'Discover how switching to rooftop solar slashes your power bills by up to 90%, unlocks up to ₹78,000 in PM Surya Ghar subsidies, and protects against tariff inflation.',
};

const BENEFITS = [
  {
    icon: TrendingDown,
    title: 'Slash Electricity Bills by up to 90%',
    desc: 'Generate your own power during peak sunshine hours. Surplus units are exported back to the DISCOM grid through net metering for credits on your bill.'
  },
  {
    icon: BadgePercent,
    title: 'Up to ₹78,000 Direct Central Subsidy',
    desc: 'The PM Surya Ghar: Muft Bijli Yojana deposits direct financial assistance straight into your bank account within 30 days of plant commissioning.'
  },
  {
    icon: ShieldCheck,
    title: 'Hedge Against Rising Grid Tariffs',
    desc: 'Grid electricity tariffs in India increase by 4-8% annually. A solar rooftop locks in your per-unit cost at zero marginal expenditure for 25+ years.'
  },
  {
    icon: Leaf,
    title: 'Massive Carbon Footprint Reduction',
    desc: 'A typical 5 kW residential solar rooftop offsets over 6.5 tonnes of carbon dioxide each year, equivalent to planting over 150 mature teak trees.'
  },
  {
    icon: Clock,
    title: 'Rapid 3-4 Year Payback & 25-Year Life',
    desc: 'With combined government subsidies and monthly power bill savings, your entire system pays for itself within 36 to 48 months.'
  },
  {
    icon: Zap,
    title: 'Property Value & ESG Appreciation',
    desc: 'Homes and commercial buildings equipped with high-efficiency solar plants command premium resale valuations and satisfy green building / ESG mandates.'
  }
];

export default function WhySolarPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <section className="bg-slate-950 text-white py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Sun className="w-3.5 h-3.5 mr-1.5" /> Clean Energy Transition
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Why Solar is the Smartest Financial Decision of the Decade
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Abundant sunshine, lucrative government incentives, and soaring utility tariffs make rooftop solar the highest ROI clean-tech investment in India.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/solar-calculator"
              className="px-6 py-3 bg-solar-600 hover:bg-solar-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center space-x-1.5"
            >
              <span>Calculate Your Monthly Savings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/subsidy"
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all"
            >
              Explore PM Surya Ghar Subsidies
            </Link>
          </div>
        </div>
      </section>

      {/* Grid of Key Benefits */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            The Economic & Environmental Solar Advantage
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Everything you need to know about ROI, energy security, and environmental stewardship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4 hover:border-solar-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-solar-50 text-solar-600 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{b.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Comparison: Grid vs Solar */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Traditional Grid Power vs. Solaris Rooftop Plant
            </h2>
            <p className="text-xs text-slate-500">
              A 25-year side-by-side financial comparison.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-red-50/60 border border-red-200/80 space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-red-600">Standard Grid Power</span>
              <ul className="text-xs text-slate-700 space-y-2">
                <li>❌ Continuous recurring expenditure every month forever</li>
                <li>❌ Tariffs climb by 5-8% every 1-2 years</li>
                <li>❌ Dependent on coal-powered fossil energy grid</li>
                <li>❌ Zero asset creation or property appreciation</li>
                <li>❌ Frequent power outages and voltage instability</li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200 space-y-3">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-700">Solaris Rooftop Solar</span>
              <ul className="text-xs text-slate-800 space-y-2">
                <li>✅ Zero power bill for daytime usage; credits for export</li>
                <li>✅ Fixed capital cost locked in with 25-year free energy</li>
                <li>✅ 100% clean green renewable energy</li>
                <li>✅ Creates an income-generating physical property asset</li>
                <li>✅ Up to ₹78,000 instant direct government cash subsidy</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center max-w-3xl mx-auto px-4 space-y-4">
        <h3 className="text-2xl font-black text-slate-900">Make the Switch Today</h3>
        <p className="text-xs sm:text-sm text-slate-500">
          Join 450+ homeowners and commercial enterprises saving millions on their electricity bills.
        </p>
        <div className="pt-2">
          <Link
            href="/get-quote"
            className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-solar-600 to-amber-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all space-x-2"
          >
            <span>Get Your Free Solar Proposal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
