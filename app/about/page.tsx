import React from 'react';
import Link from 'next/link';
import {
  Sun,
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  TrendingUp,
  Target,
  Eye,
  HeartHandshake,
  ArrowRight
} from 'lucide-react';
import { INITIAL_STATS } from '@/lib/data/initial-data';

export const metadata = {
  title: 'About Us | Solaris Energy Solutions',
  description: 'Learn about Solaris Energy Solutions, our mission to power homes and businesses with clean solar energy, 12+ years of EPC engineering excellence.',
};

export default function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-24 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold text-solar-600 bg-solar-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Who We Are
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Pioneering Clean Solar Energy Infrastructure Across India
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Founded with the conviction that clean energy must be accessible, reliable, and financially rewarding, Solaris Energy Solutions is an engineering-driven EPC company delivering rooftop and ground-mounted solar installations.
          </p>
        </div>
      </section>

      {/* Visual & Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80"
              alt="Solaris Engineering Team at rooftop installation"
              className="w-full h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p className="text-sm font-bold">12+ Years of Engineering Excellence</p>
              <p className="text-xs text-slate-200">Over 550+ rooftop solar systems commissioned with zero safety failures.</p>
            </div>
          </div>

          <div className="space-y-6 text-slate-700">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Built on Precision Engineering & Uncompromising Quality
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              At Solaris, we do not compromise on hardware. We exclusively deploy Tier-1 N-Type TOPCon bifacial modules, European-certified string inverters, and hot-dip galvanized mounting structures rated to withstand 160 km/h wind speeds.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              Beyond physical installation, we navigate the complex regulatory landscapes of state DISCOMs and central MNRE portals. From DISCOM net metering sanctions to direct PM Surya Ghar subsidy disbursement into customer bank accounts, our dedicated liaisoning team manages the entire process end-to-end.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-solar-50 border border-solar-100">
                <ShieldCheck className="w-6 h-6 text-solar-600 mb-2" />
                <h4 className="text-sm font-bold text-slate-900">Empanelled Vendor</h4>
                <p className="text-xs text-slate-600 mt-1">Official MNRE and state DISCOM empanelled partner.</p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                <Award className="w-6 h-6 text-amber-600 mb-2" />
                <h4 className="text-sm font-bold text-slate-900">25-Yr Performance</h4>
                <p className="text-xs text-slate-600 mt-1">Direct OEM guaranteed power performance warranty.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-slate-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {INITIAL_STATS.map((stat) => (
              <div key={stat.id}>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-400">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-solar-500/10 text-solar-600 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To empower 50,000+ Indian households and businesses to generate their own clean electricity, eliminating power bills while eliminating millions of metric tons of carbon emissions.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To be India’s most trusted and technologically advanced rooftop solar company, recognized for impeccable installation craftsmanship and flawless customer service.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Core Values</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Zero shortcuts in electrical safety, total transparency in generation claims, customer-first service, and proactive lifetime maintenance support.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-slate-100 rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-4">
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
            Work With Our Certified Solar Engineers
          </h3>
          <p className="text-sm text-slate-600">
            Get a tailored 3D solar design and generation feasibility study for your property.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 text-sm font-bold bg-solar-600 hover:bg-solar-700 text-white rounded-xl shadow"
            >
              Request Free Consultation
            </Link>
            <Link
              href="/projects"
              className="px-6 py-3 text-sm font-bold bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
