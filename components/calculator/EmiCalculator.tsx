'use client';

import React, { useState, useMemo } from 'react';
import { DollarSign, Percent, Calendar, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(150000);
  const [interestRate, setInterestRate] = useState<number>(7.0);
  const [tenureYears, setTenureYears] = useState<number>(5);

  const { monthlyEmi, totalInterest, totalPayable } = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;

    if (P <= 0 || r <= 0 || n <= 0) {
      return { monthlyEmi: 0, totalInterest: 0, totalPayable: 0 };
    }

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const payable = emi * n;
    const interest = payable - P;

    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(interest),
      totalPayable: Math.round(payable)
    };
  }, [loanAmount, interestRate, tenureYears]);

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-slate-200/80 p-6 sm:p-8 lg:p-10">
      <div className="max-w-2xl mb-8">
        <span className="text-xs font-bold text-solar-600 bg-solar-50 px-3 py-1 rounded-full uppercase tracking-wider">
          Green Solar Financing
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
          Solar Loan & Monthly EMI Calculator
        </h3>
        <p className="text-slate-600 text-sm mt-1">
          Calculate your monthly installment. In most cases, your monthly electricity bill savings are greater than your loan EMI!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Loan Amount */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="emi-loan-amount-input" className="text-sm font-bold text-slate-900">
                Loan Amount (Net after Subsidy)
              </label>
              <div className="flex items-center bg-white border border-slate-300 rounded-lg px-2.5 py-1">
                <span className="text-slate-500 text-xs mr-1 font-semibold">₹</span>
                <input
                  id="emi-loan-amount-input"
                  type="number"
                  min="30000"
                  max="1000000"
                  step="5000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-24 text-right font-black text-slate-900 text-sm focus:outline-none"
                />
              </div>
            </div>
            <label htmlFor="emi-loan-amount-slider" className="sr-only">Loan Amount slider</label>
            <input
              id="emi-loan-amount-slider"
              type="range"
              min="30000"
              max="500000"
              step="5000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-solar-600 my-2"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>₹30,000</span>
              <span>₹2,50,000</span>
              <span>₹5,00,000+</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="emi-interest-rate-input" className="text-sm font-bold text-slate-900">
                Annual Interest Rate (% p.a.)
              </label>
              <div className="flex items-center bg-white border border-slate-300 rounded-lg px-2.5 py-1">
                <input
                  id="emi-interest-rate-input"
                  type="number"
                  min="6"
                  max="16"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-16 text-right font-black text-slate-900 text-sm focus:outline-none"
                />
                <span className="text-slate-500 text-xs ml-1 font-semibold">%</span>
              </div>
            </div>
            <label htmlFor="emi-interest-rate-slider" className="sr-only">Annual Interest Rate slider</label>
            <input
              id="emi-interest-rate-slider"
              type="range"
              min="6.5"
              max="12.0"
              step="0.05"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-solar-600 my-2"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>6.5% (SBI Solar Scheme)</span>
              <span>8.5%</span>
              <span>12.0%</span>
            </div>
          </div>

          {/* Tenure */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="emi-tenure-years-input" className="text-sm font-bold text-slate-900">
                Loan Tenure (Years)
              </label>
              <div className="flex items-center bg-white border border-slate-300 rounded-lg px-2.5 py-1">
                <input
                  id="emi-tenure-years-input"
                  type="number"
                  min="1"
                  max="7"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-12 text-right font-black text-slate-900 text-sm focus:outline-none"
                />
                <span className="text-slate-500 text-xs ml-1 font-semibold">Yrs ({tenureYears * 12} mos)</span>
              </div>
            </div>
            <label htmlFor="emi-tenure-years-slider" className="sr-only">Loan Tenure slider</label>
            <input
              id="emi-tenure-years-slider"
              type="range"
              min="1"
              max="7"
              step="1"
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-solar-600 my-2"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>1 Year</span>
              <span>3 Years</span>
              <span>5 Years</span>
              <span>7 Years (Max)</span>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-solar-950 text-white p-7 sm:p-8 rounded-3xl shadow-xl border border-slate-800 space-y-6">
          <div className="text-center pb-6 border-b border-slate-800">
            <p className="text-xs font-semibold text-solar-400 uppercase tracking-wider">
              Estimated Monthly EMI
            </p>
            <p className="text-4xl sm:text-5xl font-black text-white mt-2">
              ₹{monthlyEmi.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              For {tenureYears * 12} monthly installments
            </p>
          </div>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between text-slate-300">
              <span>Principal Amount:</span>
              <span className="font-bold text-white">₹{loanAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Total Interest:</span>
              <span className="font-bold text-amber-400">₹{totalInterest.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-800 text-sm">
              <span className="font-bold text-white">Total Amount Payable:</span>
              <span className="font-black text-white">₹{totalPayable.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="bg-solar-900/50 p-4 rounded-2xl border border-solar-700/50 space-y-2">
            <div className="flex items-center text-solar-300 text-xs font-bold">
              <TrendingUp className="w-4 h-4 mr-1.5 text-solar-400" />
              The Solar Financial Equation:
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              If your current electricity bill is ~₹3,500/month, installing a solar system on loan with a ₹{monthlyEmi.toLocaleString('en-IN')} EMI means your monthly energy outflow drops immediately. Once paid off, you enjoy 20+ years of 100% free electricity!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
