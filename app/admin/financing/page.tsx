'use client';

import React, { useEffect, useState } from 'react';
import { Building2, Plus, Trash2, AlertCircle, Loader2 } from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { FinancingOption } from '@/lib/types';
import { INITIAL_FINANCING } from '@/lib/data/initial-data';

const blankOption = (order: number): FinancingOption => ({
  id: `fin-${Date.now()}`,
  partner_name: '',
  logo_url: '',
  interest_rate: '',
  max_tenure: '',
  min_loan: undefined,
  max_loan: undefined,
  eligibility: '',
  features: [],
  active: true,
  display_order: order,
});

export default function AdminFinancingPage() {
  const [options, setOptions] = useState<FinancingOption[]>(INITIAL_FINANCING);
  const [editing, setEditing] = useState<FinancingOption | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const refresh = async () => {
    try {
      setOptions(await SolarService.getAdminFinancing());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load financing options.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editing) return;
    setSaving(true);
    setError('');
    try {
      await SolarService.saveFinancingOption(editing);
      setEditing(null);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Financing option could not be saved.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (option: FinancingOption) => {
    if (!window.confirm(`Delete ${option.partner_name}?`)) return;
    setError('');
    try {
      await SolarService.deleteFinancingOption(option.id);
      await refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Financing option could not be deleted.');
    }
  };

  const update = <K extends keyof FinancingOption>(key: K, value: FinancingOption[K]) => {
    setEditing((current) => current ? { ...current, [key]: value } : current);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Financing Partners</h1>
          <p className="text-xs sm:text-sm text-slate-500">Manage the lender options displayed on the public financing page.</p>
        </div>
        <button
          type="button"
          onClick={() => { setError(''); setEditing(blankOption(options.length + 1)); }}
          className="px-4 py-2 bg-solar-600 hover:bg-solar-700 text-white rounded-xl text-xs font-bold shadow flex items-center"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Add lender
        </button>
      </div>

      {error && <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-xl flex items-start gap-2"><AlertCircle className="w-4 h-4 shrink-0" />{error}</div>}

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {loading ? <p className="p-6 text-sm text-slate-500">Loading lenders...</p> : options.length === 0 ? <p className="p-6 text-sm text-slate-500">No lenders yet. Add one to display it on the financing page.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px]"><tr><th className="p-4">Lender</th><th className="p-4">Rate</th><th className="p-4">Tenure</th><th className="p-4">Visibility</th><th className="p-4">Order</th><th className="p-4 text-right">Actions</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {options.map((option) => <tr key={option.id}>
                  <td className="p-4 font-semibold text-slate-900">{option.partner_name}</td><td className="p-4">{option.interest_rate}</td><td className="p-4">{option.max_tenure}</td><td className="p-4">{option.active ? 'Visible' : 'Hidden'}</td><td className="p-4">{option.display_order}</td>
                  <td className="p-4 text-right space-x-2"><button type="button" onClick={() => { setError(''); setEditing({ ...option, features: [...(option.features || [])] }); }} className="font-semibold text-solar-700 hover:underline">Edit</button><button type="button" onClick={() => void remove(option)} className="inline-flex p-1.5 text-rose-700 hover:bg-rose-50 rounded" title="Delete lender"><Trash2 className="w-4 h-4" /></button></td>
                </tr>)}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4 overflow-y-auto">
        <form onSubmit={save} className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
          <h2 className="text-lg font-black text-slate-900">{options.some((option) => option.id === editing.id) ? 'Edit lender' : 'Add lender'}</h2>
          {error && <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl">{error}</div>}
          <div className="grid sm:grid-cols-2 gap-3">
            <label className="text-xs font-semibold text-slate-700">Lender name<input required value={editing.partner_name} onChange={(e) => update('partner_name', e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-lg" /></label>
            <label className="text-xs font-semibold text-slate-700">Logo URL<input value={editing.logo_url || ''} onChange={(e) => update('logo_url', e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-lg" /></label>
            <label className="text-xs font-semibold text-slate-700">Interest rate<input required value={editing.interest_rate} onChange={(e) => update('interest_rate', e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-lg" /></label>
            <label className="text-xs font-semibold text-slate-700">Maximum tenure<input required value={editing.max_tenure} onChange={(e) => update('max_tenure', e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-lg" /></label>
            <label className="text-xs font-semibold text-slate-700">Minimum loan (₹)<input type="number" min="0" value={editing.min_loan ?? ''} onChange={(e) => update('min_loan', e.target.value === '' ? undefined : Number(e.target.value))} className="mt-1 w-full px-3 py-2 border rounded-lg" /></label>
            <label className="text-xs font-semibold text-slate-700">Maximum loan (₹)<input type="number" min="0" value={editing.max_loan ?? ''} onChange={(e) => update('max_loan', e.target.value === '' ? undefined : Number(e.target.value))} className="mt-1 w-full px-3 py-2 border rounded-lg" /></label>
            <label className="text-xs font-semibold text-slate-700">Display order<input type="number" value={editing.display_order} onChange={(e) => update('display_order', Number(e.target.value))} className="mt-1 w-full px-3 py-2 border rounded-lg" /></label>
            <label className="text-xs font-semibold text-slate-700">Eligibility<input value={editing.eligibility} onChange={(e) => update('eligibility', e.target.value)} className="mt-1 w-full px-3 py-2 border rounded-lg" /></label>
          </div>
          <label className="block text-xs font-semibold text-slate-700">Benefits, one per line<textarea rows={5} value={(editing.features || []).join('\n')} onChange={(e) => update('features', e.target.value.split('\n').filter((feature) => feature.trim()))} className="mt-1 w-full px-3 py-2 border rounded-lg" /></label>
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700"><input type="checkbox" checked={editing.active} onChange={(e) => update('active', e.target.checked)} /> Show on public website</label>
          <div className="flex justify-end gap-2 border-t pt-4">
            <button type="button" disabled={saving} onClick={() => setEditing(null)} className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-semibold disabled:opacity-50">Cancel</button>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-solar-600 text-white rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-50">{saving && <Loader2 className="w-4 h-4 animate-spin" />}{saving ? 'Saving...' : 'Save lender'}</button>
          </div>
        </form>
      </div>}
    </div>
  );
}