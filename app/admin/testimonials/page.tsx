'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Plus, Edit3, Sun } from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { Testimonial } from '@/lib/types';
import { INITIAL_TESTIMONIALS } from '@/lib/data/initial-data';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    SolarService.getTestimonials().then(setTestimonials);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const updated = await SolarService.saveTestimonial(editing);
    setTestimonials(updated);
    setModalOpen(false);
    setEditing(null);
  };

  const handleAddNew = () => {
    setEditing({
      id: `t-${Date.now()}`,
      customer_name: '',
      location: 'Bengaluru',
      review: '',
      rating: 5,
      project_info: '3 kW Residential Solar',
      display_order: testimonials.length + 1,
      active: true,
    });
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Customer Testimonials Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage verified homeowner and commercial client reviews.
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-solar-600 hover:bg-solar-700 text-white rounded-xl text-xs font-bold shadow flex items-center"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Add Review
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Customer Name</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Rating</th>
              <th className="py-3 px-4">Review Text</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {testimonials.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">{t.customer_name}</td>
                <td className="py-3 px-4 text-slate-600">{t.location}</td>
                <td className="py-3 px-4 font-bold text-amber-500">{t.rating} ★</td>
                <td className="py-3 px-4 text-slate-600 max-w-sm truncate">{t.review}</td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => {
                      setEditing(t);
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
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-black text-slate-900">Edit Customer Review</h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  value={editing.customer_name}
                  onChange={(e) => setEditing({ ...editing, customer_name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
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
                  <label className="font-bold text-slate-700 block mb-1">Project Info</label>
                  <input
                    type="text"
                    value={editing.project_info || ''}
                    onChange={(e) => setEditing({ ...editing, project_info: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Review Text</label>
                <textarea
                  rows={3}
                  required
                  value={editing.review}
                  onChange={(e) => setEditing({ ...editing, review: e.target.value })}
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
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
