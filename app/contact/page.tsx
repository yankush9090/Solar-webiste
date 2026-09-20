'use client';

import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Send,
  ShieldCheck
} from 'lucide-react';
import { SolarService } from '@/lib/services/solar-service';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [requirement, setRequirement] = useState('Residential Rooftop Solar (3-5 kW)');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-bot honeypot

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Bot detection check
    if (honeypot) {
      console.warn('Bot detected via honeypot');
      setSubmitted(true);
      return;
    }

    if (!name.trim() || !phone.trim()) {
      setErrorMsg('Please provide your full name and phone number.');
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await SolarService.submitEnquiry({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        city: city.trim() || undefined,
        requirement,
        message: message.trim() || undefined,
        source: 'Contact Page Form',
        page: '/contact',
      });

      if (res.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(res.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Something went wrong. Please connect with us directly on WhatsApp or phone.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 py-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold text-solar-600 bg-solar-50 px-3 py-1 rounded-full uppercase tracking-wider">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Schedule a Free Rooftop Site Survey & Solar Consultation
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Have questions about system sizing, PM Surya Ghar subsidy, or net-metering approvals? Reach out to our solar engineering desk.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Office Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
            <h2 className="text-2xl font-black text-slate-900 mb-2">
              Send an Enquiry
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Fill in your details below and an engineer will get back to you within 2 business hours.
            </p>

            {submitted ? (
              <div className="p-8 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Thank You, {name}!
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
                  Your enquiry has been successfully registered. Our certified solar engineer will contact you shortly on <strong>{phone}</strong> to coordinate your free rooftop survey.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="text-xs font-bold text-solar-700 hover:underline"
                  >
                    Submit another enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                    {errorMsg}
                  </div>
                )}

                {/* Honeypot field (hidden from human visitors) */}
                <input
                  type="text"
                  name="website_company_fax"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Mobile / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. rahul@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      City / District
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bengaluru"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500 bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Solar Requirement Category
                  </label>
                  <select
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500 bg-slate-50/50"
                  >
                    <option value="Residential Rooftop Solar (3-5 kW)">Residential Rooftop Solar (3–5 kW)</option>
                    <option value="Residential Starter Solar (1-2 kW)">Residential Starter Solar (1–2 kW)</option>
                    <option value="Commercial Rooftop Solar (10-50 kW)">Commercial Rooftop Solar (10–50 kW)</option>
                    <option value="Industrial High-Yield Solar (100+ kW)">Industrial High-Yield Solar (100+ kW)</option>
                    <option value="Off-Grid Battery Solar System">Off-Grid Battery Solar System</option>
                    <option value="Hybrid Solar System with Battery Backup">Hybrid Solar System with Battery Backup</option>
                    <option value="Solar Agriculture Water Pump">Solar Agriculture Water Pump</option>
                    <option value="Hardware Purchase / Datasheet Request">Hardware Purchase / Datasheet Request</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Additional Message or Monthly Electricity Bill (Optional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Provide any details about your roof type (RCC / Metal Sheet), approx monthly electricity bill, or location..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-solar-500 bg-slate-50/50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 text-sm font-bold bg-solar-600 hover:bg-solar-700 text-white rounded-xl shadow-md transition-all flex items-center justify-center disabled:opacity-50"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {submitting ? 'Submitting Enquiry...' : 'Submit Enquiry & Book Free Survey'}
                </button>
              </form>
            )}
          </div>

          {/* Right Side: Office Info & Quick Connect (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-6 border border-slate-800">
              <h3 className="text-xl font-bold text-white">
                Contact Solaris Energy
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start space-x-3 text-slate-300">
                  <MapPin className="w-5 h-5 text-solar-400 shrink-0 mt-0.5" />
                  <span>Plot 42, EcoTech Renewable Corridor, Outer Ring Road, Bengaluru, Karnataka 560103</span>
                </div>

                <div className="flex items-center space-x-3 text-slate-300">
                  <Phone className="w-5 h-5 text-solar-400 shrink-0" />
                  <a href="tel:+919121086779" className="hover:text-white transition-colors">
                    +91 98765 43210
                  </a>
                </div>

                <div className="flex items-center space-x-3 text-slate-300">
                  <Mail className="w-5 h-5 text-solar-400 shrink-0" />
                  <a href="mailto:hello@solarisenergy.com" className="hover:text-white transition-colors">
                    hello@solarisenergy.com
                  </a>
                </div>

                <div className="flex items-center space-x-3 text-slate-300">
                  <Clock className="w-5 h-5 text-solar-400 shrink-0" />
                  <span>Monday – Saturday: 9:00 AM – 7:00 PM</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2.5">
                <p className="text-xs font-semibold text-slate-400">Need immediate answers?</p>
                <a
                  href="https://wa.me/919876543210?text=Hello%2C%20I%20would%20like%20to%20enquire%20about%20solar%20solutions."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center transition-colors shadow"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat Directly on WhatsApp
                </a>
              </div>
            </div>

            {/* Quality Assurance Card */}
            <div className="bg-solar-50 p-6 rounded-3xl border border-solar-200/70 space-y-2 text-xs text-slate-700">
              <div className="flex items-center text-solar-800 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-solar-600 mr-2" />
                Zero Spam Guarantee
              </div>
              <p className="leading-relaxed">
                Your contact information is strictly used for coordinating your solar technical site survey and dispatching quotation estimates. We never sell or share your data with third parties.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
