'use client';

import React, { useState, useEffect } from 'react';
import {
  Inbox,
  Search,
  Filter,
  Trash2,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { Enquiry } from '@/lib/types';
import { INITIAL_ENQUIRIES } from '@/lib/data/initial-data';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(INITIAL_ENQUIRIES);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  useEffect(() => {
    SolarService.getEnquiries().then(setEnquiries);
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: Enquiry['status']) => {
    const updated = await SolarService.updateEnquiryStatus(id, newStatus);
    setEnquiries(updated);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    const updated = await SolarService.deleteEnquiry(id);
    setEnquiries(updated);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry(null);
    }
  };

  const filtered = enquiries.filter((e) => {
    const matchStatus = statusFilter === 'ALL' || e.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch =
      e.name.toLowerCase().includes(q) ||
      e.phone.toLowerCase().includes(q) ||
      (e.email && e.email.toLowerCase().includes(q)) ||
      (e.city && e.city.toLowerCase().includes(q)) ||
      e.requirement.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Customer Enquiries & Leads Inbox
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            {enquiries.length} total customer leads captured across website forms and calculator.
          </p>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {['ALL', 'NEW', 'READ', 'CONTACTED', 'CLOSED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === st
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st} ({st === 'ALL' ? enquiries.length : enquiries.filter((e) => e.status === st).length})
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by name, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-bold">Customer Name</th>
                <th className="py-3 px-4 font-bold">Phone & Email</th>
                <th className="py-3 px-4 font-bold">Requirement</th>
                <th className="py-3 px-4 font-bold">Source & Date</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((enq) => (
                <tr key={enq.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    <button
                      onClick={() => setSelectedEnquiry(enq)}
                      className="text-left hover:text-solar-600 hover:underline"
                    >
                      {enq.name}
                    </button>
                    {enq.city && <span className="text-[10px] text-slate-400 block font-normal">{enq.city}</span>}
                  </td>
                  <td className="py-3 px-4">
                    <a href={`tel:${enq.phone}`} className="font-semibold text-slate-900 hover:text-solar-600">
                      {enq.phone}
                    </a>
                    {enq.email && <span className="text-[10px] text-slate-400 block">{enq.email}</span>}
                  </td>
                  <td className="py-3 px-4 font-medium max-w-xs truncate">
                    {enq.requirement}
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-[11px]">
                    <span className="font-semibold text-slate-700">{enq.source}</span>
                    <span className="block text-[10px] text-slate-400">
                      {new Date(enq.created_at).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusUpdate(enq.id, e.target.value as any)}
                      className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none ${
                        enq.status === 'NEW'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : enq.status === 'CONTACTED'
                          ? 'bg-solar-50 text-solar-700 border-solar-200'
                          : enq.status === 'CLOSED'
                          ? 'bg-slate-100 text-slate-600 border-slate-200'
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      <option value="NEW">NEW</option>
                      <option value="READ">READ</option>
                      <option value="CONTACTED">CONTACTED</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right space-x-1">
                    <a
                      href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${enq.name}, this is Solaris Energy regarding your solar inquiry.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg inline-flex items-center"
                      title="WhatsApp customer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => handleDelete(enq.id)}
                      className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg inline-flex items-center"
                      title="Delete lead"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No enquiries match the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-solar-50 text-solar-700">
                  Lead Details
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">{selectedEnquiry.name}</h3>
                <p className="text-xs text-slate-500">{selectedEnquiry.city || 'City not specified'}</p>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-slate-400 hover:text-slate-600 p-1 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Phone:</span>
                <a href={`tel:${selectedEnquiry.phone}`} className="font-bold text-slate-900 hover:underline">
                  {selectedEnquiry.phone}
                </a>
              </div>
              {selectedEnquiry.email && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Email:</span>
                  <span className="font-bold text-slate-900">{selectedEnquiry.email}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-slate-500">Requirement:</span>
                <span className="font-bold text-slate-900">{selectedEnquiry.requirement}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Source Page:</span>
                <span className="font-bold text-slate-900">{selectedEnquiry.page}</span>
              </div>
            </div>

            {selectedEnquiry.message && (
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-700">Message / Solar Bill Details:</p>
                <p className="text-xs text-slate-600 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  {selectedEnquiry.message}
                </p>
              </div>
            )}

            <div className="pt-2 flex gap-3">
              <a
                href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${selectedEnquiry.name}, thank you for contacting Solaris Energy.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center"
              >
                <MessageCircle className="w-4 h-4 mr-1.5" />
                Chat on WhatsApp
              </a>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
