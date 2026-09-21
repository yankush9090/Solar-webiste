'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sun,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Home,
  Factory,
  Tractor,
  Zap,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';

export default function GetQuotePage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    propertyType: 'Residential',
    monthlyBill: '3000',
    roofArea: '400',
    solarType: 'On-Grid',
    requirement: 'Rooftop Solar with Subsidy',
    message: ''
  });

  const propertyOptions = [
    { label: 'Residential', desc: 'Homes & Villas', icon: Home },
    { label: 'Commercial', desc: 'Offices & Shops', icon: Building2 },
    { label: 'Industrial', desc: 'Factories & Sheds', icon: Factory },
    { label: 'Agricultural', desc: 'Solar Pumps & Farms', icon: Tractor }
  ];

  const solarTypes = [
    { label: 'On-Grid', desc: 'Best for bill saving with net metering' },
    { label: 'Hybrid', desc: 'Grid saving + battery backup during cuts' },
    { label: 'Off-Grid', desc: '100% battery powered for remote sites' }
  ];

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.name.trim() || !formData.phone.trim()) {
        setErrorMsg('Please enter your name and phone number.');
        return;
      }
    }
    setErrorMsg('');
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await SolarService.submitEnquiry({
        name: formData.name,
        phone: formData.phone,
        email: formData.email || undefined,
        city: formData.city || undefined,
        requirement: `${formData.propertyType} - ${formData.solarType} (${formData.requirement})`,
        message: `Property: ${formData.propertyType}. Solar Type: ${formData.solarType}. Avg Bill: ₹${formData.monthlyBill}/mo. Roof Area: ~${formData.roofArea} sq ft. ${formData.message || ''}`.trim(),
        source: 'get_quote',
        page: '/get-quote'
      });

      if (res.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(res.error || 'Failed to submit quote request. Please try again.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error sending request.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappHref = `https://wa.me/917849067305?text=${encodeURIComponent(
    `Hello Solaris team, I requested a quote for a ${formData.propertyType} ${formData.solarType} system (Monthly Bill: ₹${formData.monthlyBill}). Please share proposal details.`
  )}`;

  return (
    <div className="min-h-[85vh] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center text-slate-100">
      <div className="w-full max-w-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl shadow-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" /> 100% Free Custom Solar Proposal
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Get Your Solar Quote & Feasibility Report
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Tailored engineering design, PM Surya Ghar subsidy estimate, and ROI payback analysis.
          </p>
        </div>

        {/* Progress Tracker */}
        {!submitted && (
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-1">
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    step >= i ? 'bg-gradient-to-r from-solar-500 to-amber-400' : 'bg-slate-800'
                  }`}
                />
                <p className="text-[10px] text-center font-bold text-slate-400">
                  {i === 1 ? 'Contact' : i === 2 ? 'Property' : i === 3 ? 'Energy' : 'Review'}
                </p>
              </div>
            ))}
          </div>
        )}

        {errorMsg && (
          <div className="p-3 bg-red-950/80 border border-red-800 text-red-300 text-xs rounded-xl">
            {errorMsg}
          </div>
        )}

        {/* Step Content */}
        {submitted ? (
          <div className="text-center py-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white">Quote Request Received!</h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Thank you <span className="text-white font-bold">{formData.name}</span>. Our solar engineering team is reviewing your roof specs and will share a detailed proposal within 2 business hours.
              </p>
            </div>

            <div className="p-4 bg-slate-800/60 border border-slate-700/60 rounded-2xl max-w-md mx-auto text-left text-xs space-y-1.5 text-slate-300">
              <p className="font-bold text-amber-300">Request Summary:</p>
              <p>• {formData.propertyType} • {formData.solarType} System</p>
              <p>• Avg. Bill: ₹{formData.monthlyBill}/month • Roof: ~{formData.roofArea} sq ft</p>
              <p>• Contact: {formData.phone} {formData.email ? `(${formData.email})` : ''}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow transition-all flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp Instantly</span>
              </a>
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition-all text-center"
              >
                Return to Home
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={step === 4 ? handleSubmit : handleNext} className="space-y-6">
            {/* Step 1: Contact Details */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="text-sm font-bold text-white">Step 1: Your Contact Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Full Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-solar-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">
                        Mobile Number <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-solar-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-solar-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Location & Property Type */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="text-sm font-bold text-white">Step 2: Property & City</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Installation City / District <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bengaluru, Pune, Delhi NCR"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-solar-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-2">
                      Property Category
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {propertyOptions.map((p) => {
                        const Icon = p.icon;
                        const isSelected = formData.propertyType === p.label;
                        return (
                          <button
                            key={p.label}
                            type="button"
                            onClick={() => setFormData({ ...formData, propertyType: p.label })}
                            className={`p-3 rounded-2xl border text-left transition-all flex items-start space-x-2.5 ${
                              isSelected
                                ? 'bg-solar-500/20 border-solar-500 text-white'
                                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                            }`}
                          >
                            <Icon className={`w-5 h-5 mt-0.5 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`} />
                            <div>
                              <p className="text-xs font-bold">{p.label}</p>
                              <p className="text-[10px] text-slate-400">{p.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Energy Consumption & Solar Type */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="text-sm font-bold text-white">Step 3: Electricity Bill & Roof Area</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">
                        Average Monthly Bill (₹)
                      </label>
                      <input
                        type="number"
                        min="500"
                        step="500"
                        value={formData.monthlyBill}
                        onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-solar-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-300 block mb-1">
                        Approx. Shade-Free Roof Area (Sq Ft)
                      </label>
                      <input
                        type="number"
                        min="100"
                        step="50"
                        value={formData.roofArea}
                        onChange={(e) => setFormData({ ...formData, roofArea: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-solar-500 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-2">
                      Preferred System Type
                    </label>
                    <div className="space-y-2">
                      {solarTypes.map((t) => {
                        const isSelected = formData.solarType === t.label;
                        return (
                          <div
                            key={t.label}
                            onClick={() => setFormData({ ...formData, solarType: t.label })}
                            className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-solar-500/20 border-solar-500 text-white'
                                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                            }`}
                          >
                            <div>
                              <p className="text-xs font-bold">{t.label} Solar System</p>
                              <p className="text-[10px] text-slate-400">{t.desc}</p>
                            </div>
                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-amber-400 bg-amber-400' : 'border-slate-600'}`}>
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {step === 4 && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <h3 className="text-sm font-bold text-white">Step 4: Review Your Information</h3>
                
                <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-2xl space-y-2.5 text-xs">
                  <div className="flex justify-between border-b border-slate-700/60 pb-2">
                    <span className="text-slate-400">Name & Phone</span>
                    <span className="font-bold text-white">{formData.name} ({formData.phone})</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-700/60 pb-2">
                    <span className="text-slate-400">City / Location</span>
                    <span className="font-bold text-white">{formData.city || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-700/60 pb-2">
                    <span className="text-slate-400">Property & System</span>
                    <span className="font-bold text-amber-300">{formData.propertyType} • {formData.solarType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estimated Monthly Bill</span>
                    <span className="font-bold text-emerald-400">₹{formData.monthlyBill}/mo</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Specific Requirements or Questions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Looking for Tier-1 bifacial panels, subsidy guidance, or 0% EMI financing..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-solar-500"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl flex items-center space-x-1.5 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-gradient-to-r from-solar-600 to-amber-500 hover:from-solar-500 hover:to-amber-400 text-white text-xs font-bold rounded-xl shadow-lg shadow-solar-500/20 flex items-center space-x-2 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <span>Submitting...</span>
                ) : step === 4 ? (
                  <>
                    <span>Submit & Get Detailed Quote</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
