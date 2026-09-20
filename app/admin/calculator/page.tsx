'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, Save, CheckCircle2 } from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { CalculatorSettings, CalculatorSubsidySlab } from '@/lib/types';
import { INITIAL_CALCULATOR_SETTINGS, INITIAL_SUBSIDY_SLABS } from '@/lib/data/initial-data';

export default function AdminCalculatorSettingsPage() {
  const [settings, setSettings] = useState<CalculatorSettings>(INITIAL_CALCULATOR_SETTINGS);
  const [slabs, setSlabs] = useState<CalculatorSubsidySlab[]>(INITIAL_SUBSIDY_SLABS);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    SolarService.getCalculatorSettings().then(setSettings);
    SolarService.getCalculatorSlabs().then(setSlabs);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      await SolarService.updateCalculatorSettings(settings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
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
          Solar Calculator Parameters
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Configure financial and generation formulas so calculation logic is dynamic and never hardcoded.
        </p>
      </div>

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center shadow-sm">
          <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600" />
          Calculator settings updated successfully! All visitor calculations now use these updated parameters.
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
          Base Assumptions & Rates
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Base Turnkey Cost per kW (₹)
            </label>
            <input
              type="number"
              required
              value={settings.cost_per_kw}
              onChange={(e) => setSettings({ ...settings, cost_per_kw: Number(e.target.value) })}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Standard benchmark turnkey cost (panels, inverters, structure, installation).
            </p>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Monthly Generation per kW (Units / kWh)
            </label>
            <input
              type="number"
              required
              value={settings.generation_per_kw_per_month}
              onChange={(e) => setSettings({ ...settings, generation_per_kw_per_month: Number(e.target.value) })}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Typical Indian average is 120 units/month (approx 4 units/kW/day).
            </p>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Default Electricity Tariff (₹ / Unit)
            </label>
            <input
              type="number"
              step="0.25"
              required
              value={settings.default_tariff}
              onChange={(e) => setSettings({ ...settings, default_tariff: Number(e.target.value) })}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Average DISCOM utility power rate used to calculate bill savings.
            </p>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              CO₂ Emission Factor (kg CO₂ per kWh)
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={settings.co2_factor}
              onChange={(e) => setSettings({ ...settings, co2_factor: Number(e.target.value) })}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Indian grid CEA baseline emission factor (default ~0.82 kg/unit).
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-solar-600 hover:bg-solar-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow transition-all flex items-center disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Updating Parameters...' : 'Save Calculator Settings'}
          </button>
        </div>
      </form>

      {/* Subsidy Slabs Reference */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
          Active Subsidy Slabs (PM Surya Ghar)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Slab Range</th>
                <th className="py-2.5 px-3">Subsidy Amount</th>
                <th className="py-2.5 px-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {slabs.map((s) => (
                <tr key={s.id}>
                  <td className="py-2.5 px-3 font-bold text-slate-900">
                    {s.min_kw} kW – {s.max_kw} kW
                  </td>
                  <td className="py-2.5 px-3 text-solar-700 font-bold">
                    ₹{s.subsidy_amount.toLocaleString('en-IN')}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{s.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
