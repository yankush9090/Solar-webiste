import React from 'react';
import Link from 'next/link';
import {
  Sprout,
  Sun,
  Wrench,
  HeartHandshake,
  ArrowRight,
  ShieldCheck,
  Calculator,
  CheckCircle2,
  Zap,
  TrendingUp,
  Award,
  Users,
  Compass,
  Building2,
  FileCheck2,
  Phone
} from 'lucide-react';
import { getSettingsAction, getStatsAction } from '@/lib/db/actions';
import { INITIAL_SITE_SETTINGS, INITIAL_STATS } from '@/lib/data/initial-data';

export const metadata = {
  title: 'About Us | Maati Energy — Sustainable. Smart. Indian.',
  description:
    'From Maati to sunlight — energy that belongs to the future. Learn about Maati Energy, our customer-first solar EPC engineering approach, and India’s renewable energy revolution.',
};

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const [settings, stats] = await Promise.all([
    getSettingsAction().catch(() => INITIAL_SITE_SETTINGS),
    getStatsAction().catch(() => INITIAL_STATS),
  ]);

  const pillars = [
    {
      id: 'rooted-in-india',
      icon: Sprout,
      emoji: '🌱',
      tag: 'Indian Context',
      title: 'Rooted in India',
      description: 'Solutions designed specifically for Indian roofs, extreme summer heat, monsoons, and local grid conditions.',
      points: [
        'Custom structural engineering for RCC flat roofs, tin sheds, and elevated pergolas',
        'Weather-tested wind resistance rated up to 160 km/h gusts',
        'High-temperature coefficient modules that maintain efficiency in 45°C+ peak summers',
      ],
      color: 'emerald',
    },
    {
      id: 'sun-first-economics',
      icon: Sun,
      emoji: '☀️',
      tag: 'Fair Economics',
      title: 'Sun-first economics',
      description: 'Size the system around real electricity consumption and maximum payback, not an oversized sales package.',
      points: [
        'Detailed 12-month bill analysis to determine optimal sanctioned load offset',
        'Transparent ROI modeling with Levelized Cost of Energy (LCOE) projections',
        'Direct pass-through of national PM Surya Ghar central subsidies up to ₹78,000',
      ],
      color: 'amber',
    },
    {
      id: 'engineering-led-epc',
      icon: Wrench,
      emoji: '🛠️',
      tag: 'Turnkey Accountability',
      title: 'Engineering-led EPC',
      description: 'Design, procurement, installation, commissioning and support under one accountable engineering process.',
      points: [
        'Drone-assisted 3D shadow analysis to eradicate partial array shading',
        'Direct procurement of Tier-1 ALMM-listed N-Type TOPCon bifacial modules',
        'Single-point engineering accountability with zero sub-contracting shortcuts',
      ],
      color: 'blue',
    },
    {
      id: 'customer-guidance',
      icon: HeartHandshake,
      emoji: '🤝',
      tag: 'End-to-End Support',
      title: 'Customer guidance',
      description: 'Support through subsidy, net metering, DISCOM liaisons, and finance journeys from day one.',
      points: [
        '100% DISCOM portal paperwork, inspection coordination, and net-meter swap',
        '0% downpayment green solar loan assistance with partner public/private banks',
        'Proactive remote telemetry monitoring and prompt annual maintenance care',
      ],
      color: 'indigo',
    },
  ];

  const nationalStats = [
    {
      value: '164.59 GW',
      badge: 'National Total',
      title: 'Cumulative Solar Capacity',
      description: "India's cumulative installed solar capacity as of 31 July 2026 across utility and distributed systems.",
      icon: Zap,
    },
    {
      value: '30.74 GW',
      badge: 'Rooftop Sector',
      title: 'Grid-Connected Rooftop Solar',
      description: 'Installed capacity strictly on residential, institutional, and commercial rooftops nationwide.',
      icon: TrendingUp,
    },
    {
      value: '50+ lakh',
      badge: 'PM Surya Ghar Impact',
      title: 'Households Benefiting',
      description: 'Indian families powering their daily life with subsidized rooftop solar installations.',
      icon: Users,
    },
    {
      value: '₹75,021 Cr',
      badge: 'Direct Investment',
      title: 'National Scheme Outlay',
      description: 'Total public investment allocated to empower 1 Crore Indian homes with free clean power.',
      icon: Award,
    },
  ];

  const whatsappHref = `https://wa.me/${settings.whatsapp_number?.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Maati Energy team, I read your About page and would like to speak with a solar engineer.')}`;

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section: Rich Dark Solar EPC Visual Identity */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Ambient solar lighting effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-solar-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ABOUT MAATI ENERGY</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              From <span className="italic text-solar-400 font-serif">Maati</span> to sunlight — energy that belongs to the future.
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-normal">
              “Maati” is more than soil. It represents the ground we live on, the communities we build with, and the
              responsibility we leave for the next generation. Solar turns one of India&apos;s most abundant natural
              resources — sunlight — into useful, dependable electricity.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/solar-calculator"
                className="px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 transition-all flex items-center group"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Explore Solar Calculator
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center"
              >
                Connect With An Engineer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Philosophy & Visual Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Vision & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-solar-600 uppercase tracking-widest bg-solar-50 px-3 py-1 rounded-full">
                Our Foundation
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                Engineered for honesty, built for generational performance.
              </h2>
            </div>

            <div className="space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p>
                Maati Energy is envisioned as a customer-first solar EPC partner: understand the customer&apos;s
                electricity use, design the right system, explain the economics clearly, execute safely, and stay
                accountable after commissioning.
              </p>

              {/* Standout Highlight Quote Card */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/10 via-solar-500/10 to-transparent border-l-4 border-amber-500 p-6 shadow-sm">
                <p className="text-base sm:text-xl font-black text-slate-900 leading-snug">
                  “The best solar system is not the biggest system. It is the system that fits your roof, your
                  electricity use and your future.”
                </p>
                <p className="text-xs font-semibold text-amber-700 mt-2 uppercase tracking-wider">
                  — The Maati Energy EPC Philosophy
                </p>
              </div>

              <p>
                Our approach combines engineering discipline with local understanding. We help customers navigate system
                selection, government subsidy, DISCOM processes and financing options so the transition to solar is
                easier to understand and easier to own.
              </p>
            </div>

            {/* Credibility Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center space-x-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-900">DISCOM Empanelled</p>
                  <p className="text-[11px] text-slate-500">Official vendor partner</p>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center space-x-3">
                <Award className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-900">25-Yr Performance</p>
                  <p className="text-[11px] text-slate-500">Direct OEM warranties</p>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-solar-600 shrink-0" />
                <div>
                  <p className="text-xs font-bold text-slate-900">100% Subsidy Support</p>
                  <p className="text-[11px] text-slate-500">Direct to customer bank</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80"
                alt="Solar Rooftop Installation by Maati Energy Engineers"
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-solar-500/20 border border-solar-400/40 text-solar-300 text-xs font-bold backdrop-blur-md">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>Precision Engineering</span>
                </div>
                <h3 className="text-xl font-black">Accountable EPC from Day One</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Over 550+ rooftop solar systems engineered with zero structural failures, certified earthing protection, and guaranteed generation yields.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Pillars: 4 Detailed Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-bold text-solar-600 uppercase tracking-widest bg-solar-50 px-3 py-1 rounded-full">
            Our Core Principles
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How Maati Energy Delivers Differently
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Every rooftop is a unique mini power plant. We align structural engineering, financial reality, and post-commissioning service under one accountable roof.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-solar-500/10 text-solar-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {pillar.emoji}
                    </div>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {pillar.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-solar-700 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-slate-100">
                    {pillar.points.map((pt, i) => (
                      <div key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-solar-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900">
                  <span className="text-slate-500">Standard EPC Commitment</span>
                  <span className="text-solar-600 flex items-center group-hover:translate-x-1 transition-transform">
                    Learn Process <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* India Solar Snapshot Section: Modern Dashboard UI */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>INDIA SOLAR SNAPSHOT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                India is scaling solar at extraordinary speed.
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Latest published government figures used on this page are dated July–August 2026. Figures should be
                refreshed as official dashboards are updated.
              </p>
            </div>

            <Link
              href="/subsidy"
              className="shrink-0 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all flex items-center self-start md:self-auto"
            >
              View PM Surya Ghar Subsidy Guide
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          {/* 4 Cards Grid with Visual Impact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nationalStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-950/80 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl hover:border-solar-500/50 hover:bg-slate-950 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg">
                        {stat.badge}
                      </span>
                      <Icon className="w-5 h-5 text-slate-500 group-hover:text-solar-400 transition-colors" />
                    </div>

                    <p className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
                      {stat.value}
                    </p>

                    <h4 className="text-sm font-bold text-white mt-3">
                      {stat.title}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed mt-2">
                      {stat.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center text-[11px] text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
                    Official MNRE Metric
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footnote Citation */}
          <div className="mt-10 p-4 rounded-2xl bg-slate-950/50 border border-slate-800/60 text-xs text-slate-400 leading-relaxed flex items-start space-x-3">
            <Compass className="w-4 h-4 text-solar-400 shrink-0 mt-0.5" />
            <p>
              Source: Ministry of New &amp; Renewable Energy (MNRE) Physical Achievements, 31 July 2026; Press Information
              Bureau (PIB) releases on PM Surya Ghar: Muft Bijli Yojana, August 2026.
            </p>
          </div>
        </div>
      </section>

      {/* Turnkey EPC Process Highlights & Interactive Consultation CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-3xl bg-gradient-to-br from-solar-900 via-solar-950 to-slate-950 text-white p-8 sm:p-14 shadow-2xl border border-solar-800/40 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/30">
                Ready For Solar?
              </span>
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                Get an authentic, customer-first rooftop assessment.
              </h3>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                No overselling. We calculate your exact consumption profile, explain how much subsidy applies to you, and build a system that stands strong for 25+ years.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5">
              <Link
                href="/solar-calculator"
                className="w-full text-center px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Rooftop Savings
              </Link>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center px-6 py-3.5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center"
              >
                <Phone className="w-4 h-4 mr-2" />
                Talk to a Solar Engineer
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
