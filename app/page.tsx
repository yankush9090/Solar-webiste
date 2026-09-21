import React from 'react';
import Link from 'next/link';
import {
  Sun,
  Zap,
  ShieldCheck,
  TrendingUp,
  Award,
  ArrowRight,
  Phone,
  MessageCircle,
  Calculator,
  CheckCircle2,
  ChevronDown,
  Building2,
  Factory,
  Home,
  Sprout,
  Users,
  Calendar,
  Clock
} from 'lucide-react';
import SolarCalculator from '@/components/calculator/SolarCalculator';
import HomeFaqAccordion from '@/components/home/HomeFaqAccordion';
import {
  getSolutionsAction,
  getPackagesAction,
  getProjectsAction,
  getTestimonialsAction,
  getFaqsAction,
  getBlogPostsAction,
  getStatsAction,
  getCalculatorSettingsAction,
  getSettingsAction
} from '@/lib/db/actions';
import {
  INITIAL_SOLUTIONS,
  INITIAL_PACKAGES,
  INITIAL_PROJECTS,
  INITIAL_TESTIMONIALS,
  INITIAL_FAQS,
  INITIAL_BLOG_POSTS,
  INITIAL_STATS,
  INITIAL_CALCULATOR_SETTINGS,
  INITIAL_SITE_SETTINGS
} from '@/lib/data/initial-data';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [solutions, packages, projects, testimonials, faqs, blogPosts, stats, calcSettings, siteSettings] = await Promise.all([
    getSolutionsAction().catch(() => INITIAL_SOLUTIONS),
    getPackagesAction().catch(() => INITIAL_PACKAGES),
    getProjectsAction().catch(() => INITIAL_PROJECTS),
    getTestimonialsAction().catch(() => INITIAL_TESTIMONIALS),
    getFaqsAction().catch(() => INITIAL_FAQS),
    getBlogPostsAction().catch(() => INITIAL_BLOG_POSTS),
    getStatsAction().catch(() => INITIAL_STATS),
    getCalculatorSettingsAction().catch(() => INITIAL_CALCULATOR_SETTINGS),
    getSettingsAction().catch(() => INITIAL_SITE_SETTINGS),
  ]);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section: Solar Greenery with Full-Bleed Background */}
      <section className="relative overflow-hidden min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] flex items-center text-white">
        {/* Full-bleed background image with responsive positioning */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/solar-maati-hero.jpg"
            alt="Maati Energy - Power your home, grow with the sun"
            className="w-full h-full object-cover object-top sm:object-center"
          />
          {/* Subtle natural gradient overlays for crisp readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent sm:via-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/25" />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-slate-50 via-slate-50/40 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white drop-shadow-md">
              Power your home.{' '}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400">
                Grow with the sun.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-medium max-w-2xl drop-shadow">
              Thoughtfully engineered solar solutions for homes, farms, businesses and institutions — from site
              assessment to installation, net metering and after-sales support.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/solar-calculator"
                className="px-7 py-3.5 rounded-full text-sm sm:text-base font-bold text-[#14532d] bg-white hover:bg-slate-100 shadow-2xl transition-all hover:scale-105"
              >
                Get a Solar Assessment
              </Link>
              <Link
                href="/solutions"
                className="px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold text-white bg-black/40 hover:bg-black/60 border border-white/40 backdrop-blur-md transition-all hover:scale-105"
              >
                Explore Solutions
              </Link>
            </div>

            {/* Quick credibility checklist */}
            <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-200 font-medium drop-shadow-sm">
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1.5 shrink-0" />
                PM Surya Ghar Subsidy up to ₹78,000
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1.5 shrink-0" />
                Up to 90% Bill Savings
              </span>
              <span className="flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1.5 shrink-0" />
                25-Yr Linear Power Warranty
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-solar-600 bg-solar-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Tailored Engineering
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">
            Comprehensive Solar Energy Solutions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            From residential rooftops to industrial megawatt complexes, we design, engineer, and commission high-yield solar infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {solutions.slice(0, 6).map((sol) => (
            <div
              key={sol.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={sol.hero_image}
                  alt={sol.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <h3 className="absolute bottom-3 left-4 text-lg font-bold text-white">
                  {sol.title}
                </h3>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                  {sol.short_description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  {sol.benefits.slice(0, 2).map((b, i) => (
                    <div key={i} className="flex items-center text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-solar-500 mr-2 shrink-0" />
                      <span className="line-clamp-1">{b}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/solutions/${sol.slug}`}
                  className="inline-flex items-center text-xs font-bold text-solar-600 hover:text-solar-700 pt-2 group-hover:translate-x-1 transition-transform"
                >
                  Explore System Specifications <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/solutions"
            className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            View All 7 Solar Solutions <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#092a1d] via-[#0d3b2b] to-[#092a1d] text-white py-16 sm:py-24 relative overflow-hidden">
        {/* Natural ambient glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-emerald-300 bg-emerald-900/60 border border-emerald-500/30 px-3.5 py-1 rounded-full uppercase tracking-wider">
              Solar Savings & Protection
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mt-3 tracking-tight">
              Why Solar Power is the Smartest Investment for Your Home
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
              Solar is not just clean energy; it delivers immediate monthly bill freedom, reliable power, and a direct boost to your family savings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 space-y-3 hover:bg-white/10 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Up to 90% Bill Elimination</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Generate your own clean units every sunny day. Most homeowners recover their entire setup cost within 3 to 4 years.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 space-y-3 hover:bg-white/10 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Direct Govt Subsidy (₹78k)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Get up to ₹78,000 Central Financial Assistance under PM Surya Ghar directly credited into your savings account.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 space-y-3 hover:bg-white/10 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-solar-400/20 text-solar-300 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">25-Year Generational Power</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tier-1 N-Type TOPCon bifacial modules designed with high-durability hot-dip galvanized structures built for 25+ years.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 space-y-3 hover:bg-white/10 hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
                <Sun className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">Hedge Rising Tariffs</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Electricity grid tariffs rise 5–7% every single year. Solar locks in your electricity price at virtually ₹0 for 25 years.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SolarCalculator initialSettings={calcSettings} whatsappNumber={siteSettings.whatsapp_number} />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-solar-600 bg-solar-50 px-3 py-1 rounded-full uppercase tracking-wider">
            All-Inclusive Packages
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
            Turnkey Rooftop Solar Packages
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Complete turnkey solutions: Panels, Inverters, Elevated Structure, DISCOM Net Metering, and Portal Subsidy filing included.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-6 flex flex-col justify-between border transition-all duration-300 ${
                pkg.featured
                  ? 'bg-gradient-to-b from-slate-900 to-solar-950 text-white border-solar-500 shadow-xl relative scale-105 z-10'
                  : 'bg-white text-slate-900 border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-400 text-slate-950 font-bold text-[10px] uppercase tracking-wider rounded-full shadow">
                  Recommended for 3-4 BHK
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${pkg.featured ? 'bg-solar-800/80 text-solar-300' : 'bg-slate-100 text-slate-600'}`}>
                    {pkg.capacity} System
                  </span>
                  <h3 className="text-xl font-black mt-2 leading-snug">{pkg.name}</h3>
                  <p className={`text-xs mt-1 ${pkg.featured ? 'text-slate-300' : 'text-slate-500'}`}>
                    {pkg.estimated_generation}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/40">
                  <p className={`text-xs ${pkg.featured ? 'text-slate-400' : 'text-slate-500'}`}>Starting from</p>
                  <p className="text-3xl font-black tracking-tight">
                    ₹{pkg.discount_price ? pkg.discount_price.toLocaleString('en-IN') : pkg.price.toLocaleString('en-IN')}
                  </p>
                  {pkg.estimated_subsidy > 0 && (
                    <p className="text-xs font-bold text-amber-400 mt-1">
                      Less ₹{pkg.estimated_subsidy.toLocaleString('en-IN')} Govt Subsidy
                    </p>
                  )}
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-200/40 text-xs">
                  <p className={`font-bold uppercase tracking-wider text-[10px] ${pkg.featured ? 'text-slate-300' : 'text-slate-500'}`}>
                    Included Components:
                  </p>
                  {pkg.components.slice(0, 4).map((comp, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className={pkg.featured ? 'text-slate-300' : 'text-slate-600'}>{comp.name}</span>
                      <span className="font-semibold">{comp.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href={`/packages/${pkg.slug}`}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold text-center block transition-all ${
                    pkg.featured
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md'
                      : 'bg-solar-600 hover:bg-solar-700 text-white'
                  }`}
                >
                  View Full Package Breakdown
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 rounded-3xl p-8 sm:p-12 text-slate-950 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="px-3 py-1 bg-slate-950 text-white text-xs font-black rounded-full uppercase tracking-wider">
              PM Surya Ghar: Muft Bijli Yojana
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Get Up To ₹78,000 Direct Cash Subsidy Credited to Your Bank
            </h2>
            <p className="text-sm font-medium text-slate-900 leading-relaxed">
              Under the national rooftop solar scheme, residential homes receive guaranteed direct subsidy transfer. As an empanelled solar vendor, Solaris handles 100% of the portal paperwork and DISCOM net meter cutover for you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/subsidy"
              className="px-6 py-3.5 rounded-xl text-sm font-bold bg-slate-950 hover:bg-slate-900 text-white shadow transition-all"
            >
              Check Subsidy Eligibility Slabs
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3.5 rounded-xl text-sm font-bold bg-white hover:bg-slate-100 text-slate-950 shadow transition-all"
            >
              Book Free Site Survey
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold text-solar-600 bg-solar-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Proven Track Record
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
              Featured Solar Installations
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-xs sm:text-sm font-bold text-solar-600 hover:text-solar-700 flex items-center"
          >
            Explore Complete Portfolio <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {projects.slice(0, 3).map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={proj.cover_image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold rounded-lg">
                  {proj.category}
                </span>
                <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-solar-600 text-white text-xs font-bold rounded-lg shadow">
                  {proj.capacity}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-xs text-slate-500">{proj.location}</p>
                  <h3 className="text-base font-bold text-slate-900 mt-1 line-clamp-1">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-between text-xs font-semibold text-slate-700">
                  <span>Generation: {proj.generation_stats}</span>
                  <span className="text-solar-600">{proj.annual_savings}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-100/70 py-16 sm:py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-solar-600 bg-solar-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Hassle-Free Execution
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
              Our 5-Step Turnkey Journey
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              From the initial phone call to the moment your bi-directional meter spins backward, we handle everything.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { step: '01', title: 'Consultation', desc: 'Detailed review of your electricity bill and energy consumption pattern.' },
              { step: '02', title: 'Site Survey', desc: 'Rooftop 3D shadow analysis, azimuth direction, and structural audit.' },
              { step: '03', title: 'Solar Design', desc: 'Custom CAD engineering layout with PVSyst annual generation simulations.' },
              { step: '04', title: '1-Day Install', desc: 'Precision mounting of Tier-1 panels, inverters, and surge protection.' },
              { step: '05', title: 'Commissioning', desc: 'DISCOM net meter changeover, portal subsidy filing, and app activation.' },
            ].map((st) => (
              <div key={st.step} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative space-y-2">
                <span className="text-3xl font-black text-solar-600/30 block">
                  {st.step}
                </span>
                <h3 className="text-base font-bold text-slate-900">{st.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-solar-600 bg-solar-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Verified Customer Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
            What Our Solar Homeowners Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Sun key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 italic leading-relaxed">
                  &ldquo;{t.review}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-solar-100 text-solar-800 font-bold flex items-center justify-center text-xs shrink-0">
                  {t.customer_name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.customer_name}</h4>
                  <p className="text-[10px] text-slate-500">{t.location} • {t.project_info}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-solar-600 bg-solar-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Clear Answers
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
            Frequently Asked Questions
          </h2>
        </div>

        <HomeFaqAccordion faqs={faqs} />

        <div className="text-center mt-6">
          <Link href="/faq" className="text-xs font-bold text-solar-600 hover:text-solar-700">
            View All FAQs & Guides →
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-xs font-bold text-solar-600 bg-solar-50 px-3 py-1 rounded-full uppercase tracking-wider">
              Solar Knowledge Hub
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
              Latest Solar Insights & Policy Guides
            </h2>
          </div>
          <Link href="/blog" className="text-xs sm:text-sm font-bold text-solar-600 hover:text-solar-700">
            All Articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition-all group flex flex-col"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400 mb-2">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.read_time}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-solar-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
                <span className="text-xs font-bold text-solar-600 inline-flex items-center pt-2">
                  Read Article <ArrowRight className="w-3 h-3 ml-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-solar-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-slate-800 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to Slash Your Power Bills to Zero?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Book a free rooftop feasibility inspection with our certified solar engineers today. We guarantee full DISCOM liaisoning and direct PM Surya Ghar subsidy filing.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-3">
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-xl text-sm font-bold bg-solar-500 hover:bg-solar-600 text-white shadow-lg shadow-solar-500/30 transition-all"
              >
                Schedule Free Site Inspection
              </Link>
              <a
                href="https://wa.me/917849067305?text=Hello%2C%20I%20would%20like%20to%20schedule%20a%20solar%20site%20inspection."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow transition-all flex items-center"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Solar Specialist
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
