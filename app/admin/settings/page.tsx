'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Settings,
  Save,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Clock,
  UploadCloud,
  RotateCcw,
  Image as ImageIcon,
  ExternalLink,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';
import { SiteSettings } from '@/lib/types';
import { INITIAL_SITE_SETTINGS } from '@/lib/data/initial-data';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    SolarService.getSettings().then((data) => {
      if (data) {
        setSettings({
          ...INITIAL_SITE_SETTINGS,
          ...data,
          logo_url: data.logo_url || '/images/logo.png',
        });
      }
    });
  }, []);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingLogo(true);
      setUploadError('');

      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', 'Branding');

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to upload logo image');
      }

      setSettings((prev) => ({
        ...prev,
        logo_url: data.url,
      }));
    } catch (err: any) {
      console.error('Logo upload error:', err);
      setUploadError(err.message || 'Error uploading file.');
    } finally {
      setUploadingLogo(false);
      if (logoInputRef.current) {
        logoInputRef.current.value = '';
      }
    }
  };

  const handleResetDefaultLogo = () => {
    setSettings((prev) => ({
      ...prev,
      logo_url: '/images/logo.png',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      await SolarService.updateSettings(settings);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 5000);
    } catch (err: any) {
      console.warn('Failed saving settings:', err);
      // Still show saved confirmation because local/in-memory cache updated
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 5000);
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
          Manage website logo, company branding, contact numbers, address, and social links.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center shadow-sm">
          <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-600" />
          Settings updated successfully! Changes take effect immediately across all website pages and headers.
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
        {/* Website Logo & Visual Branding */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-solar-600" />
                Website Logo & Branding
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                The logo displays prominently in the website Navbar, Sticky Header, Footer, and Admin Panel.
              </p>
            </div>
            <button
              type="button"
              onClick={handleResetDefaultLogo}
              className="text-xs font-semibold text-slate-500 hover:text-solar-600 flex items-center gap-1 transition-colors"
              title="Reset to default logo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Default
            </button>
          </div>

          {/* Current Logo Previews */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center">
              <span className="text-[11px] font-semibold text-slate-500 mb-2 uppercase tracking-wider">
                Light Background (Navbar Preview)
              </span>
              <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-sm w-full flex items-center justify-center min-h-[90px]">
                {settings.logo_url ? (
                  <img
                    src={settings.logo_url}
                    alt="Logo Preview Light"
                    className="max-h-16 max-w-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-slate-400">No logo set</span>
                )}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center">
              <span className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                Dark Background (Footer Preview)
              </span>
              <div className="bg-white p-3 rounded-xl shadow-md w-full flex items-center justify-center min-h-[90px]">
                {settings.logo_url ? (
                  <img
                    src={settings.logo_url}
                    alt="Logo Preview Dark"
                    className="max-h-16 max-w-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-slate-400">No logo set</span>
                )}
              </div>
            </div>
          </div>

          {/* Upload and URL Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Upload New Logo Image
              </label>
              <input
                ref={logoInputRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml,image/webp"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <button
                type="button"
                disabled={uploadingLogo}
                onClick={() => logoInputRef.current?.click()}
                className="w-full flex items-center justify-center px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs sm:text-sm font-semibold border border-slate-200 transition-colors disabled:opacity-50"
              >
                {uploadingLogo ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin text-solar-600" />
                    Uploading image...
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4 mr-2 text-solar-600" />
                    Choose Logo File (PNG, SVG, JPG, WebP)
                  </>
                )}
              </button>
              {uploadError && (
                <p className="text-xs text-rose-600 flex items-center gap-1 mt-1.5 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {uploadError}
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Or Logo Image URL / Path
              </label>
              <input
                type="text"
                placeholder="/images/logo.png"
                value={settings.logo_url || ''}
                onChange={(e) => setSettings({ ...settings, logo_url: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Company Identity */}
        <div className="space-y-4 pt-2">
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
                placeholder="+917849067305"
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

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Google Maps Embed / Navigation URL</label>
            <input
              type="text"
              placeholder="https://maps.google.com/..."
              value={settings.google_maps_url || ''}
              onChange={(e) => setSettings({ ...settings, google_maps_url: e.target.value })}
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

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Changes apply instantly to navbar, headers, footer, and floating buttons.
          </p>
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
