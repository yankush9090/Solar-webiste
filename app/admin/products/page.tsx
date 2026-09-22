'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Plus, Trash2, Edit3, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { Product } from '@/lib/types';
import { INITIAL_PRODUCTS } from '@/lib/data/initial-data';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    SolarService.getProducts().then(setProducts);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setSaving(true);
    setError(null);
    try {
      const updated = await SolarService.saveProduct(editingProduct);
      setProducts(updated);
      setShowModal(false);
      setEditingProduct(null);
    } catch (err: any) {
      setError(err.message || 'Failed to save product to database.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddNew = () => {
    setEditingProduct({
      id: `prod-${Date.now()}`,
      name: '',
      slug: '',
      brand: 'Solaris Apex',
      capacity: '550W',
      short_description: '',
      description: '',
      specifications: { 'Rated Power': '550W', 'Efficiency': '22.0%' },
      features: ['High Efficiency', '25-Year Warranty'],
      warranty: '25 Years Performance Warranty',
      price: 12000,
      price_display: '₹12,000',
      image_url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      featured: false,
      active: true,
      display_order: products.length + 1,
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Products & Hardware Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage solar panels, inverters, batteries, and mounting hardware.
          </p>
        </div>
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-solar-600 hover:bg-solar-700 text-white rounded-xl text-xs font-bold shadow flex items-center"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Brand / Model</th>
              <th className="py-3 px-4">Capacity</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Featured</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="py-3 px-4 font-bold text-slate-900 flex items-center space-x-2">
                  <img src={p.image_url} alt="" className="w-8 h-8 rounded-lg object-cover" />
                  <span>{p.name}</span>
                </td>
                <td className="py-3 px-4 text-slate-600">{p.brand}</td>
                <td className="py-3 px-4 font-semibold text-solar-700">{p.capacity}</td>
                <td className="py-3 px-4 font-bold text-slate-900">{p.price_display || `₹${p.price}`}</td>
                <td className="py-3 px-4">
                  {p.featured ? (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full font-bold text-[10px]">
                      Featured
                    </span>
                  ) : (
                    <span className="text-slate-400">No</span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => {
                      setEditingProduct(p);
                      setShowModal(true);
                    }}
                    className="p-1.5 text-solar-700 hover:bg-solar-50 rounded-lg mr-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-black text-slate-900">
              {editingProduct.id.startsWith('prod-') ? 'Edit Product' : 'Add New Hardware'}
            </h3>
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-xl flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.brand}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Capacity</label>
                  <input
                    type="text"
                    value={editingProduct.capacity || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, capacity: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={editingProduct.price || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value), price_display: `₹${Number(e.target.value).toLocaleString('en-IN')}` })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Image URL</label>
                  <input
                    type="text"
                    value={editingProduct.image_url}
                    onChange={(e) => setEditingProduct({ ...editingProduct, image_url: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={editingProduct.short_description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, short_description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="featured-prod"
                  checked={editingProduct.featured}
                  onChange={(e) => setEditingProduct({ ...editingProduct, featured: e.target.checked })}
                  className="rounded"
                />
                <label htmlFor="featured-prod" className="font-semibold text-slate-700">Featured on Homepage</label>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => setShowModal(false)}
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
                  <span>{saving ? 'Saving...' : 'Save Product'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
