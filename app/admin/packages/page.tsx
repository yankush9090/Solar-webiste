'use client';

import React, { useState, useEffect } from 'react';
import { Package as PackageIcon, Plus, Edit3 } from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { Package } from '@/lib/types';
import { INITIAL_PACKAGES } from '@/lib/data/initial-data';

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Package[]>(INITIAL_PACKAGES);
  const [editing, setEditing] = useState<Package | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    SolarService.getPackages().then(setPackages);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const updated = await SolarService.savePackage(editing);
    setPackages(updated);
    setModalOpen(false);
    setEditing(null);
  };

  const handleAddNew = () => {
    setEditing({
      id: `pkg-${Date.now()}`,
      name: 'New Custom Package',
      slug: 'new-custom-package',
      capacity: '4 kW',
      system_type: 'On-Grid',
      price: 240000,
      discount_price: 220000,
      subsidy_applicable: true,
      estimated_subsidy: 78000,
      warranty: '25 Years Module / 5 Years Inverter',
      estimated_generation: '480 – 520 Units / Month',
      description: 'Custom turnkey solar rooftop package.',
      components: [
        { name: 'Solar Panels', quantity: '8 Panels', spec: '550W Tier-1 Bifacial' },
        { name: 'Inverter', quantity: '1 Unit', spec: '4kW Dual MPPT' },
        { name: 'Structure', quantity: '1 Set', spec: 'Elevated HDG' }
      ],
      benefits: ['Lowers electricity bill', 'Eligible for subsidy'],
      image_url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      featured: false,
      display_order: packages.length + 1,
      active: true,
    });
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Turnkey Packages Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Configure turnkey solar offerings, pricing, component counts, and subsidy deductions.
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-solar-600 hover:bg-solar-700 text-white rounded-xl text-xs font-bold shadow flex items-center"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Add Package
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Package</th>
              <th className="py-3 px-4">Capacity & Type</th>
              <th className="py-3 px-4">Standard Price</th>
              <th className="py-3 px-4">Offer Price</th>
              <th className="py-3 px-4">Govt Subsidy</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {packages.map((pkg) => (
              <tr key={pkg.id} className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900">{pkg.name}</td>
                <td className="py-3 px-4 font-semibold text-solar-700">{pkg.capacity} ({pkg.system_type})</td>
                <td className="py-3 px-4 text-slate-500">₹{pkg.price.toLocaleString('en-IN')}</td>
                <td className="py-3 px-4 font-bold text-slate-900">
                  ₹{(pkg.discount_price || pkg.price).toLocaleString('en-IN')}
                </td>
                <td className="py-3 px-4 font-bold text-amber-600">
                  {pkg.estimated_subsidy > 0 ? `₹${pkg.estimated_subsidy.toLocaleString('en-IN')}` : 'None'}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => {
                      setEditing(pkg);
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
            <h3 className="text-lg font-black text-slate-900">Edit Package</h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Package Name</label>
                <input
                  type="text"
                  required
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
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
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Architecture</label>
                  <select
                    value={editing.system_type}
                    onChange={(e) => setEditing({ ...editing, system_type: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-xl"
                  >
                    <option value="On-Grid">On-Grid</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Off-Grid">Off-Grid</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Turnkey Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={editing.price}
                    onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subsidy Deduction (₹)</label>
                  <input
                    type="number"
                    value={editing.estimated_subsidy}
                    onChange={(e) => setEditing({ ...editing, estimated_subsidy: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Estimated Generation</label>
                <input
                  type="text"
                  value={editing.estimated_generation}
                  onChange={(e) => setEditing({ ...editing, estimated_generation: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
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
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
