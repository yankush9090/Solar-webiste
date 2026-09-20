'use client';

import React, { useState, useEffect } from 'react';
import { Award, Save, CheckCircle2 } from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { SubsidyScheme } from '@/lib/types';
import { INITIAL_SUBSIDY } from '@/lib/data/initial-data';

export default function AdminSubsidyPage() {
  const [subsidy, setSubsidy] = useState<SubsidyScheme>(INITIAL_SUBSIDY);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    SolarService.getSubsidy().then(setSubsidy);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      await SolarService.updateSubsidy(subsidy);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Government Subsidy Scheme Manager
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Update PM Surya Ghar guidelines, portal URLs, and policy notices.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center shadow-sm">
          <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600" />
          Subsidy information updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Scheme Title</label>
          <input
            type="text"
            required
            value={subsidy.name}
            onChange={(e) => setSubsidy({ ...subsidy, name: e.target.value })}
            className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Overview Description</label>
          <textarea
            rows={3}
            required
            value={subsidy.overview}
            onChange={(e) => setSubsidy({ ...subsidy, overview: e.target.value })}
            className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Official Portal URL</label>
            <input
              type="url"
              required
              value={subsidy.portal_url}
              onChange={(e) => setSubsidy({ ...subsidy, portal_url: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Important Policy Note</label>
            <input
              type="text"
              value={subsidy.notes || ''}
              onChange={(e) => setSubsidy({ ...subsidy, notes: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-solar-600 hover:bg-solar-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow transition-all flex items-center disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Updating...' : 'Save Subsidy Scheme'}
          </button>
        </div>
      </form>
    </div>
  );
}
