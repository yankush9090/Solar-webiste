'use client';

import React, { useState, useEffect } from 'react';
import { FolderGit2, Plus, Edit3 } from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { Project } from '@/lib/types';
import { INITIAL_PROJECTS } from '@/lib/data/initial-data';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [editing, setEditing] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    SolarService.getProjects().then(setProjects);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const updated = await SolarService.saveProject(editing);
    setProjects(updated);
    setModalOpen(false);
    setEditing(null);
  };

  const handleAddNew = () => {
    setEditing({
      id: `proj-${Date.now()}`,
      title: 'New Solar Installation',
      slug: 'new-solar-installation',
      category: 'Residential',
      location: 'Bengaluru, Karnataka',
      capacity: '5 kW',
      system_type: 'On-Grid Net Metering',
      customer_type: 'Residential Villa',
      installation_date: new Date().toISOString().split('T')[0],
      description: 'Turnkey rooftop installation with bifacial solar modules and elevated structure.',
      cover_image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      gallery: [],
      generation_stats: '600 Units / Month',
      annual_savings: '₹55,000 / Year',
      featured: true,
      active: true,
      display_order: projects.length + 1,
    });
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Projects Portfolio Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Showcase commissioned rooftop and ground-mount installations.
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-solar-600 hover:bg-solar-700 text-white rounded-xl text-xs font-bold shadow flex items-center"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Add Project
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Project Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Capacity</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Annual Savings</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900 flex items-center space-x-2">
                  <img src={p.cover_image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                  <span>{p.title}</span>
                </td>
                <td className="py-3 px-4 text-slate-600">{p.category}</td>
                <td className="py-3 px-4 font-semibold text-solar-700">{p.capacity}</td>
                <td className="py-3 px-4 text-slate-500">{p.location}</td>
                <td className="py-3 px-4 font-bold text-slate-900">{p.annual_savings}</td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => {
                      setEditing(p);
                      setModalOpen(true);
                    }}
                    className="p-1.5 text-solar-700 hover:bg-solar-50 rounded-lg"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && editing && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-black text-slate-900">Edit Project</h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Project Name</label>
                <input
                  type="text"
                  required
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Category</label>
                  <select
                    value={editing.category}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-xl"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Agriculture">Agriculture</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Capacity</label>
                  <input
                    type="text"
                    required
                    value={editing.capacity}
                    onChange={(e) => setEditing({ ...editing, capacity: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Location</label>
                  <input
                    type="text"
                    required
                    value={editing.location}
                    onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Annual Savings Text</label>
                  <input
                    type="text"
                    value={editing.annual_savings}
                    onChange={(e) => setEditing({ ...editing, annual_savings: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={editing.cover_image}
                  onChange={(e) => setEditing({ ...editing, cover_image: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Project Description</label>
                <textarea
                  rows={3}
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-solar-600 text-white rounded-xl font-bold"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
