import React from 'react';

export const metadata = {
  title: 'Privacy Policy | Solaris Energy Solutions',
  description: 'Learn how Solaris Energy collects, protects, and handles your customer and site information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-slate-800 space-y-6">
      <h1 className="text-3xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
      <p className="text-xs text-slate-400">Last updated: September 2026</p>

      <section className="space-y-3 text-sm leading-relaxed">
        <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
        <p>
          Solaris Energy Solutions collects basic contact details (name, phone number, email address, property city) and solar feasibility inputs (monthly electricity bill, roof dimensions) when you submit a consultation request or use our Solar Calculator.
        </p>

        <h2 className="text-lg font-bold text-slate-900">2. How We Use Your Information</h2>
        <p>
          We use this data solely to prepare tailored solar engineering feasibility proposals, calculate DISCOM net metering suitability, estimate PM Surya Ghar government subsidies, and contact you via phone, email, or WhatsApp regarding your solar enquiry.
        </p>

        <h2 className="text-lg font-bold text-slate-900">3. Data Security & Third Parties</h2>
        <p>
          We never sell, rent, or trade your personal data to external advertisers. Data is shared exclusively with accredited government DISCOM portal authorities and empanelled green finance banks with your explicit consent for net-metering and loan applications.
        </p>

        <h2 className="text-lg font-bold text-slate-900">4. Contact Us</h2>
        <p>
          If you have any questions regarding your data or wish to delete your records, please reach out to us at <strong>info@maatienergy.com</strong>.
        </p>
      </section>
    </div>
  );
}
