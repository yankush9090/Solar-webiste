'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { SiteSettings } from '@/lib/types';
import { INITIAL_SITE_SETTINGS } from '@/lib/data/initial-data';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    SolarService.getSettings().then(setSettings);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      await SolarService.updateSettings(settings);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error('Failed saving settings:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Website & Company Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Central configuration for company details, primary WhatsApp number, phone, email, and social links.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center shadow-sm">
          <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600" />
          Settings updated successfully! Changes take effect immediately across all website buttons and headers.
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Company Identity */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            Company Identity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Company Name</label>
              <input
                type="text"
                required
                value={settings.company_name}
                onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Company Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp & Contact Channels */}
        <div className="space-y-4 pt-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            Primary Contact Channels
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                WhatsApp Business Number (with country code) *
              </label>
              <input
                type="text"
                required
                placeholder="+919121086779"
                value={settings.whatsapp_number}
                onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500 bg-emerald-50/40 font-mono"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Powers all floating WhatsApp buttons, quote triggers, and inquiry chat links.
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number (Calling)</label>
              <input
                type="text"
                required
                value={settings.phone_number}
                onChange={(e) => setSettings({ ...settings, phone_number: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Primary Email Address</label>
              <input
                type="email"
                required
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Operating Hours</label>
              <input
                type="text"
                value={settings.working_hours}
                onChange={(e) => setSettings({ ...settings, working_hours: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Physical Office Address</label>
            <textarea
              rows={2}
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500"
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div className="space-y-4 pt-2">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            Social Media Handles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Facebook URL</label>
              <input
                type="url"
                value={settings.facebook_url || ''}
                onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Instagram URL</label>
              <input
                type="url"
                value={settings.instagram_url || ''}
                onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={settings.linkedin_url || ''}
                onChange={(e) => setSettings({ ...settings, linkedin_url: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">YouTube URL</label>
              <input
                type="url"
                value={settings.youtube_url || ''}
                onChange={(e) => setSettings({ ...settings, youtube_url: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-solar-600 hover:bg-solar-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow transition-all flex items-center disabled:opacity-50"
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving Settings...' : 'Save Website Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
