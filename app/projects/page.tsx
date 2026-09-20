'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Building2,
  Factory,
  Home,
  Sprout,
  MapPin,
  Zap,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { Project } from '@/lib/types';
import { INITIAL_PROJECTS } from '@/lib/data/initial-data';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    SolarService.getProjects().then(setProjects);
  }, []);

  const categories = ['All', 'Residential', 'Commercial', 'Industrial', 'Agriculture'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold text-solar-600 bg-solar-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Portfolio of Excellence
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Completed Rooftop & Commercial Solar Installations
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Explore our commissioned solar projects across Karnataka and South India, delivering verified energy savings for villas, hospitals, industrial factories, and plantations.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === cat
                  ? 'bg-solar-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-60 overflow-hidden">
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

                <div className="p-6 space-y-3">
                  <p className="text-xs text-slate-500 flex items-center">
                    <MapPin className="w-3.5 h-3.5 text-solar-500 mr-1" />
                    {proj.location}
                  </p>

                  <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-solar-600 transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>

                  <div className="p-3 bg-slate-50 rounded-2xl space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Monthly Yield:</span>
                      <span className="font-bold text-slate-900">{proj.generation_stats}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Annual Savings:</span>
                      <span className="font-bold text-solar-700">{proj.annual_savings}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/projects/${proj.slug}`}
                  className="w-full py-2.5 px-4 text-xs font-bold text-center block bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-colors"
                >
                  View Case Study & Gallery
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
