'use client';

import React, { useState, useEffect } from 'react';
import { Layers, Plus, Edit3, AlertCircle, Loader2 } from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { Solution } from '@/lib/types';
import { INITIAL_SOLUTIONS } from '@/lib/data/initial-data';

export default function AdminSolutionsPage() {
  const [solutions, setSolutions] = useState<Solution[]>(INITIAL_SOLUTIONS);
  const [editing, setEditing] = useState<Solution | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    SolarService.getSolutions().then(setSolutions);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    try {
      const updated = await SolarService.saveSolution(editing);
      setSolutions(updated);
    } catch (err: any) {
      console.warn('Database save warning, updating locally:', err);
      setSolutions((prev) => prev.map((s) => (s.id === editing.id ? editing : s)));
    } finally {
      setSaving(false);
      setModalOpen(false);
      setEditing(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Solar Solutions Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage the 7 primary solar solution offerings and their technical features.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Solution Title</th>
              <th className="py-3 px-4">Slug</th>
              <th className="py-3 px-4">Benefits Count</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {solutions.map((sol) => (
              <tr key={sol.id} className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900 flex items-center space-x-2">
                  <img src={sol.hero_image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                  <span>{sol.title}</span>
                </td>
                <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">{sol.slug}</td>
                <td className="py-3 px-4 text-slate-700 font-semibold">{sol.benefits?.length || 0} benefits</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[10px]">
                    Active
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => {
                      setEditing(sol);
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
            <h3 className="text-lg font-black text-slate-900">Edit Solution</h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Hero Image URL</label>
                <input
                  type="text"
                  required
                  value={editing.hero_image}
                  onChange={(e) => setEditing({ ...editing, hero_image: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editing.short_description}
                  onChange={(e) => setEditing({ ...editing, short_description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Description</label>
                <textarea
                  rows={4}
                  value={editing.full_description}
                  onChange={(e) => setEditing({ ...editing, full_description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-semibold disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-solar-600 text-white rounded-xl font-bold flex items-center gap-1.5 disabled:opacity-50"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{saving ? 'Saving...' : 'Save Solution'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
