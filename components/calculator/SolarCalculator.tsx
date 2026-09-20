'use client';

import React, { useState, useMemo } from 'react';
import {
  Sun,
  Zap,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  Leaf,
  DollarSign,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { calculateSolar } from '@/lib/calculator';
import { submitEnquiryAction } from '@/lib/db/actions';
import { CalculatorInputs, CalculatorResult, CalculatorSettings } from '@/lib/types';
import { INITIAL_CALCULATOR_SETTINGS } from '@/lib/data/initial-data';

interface SolarCalculatorProps {
  initialSettings?: CalculatorSettings;
  whatsappNumber?: string;
}

export default function SolarCalculator({
  initialSettings = INITIAL_CALCULATOR_SETTINGS,
  whatsappNumber = '+919121086779'
}: SolarCalculatorProps) {
  // Input states
  const [bill, setBill] = useState<number>(4500);
  const [propertyType, setPropertyType] = useState<'Residential' | 'Commercial' | 'Industrial'>('Residential');
  const [systemType, setSystemType] = useState<'On-Grid' | 'Off-Grid' | 'Hybrid'>('On-Grid');
  const [state, setState] = useState<string>('Karnataka');
  const [city, setCity] = useState<string>('Bengaluru');
  const [roofArea, setRoofArea] = useState<number>(400);

  // Lead capture states
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Live calculation results
  const results: CalculatorResult = useMemo(() => {
    const inputs: CalculatorInputs = {
      monthly_bill: bill,
      property_type: propertyType,
      system_type: systemType,
      roof_area_sqft: roofArea,
      state,
      city
    };
    return calculateSolar(inputs, initialSettings);
  }, [bill, propertyType, systemType, roofArea, state, city, initialSettings]);

  // Lead submission handler
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadPhone.trim()) {
      setSubmitError('Please enter your name and phone number.');
      return;
    }
    setSubmitting(true);
    setSubmitError('');

    try {
      const res = await submitEnquiryAction({
        name: leadName.trim(),
        phone: leadPhone.trim(),
        email: leadEmail.trim() || undefined,
        city: city,
        requirement: `${results.recommended_capacity_kw} kW ${systemType} Solar (${propertyType})`,
        message: `Monthly Bill: ₹${bill.toLocaleString('en-IN')}, Estimated Subsidy: ₹${results.estimated_subsidy.toLocaleString('en-IN')}, Net Investment: ₹${results.estimated_net_cost.toLocaleString('en-IN')}`,
        estimated_capacity: `${results.recommended_capacity_kw} kW`,
        source: 'Solar Calculator Lead Form',
        page: '/solar-calculator',
      });

      if (res.success) {
        setSubmitted(true);
      } else {
        setSubmitError(res.error || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setSubmitError('Failed to submit enquiry. Please call or WhatsApp us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  // Pre-filled WhatsApp link with calculation summary
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappMsg = `Hello Solaris Team, I used your Solar Calculator:\n- Monthly Bill: ₹${bill.toLocaleString('en-IN')}\n- Recommended: ${results.recommended_capacity_kw} kW (${systemType})\n- Estimated Subsidy: ₹${results.estimated_subsidy.toLocaleString('en-IN')}\n- Net Cost: ₹${results.estimated_net_cost.toLocaleString('en-IN')}\n- City: ${city}, ${state}\nI would like to get a formal quote and roof survey.`;
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-slate-900 via-solar-950 to-slate-900 p-6 sm:p-8 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2">
              <Zap className="w-3.5 h-3.5 mr-1 text-amber-400" /> PM Surya Ghar 2024–2025 Calculator
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Instant Solar Savings & Capacity Estimator
            </h3>
            <p className="text-slate-300 text-sm mt-1">
              Adjust your monthly electricity bill to calculate system size, government subsidy, and payback period.
            </p>
          </div>
          <div className="text-right sm:border-l sm:border-slate-800 sm:pl-6 shrink-0 hidden md:block">
            <p className="text-xs text-slate-400">Max Central Subsidy</p>
            <p className="text-2xl font-black text-amber-400">₹78,000</p>
            <p className="text-[11px] text-emerald-400">Direct Bank Transfer</p>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Input Form (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Monthly Bill Slider */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="monthly-bill-input" className="text-sm font-bold text-slate-900 flex items-center">
                Monthly Electricity Bill
              </label>
              <div className="flex items-center bg-white border border-slate-300 rounded-lg px-2.5 py-1 shadow-inner">
                <span className="text-slate-500 text-sm font-semibold mr-1">₹</span>
                <input
                  id="monthly-bill-input"
                  type="number"
                  min="500"
                  max="200000"
                  step="250"
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value) || 0)}
                  className="w-24 text-right font-black text-slate-900 text-sm focus:outline-none"
                />
              </div>
            </div>

            <label htmlFor="monthly-bill-slider" className="sr-only">
              Monthly electricity bill slider
            </label>
            <input
              id="monthly-bill-slider"
              type="range"
              min="800"
              max="25000"
              step="200"
              value={bill}
              onChange={(e) => setBill(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-solar-600 my-3"
            />

            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>₹800/mo</span>
              <span>₹10,000/mo</span>
              <span>₹25,000+/mo</span>
            </div>
          </div>

          {/* Property Type Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 block">
              Property Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Residential', 'Commercial', 'Industrial'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setPropertyType(type)}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all ${propertyType === type
                    ? 'bg-solar-600 text-white border-solar-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* System Type Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 block">
              System Architecture
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'On-Grid', label: 'On-Grid', sub: 'Net Metering' },
                { id: 'Hybrid', label: 'Hybrid', sub: 'Grid + Battery' },
                { id: 'Off-Grid', label: 'Off-Grid', sub: 'Pure Battery' },
              ].map((sys) => (
                <button
                  key={sys.id}
                  type="button"
                  onClick={() => setSystemType(sys.id as any)}
                  className={`py-2 px-2 text-center rounded-xl border transition-all ${systemType === sys.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                >
                  <p className="text-xs font-bold">{sys.label}</p>
                  <p className="text-[10px] opacity-75">{sys.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Location & Roof Area */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="calc-state-select" className="text-xs font-bold text-slate-700 block mb-1">
                State
              </label>
              <select
                id="calc-state-select"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full text-xs font-medium border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-solar-500"
              >
                {['Karnataka', 'Maharashtra', 'Gujarat', 'Tamil Nadu', 'Delhi NCR', 'Rajasthan', 'Telangana', 'Kerala', 'Uttar Pradesh'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="calc-city-input" className="text-xs font-bold text-slate-700 block mb-1">
                City
              </label>
              <input
                id="calc-city-input"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Bengaluru"
                className="w-full text-xs font-medium border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-solar-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="calc-roof-area-input" className="text-xs font-bold text-slate-700 block mb-1">
              Available Roof Area (Approx. Sq. Ft.)
            </label>
            <input
              id="calc-roof-area-input"
              type="number"
              value={roofArea}
              onChange={(e) => setRoofArea(Number(e.target.value) || 100)}
              className="w-full text-xs font-medium border border-slate-200 rounded-xl p-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-solar-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Required for {results.recommended_capacity_kw} kW: ~{results.required_roof_sqft} sq ft shadow-free space.
            </p>
          </div>
        </div>

        {/* Right Column: Dynamic Outputs & Lead Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Key Metric Card */}
          <div className="bg-gradient-to-br from-solar-50 via-emerald-50/50 to-amber-50/40 p-6 rounded-3xl border border-solar-200/80">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Recommended</p>
                <p className="text-2xl font-black text-solar-700 mt-1">{results.recommended_capacity_kw} <span className="text-sm">kW</span></p>
                <p className="text-[10px] text-slate-400">Rooftop Capacity</p>
              </div>

              <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Monthly Units</p>
                <p className="text-2xl font-black text-slate-900 mt-1">{results.estimated_monthly_units}</p>
                <p className="text-[10px] text-slate-400">kWh / Month</p>
              </div>

              <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Annual Savings</p>
                <p className="text-2xl font-black text-emerald-600 mt-1">₹{results.estimated_annual_savings.toLocaleString('en-IN')}</p>
                <p className="text-[10px] text-slate-400">Bill Reduction</p>
              </div>

              <div className="bg-white p-3.5 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Payback</p>
                <p className="text-2xl font-black text-amber-600 mt-1">{results.estimated_payback_years} <span className="text-sm">Yrs</span></p>
                <p className="text-[10px] text-slate-400">Full Recovery</p>
              </div>
            </div>

            {/* Financial Breakdown Table */}
            <div className="mt-6 pt-5 border-t border-slate-200/80 space-y-2.5 text-sm">
              <div className="flex justify-between items-center text-slate-600">
                <span>Estimated Total Turnkey Project Cost:</span>
                <span className="font-semibold text-slate-900">₹{results.estimated_system_cost.toLocaleString('en-IN')}</span>
              </div>

              {results.estimated_subsidy > 0 ? (
                <div className="flex justify-between items-center text-amber-700 font-semibold bg-amber-100/60 px-3 py-1.5 rounded-xl border border-amber-200">
                  <span className="flex items-center">
                    <Zap className="w-4 h-4 mr-1 text-amber-600" /> PM Surya Ghar Direct Subsidy:
                  </span>
                  <span>- ₹{results.estimated_subsidy.toLocaleString('en-IN')}</span>
                </div>
              ) : (
                <div className="flex justify-between items-center text-slate-500 text-xs italic">
                  <span>Government Subsidy:</span>
                  <span>Residential rooftop category only</span>
                </div>
              )}

              <div className="flex justify-between items-center text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Net Customer Investment:</span>
                <span className="text-solar-700 text-xl">₹{results.estimated_net_cost.toLocaleString('en-IN')}*</span>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span className="flex items-center text-emerald-700">
                  <Leaf className="w-3.5 h-3.5 mr-1" /> Annual CO₂ Offset: {results.co2_reduction_tons_annual} Tons/year
                </span>
                <span>Roof Required: ~{results.required_roof_sqft} sq.ft</span>
              </div>
            </div>
          </div>

          {/* Lead Capture Box */}
          <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-md border border-slate-800">
            {!submitted ? (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white">
                      Lock In Your Subsidy & Get Detailed Engineering Quote
                    </h4>
                    <p className="text-xs text-slate-400">
                      Our solar engineer will share full technical feasibility and 3D shadow report.
                    </p>
                  </div>
                </div>

                {submitError && (
                  <div className="p-3 text-xs bg-red-950/70 border border-red-800 text-red-300 rounded-xl flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1.5 shrink-0" />
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="text-xs px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-solar-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    className="text-xs px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-solar-500"
                  />
                  <input
                    type="email"
                    placeholder="Email Address (Optional)"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    className="text-xs px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-solar-500"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 py-3 px-5 text-xs sm:text-sm font-bold bg-solar-500 hover:bg-solar-600 text-white rounded-xl shadow transition-all disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Get Detailed Turnkey Quote'}
                  </button>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center py-3 px-4 text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow transition-all shrink-0"
                  >
                    <MessageCircle className="w-4 h-4 mr-1.5" /> Discuss on WhatsApp
                  </a>
                </div>
              </form>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-white">Thank You, {leadName}!</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Your solar savings estimation for a {results.recommended_capacity_kw} kW system has been registered. Our technical advisor will contact you within 2 business hours.
                </p>
                <div className="pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all"
                  >
                    <MessageCircle className="w-4 h-4 mr-1.5" /> Skip the wait & WhatsApp Us Now
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mandatory Calculator Disclaimer */}
      <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 text-[11px] text-slate-500 leading-relaxed">
        <p>
          * <strong>Calculator Disclaimer</strong>: Calculations are estimates based on the information provided and configured assumptions (standard solar insolation of 4.5 peak sun hours/day, ₹8.00/kWh tariff rate, and prevailing PM Surya Ghar guidelines). Actual generation, electricity bill savings, total system cost, and government subsidy may vary based on rooftop shadow conditions, azimuth orientation, specific DISCOM regulatory tariffs, and site structural requirements.
        </p>
      </div>
    </div>
  );
}
