'use client';

import React, { useState, useEffect } from 'react';
import { HelpCircle, Plus, Edit3, Trash2 } from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { FAQ } from '@/lib/types';
import { INITIAL_FAQS } from '@/lib/data/initial-data';

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(INITIAL_FAQS);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    SolarService.getFAQs().then(setFaqs);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const updated = await SolarService.saveFAQ(editing);
    setFaqs(updated);
    setModalOpen(false);
    setEditing(null);
  };

  const handleAddNew = () => {
    setEditing({
      id: `faq-${Date.now()}`,
      question: '',
      answer: '',
      category: 'General',
      display_order: faqs.length + 1,
      active: true,
    });
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            FAQ Knowledge Base Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Maintain questions and answers for website visitors.
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-solar-600 hover:bg-solar-700 text-white rounded-xl text-xs font-bold shadow flex items-center"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Add Question
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Question</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Answer Preview</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {faqs.map((f) => (
              <tr key={f.id} className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900 max-w-xs">{f.question}</td>
                <td className="py-3 px-4 text-slate-600 font-semibold">{f.category}</td>
                <td className="py-3 px-4 text-slate-500 max-w-sm truncate">{f.answer}</td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => {
                      setEditing(f);
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
            <h3 className="text-lg font-black text-slate-900">Edit FAQ</h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Question</label>
                <input
                  type="text"
                  required
                  value={editing.question}
                  onChange={(e) => setEditing({ ...editing, question: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Category</label>
                <select
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                >
                  <option value="Subsidy & Pricing">Subsidy & Pricing</option>
                  <option value="Technical & Net Metering">Technical & Net Metering</option>
                  <option value="Installation">Installation</option>
                  <option value="Maintenance & Warranty">Maintenance & Warranty</option>
                  <option value="Financing">Financing</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Answer</label>
                <textarea
                  rows={4}
                  required
                  value={editing.answer}
                  onChange={(e) => setEditing({ ...editing, answer: e.target.value })}
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
                  Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
