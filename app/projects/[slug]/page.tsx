'use client';

import React, { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin,
  Calendar,
  Zap,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  ArrowRight
} from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { Project } from '@/lib/types';
import { INITIAL_PROJECTS } from '@/lib/data/initial-data';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SolarService.getProjectBySlug(slug).then((res) => {
      setProject(res);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-solar-500 border-t-transparent rounded-full mx-auto" />
        <p className="text-slate-500 text-sm mt-4">Loading project case study...</p>
      </div>
    );
  }

  if (!project) {
    return notFound();
  }

  const whatsappMsg = `Hello Solaris Team, I saw your project: ${project.title} (${project.capacity} in ${project.location}). I have a similar requirement for my property.`;
  const whatsappUrl = `https://wa.me/917849067305?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="space-y-16 py-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/projects"
          className="inline-flex items-center text-xs font-semibold text-solar-600 hover:text-solar-700 mb-6"
        >
          ← Back to Project Portfolio
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Case Study (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div>
              <div className="flex items-center space-x-3 text-xs text-slate-500 font-semibold mb-2">
                <span className="px-2.5 py-1 bg-solar-50 text-solar-700 rounded-lg">
                  {project.category}
                </span>
                <span className="flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1" />
                  {project.location}
                </span>
                {project.installation_date && (
                  <span className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 mr-1" />
                    Commissioned: {project.installation_date}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                {project.title}
              </h1>
            </div>

            <div className="rounded-3xl overflow-hidden border border-slate-200">
              <img
                src={project.cover_image}
                alt={project.title}
                className="w-full h-80 sm:h-96 object-cover"
              />
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center">
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase">Installed Capacity</p>
                <p className="text-xl font-black text-solar-700 mt-1">{project.capacity}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase">Monthly Generation</p>
                <p className="text-xl font-black text-slate-900 mt-1">{project.generation_stats}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-[11px] font-bold text-slate-500 uppercase">Annual Bill Savings</p>
                <p className="text-xl font-black text-emerald-600 mt-1">{project.annual_savings}</p>
              </div>
            </div>

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <h3 className="text-xl font-bold text-slate-900">Project Overview & Execution</h3>
              <p>{project.description}</p>
            </div>

            {/* Gallery Images if available */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="space-y-3 pt-4">
                <h3 className="text-base font-bold text-slate-900">Installation Gallery</h3>
                <div className="grid grid-cols-2 gap-4">
                  {project.gallery.map((img, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden border border-slate-200">
                      <img src={img} alt={`Installation photo ${i + 1}`} className="w-full h-48 object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Consultation Sidebar (4 cols) */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-slate-900 text-white p-7 rounded-3xl shadow-xl space-y-5 border border-slate-800">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Similar Property?
              </span>
              <h3 className="text-xl font-black leading-snug">
                Get an Equivalent System Designed for Your Roof
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                We provide a comprehensive 3D shadow profile, annual generation simulation, and DISCOM feasibility report.
              </p>

              <div className="space-y-3 pt-2">
                <Link
                  href="/solar-calculator"
                  className="w-full py-3 px-4 text-xs sm:text-sm font-bold text-center block bg-solar-500 hover:bg-solar-600 text-white rounded-xl shadow transition-colors"
                >
                  Calculate Rooftop Savings
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 text-xs sm:text-sm font-bold text-center flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow transition-colors"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Inquire via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
