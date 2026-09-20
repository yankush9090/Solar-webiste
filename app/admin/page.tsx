'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Inbox,
  ShoppingBag,
  Package,
  FolderGit2,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  ArrowRight,
  TrendingUp,
  Settings
} from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { Enquiry } from '@/lib/types';
import {
  INITIAL_ENQUIRIES,
  INITIAL_PRODUCTS,
  INITIAL_PACKAGES,
  INITIAL_PROJECTS,
  INITIAL_BLOG_POSTS
} from '@/lib/data/initial-data';

export default function AdminDashboardPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>(INITIAL_ENQUIRIES);
  const [productCount, setProductCount] = useState(INITIAL_PRODUCTS.length);
  const [packageCount, setPackageCount] = useState(INITIAL_PACKAGES.length);
  const [projectCount, setProjectCount] = useState(INITIAL_PROJECTS.length);
  const [blogCount, setBlogCount] = useState(INITIAL_BLOG_POSTS.length);

  useEffect(() => {
    SolarService.getEnquiries().then(setEnquiries);
    SolarService.getProducts().then((res) => setProductCount(res.length));
    SolarService.getPackages().then((res) => setPackageCount(res.length));
    SolarService.getProjects().then((res) => setProjectCount(res.length));
    SolarService.getBlogPosts().then((res) => setBlogCount(res.length));
  }, []);

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'NEW').length;

  const handleStatusChange = async (id: string, newStatus: Enquiry['status']) => {
    const updated = await SolarService.updateEnquiryStatus(id, newStatus);
    setEnquiries(updated);
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome & Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time status of lead generation enquiries and website content modules.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/enquiries"
            className="px-4 py-2 bg-solar-600 hover:bg-solar-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
          >
            Manage All Enquiries ({enquiries.length})
          </Link>
          <Link
            href="/admin/settings"
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
          >
            Site Settings
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Total Leads</span>
            <Inbox className="w-4 h-4 text-solar-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{enquiries.length}</p>
          <p className="text-[10px] text-slate-500">Across website forms</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-amber-600">
            <span className="text-[11px] font-bold uppercase tracking-wider">New Leads</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
          </div>
          <p className="text-2xl font-black text-amber-600">{newEnquiriesCount}</p>
          <p className="text-[10px] text-amber-800">Requires follow-up</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Products</span>
            <ShoppingBag className="w-4 h-4 text-solar-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{productCount}</p>
          <p className="text-[10px] text-slate-500">Active hardware</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Packages</span>
            <Package className="w-4 h-4 text-solar-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{packageCount}</p>
          <p className="text-[10px] text-slate-500">Turnkey offerings</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Projects</span>
            <FolderGit2 className="w-4 h-4 text-solar-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{projectCount}</p>
          <p className="text-[10px] text-slate-500">Portfolio studies</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Articles</span>
            <FileText className="w-4 h-4 text-solar-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">{blogCount}</p>
          <p className="text-[10px] text-slate-500">Published guides</p>
        </div>
      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Customer Inquiries</h2>
            <p className="text-xs text-slate-500">Direct lead submissions from website calculator and contact forms.</p>
          </div>
          <Link
            href="/admin/enquiries"
            className="text-xs font-bold text-solar-600 hover:text-solar-700 flex items-center"
          >
            Full Inbox →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 font-bold">Customer Name</th>
                <th className="py-3 px-4 font-bold">Contact</th>
                <th className="py-3 px-4 font-bold">Requirement</th>
                <th className="py-3 px-4 font-bold">Source</th>
                <th className="py-3 px-4 font-bold">Status</th>
                <th className="py-3 px-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {enquiries.slice(0, 6).map((enq) => (
                <tr key={enq.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {enq.name}
                    {enq.city && <span className="text-[10px] text-slate-400 block font-normal">{enq.city}</span>}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-800">{enq.phone}</span>
                    {enq.email && <span className="text-[10px] text-slate-400 block">{enq.email}</span>}
                  </td>
                  <td className="py-3 px-4 font-medium max-w-xs truncate">
                    {enq.requirement}
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-semibold">
                      {enq.source}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq.id, e.target.value as any)}
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
                  <td className="py-3 px-4 text-right">
                    <a
                      href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${enq.name}, this is Solaris Energy following up on your solar inquiry.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 text-[11px] font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg border border-emerald-200"
                    >
                      WhatsApp
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
